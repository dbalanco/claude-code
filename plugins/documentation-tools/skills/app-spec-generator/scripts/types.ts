/**
 * TypeScript interfaces for the Documentation Generator System
 */

/**
 * Metadata about a spec folder
 */
export interface SpecMetadata {
  name: string;                 // Folder name
  category: string;             // Feature category
  path: string;                 // Absolute path to folder
  requirementsFile?: string;    // Path to requirements.md
  implementationFile?: string;  // Path to implementation-plan.md
  supplementaryFiles: string[]; // Other markdown files
}

/**
 * Parsed feature data from a spec
 */
export interface FeatureData {
  title: string;                        // Feature title
  description: string;                  // Feature description
  status: 'completed' | 'in_progress' | 'planned' | 'not_started';
  category: string;                     // Feature category
  completionPercentage: number;         // 0-100
  tasksTotal: number;                   // Total checkboxes
  tasksCompleted: number;               // Completed checkboxes
  effortEstimate?: string;              // e.g., "3-4 days"
  targetDate?: string;                  // e.g., "Sprint 3", "2025-Q1"
  priority?: 'critical' | 'high' | 'medium' | 'low';
  implementationPlanLink: string;       // Relative path to implementation plan
  features: string[];                   // List of sub-features
}

/**
 * Result of the document generation process
 */
export interface GenerationResult {
  success: boolean;                     // Overall success
  featuresCount: number;                // Total features processed
  completionPercentage: number;         // Overall completion (0-100)
  completed: number;                    // Completed features
  inProgress: number;                   // In-progress features
  planned: number;                      // Planned features
  categories: { [key: string]: number }; // Features per category
  timestamp: string;                    // ISO timestamp
  archivePath?: string;                 // Path to archive folder
  foldersArchived: number;              // Number of folders archived
  foldersRemoved: number;               // Number of folders removed
  cleanupSucceeded: boolean;            // Whether cleanup was successful
  rollbackPerformed: boolean;           // Whether rollback was performed
  error?: string;                       // Error message if failed
}

/**
 * Configuration options for the doc generator
 */
export interface DocGeneratorConfig {
  specsDirectory: string;               // Path to specs directory
  outputFile: string;                   // Path to output file
  categories: string[];                 // List of valid categories
  excludeFolders: string[];             // Folders to exclude from scanning
  statusIndicators: {
    completed: string;
    inProgress: string;
    planned: string;
    notStarted: string;
  };
  verbose: boolean;                     // Enable verbose logging
}
