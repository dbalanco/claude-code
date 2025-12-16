#!/usr/bin/env node

/**
 * CLI runner script for updating app-specs.md
 *
 * Usage:
 *   tsx perseon/specs/doc-generator/update.ts [--cleanup]
 *
 * Options:
 *   --cleanup  Archive and remove spec folders after generation
 */

import { updateAppSpecs } from './index';

async function main() {
  // Check for cleanup flag
  const args = process.argv.slice(2);
  const performCleanup = args.includes('--cleanup');

  if (performCleanup) {
    console.log('⚠️  CLEANUP MODE ENABLED');
    console.log('⚠️  Spec folders will be archived and removed after generation\n');
  }

  try {
    // Run the documentation generator
    const result = await updateAppSpecs(undefined, performCleanup);

    // Display results
    if (result.success) {
      console.log('═══════════════════════════════════════════════════════');
      console.log('✅ Updated app-specs.md successfully!');
      console.log('═══════════════════════════════════════════════════════\n');

      console.log('📊 Summary:');
      console.log(`   • ${result.featuresCount} features processed`);
      console.log(`   • ${result.completionPercentage}% overall completion`);
      console.log(`   • ${result.completed} completed, ${result.inProgress} in progress, ${result.planned} planned`);
      console.log(`   • ${Object.keys(result.categories).length} categories tracked\n`);

      if (performCleanup) {
        console.log('📦 Cleanup Summary:');
        console.log(`   • Archive: ${result.archivePath}`);
        console.log(`   • ${result.foldersArchived} folders archived`);
        console.log(`   • ${result.foldersRemoved} folders removed`);
        console.log(`   • Cleanup ${result.cleanupSucceeded ? 'succeeded ✅' : 'had issues ⚠️'}`);
        if (result.rollbackPerformed) {
          console.log(`   • Rollback was performed 🔄`);
        }
        console.log('');
      }

      console.log('📄 Output: perseon/specs/app-specs.md\n');

      process.exit(0);
    } else {
      console.error('═══════════════════════════════════════════════════════');
      console.error('❌ Error updating app-specs.md');
      console.error('═══════════════════════════════════════════════════════\n');

      if (result.error) {
        console.error(`Error: ${result.error}\n`);
      }

      if (result.archivePath) {
        console.error(`Archive location: ${result.archivePath}`);
        console.error('You can manually restore from the archive if needed.\n');
      }

      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled rejection:', error);
  process.exit(1);
});

// Run main function
main();
