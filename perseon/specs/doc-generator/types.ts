/**
 * Type definitions for the Documentation Generator System
 */

/**
 * Metadata about a specification folder
 */
export interface SpecMetadata {
  name: string; // Folder name
  category: string; // Feature category
  path: string; // Absolute path to folder
  requirementsFile?: string; // Path to requirements.md
  implementationFile?: string; // Path to implementation-plan.md
  supplementaryFiles: string[]; // Other .md files
}

/**
 * Parsed feature data from a specification
 */
export interface FeatureData {
  title: string; // Feature title
  description: string; // Feature description
  status: "completed" | "in_progress" | "planned" | "not_started"; // Implementation status
  category: string; // Feature category
  completionPercentage: number; // % of tasks completed (0-100)
  tasksTotal: number; // Total number of tasks/checkboxes
  tasksCompleted: number; // Number of completed tasks
  effortEstimate?: string; // Estimated effort (e.g., "3-4 days")
  targetDate?: string; // Target completion date
  priority?: "critical" | "high" | "medium" | "low"; // Priority level
  implementationPlanLink: string; // Relative path to implementation plan
  features: string[]; // List of sub-features/capabilities
}

/**
 * Result of the documentation generation process
 */
export interface GenerationResult {
  success: boolean; // Whether generation succeeded
  featuresCount: number; // Total number of features processed
  completionPercentage: number; // Overall completion %
  completed: number; // Number of completed features
  inProgress: number; // Number of in-progress features
  planned: number; // Number of planned features
  categories: { [key: string]: number }; // Feature count by category
  timestamp: string; // ISO timestamp of generation
  error?: string; // Error message if success is false
}

/**
 * Category information with progress metrics
 */
export interface CategoryProgress {
  name: string;
  completionPercentage: number;
  completed: number;
  inProgress: number;
  planned: number;
  total: number;
}

/**
 * Technology stack item
 */
export interface TechStackItem {
  name: string;
  version: string;
  category: string;
}

/**
 * Database model information
 */
export interface DatabaseModel {
  name: string;
  fields: string[];
  relationships: string[];
  domain: string;
}
