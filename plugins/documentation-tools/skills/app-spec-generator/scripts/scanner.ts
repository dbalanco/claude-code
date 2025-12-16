/**
 * Directory scanner for finding and processing spec folders
 */

import * as fs from 'fs';
import * as path from 'path';
import { SpecMetadata } from './types';

/**
 * Scan the specs directory for all spec folders
 */
export function scanSpecsDirectory(specsDir: string, excludeFolders: string[] = ['doc-generator']): SpecMetadata[] {
  const specs: SpecMetadata[] = [];

  try {
    // Check if specs directory exists
    if (!fs.existsSync(specsDir)) {
      console.warn(`⚠️  Specs directory not found: ${specsDir}`);
      return specs;
    }

    // Read directory contents
    const entries = fs.readdirSync(specsDir, { withFileTypes: true });

    // Filter for subdirectories only
    const subdirs = entries.filter(entry => entry.isDirectory());

    // Process each subdirectory
    for (const dir of subdirs) {
      const dirName = dir.name;

      // Skip excluded folders
      if (excludeFolders.includes(dirName)) {
        continue;
      }

      // Skip hidden folders
      if (dirName.startsWith('.')) {
        continue;
      }

      const dirPath = path.join(specsDir, dirName);

      try {
        const files = findImplementationFiles(dirPath);
        const category = inferCategory(dirName);

        specs.push({
          name: dirName,
          category,
          path: dirPath,
          requirementsFile: files.requirements,
          implementationFile: files.implementation,
          supplementaryFiles: files.supplementary,
        });
      } catch (error) {
        console.warn(`⚠️  Error scanning folder ${dirName}:`, error);
        continue;
      }
    }

    return specs;
  } catch (error) {
    console.error('❌ Error scanning specs directory:', error);
    return specs;
  }
}

/**
 * Find implementation files in a spec folder
 */
function findImplementationFiles(dirPath: string): {
  requirements?: string;
  implementation?: string;
  supplementary: string[];
} {
  const result = {
    requirements: undefined as string | undefined,
    implementation: undefined as string | undefined,
    supplementary: [] as string[],
  };

  try {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      // Only process files, not directories
      if (!stat.isFile()) continue;

      // Only process markdown files
      if (!file.endsWith('.md')) continue;

      const lowerFile = file.toLowerCase();

      // Check for requirements file
      if (lowerFile === 'requirements.md') {
        result.requirements = filePath;
      }
      // Check for implementation plan file
      else if (lowerFile === 'implementation-plan.md' || lowerFile === 'implementation_plan.md') {
        result.implementation = filePath;
      }
      // All other markdown files are supplementary
      else {
        result.supplementary.push(filePath);
      }
    }
  } catch (error) {
    console.warn(`⚠️  Error reading files in ${dirPath}:`, error);
  }

  return result;
}

/**
 * Infer category from folder name or content
 */
function inferCategory(folderName: string): string {
  const lower = folderName.toLowerCase();

  // Foundation
  if (lower.includes('auth') || lower.includes('workspace') || lower.includes('database')) {
    return 'Foundation';
  }

  // GitHub Integration
  if (lower.includes('github') || lower.includes('git')) {
    return 'GitHub Integration';
  }

  // Project Management
  if (lower.includes('project') || lower.includes('kanban') || lower.includes('issue') || lower.includes('task')) {
    return 'Project Management';
  }

  // Community Features
  if (lower.includes('community') || lower.includes('feature-request') || lower.includes('bug-report') || lower.includes('upvote')) {
    return 'Community Features';
  }

  // Analytics & Monitoring
  if (lower.includes('analytic') || lower.includes('monitor') || lower.includes('dashboard') || lower.includes('metric')) {
    return 'Analytics & Monitoring';
  }

  // UX Enhancements
  if (lower.includes('ux') || lower.includes('ui') || lower.includes('enhancement') || lower.includes('dark-mode') || lower.includes('tooltip')) {
    return 'UX Enhancements';
  }

  // Performance
  if (lower.includes('performance') || lower.includes('optimization') || lower.includes('cache') || lower.includes('pagination')) {
    return 'Performance';
  }

  // Learning Resources
  if (lower.includes('tutorial') || lower.includes('learning') || lower.includes('documentation') || lower.includes('guide')) {
    return 'Learning Resources';
  }

  // Developer Tools
  if (lower.includes('cli') || lower.includes('command') || lower.includes('tool') || lower.includes('generator')) {
    return 'Developer Tools';
  }

  // Notifications
  if (lower.includes('notification') || lower.includes('email') || lower.includes('alert')) {
    return 'Notifications';
  }

  // Default
  return 'Other';
}

/**
 * Organize specs by category
 */
export function organizeByCategory(specs: SpecMetadata[]): Map<string, SpecMetadata[]> {
  const byCategory = new Map<string, SpecMetadata[]>();

  for (const spec of specs) {
    const category = spec.category;
    if (!byCategory.has(category)) {
      byCategory.set(category, []);
    }
    byCategory.get(category)!.push(spec);
  }

  return byCategory;
}

/**
 * Archive spec folders to a timestamped backup location
 */
export function archiveSpecFolders(specs: SpecMetadata[], specsDir: string): string | null {
  try {
    // Create archive directory
    const archiveRoot = path.join(specsDir, '.archive');
    if (!fs.existsSync(archiveRoot)) {
      fs.mkdirSync(archiveRoot, { recursive: true });
    }

    // Create timestamped subdirectory
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '-' +
                      new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
    const archivePath = path.join(archiveRoot, timestamp);
    fs.mkdirSync(archivePath, { recursive: true });

    // Copy each spec folder to archive
    for (const spec of specs) {
      const targetPath = path.join(archivePath, spec.name);
      copyDirectory(spec.path, targetPath);
      console.log(`📦 Archived: ${spec.name}`);
    }

    // Create manifest
    const manifest = {
      timestamp: new Date().toISOString(),
      foldersCount: specs.length,
      folders: specs.map(s => ({
        name: s.name,
        category: s.category,
        hasRequirements: !!s.requirementsFile,
        hasImplementation: !!s.implementationFile,
      })),
    };

    fs.writeFileSync(
      path.join(archivePath, 'manifest.json'),
      JSON.stringify(manifest, null, 2)
    );

    console.log(`✅ Archive created: ${archivePath}`);
    return archivePath;
  } catch (error) {
    console.error('❌ Error creating archive:', error);
    return null;
  }
}

/**
 * Validate that archive was created successfully
 */
export function validateArchive(archivePath: string, originalSpecs: SpecMetadata[]): boolean {
  try {
    // Check archive exists
    if (!fs.existsSync(archivePath)) {
      console.error('❌ Archive path does not exist');
      return false;
    }

    // Check each spec folder was archived
    let allPresent = true;
    for (const spec of originalSpecs) {
      const archivedPath = path.join(archivePath, spec.name);
      if (!fs.existsSync(archivedPath)) {
        console.error(`❌ Missing from archive: ${spec.name}`);
        allPresent = false;
      }
    }

    if (allPresent) {
      console.log('✅ Archive validation passed');
    }

    return allPresent;
  } catch (error) {
    console.error('❌ Error validating archive:', error);
    return false;
  }
}

/**
 * Clean up spec folders after successful archival
 */
export function cleanupSpecFolders(specs: SpecMetadata[]): { removed: number; errors: string[] } {
  const result = { removed: 0, errors: [] as string[] };

  for (const spec of specs) {
    try {
      removeDirectory(spec.path);
      console.log(`🗑️  Removed: ${spec.name}`);
      result.removed++;
    } catch (error) {
      const errorMsg = `Failed to remove ${spec.name}: ${error}`;
      console.error(`❌ ${errorMsg}`);
      result.errors.push(errorMsg);
    }
  }

  return result;
}

/**
 * Remove a directory recursively
 */
function removeDirectory(dirPath: string): void {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

/**
 * Copy directory recursively
 */
function copyDirectory(src: string, dest: string): void {
  // Create destination directory
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  // Read source directory
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Rollback cleanup by restoring from archive
 */
export function rollbackCleanup(archivePath: string, failedAtFolder?: string): boolean {
  try {
    console.log('🔄 Rolling back cleanup...');

    if (!fs.existsSync(archivePath)) {
      console.error('❌ Archive not found for rollback');
      return false;
    }

    // Get parent specs directory
    const archiveRoot = path.dirname(archivePath);
    const specsDir = path.dirname(archiveRoot);

    // Read archive contents
    const archived = fs.readdirSync(archivePath, { withFileTypes: true });

    for (const entry of archived) {
      if (!entry.isDirectory()) continue;

      const folderName = entry.name;
      const archiveFolderPath = path.join(archivePath, folderName);
      const targetPath = path.join(specsDir, folderName);

      // Skip if folder already exists
      if (fs.existsSync(targetPath)) {
        console.log(`⏭️  Skipped (already exists): ${folderName}`);
        continue;
      }

      // Restore folder
      copyDirectory(archiveFolderPath, targetPath);
      console.log(`✅ Restored: ${folderName}`);
    }

    console.log('✅ Rollback completed');
    return true;
  } catch (error) {
    console.error('❌ Rollback failed:', error);
    return false;
  }
}
