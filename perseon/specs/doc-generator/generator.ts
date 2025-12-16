/**
 * Document generator for creating the app-specs.md file
 */

import * as fs from "fs";
import * as path from "path";
import { FeatureData, CategoryProgress, GenerationResult } from "./types";
import * as logger from "./logger";

/**
 * Generates the complete app-specs.md document
 */
export function generateAppSpecs(features: FeatureData[]): string {
  const sections: string[] = [];

  // Calculate statistics
  const stats = calculateStatistics(features);

  // Generate each section
  sections.push(generateHeader(stats));
  sections.push(generateStatusDashboard(features));
  sections.push(generateTableOfContents());
  sections.push(generateOverview());
  sections.push(generateFeaturesByStatus(features, "completed"));
  sections.push(generateFeaturesByStatus(features, "in_progress"));
  sections.push(generateFeaturesByStatus(features, "planned"));
  sections.push(generateTechStack());
  sections.push(generateDatabaseSchema());
  sections.push(generateDetailedFeatures(features));
  sections.push(generateFooter());

  return sections.join("\n\n---\n\n");
}

/**
 * Calculates overall statistics from features
 */
function calculateStatistics(features: FeatureData[]): {
  total: number;
  completed: number;
  inProgress: number;
  planned: number;
  overallCompletion: number;
} {
  const completed = features.filter((f) => f.status === "completed").length;
  const inProgress = features.filter((f) => f.status === "in_progress").length;
  const planned = features.filter(
    (f) => f.status === "planned" || f.status === "not_started"
  ).length;

  // Calculate weighted completion percentage
  const totalTasks = features.reduce((sum, f) => sum + f.tasksTotal, 0);
  const completedTasks = features.reduce((sum, f) => sum + f.tasksCompleted, 0);
  const overallCompletion =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    total: features.length,
    completed,
    inProgress,
    planned,
    overallCompletion,
  };
}

/**
 * Generates the header section
 */
function generateHeader(stats: {
  total: number;
  completed: number;
  inProgress: number;
  planned: number;
  overallCompletion: number;
}): string {
  const timestamp = new Date().toISOString().split("T")[0];

  return `# Perseon V2 - Application Specifications

> **Last Updated:** ${timestamp}
> **Overall Completion:** ${stats.overallCompletion}% (${stats.completed} completed, ${stats.inProgress} in progress, ${stats.planned} planned)
> **Total Features:** ${stats.total}`;
}

/**
 * Generates the status dashboard
 */
function generateStatusDashboard(features: FeatureData[]): string {
  const categoryProgress = calculateCategoryProgress(features);

  let output = "## 📊 Implementation Status Dashboard\n\n";
  output +=
    "| Category | Progress | Completed | In Progress | Planned | Total |\n";
  output +=
    "|----------|----------|-----------|-------------|---------|-------|\n";

  for (const [category, progress] of categoryProgress.entries()) {
    const progressBar = createProgressBar(progress.completionPercentage);
    output += `| ${category} | ${progressBar} ${progress.completionPercentage}% | ${progress.completed} | ${progress.inProgress} | ${progress.planned} | ${progress.total} |\n`;
  }

  return output;
}

/**
 * Calculates progress metrics by category
 */
function calculateCategoryProgress(
  features: FeatureData[]
): Map<string, CategoryProgress> {
  const categories = new Map<string, CategoryProgress>();

  for (const feature of features) {
    if (!categories.has(feature.category)) {
      categories.set(feature.category, {
        name: feature.category,
        completionPercentage: 0,
        completed: 0,
        inProgress: 0,
        planned: 0,
        total: 0,
      });
    }

    const cat = categories.get(feature.category)!;
    cat.total++;

    if (feature.status === "completed") cat.completed++;
    if (feature.status === "in_progress") cat.inProgress++;
    if (feature.status === "planned" || feature.status === "not_started")
      cat.planned++;
  }

  // Calculate completion percentage for each category
  for (const [_, cat] of categories) {
    const categoryFeatures = features.filter((f) => f.category === cat.name);
    const totalTasks = categoryFeatures.reduce((sum, f) => sum + f.tasksTotal, 0);
    const completedTasks = categoryFeatures.reduce(
      (sum, f) => sum + f.tasksCompleted,
      0
    );
    cat.completionPercentage =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  }

  return categories;
}

/**
 * Creates an ASCII progress bar
 */
function createProgressBar(percentage: number): string {
  const filled = Math.floor(percentage / 10);
  const empty = 10 - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

/**
 * Generates table of contents
 */
function generateTableOfContents(): string {
  return `## Table of Contents

1. [Implementation Status Dashboard](#-implementation-status-dashboard)
2. [Overview](#overview)
3. [Completed Features](#-completed-features)
4. [Features in Progress](#-features-in-progress)
5. [Planned Features](#-planned-features)
6. [Technology Stack](#technology-stack)
7. [Database Schema](#database-schema)
8. [Detailed Feature Specifications](#detailed-feature-specifications)`;
}

/**
 * Generates overview section
 */
function generateOverview(): string {
  return `## Overview

**Perseon V2** (powered by HagenKit) is a production-ready SaaS boilerplate built on Next.js 16 with comprehensive multi-tenant workspace management, GitHub integration, and community feedback features.

### Key Capabilities

- **Multi-Tenant Architecture:** Workspace-based isolation with role-based access control
- **GitHub Integration:** OAuth authentication, repository sync, webhook handling, and Actions monitoring
- **Project Management:** Kanban boards with issue tracking and team collaboration
- **Community Features:** Feature requests, bug reports, upvoting, and commenting systems
- **Authentication:** Better Auth with email/password, magic links, Google, and GitHub OAuth
- **Billing Integration:** Optional Polar integration for subscription management
- **Email System:** React Email templates with configurable providers (Resend, SMTP, SendGrid, Mailgun)
- **Developer Experience:** Enhanced error handling, contextual tooltips, and comprehensive documentation

### Target Users

- **SaaS Founders:** Looking for a battle-tested starting point
- **Development Teams:** Need a robust foundation for client projects
- **Indie Hackers:** Want to ship quickly without sacrificing quality
- **Enterprise Teams:** Require multi-tenancy and security out of the box`;
}

/**
 * Generates feature list by status
 */
function generateFeaturesByStatus(
  features: FeatureData[],
  status: "completed" | "in_progress" | "planned"
): string {
  const statusEmoji = {
    completed: "✅",
    in_progress: "🟡",
    planned: "⏳",
  };

  const statusLabel = {
    completed: "Completed Features",
    in_progress: "Features in Progress",
    planned: "Planned Features",
  };

  const filtered = features.filter((f) =>
    status === "planned"
      ? f.status === "planned" || f.status === "not_started"
      : f.status === status
  );

  if (filtered.length === 0) {
    return `## ${statusEmoji[status]} ${statusLabel[status]}

No features in this status.`;
  }

  // Group by category
  const byCategory = new Map<string, FeatureData[]>();
  for (const feature of filtered) {
    if (!byCategory.has(feature.category)) {
      byCategory.set(feature.category, []);
    }
    byCategory.get(feature.category)!.push(feature);
  }

  let output = `## ${statusEmoji[status]} ${statusLabel[status]}\n\n`;
  output += `**Total:** ${filtered.length} feature${filtered.length !== 1 ? "s" : ""}\n\n`;

  for (const [category, categoryFeatures] of byCategory) {
    output += `### ${category}\n\n`;

    for (const feature of categoryFeatures) {
      const checkbox = status === "completed" ? "[x]" : "[ ]";
      output += `- ${checkbox} **${feature.title}**`;

      if (status === "in_progress" && feature.completionPercentage > 0) {
        output += ` (${feature.completionPercentage}% complete)`;
      }

      if (feature.description) {
        output += `\n  - ${feature.description}`;
      }

      if (feature.implementationPlanLink) {
        output += `\n  - [View Implementation Plan](${feature.implementationPlanLink})`;
      }

      if (status === "in_progress" && feature.tasksTotal > 0) {
        output += `\n  - Progress: ${feature.tasksCompleted}/${feature.tasksTotal} tasks completed`;
      }

      if (status === "planned" && feature.effortEstimate) {
        output += `\n  - Estimated Effort: ${feature.effortEstimate}`;
      }

      output += "\n\n";
    }
  }

  return output;
}

/**
 * Generates technology stack section
 */
function generateTechStack(): string {
  try {
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    return `## Technology Stack

### Core Framework
- **Next.js** ${deps["next"] || ""} - React framework with App Router
- **React** ${deps["react"] || ""} - UI library
- **TypeScript** ${deps["typescript"] || ""} - Type safety

### Backend & Database
- **Prisma** ${deps["@prisma/client"] || ""} - ORM for PostgreSQL
- **PostgreSQL** - Primary database
- **@prisma/adapter-pg** ${deps["@prisma/adapter-pg"] || ""} - Direct TCP connections

### Authentication
- **Better Auth** ${deps["better-auth"] || ""} - Authentication framework
- OAuth providers: Google, GitHub
- Magic links and email/password auth

### UI & Styling
- **Tailwind CSS** ${deps["tailwindcss"] || ""} - Utility-first CSS
- **Shadcn UI** - Component library
- **Radix UI** ${deps["@radix-ui/react-avatar"] || ""} - Headless UI primitives
- **Lucide React** ${deps["lucide-react"] || ""} - Icon library

### Email & Notifications
- **React Email** ${deps["react-email"] || ""} - Email templates
- **Resend** ${deps["resend"] || ""} - Email delivery

### Development Tools
- **Turbopack** - Fast bundler
- **ESLint** ${deps["eslint"] || ""} - Code linting
- **ts-node** ${deps["ts-node"] || ""} - TypeScript execution

### Security
- **Zod** ${deps["zod"] || ""} - Runtime validation
- **AES-256-GCM** - Token encryption

### Optional Integrations
- **Polar** - Billing and subscriptions (feature-flagged)
- **Redis** - Caching (optional)`;
  } catch (error) {
    logger.warn(`Could not generate tech stack: ${error}`);
    return "## Technology Stack\n\n*Could not extract technology stack information.*";
  }
}

/**
 * Generates database schema section
 */
function generateDatabaseSchema(): string {
  try {
    const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");
    const schema = fs.readFileSync(schemaPath, "utf-8");

    const models = parseModels(schema);
    const grouped = groupModelsByDomain(models);

    let output = "## Database Schema\n\n";
    output += `**Total Models:** ${models.length}\n\n`;

    for (const [domain, domainModels] of grouped.entries()) {
      output += `### ${domain}\n\n`;
      for (const model of domainModels) {
        output += `- **${model}**\n`;
      }
      output += "\n";
    }

    return output;
  } catch (error) {
    logger.warn(`Could not generate database schema: ${error}`);
    return "## Database Schema\n\n*Could not extract database schema information.*";
  }
}

/**
 * Parses model names from Prisma schema
 */
function parseModels(schema: string): string[] {
  const modelRegex = /model\s+(\w+)\s*\{/g;
  const models: string[] = [];
  let match;

  while ((match = modelRegex.exec(schema)) !== null) {
    models.push(match[1]);
  }

  return models;
}

/**
 * Groups models by domain
 */
function groupModelsByDomain(models: string[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();

  for (const model of models) {
    const domain = inferModelDomain(model);
    if (!groups.has(domain)) {
      groups.set(domain, []);
    }
    groups.get(domain)!.push(model);
  }

  return groups;
}

/**
 * Infers the domain of a model from its name
 */
function inferModelDomain(modelName: string): string {
  const name = modelName.toLowerCase();

  if (
    name.includes("user") ||
    name.includes("session") ||
    name.includes("account") ||
    name.includes("verification")
  ) {
    return "User Management";
  }
  if (name.includes("workspace") || name.includes("invitation")) {
    return "Workspace & Teams";
  }
  if (
    name.includes("project") &&
    !name.includes("github") &&
    !name.includes("workspace")
  ) {
    return "Projects";
  }
  if (name.includes("issue") && !name.includes("github")) {
    return "Issue Tracking";
  }
  if (name.includes("github") || name.includes("git")) {
    return "GitHub Integration";
  }
  if (
    name.includes("feature") ||
    name.includes("bug") ||
    name.includes("upvote") ||
    name.includes("comment")
  ) {
    return "Community Features";
  }
  if (name.includes("activity") || name.includes("notification")) {
    return "Activity & Notifications";
  }
  if (name.includes("email") || name.includes("polar")) {
    return "Configuration";
  }

  return "Other";
}

/**
 * Generates detailed feature specifications
 */
function generateDetailedFeatures(features: FeatureData[]): string {
  let output = "## Detailed Feature Specifications\n\n";

  // Group by category
  const byCategory = new Map<string, FeatureData[]>();
  for (const feature of features) {
    if (!byCategory.has(feature.category)) {
      byCategory.set(feature.category, []);
    }
    byCategory.get(feature.category)!.push(feature);
  }

  let sectionNum = 1;
  for (const [category, categoryFeatures] of byCategory) {
    output += `### ${sectionNum}. ${category}\n\n`;

    for (const feature of categoryFeatures) {
      const statusEmoji = {
        completed: "✅",
        in_progress: "🟡",
        planned: "⏳",
        not_started: "❌",
      };

      output += `#### ${feature.title} ${statusEmoji[feature.status]}\n\n`;

      if (feature.description) {
        output += `${feature.description}\n\n`;
      }

      output += `**Status:** ${feature.status.replace("_", " ")} (${feature.completionPercentage}% complete)\n\n`;

      if (feature.implementationPlanLink) {
        output += `[View Full Implementation Plan](${feature.implementationPlanLink})\n\n`;
      }

      if (feature.features.length > 0) {
        output += `**Key Features:**\n`;
        for (const subFeature of feature.features.slice(0, 10)) {
          output += `- ${subFeature}\n`;
        }
        output += "\n";
      }
    }

    sectionNum++;
  }

  return output;
}

/**
 * Generates footer
 */
function generateFooter(): string {
  return `## Appendix

### How to Update This Document

This document is automatically generated by the documentation generator system. To update it:

1. **Via Slash Command:** Type \`/update-specs\` in Claude Code
2. **Via CLI:** Run \`pnpm update-specs\` or \`ts-node specs/doc-generator/update.ts\`

The generator scans all specification folders in \`/specs/\` and aggregates their content.

### Links

- [Project Repository](https://github.com/your-org/perseon-v2)
- [Documentation](./README.md)

---

*This document is auto-generated by the \`/update-specs\` command. Last generated: ${new Date().toISOString()}*`;
}
