---
name: app-spec-generator
description: This skill should be used when the user asks to "update app specs", "generate documentation", "track feature progress", "create status dashboard", "consolidate spec files", or mentions updating project documentation after completing features. Automatically scans feature specifications, tracks implementation progress via checkboxes, and generates comprehensive app-specs.md documents with progress dashboards by category.
version: 1.0.0
---

# App Spec Generator

## Overview

Automatically scan feature specification folders, parse implementation plans, calculate completion percentages from markdown checkboxes, and generate comprehensive `app-specs.md` documentation with progress tracking, categorization, and status dashboards.

This skill transforms scattered feature specifications into a single source of truth with visual progress indicators, making it easy to track project completion and share status with stakeholders.

## Core Capabilities

### 1. Scanning & Parsing

Recursively scan project spec directories to:
- Find `requirements.md` and `implementation-plan.md` files
- Extract titles, descriptions, and metadata from markdown
- Count checkboxes (`[x]` vs `[ ]`) to calculate completion percentages
- Infer categories from folder names (GitHub, UX, Performance, etc.)
- Identify supplementary documentation

### 2. Progress Tracking

Analyze implementation status across all features:
- Calculate per-feature completion percentages from checkboxes
- Determine overall project completion metrics
- Track features by status: ✅ Completed, 🟡 In Progress, ⏳ Planned
- Generate category-wise progress breakdowns
- Extract effort estimates and target dates when available

### 3. Documentation Generation

Create structured `app-specs.md` with these sections:
- **Status Dashboard** - Progress table organized by category
- **Table of Contents** - Quick navigation to all sections
- **Feature Lists** - Grouped by status (completed, in-progress, planned)
- **Tech Stack** - Dependencies extracted from package.json
- **Database Schema** - Models extracted from Prisma schema
- **Detailed Specs** - Per-feature breakdowns with implementation links

### 4. Archive & Cleanup (Optional)

Safely consolidate documentation with these safety features:
- Archive all spec folders to timestamped directory before any changes
- Validate archive completeness before cleanup proceeds
- Remove original spec folders only after verification
- Create symlink to latest archive for easy access
- Automatic rollback if cleanup fails

## Quick Start

### Using the Slash Command

The recommended way to use this skill:

```
/update-specs
```

This scans spec folders in `/specs/`, generates `app-specs.md`, and leaves original folders intact (non-destructive mode).

### Direct Script Execution

Run the TypeScript script manually:

```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts
```

### With Cleanup Mode (Destructive)

⚠️ **Warning:** Archives and removes spec folders after generation.

```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts --cleanup
```

Use cleanup mode only when consolidating all documentation into the single `app-specs.md` file.

## Expected Directory Structure

The generator expects this structure:

```
project-root/
├── perseon/
│   └── specs/
│       ├── feature-1/
│       │   ├── requirements.md
│       │   └── implementation-plan.md
│       ├── feature-2/
│       │   ├── requirements.md
│       │   └── implementation-plan.md
│       └── app-specs.md          ← Generated output
├── package.json                   ← Optional: for tech stack
└── prisma/
    └── schema.prisma              ← Optional: for database schema
```

## Categories

Features are automatically categorized based on folder names:

| Category | Folder Keywords |
|----------|----------------|
| **Foundation** | auth, workspace, database |
| **GitHub Integration** | github, git |
| **Project Management** | project, kanban, issue |
| **Community Features** | community, feature-request, upvote |
| **Analytics & Monitoring** | analytics, monitor, dashboard |
| **UX Enhancements** | ux, ui, enhancement, dark-mode |
| **Performance** | performance, optimization, cache |
| **Learning Resources** | tutorial, learning, guide |
| **Developer Tools** | cli, command, tool, generator |
| **Notifications** | notification, email, alert |
| **Other** | default for unmatched folders |

## Status Recognition

The parser recognizes these status indicators in markdown:

- ✅ **Completed** - 100% checkboxes completed or `✅` emoji in title
- 🟡 **In Progress** - Some checkboxes completed or `🟡` emoji
- ⏳ **Planned** - No checkboxes completed or `⏳` emoji
- ❌ **Not Started** - No content or `❌` emoji

Checkbox format must be: `- [x]` (completed) or `- [ ]` (pending) with space between `-` and `[`.

## Workflow

When a user asks to update specs or generate documentation:

1. **Verify prerequisites**: Check that `tsx` is installed globally
2. **Confirm spec directory**: Verify `/specs/` exists or ask for custom path
3. **Run scanner**: Execute the update script (non-destructive by default)
4. **Show summary**: Display features processed, completion percentage, status breakdown
5. **Cleanup (optional)**: Only if user explicitly requests archival and removal

### Default Mode (Non-Destructive)

```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts
```

Generates or updates `app-specs.md` without modifying spec folders.

### Cleanup Mode (Destructive)

Ask user for explicit confirmation before running:

```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts --cleanup
```

Explain that this will:
- Archive all spec folders to `/specs/.archive/[timestamp]/`
- Remove original spec folders from `/specs/`
- Leave only `app-specs.md` as the documentation source

## TypeScript Modules

The skill includes these core modules in `scripts/`:

- **types.ts** - TypeScript interfaces and type definitions
- **scanner.ts** - Directory scanning, file operations, archiving, cleanup
- **parser.ts** - Markdown parsing, checkbox counting, metadata extraction
- **generator.ts** - Document generation, template rendering, validation
- **index.ts** - Main orchestrator coordinating all operations
- **update.ts** - CLI entry point with argument parsing

## Additional Resources

### Reference Files

For detailed configuration and advanced usage, consult:

- **`references/configuration.md`** - Custom paths, categories, exclusions
- **`references/output-format.md`** - Generated document structure details
- **`references/troubleshooting.md`** - Common issues and solutions
- **`references/advanced-usage.md`** - Programmatic API and customization

### Script Files

Implementation scripts available in `scripts/`:

- All TypeScript modules for scanning, parsing, and generation
- Requires Node.js 18+ and `tsx` runtime

## Safety Features

When using cleanup mode, these protections activate:

✅ **Archive First** - All folders backed up before deletion
✅ **Validation** - Archive checked for completeness
✅ **Exclusions** - Critical folders never deleted
✅ **Rollback** - Automatic restoration if cleanup fails
✅ **Atomic Operations** - Completes fully or rolls back entirely

Archive location: `/specs/.archive/[timestamp]/`

## Best Practices

1. **Run regularly**: Update after completing features or at sprint end
2. **Non-destructive first**: Use default mode until ready to consolidate
3. **Verify output**: Review generated `app-specs.md` before cleanup
4. **Use version control**: Commit before running cleanup mode
5. **Check prerequisites**: Ensure `tsx` is installed globally

## Prerequisites

- **Node.js 18+** - Required for TypeScript execution
- **tsx** - TypeScript runtime (`npm install -g tsx` or `pnpm add -g tsx`)
- **Spec directory** - Organized feature folders with markdown files
