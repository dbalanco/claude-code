#!/usr/bin/env tsx

/**
 * CLI script to update the app-specs.md document
 */

import { updateAppSpecs, formatResult } from "./index";

async function main() {
  console.log("📚 Updating app-specs.md...\n");

  const startTime = Date.now();

  try {
    const result = await updateAppSpecs();

    const duration = ((Date.now() - startTime) / 1000).toFixed(1);

    if (result.success) {
      console.log(formatResult(result));
      console.log(`⏱️  Done in ${duration}s\n`);
      process.exit(0);
    } else {
      console.error(`\n❌ Error: ${result.error}\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error("\n❌ Unexpected error:", error);
    process.exit(1);
  }
}

// Handle uncaught errors
process.on("unhandledRejection", (error) => {
  console.error("\n❌ Unhandled error:", error);
  process.exit(1);
});

// Run main function
main();
