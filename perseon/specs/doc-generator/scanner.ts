/**
 * Directory scanner for finding specification files
 */

import * as fs from "fs";
import * as path from "path";
import { SpecMetadata } from "./types";
import * as logger from "./logger";

const SPECS_DIR = path.join(process.cwd(), "specs");
const EXCLUDE_FOLDERS = ["doc-generator", "doc-generator-system"];

/**
 * Scans the specs directory and returns metadata about all spec folders
 */
export function scanSpecsDirectory(): SpecMetadata[] {
  const specs: SpecMetadata[] = [];

  try {
    // Read the specs directory
    const entries = fs.readdirSync(SPECS_DIR, { withFileTypes: true });

    // Filter for directories only
    const directories = entries.filter(
      (entry) =>
        entry.isDirectory() && !EXCLUDE_FOLDERS.includes(entry.name)
    );

    // Process each directory
    for (const dir of directories) {
      const dirPath = path.join(SPECS_DIR, dir.name);
      const spec = processSpecDirectory(dir.name, dirPath);
      if (spec) {
        specs.push(spec);
      }
    }
  } catch (error) {
    logger.error(`Error scanning specs directory: ${error}`);
  }

  return specs;
}

/**
 * Processes a single spec directory and extracts metadata
 */
function processSpecDirectory(
  name: string,
  dirPath: string
): SpecMetadata | null {
  try {
    const files = fs.readdirSync(dirPath);

    const requirementsFile = findFile(dirPath, files, [
      "requirements.md",
      "REQUIREMENTS.md",
    ]);
    const implementationFile = findFile(dirPath, files, [
      "implementation-plan.md",
      "IMPLEMENTATION_PLAN.md",
      "implementation.md",
      "IMPLEMENTATION.md",
    ]);

    // Find supplementary files (exclude requirements and implementation)
    const supplementaryFiles = files
      .filter((file) => {
        if (!file.endsWith(".md")) return false;
        const fileLower = file.toLowerCase();
        return (
          fileLower !== "requirements.md" &&
          fileLower !== "implementation-plan.md" &&
          fileLower !== "implementation.md"
        );
      })
      .map((file) => path.join(dirPath, file));

    const category = inferCategory(name);

    return {
      name,
      category,
      path: dirPath,
      requirementsFile,
      implementationFile,
      supplementaryFiles,
    };
  } catch (error) {
    logger.warn(`Could not process directory ${name}: ${error}`);
    return null;
  }
}

/**
 * Finds a file from a list of possible names (case-insensitive)
 */
function findFile(
  dirPath: string,
  files: string[],
  possibleNames: string[]
): string | undefined {
  for (const name of possibleNames) {
    const found = files.find(
      (file) => file.toLowerCase() === name.toLowerCase()
    );
    if (found) {
      return path.join(dirPath, found);
    }
  }
  return undefined;
}

/**
 * Infers the category from the folder name
 */
function inferCategory(folderName: string): string {
  const name = folderName.toLowerCase();

  if (name.includes("github") || name.includes("git")) {
    return "GitHub Integration";
  }
  if (
    name.includes("community") ||
    name.includes("feedback") ||
    name.includes("activity")
  ) {
    return "Community Features";
  }
  if (name.includes("project") || name.includes("kanban")) {
    return "Project Management";
  }
  if (
    name.includes("analytics") ||
    name.includes("monitoring") ||
    name.includes("dashboard")
  ) {
    return "Analytics & Monitoring";
  }
  if (
    name.includes("ux") ||
    name.includes("ui") ||
    name.includes("enhancement") ||
    name.includes("tooltip") ||
    name.includes("error")
  ) {
    return "UX Enhancements";
  }
  if (
    name.includes("performance") ||
    name.includes("optimization") ||
    name.includes("cache")
  ) {
    return "Performance";
  }
  if (
    name.includes("learning") ||
    name.includes("tutorial") ||
    name.includes("doc")
  ) {
    return "Learning Resources";
  }
  if (
    name.includes("auth") ||
    name.includes("workspace") ||
    name.includes("database") ||
    name.includes("foundation")
  ) {
    return "Foundation";
  }
  if (name.includes("command") || name.includes("cli")) {
    return "Developer Tools";
  }
  if (name.includes("notification") || name.includes("email")) {
    return "Notifications";
  }

  return "Other";
}

/**
 * Organizes specs by category
 */
export function organizeByCategory(
  specs: SpecMetadata[]
): Map<string, SpecMetadata[]> {
  const organized = new Map<string, SpecMetadata[]>();

  for (const spec of specs) {
    const category = spec.category;
    if (!organized.has(category)) {
      organized.set(category, []);
    }
    organized.get(category)!.push(spec);
  }

  return organized;
}
