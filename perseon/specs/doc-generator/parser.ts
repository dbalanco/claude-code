/**
 * Markdown parser for extracting feature data from specification files
 */

import * as fs from "fs";
import { FeatureData } from "./types";
import * as logger from "./logger";

/**
 * Parses a requirements file and extracts title and description
 */
export function parseRequirements(filePath: string): {
  title: string;
  description: string;
} {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : "Untitled Feature";

    // Extract description (text under ## Overview or first paragraph)
    let description = "";
    const overviewMatch = content.match(
      /##\s+Overview\s*\n\n([\s\S]+?)(?=\n##|\n\n##|$)/i
    );
    if (overviewMatch) {
      description = overviewMatch[1].trim().split("\n\n")[0];
    } else {
      // Fallback: get first paragraph after title
      const paragraphMatch = content.match(/^#.+\n\n(.+?)(?=\n\n|$)/s);
      if (paragraphMatch) {
        description = paragraphMatch[1].trim();
      }
    }

    return { title, description };
  } catch (error) {
    logger.warn(`Could not parse requirements file ${filePath}`);
    return { title: "Unknown Feature", description: "" };
  }
}

/**
 * Parses an implementation plan file and extracts completion data
 */
export function parseImplementationPlan(filePath: string): {
  completionPercentage: number;
  tasksTotal: number;
  tasksCompleted: number;
  effortEstimate?: string;
  targetDate?: string;
  priority?: "critical" | "high" | "medium" | "low";
  status: "completed" | "in_progress" | "planned" | "not_started";
} {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Count checkboxes
    const { total, completed } = countCheckboxes(content);

    // Calculate completion percentage
    const completionPercentage =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    // Determine status
    let status: "completed" | "in_progress" | "planned" | "not_started" =
      "not_started";
    if (completionPercentage === 100) {
      status = "completed";
    } else if (completionPercentage > 0) {
      status = "in_progress";
    } else if (content.includes("⏳") || content.toLowerCase().includes("planned")) {
      status = "planned";
    }

    // Extract metadata
    const effortEstimate = extractEffortEstimate(content);
    const targetDate = extractTargetDate(content);
    const priority = extractPriority(content);

    return {
      completionPercentage,
      tasksTotal: total,
      tasksCompleted: completed,
      effortEstimate,
      targetDate,
      priority,
      status,
    };
  } catch (error) {
    logger.warn(`Could not parse implementation plan ${filePath}: ${error}`);
    return {
      completionPercentage: 0,
      tasksTotal: 0,
      tasksCompleted: 0,
      status: "not_started",
    };
  }
}

/**
 * Counts total and completed checkboxes in markdown content
 */
function countCheckboxes(content: string): {
  total: number;
  completed: number;
} {
  // Match both [ ] and [x] checkboxes (case insensitive)
  const allCheckboxes = content.match(/- \[([ xX])\]/g) || [];
  const completedCheckboxes =
    content.match(/- \[[xX]\]/g) || [];

  return {
    total: allCheckboxes.length,
    completed: completedCheckboxes.length,
  };
}

/**
 * Extracts effort estimate from content
 */
function extractEffortEstimate(content: string): string | undefined {
  // Look for patterns like "3-4 days", "2 weeks", "Estimated Effort: X days"
  const patterns = [
    /Estimated\s+(?:Total\s+)?Effort[:\s]+(.+?)(?=\n|$)/i,
    /(?:Duration|Timeline)[:\s]+(.+?)(?=\n|$)/i,
    /(\d+[-–]\d+\s+days?)/i,
    /(\d+\s+(?:day|week|month)s?)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Extracts target date from content
 */
function extractTargetDate(content: string): string | undefined {
  // Look for patterns like "Target: Q1 2024", "Sprint 3", "December 2024"
  const patterns = [
    /Target[:\s]+(.+?)(?=\n|$)/i,
    /Sprint[:\s]+(\d+)/i,
    /(?:Due|Deadline)[:\s]+(.+?)(?=\n|$)/i,
  ];

  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match) {
      return match[1].trim();
    }
  }

  return undefined;
}

/**
 * Extracts priority from content
 */
function extractPriority(
  content: string
): "critical" | "high" | "medium" | "low" | undefined {
  const priorityMatch = content.match(/Priority[:\s]+(critical|high|medium|low)/i);
  if (priorityMatch) {
    return priorityMatch[1].toLowerCase() as
      | "critical"
      | "high"
      | "medium"
      | "low";
  }

  // Check for priority indicators
  if (content.toLowerCase().includes("critical") || content.includes("🚨")) {
    return "critical";
  }
  if (content.toLowerCase().includes("high priority")) {
    return "high";
  }

  return undefined;
}

/**
 * Extracts list of features from content
 */
export function extractFeatureList(content: string): string[] {
  const features: string[] = [];

  // Look for lists of features (bullet points)
  const lines = content.split("\n");
  for (const line of lines) {
    // Match lines that start with - or * followed by a feature description
    const match = line.match(/^[\s-]*[\-\*]\s+(?:\[[ xX]\]\s+)?(.+)$/);
    if (match && match[1]) {
      const feature = match[1].trim();
      // Filter out empty or very short items
      if (feature.length > 5 && !feature.startsWith("##")) {
        features.push(feature);
      }
    }
  }

  // Limit to first 20 features to avoid overwhelming the output
  return features.slice(0, 20);
}

/**
 * Parses a complete specification and returns FeatureData
 */
export function parseSpecification(
  name: string,
  category: string,
  requirementsFile?: string,
  implementationFile?: string
): FeatureData {
  // Parse requirements
  let title = name;
  let description = "";
  if (requirementsFile) {
    const reqData = parseRequirements(requirementsFile);
    title = reqData.title;
    description = reqData.description;
  }

  // Parse implementation plan
  let planData = {
    completionPercentage: 0,
    tasksTotal: 0,
    tasksCompleted: 0,
    status: "not_started" as const,
  };
  let features: string[] = [];

  if (implementationFile) {
    planData = parseImplementationPlan(implementationFile);
    const content = fs.readFileSync(implementationFile, "utf-8");
    features = extractFeatureList(content);
  }

  // Create relative link to implementation plan
  const implementationPlanLink = implementationFile
    ? `./specs/${name}/implementation-plan.md`
    : "";

  return {
    title,
    description,
    category,
    status: planData.status,
    completionPercentage: planData.completionPercentage,
    tasksTotal: planData.tasksTotal,
    tasksCompleted: planData.tasksCompleted,
    effortEstimate: planData.effortEstimate,
    targetDate: planData.targetDate,
    priority: planData.priority,
    implementationPlanLink,
    features,
  };
}
