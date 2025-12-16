/**
 * Main orchestrator for the Documentation Generator System
 */

import * as fs from 'fs';
import * as path from 'path';
import { FeatureData, GenerationResult, SpecMetadata } from './types';
import {
  scanSpecsDirectory,
  organizeByCategory,
  archiveSpecFolders,
  validateArchive,
  cleanupSpecFolders,
  rollbackCleanup,
} from './scanner';
import { parseRequirements, parseImplementationPlan } from './parser';
import { generateAppSpecs, validateAppSpecs } from './generator';

/**
 * Main function to update app-specs.md
 */
export async function updateAppSpecs(
  specsDir?: string,
  performCleanup: boolean = false
): Promise<GenerationResult> {
  const startTime = Date.now();

  // Default paths
  const specsDirectory = specsDir || path.join(process.cwd(), 'perseon', 'specs');
  const outputFile = path.join(specsDirectory, 'app-specs.md');

  console.log('🚀 Starting documentation generation...\n');

  try {
    // Step 1: Scan specs directory
    console.log('📂 Scanning specs directory...');
    const allSpecs = scanSpecsDirectory(specsDirectory);

    if (allSpecs.length === 0) {
      console.log('⚠️  No spec folders found');
      return {
        success: false,
        featuresCount: 0,
        completionPercentage: 0,
        completed: 0,
        inProgress: 0,
        planned: 0,
        categories: {},
        timestamp: new Date().toISOString(),
        foldersArchived: 0,
        foldersRemoved: 0,
        cleanupSucceeded: false,
        rollbackPerformed: false,
        error: 'No spec folders found',
      };
    }

    console.log(`   ✓ Found ${allSpecs.length} spec folders\n`);

    // Step 2: Parse each spec
    console.log('📝 Parsing implementation plans...');
    const allFeatures: FeatureData[] = [];

    for (const spec of allSpecs) {
      try {
        let title = spec.name;
        let description = '';

        // Parse requirements if available
        if (spec.requirementsFile) {
          const reqData = parseRequirements(spec.requirementsFile);
          title = reqData.title;
          description = reqData.description;
        }

        // Parse implementation plan if available
        let planData = {};
        if (spec.implementationFile) {
          planData = parseImplementationPlan(spec.implementationFile);
        }

        // Determine implementation plan link (relative to specs dir)
        let implementationLink = '';
        if (spec.implementationFile) {
          // If cleanup will be performed, link to archive
          if (performCleanup) {
            implementationLink = `./.archive/latest/${spec.name}/implementation-plan.md`;
          } else {
            implementationLink = `./${spec.name}/implementation-plan.md`;
          }
        } else {
          implementationLink = `./${spec.name}/`;
        }

        // Combine data
        const feature: FeatureData = {
          title,
          description,
          status: 'not_started',
          category: spec.category,
          completionPercentage: 0,
          tasksTotal: 0,
          tasksCompleted: 0,
          features: [],
          implementationPlanLink: implementationLink,
          ...planData,
        };

        allFeatures.push(feature);

        const statusEmoji = feature.status === 'completed' ? '✅' :
                           feature.status === 'in_progress' ? '🟡' :
                           feature.status === 'planned' ? '⏳' : '❌';

        console.log(`   ${statusEmoji} ${spec.name} (${feature.completionPercentage}% complete)`);
      } catch (error) {
        console.warn(`   ⚠️  Error parsing ${spec.name}:`, error);
      }
    }

    console.log('');

    // Step 3: Aggregate statistics
    console.log('📊 Calculating statistics...');

    const completed = allFeatures.filter(f => f.status === 'completed').length;
    const inProgress = allFeatures.filter(f => f.status === 'in_progress').length;
    const planned = allFeatures.filter(f => f.status === 'planned' || f.status === 'not_started').length;

    const totalTasks = allFeatures.reduce((sum, f) => sum + f.tasksTotal, 0);
    const completedTasks = allFeatures.reduce((sum, f) => sum + f.tasksCompleted, 0);
    const overallCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const categoryCounts: { [key: string]: number } = {};
    for (const feature of allFeatures) {
      categoryCounts[feature.category] = (categoryCounts[feature.category] || 0) + 1;
    }

    console.log(`   ✓ ${allFeatures.length} features processed`);
    console.log(`   ✓ ${Object.keys(categoryCounts).length} categories tracked\n`);

    // Create result object
    const result: GenerationResult = {
      success: true,
      featuresCount: allFeatures.length,
      completionPercentage: overallCompletion,
      completed,
      inProgress,
      planned,
      categories: categoryCounts,
      timestamp: new Date().toISOString(),
      foldersArchived: 0,
      foldersRemoved: 0,
      cleanupSucceeded: false,
      rollbackPerformed: false,
    };

    // Step 4: Generate markdown
    console.log('📄 Generating app-specs.md...');
    const markdown = generateAppSpecs(allFeatures, result);

    // Step 5: Write to file (atomic write)
    const tempFile = `${outputFile}.tmp`;
    fs.writeFileSync(tempFile, markdown, 'utf-8');
    fs.renameSync(tempFile, outputFile);

    console.log(`   ✓ Written to ${outputFile}\n`);

    // Step 6: Validate generated document
    console.log('✅ Validating generated document...');
    const isValid = validateAppSpecs(outputFile);

    if (!isValid) {
      console.log('');
      return {
        ...result,
        success: false,
        error: 'Generated document validation failed',
      };
    }

    console.log('');

    // Step 7-11: Cleanup process (if requested)
    if (performCleanup) {
      console.log('📦 Starting cleanup process...\n');

      // Step 7: Archive spec folders
      console.log('📦 Archiving spec folders...');
      const archivePath = archiveSpecFolders(allSpecs, specsDirectory);

      if (!archivePath) {
        console.log('');
        return {
          ...result,
          success: false,
          error: 'Failed to create archive',
        };
      }

      result.archivePath = archivePath;
      result.foldersArchived = allSpecs.length;
      console.log('');

      // Step 8: Validate archive
      console.log('✅ Validating archive...');
      const archiveValid = validateArchive(archivePath, allSpecs);

      if (!archiveValid) {
        console.log('');
        return {
          ...result,
          success: false,
          error: 'Archive validation failed',
        };
      }

      console.log('');

      // Step 9: Create "latest" symlink for easier linking
      try {
        const latestLink = path.join(specsDirectory, '.archive', 'latest');
        if (fs.existsSync(latestLink)) {
          fs.unlinkSync(latestLink);
        }
        fs.symlinkSync(path.basename(archivePath), latestLink);
        console.log('🔗 Created symlink: .archive/latest -> ' + path.basename(archivePath) + '\n');
      } catch (error) {
        console.warn('⚠️  Could not create symlink (this is ok):', error);
      }

      // Step 10: Clean up spec folders
      console.log('🗑️  Cleaning up spec folders...');
      const cleanupResult = cleanupSpecFolders(allSpecs);

      result.foldersRemoved = cleanupResult.removed;
      result.cleanupSucceeded = cleanupResult.errors.length === 0;

      if (cleanupResult.errors.length > 0) {
        console.log('\n⚠️  Some folders could not be removed:');
        for (const error of cleanupResult.errors) {
          console.log(`   - ${error}`);
        }

        // Attempt rollback
        console.log('\n🔄 Attempting rollback...');
        const rollbackSuccess = rollbackCleanup(archivePath);
        result.rollbackPerformed = true;

        if (!rollbackSuccess) {
          console.log('\n❌ Rollback failed. Manual recovery needed.');
          console.log(`   Archive location: ${archivePath}`);
          return {
            ...result,
            success: false,
            error: 'Cleanup failed and rollback unsuccessful',
          };
        }

        return {
          ...result,
          success: false,
          error: 'Cleanup partially failed, rollback successful',
        };
      }

      console.log('');
    }

    // Success!
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Documentation generation completed in ${duration}s\n`);

    return result;
  } catch (error) {
    console.error('\n❌ Error during documentation generation:', error);

    return {
      success: false,
      featuresCount: 0,
      completionPercentage: 0,
      completed: 0,
      inProgress: 0,
      planned: 0,
      categories: {},
      timestamp: new Date().toISOString(),
      foldersArchived: 0,
      foldersRemoved: 0,
      cleanupSucceeded: false,
      rollbackPerformed: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Check if it's safe to perform cleanup
 */
export function canSafelyCleanup(outputFile: string, archiveValid: boolean): boolean {
  // Check if app-specs.md exists and is valid
  if (!validateAppSpecs(outputFile)) {
    return false;
  }

  // Check if archive validation passed
  if (!archiveValid) {
    return false;
  }

  return true;
}
