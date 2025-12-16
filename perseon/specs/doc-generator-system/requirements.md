# Documentation Generator System - Requirements

## Overview

Create an automated documentation system that aggregates all feature implementation plans into a single, comprehensive `/specs/app-specs.md` document. This system will provide a living source of truth for all implemented, in-progress, and planned features, with an easy-to-use slash command for updates.

## Problem Statement

**Current State:**
- 6 feature specification folders with 17+ markdown files
- 5,000+ lines of documentation scattered across directories
- Features at different completion stages (60% MVP ready)
- No single document showing all implemented features
- Difficult to understand current app capabilities at a glance
- Manual documentation updates are time-consuming and error-prone

**Desired State:**
- Single `/specs/app-specs.md` file documenting all features
- Clear status indicators (✅ Completed, 🟡 In Progress, ⏳ Planned)
- Automatically updatable via slash command or CLI script
- Organized by feature category and implementation status
- Links to detailed implementation plans
- Easy to scan for developers and stakeholders
- Self-contained dev tool (not part of app functionality)

## Goals

1. **Centralized Documentation:** Single source of truth for all features
2. **Automatic Aggregation:** Parse all spec files and extract status information
3. **Real-time Status Tracking:** Calculate completion percentages from checkboxes
4. **Easy Updates:** Simple slash command or CLI script to regenerate
5. **Developer-Friendly:** Clear structure, visual progress indicators
6. **Maintainable:** Flexible parser handles different markdown formats
7. **Isolated Tooling:** Keep doc-generator separate from app code

## Requirements

### Functional Requirements

#### 1. Document Scanner
**Must Have:**
- [ ] Recursively scan `/specs/` directory for subdirectories
- [ ] Locate `requirements.md` and `implementation-plan.md` files
- [ ] Identify supplementary docs (security audits, testing reports, etc.)
- [ ] Exclude `doc-generator/` and `app-specs.md` from scan
- [ ] Handle missing files gracefully (log warning, continue)

**Nice to Have:**
- [ ] Support custom file naming patterns (e.g., `REQUIREMENTS.md`, `requirements.md`)
- [ ] Allow configuration of which files to scan

#### 2. Markdown Parser
**Must Have:**
- [ ] Extract feature titles and descriptions from requirements.md
- [ ] Parse status indicators: ✅ (completed), 🟡 (in progress), ⏳ (planned), ❌ (not started)
- [ ] Count checkboxes: `[x]` (completed) vs `[ ]` (pending)
- [ ] Calculate completion percentage per feature
- [ ] Extract metadata: effort estimates, target dates, priority levels
- [ ] Identify feature categories (Foundation, GitHub Integration, Community, etc.)
- [ ] Handle malformed markdown gracefully (skip, log error)

**Nice to Have:**
- [ ] Parse nested task hierarchies
- [ ] Extract code snippets for examples
- [ ] Identify blocked tasks or dependencies

#### 3. Document Generator
**Must Have:**
- [ ] Generate markdown with proper structure and formatting
- [ ] Create table of contents with anchor links
- [ ] Generate overview section summarizing app capabilities
- [ ] Create status dashboard showing completion by category
- [ ] List completed features (✅) with implementation links
- [ ] List in-progress features (🟡) with completion % and target dates
- [ ] List planned features (⏳) with effort estimates and priority
- [ ] Include timestamp of last update
- [ ] Add links to detailed implementation plans

**Nice to Have:**
- [ ] Visual ASCII progress bars for categories
- [ ] Feature dependency graphs
- [ ] Timeline visualization
- [ ] Export to HTML or PDF

#### 4. Technology Stack Extraction
**Must Have:**
- [ ] Read `package.json` to extract dependencies
- [ ] List major technologies (Next.js, React, Prisma, Better Auth, etc.)
- [ ] Include version numbers
- [ ] Categorize dependencies (Framework, Database, UI, Auth, etc.)

#### 5. Database Schema Documentation
**Must Have:**
- [ ] Parse `prisma/schema.prisma`
- [ ] List all models with fields
- [ ] Show relationships (foreign keys, junctions)
- [ ] Group by domain (User Management, GitHub Integration, Community, etc.)
- [ ] Generate markdown tables or structured lists

**Nice to Have:**
- [ ] Entity-relationship diagram (ERD)
- [ ] Index information
- [ ] Model field types and constraints

#### 6. CLI Update Script
**Must Have:**
- [ ] Executable script: `specs/doc-generator/update.ts`
- [ ] Run scanner, parser, and generator pipeline
- [ ] Write output to `/specs/app-specs.md`
- [ ] Display summary in terminal (features processed, completion %, etc.)
- [ ] Handle errors gracefully with clear messages
- [ ] Exit with appropriate status codes

**Nice to Have:**
- [ ] Command-line flags (e.g., `--verbose`, `--dry-run`)
- [ ] Watch mode for auto-updates during development
- [ ] Diff view showing what changed

#### 7. Slash Command Integration
**Must Have:**
- [ ] Create `.claude/commands/update-specs.md`
- [ ] Run CLI update script
- [ ] Display user-friendly summary of changes
- [ ] Provide link to generated file
- [ ] Ask if user wants to view the file

### Non-Functional Requirements

#### Performance
- [ ] Complete full scan and generation in < 5 seconds
- [ ] Handle 50+ spec files without performance degradation
- [ ] Efficient file I/O (read files once, cache in memory)

#### Reliability
- [ ] Handle malformed markdown files without crashing
- [ ] Log warnings for parsing errors
- [ ] Validate output before writing to file
- [ ] Atomic file writes (write to temp file, then rename)

#### Maintainability
- [ ] TypeScript for type safety
- [ ] Modular architecture (scanner, parser, generator as separate modules)
- [ ] Clear interfaces and type definitions
- [ ] Comments for complex parsing logic
- [ ] Configuration file for customization (optional)

#### Usability
- [ ] Clear, helpful error messages
- [ ] Visual progress indicators in terminal
- [ ] Colorized output for better readability
- [ ] Example output in documentation

## Document Structure

### `/specs/app-specs.md` Output Structure

```markdown
# Perseon V2 - Application Specifications

> **Last Updated:** [Auto-generated timestamp]
> **Overall Completion:** [X]% ([Y] completed, [Z] in progress, [W] planned)

---

## 📊 Implementation Status Dashboard

[Table showing completion by category]

---

## Table of Contents

1. Overview
2. Feature Implementation Status
3. Completed Features (✅)
4. Features in Progress (🟡)
5. Planned Features (⏳)
6. Technology Stack
7. Database Schema
8. Detailed Feature Specifications
9. Appendix

---

## Overview

[Brief summary of Perseon V2 capabilities, target users, tech stack]

---

## Feature Implementation Status

### ✅ Completed Features ([X] features)

[Grouped by category with checkboxes and implementation links]

### 🟡 Features in Progress ([Y] features)

[With completion % and target dates]

### ⏳ Planned Features ([Z] features)

[With effort estimates and priority]

---

## Technology Stack

[Core Framework, Backend & Database, Authentication, UI & Styling, etc.]

---

## Database Schema

[Grouped by domain with models and relationships]

---

## Detailed Feature Specifications

[One section per major feature with status, implementation plan link, detailed breakdown]

---

## Appendix

[Feature completion by phase, links to implementation plans]

---

*This document is auto-generated by the `/update-specs` command.*
```

## Feature Categories

Features should be organized into these categories:

1. **Foundation** - Authentication, workspace system, database schema
2. **GitHub Integration** - OAuth, repository sync, webhooks, Actions
3. **Project Management** - Kanban boards, issues, team collaboration
4. **Community Features** - Feature requests, bug reports, upvoting
5. **Analytics & Monitoring** - Dashboards, performance tracking, metrics
6. **UX Enhancements** - Dark mode, tooltips, error messages, tours
7. **Performance** - Pagination, caching, virtualization
8. **Learning Resources** - Tutorials, documentation, guides

## Status Indicators

The parser should recognize these status indicators:

- ✅ **Completed** - Feature fully implemented and tested
- 🟡 **In Progress** - Partially complete (show % if available)
- ⏳ **Planned** - Requirements defined, implementation pending
- ❌ **Not Started** - Planned but no work done yet
- 📋 **Documented** - Requirements written, awaiting planning
- ⚠️ **Partial** - Core done, polish/edge cases remain

## Success Criteria

### Must Have
- [ ] Single `app-specs.md` file generated successfully
- [ ] Includes all features from all implementation plans
- [ ] Clear status indicators for all features
- [ ] Completion percentages calculated correctly
- [ ] Slash command `/update-specs` works reliably
- [ ] Links to detailed implementation plans functional
- [ ] Technology stack extracted from package.json
- [ ] Database schema extracted from Prisma schema
- [ ] No crashes on malformed markdown

### Nice to Have
- [ ] Visual ASCII progress bars
- [ ] API endpoints documentation
- [ ] Automatic update reminders
- [ ] Diff view of changes
- [ ] Export to other formats
- [ ] Integration with dashboard UI

## Out of Scope

The following are explicitly excluded from this feature:

- ❌ Real-time collaboration on specs
- ❌ Version control within the system (git handles this)
- ❌ Approval workflows for spec changes
- ❌ Integration with external documentation tools
- ❌ Automated testing of implementation plans
- ❌ AI-powered feature suggestion
- ❌ Multi-language support
- ❌ Web UI for viewing/editing specs (CLI and markdown only)

## Dependencies

### Required
- Node.js runtime (for ts-node or compiled scripts)
- TypeScript compiler
- File system access to `/specs/` directory
- Access to `package.json` and `prisma/schema.prisma`

### Optional
- Colorized terminal output library (e.g., `chalk`)
- Progress indicators library (e.g., `ora`)
- Markdown parsing library (or use regex for simplicity)

## Timeline

**Estimated Effort:** 3-4 days

**Phase 1:** Document Generator Script - 1-2 days
- Scanner, Parser, Generator modules
- Core orchestrator

**Phase 2:** CLI Update Script - 0.5 days
- Executable script with terminal output
- Error handling

**Phase 3:** Slash Command - 0.5 days
- Command file
- Integration with CLI script

**Phase 4:** Content Enhancement - 1 day
- Technology stack extraction
- Database schema parsing
- Statistics dashboard

**Phase 5:** Polish & Documentation - 0.5 days
- Error handling improvements
- README for doc-generator
- Examples and usage docs

## Risks & Mitigations

### Risk: Parsing Complexity
**Impact:** Different markdown formats across specs could break parser
**Mitigation:**
- Flexible regex patterns
- Graceful error handling
- Log warnings for unparseable content
- Manual fallback for critical data

### Risk: Performance with Large Specs
**Impact:** Slow generation with 100+ spec files
**Mitigation:**
- Efficient file I/O (read once, cache)
- Stream processing for large files
- Progress indicators for user feedback

### Risk: Stale Documentation
**Impact:** Users forget to run `/update-specs`
**Mitigation:**
- Add reminder to `/checkpoint` command output
- Document in README when to update
- Optional: Git pre-commit hook suggestion

## Future Enhancements

1. **Version Control Integration**
   - Automatically commit generated app-specs.md
   - Show git diff of changes
   - Track documentation history

2. **UI Integration**
   - Dashboard page rendering app-specs.md
   - Search functionality
   - Filtering by status or category

3. **Export Formats**
   - PDF for stakeholders
   - HTML with styling
   - JSON for programmatic access

4. **Smart Parsing**
   - NLP for feature extraction
   - Automatic categorization
   - Dependency detection

5. **Notifications**
   - Alert when specs become stale
   - Weekly digest of changes
   - Slack/Discord integration

## Acceptance Criteria

### Documentation Generation
- [ ] Running `/update-specs` generates `app-specs.md` in < 5 seconds
- [ ] Generated document includes all 6 existing spec folders
- [ ] All features are categorized correctly
- [ ] Completion percentages match manual count
- [ ] Links to implementation plans are valid
- [ ] Technology stack lists 10+ major dependencies
- [ ] Database schema includes 20+ models
- [ ] Status dashboard shows 6 categories with progress

### Error Handling
- [ ] Malformed markdown in one spec doesn't break entire generation
- [ ] Missing files logged with warnings, not errors
- [ ] Invalid syntax skipped with helpful error message
- [ ] Empty spec folders handled gracefully
- [ ] Write failures don't corrupt existing app-specs.md

### User Experience
- [ ] Terminal output is clear and colorized
- [ ] Summary shows features processed, completion %, timestamps
- [ ] Errors include file paths and line numbers
- [ ] Success message confirms file location
- [ ] Slash command provides friendly output

### Code Quality
- [ ] TypeScript with strict mode enabled
- [ ] All functions have type signatures
- [ ] Interfaces defined for all data structures
- [ ] No `any` types used
- [ ] Comments explain complex parsing logic
- [ ] Modular architecture (scanner, parser, generator separate)

## Reference Implementation

### Example Terminal Output

```bash
$ pnpm update-specs

Updating app-specs.md...

Scanning specs directory...
  ✓ Found 6 spec folders
  ✓ Located 17 markdown files

Parsing implementation plans...
  ✓ github-project-manager (100% complete)
  ✓ community-and-activity-features (100% complete)
  ✓ enhanced-github-dashboard (100% complete)
  ✓ app-enhancements-for-novice-developers (60% complete)
  ⚠ app-enhancements-v2-mvp-completion (15% complete)
  ✓ commands-page-improvements (50% complete)

Extracting technology stack...
  ✓ 24 dependencies processed

Parsing database schema...
  ✓ 32 models extracted

Generating app-specs.md...
  ✓ 9 sections created
  ✓ 58 features documented

✅ Updated app-specs.md:
   - 58 features processed
   - 65% overall completion
   - 35 completed, 12 in progress, 11 planned
   - 6 categories tracked

📄 File: /specs/app-specs.md

Done in 2.3s
```

## Glossary

- **Spec:** Short for specification; a folder containing requirements and implementation plans
- **Feature:** A distinct capability or enhancement to the application
- **Implementation Plan:** Detailed, phase-based breakdown of how to build a feature
- **Status Indicator:** Emoji or symbol showing completion state (✅, 🟡, ⏳, etc.)
- **Completion Percentage:** Ratio of completed tasks to total tasks, based on checkboxes
- **Category:** Grouping of related features (e.g., GitHub Integration, UX Enhancements)
- **Doc-Generator:** The tooling that parses specs and generates app-specs.md
