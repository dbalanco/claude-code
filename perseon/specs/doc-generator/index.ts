/**
 * Main orchestrator for the documentation generator system
 */

import * as fs from "fs";
import * as path from "path";
import { scanSpecsDirectory } from "./scanner";
import { parseSpecification } from "./parser";
import { generateAppSpecs } from "./generator";
import { GenerationResult, FeatureData } from "./types";
import * as logger from "./logger";

const OUTPUT_FILE = path.join(process.cwd(), "specs", "app-specs.md");

/**
 * Main function to update the app-specs.md document
 */
export async function updateAppSpecs(): Promise<GenerationResult> {
  try {
    logger.section("🔍 Scanning specs directory...");

    // Step 1: Scan specs directory
    const specs = scanSpecsDirectory();
    logger.success(`Found ${specs.length} spec folders`);

    // Step 2: Parse each spec
    logger.section("\n📖 Parsing implementation plans...");
    const features: FeatureData[] = [];

    for (const spec of specs) {
      try {
        const feature = parseSpecification(
          spec.name,
          spec.category,
          spec.requirementsFile,
          spec.implementationFile
        );
        features.push(feature);

        const statusEmoji = {
          completed: "✅",
          in_progress: "🟡",
          planned: "⏳",
          not_started: "❌",
        };

        logger.log(
          `   ${statusEmoji[feature.status]} ${spec.name} (${feature.completionPercentage}% complete)`
        );
      } catch (error) {
        logger.warn(`Could not parse ${spec.name}: ${error}`);
      }
    }

    // Step 3: Calculate statistics
    logger.section("\n📊 Calculating statistics...");
    const completed = features.filter((f) => f.status === "completed").length;
    const inProgress = features.filter(
      (f) => f.status === "in_progress"
    ).length;
    const planned = features.filter(
      (f) => f.status === "planned" || f.status === "not_started"
    ).length;

    const totalTasks = features.reduce((sum, f) => sum + f.tasksTotal, 0);
    const completedTasks = features.reduce(
      (sum, f) => sum + f.tasksCompleted,
      0
    );
    const overallCompletion =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Count features by category
    const categories: { [key: string]: number } = {};
    for (const feature of features) {
      categories[feature.category] = (categories[feature.category] || 0) + 1;
    }

    logger.success(`${features.length} features processed`);
    logger.success(`${completed} completed, ${inProgress} in progress, ${planned} planned`);
    logger.success(`Overall completion: ${overallCompletion}%`);

    // Step 4: Generate markdown document
    logger.section("\n📝 Generating app-specs.md...");
    const markdown = generateAppSpecs(features);

    // Step 5: Write to file (atomic write)
    const tempFile = OUTPUT_FILE + ".tmp";
    fs.writeFileSync(tempFile, markdown, "utf-8");
    fs.renameSync(tempFile, OUTPUT_FILE);

    logger.success("Document generated successfully");

    // Step 6: Return result
    const result: GenerationResult = {
      success: true,
      featuresCount: features.length,
      completionPercentage: overallCompletion,
      completed,
      inProgress,
      planned,
      categories,
      timestamp: new Date().toISOString(),
    };

    return result;
  } catch (error) {
    logger.error(`Error generating documentation: ${error}`);

    return {
      success: false,
      featuresCount: 0,
      completionPercentage: 0,
      completed: 0,
      inProgress: 0,
      planned: 0,
      categories: {},
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Formats the generation result for display
 */
export function formatResult(result: GenerationResult): string {
  if (!result.success) {
    return `❌ Error: ${result.error}`;
  }

  return `
✅ Updated app-specs.md:
   - ${result.featuresCount} features processed
   - ${result.completionPercentage}% overall completion
   - ${result.completed} completed, ${result.inProgress} in progress, ${result.planned} planned
   - ${Object.keys(result.categories).length} categories tracked

📄 File: ${OUTPUT_FILE}
`;
}
