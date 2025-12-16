---
description: Update specs
---

Generate or update the `/specs/app-specs.md` document by analyzing all feature implementation plans.

## What this command does

1. Scans all subdirectories in `/specs/` for requirements.md and implementation-plan.md files
2. Extracts feature statuses, completion percentages, and metadata from checkboxes
3. Generates a comprehensive app-specs.md document with:
   - Implementation status dashboard showing progress by category
   - Completed, in-progress, and planned features lists
   - Technology stack extracted from package.json
   - Database schema extracted from Prisma schema
   - Detailed feature specifications with links to implementation plans
4. Provides clear status indicators (✅ Completed, 🟡 In Progress, ⏳ Planned)
5. Links to detailed implementation plans for each feature

## Instructions for Claude

1. **Run the update script:**
   - Use the npm script: `pnpm update-specs`
   - This will execute `tsx specs/doc-generator/update.ts`

2. **Show the user a summary of the update:**
   - Total features processed
   - Overall completion percentage
   - Features by status (Completed, In Progress, Planned)
   - Categories tracked
   - Link to the generated file

3. **Ask if the user wants to view the generated file**

## Example output

"I've updated the app-specs.md document by running the documentation generator:

✅ Updated app-specs.md:

- 58 features processed
- 65% overall completion
- 35 completed, 12 in progress, 11 planned
- 6 categories tracked

📄 File: /specs/app-specs.md

Would you like me to open the generated file so you can review it?"

## Usage

Just type `/update-specs` whenever you:

- Complete a new feature implementation
- Update an implementation plan with progress
- Want to see current app capabilities at a glance
- Need comprehensive documentation for stakeholders
- Want to share project status

## Technical Details

The documentation generator system:

- Scans all spec folders except `doc-generator` and `doc-generator-system`
- Parses markdown files using regex patterns
- Counts checkboxes `[x]` vs `[ ]` to calculate completion percentages
- Infers categories from folder names
- Extracts metadata like effort estimates and target dates
- Generates structured markdown with tables and progress indicators
- Uses atomic file writes to prevent corruption

## Categories

Features are automatically organized into these categories:

- **Foundation** - Authentication, workspace system, database schema
- **GitHub Integration** - OAuth, repository sync, webhooks, Actions
- **Project Management** - Kanban boards, issues, team collaboration
- **Community Features** - Feature requests, bug reports, upvoting
- **Analytics & Monitoring** - Dashboards, performance tracking, metrics
- **UX Enhancements** - Dark mode, tooltips, error messages, tours
- **Performance** - Pagination, caching, virtualization
- **Learning Resources** - Tutorials, documentation, guides
- **Developer Tools** - CLI commands, scripts, utilities
- **Notifications** - Email and in-app notification systems
