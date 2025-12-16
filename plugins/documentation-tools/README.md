# Documentation Tools Plugin

**Automated documentation system for tracking feature specifications and implementation progress.**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/dbalanco/perseon-ai-marketplace)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

This Claude Code plugin enables automated scanning of feature specifications, progress tracking via markdown checkboxes, and generation of comprehensive documentation with visual progress dashboards.

## Features

✅ **Automatic Scanning** - Recursively finds all spec folders and markdown files
✅ **Progress Tracking** - Calculates completion percentages from checkboxes
✅ **Status Dashboard** - Shows progress by category with visual indicators
✅ **Category Organization** - Automatically groups features by domain
✅ **Tech Stack Extraction** - Reads dependencies from package.json
✅ **Database Schema** - Parses Prisma schema for models
✅ **Archive System** - Safely backs up specs before cleanup (optional)
✅ **Safety Checks** - Validates output and provides rollback mechanism

`★ Insight ─────────────────────────────────────`
This plugin transforms scattered feature specifications into a single source of truth using markdown's native checkbox syntax. By parsing `[x]` completion markers, it creates a zero-overhead progress tracking system—no external tools, databases, or complex setup required.
`─────────────────────────────────────────────────`

## Installation

### Prerequisites

- **Node.js 18+** - Required for TypeScript execution
- **tsx** - TypeScript runtime for executing scripts

Install tsx globally:

```bash
npm install -g tsx
# or
pnpm add -g tsx
```

Verify installation:

```bash
tsx --version
node --version  # Should be 18.0.0 or higher
```

### Install from Perseon AI Marketplace

**Recommended for Perseon AI users:**

1. The plugin comes pre-installed in the Perseon AI marketplace template
2. Simply use the `/update-specs` command - it's ready to go!

### Manual Installation

**For custom projects or standalone use:**

1. **Clone or download** this plugin directory to your project:

   ```bash
   # Option 1: Copy to your project's plugins directory
   cp -r documentation-tools /path/to/your/project/.claude-plugin/

   # Option 2: Clone from marketplace
   git clone https://github.com/dbalanco/perseon-ai-marketplace.git
   cd perseon-ai-marketplace/plugins/documentation-tools
   ```

2. **Verify plugin structure:**

   ```bash
   ls -la documentation-tools/
   # Should show: .claude-plugin/, commands/, skills/, README.md
   ```

3. **Enable in Claude Code:**

   The plugin auto-loads when found in:
   - `~/.claude-plugin/`
   - `./.claude-plugin/` (project-specific)
   - Via `cc --plugin-dir /path/to/plugin`

### Verify Installation

Check that the plugin loaded successfully:

```bash
# In Claude Code, check available commands
/help

# Should list: /update-specs
```

## Quick Start

### Using the Slash Command

The easiest way to use this plugin:

```
/update-specs
```

This will:
1. Scan all spec folders in `/specs/`
2. Parse requirements and implementation plans
3. Calculate completion percentages from checkboxes
4. Generate `/specs/app-specs.md` with full dashboard
5. Leave original folders intact (non-destructive)

### Direct Script Execution

You can also run the script directly:

```bash
# From your project root
tsx .claude-plugin/documentation-tools/skills/app-spec-generator/scripts/update.ts
```

### With Cleanup Mode (Destructive)

⚠️ **Warning:** This is DESTRUCTIVE and will archive and remove spec folders.

```bash
tsx .claude-plugin/documentation-tools/skills/app-spec-generator/scripts/update.ts --cleanup
```

**Cleanup mode will:**
1. Generate `app-specs.md` as usual
2. Archive all spec folders to `/specs/.archive/[timestamp]/`
3. Validate archive completeness
4. Remove original spec folders
5. Create `.archive/latest` symlink
6. Rollback automatically if any errors occur

**Only use cleanup mode when ready to consolidate all documentation into the single `app-specs.md` file.**

## Expected Directory Structure

The plugin expects your project to follow this structure:

```
your-project/
├── .claude-plugin/
│   └── documentation-tools/     ← Plugin installed here
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── commands/
│       │   └── update-specs.md
│       └── skills/
│           └── app-spec-generator/
│               ├── SKILL.md
│               ├── references/
│               │   ├── configuration.md
│               │   ├── output-format.md
│               │   ├── troubleshooting.md
│               │   └── advanced-usage.md
│               └── scripts/
│                   ├── types.ts
│                   ├── scanner.ts
│                   ├── parser.ts
│                   ├── generator.ts
│                   ├── index.ts
│                   └── update.ts
├── perseon/
│   └── specs/
│       ├── feature-1/
│       │   ├── requirements.md
│       │   └── implementation-plan.md
│       ├── feature-2/
│       │   ├── requirements.md
│       │   └── implementation-plan.md
│       └── app-specs.md       ← Generated output
├── package.json                ← Optional: for tech stack
└── prisma/
    └── schema.prisma           ← Optional: for database schema
```

## Usage

### Basic Workflow

1. **Create feature specs** in `/specs/feature-name/`
2. **Add checkboxes** to track progress in `implementation-plan.md`:
   ```markdown
   ## Implementation Tasks

   - [x] Setup database models
   - [x] Create API endpoints
   - [ ] Add authentication
   - [ ] Write tests
   ```

3. **Run the generator** whenever you want updated documentation:
   ```
   /update-specs
   ```

4. **Review the output** in `/specs/app-specs.md`

### Checkbox Format

For accurate progress tracking, use this format:

```markdown
- [x] Completed task    ✓ Counted as completed
- [ ] Pending task      ✓ Counted as pending

# These won't be counted:
-[x] No space           ✗ Invalid format
* [x] Using asterisk    ✗ Must use dash
```

### Status Recognition

The plugin recognizes these status indicators:

| Indicator | Status | Criteria |
|-----------|--------|----------|
| ✅ | Completed | 100% checkboxes completed or `✅` emoji in title |
| 🟡 | In Progress | Some checkboxes completed or `🟡` emoji |
| ⏳ | Planned | No checkboxes completed or `⏳` emoji |
| ❌ | Not Started | No content or `❌` emoji |

## Configuration

### Custom Spec Directory

By default, the plugin scans `/specs/`. To use a different directory:

1. Edit `skills/app-spec-generator/scripts/update.ts`
2. Modify the path:
   ```typescript
   const result = await updateAppSpecs('/path/to/your/specs');
   ```

### Exclude Folders

To exclude specific folders from scanning:

1. Edit `skills/app-spec-generator/scripts/scanner.ts`
2. Add to the exclusion list:
   ```typescript
   scanSpecsDirectory(specsDirectory, [
     'app-spec-generator',
     'templates',
     'archive',
     '.drafts'
   ]);
   ```

### Add Custom Categories

To add or modify feature categories:

1. Edit the `inferCategory()` function in `skills/app-spec-generator/scripts/scanner.ts`
2. Add your category logic:
   ```typescript
   if (folderName.includes('billing')) {
     return 'Billing & Payments';
   }
   ```

**See `skills/app-spec-generator/references/configuration.md` for detailed customization options.**

## Output Format

The generated `app-specs.md` includes these sections:

1. **Header** - Title, last updated, overall completion %
2. **Status Dashboard** - Progress table by category
3. **Table of Contents** - Navigation links
4. **Overview** - Project description
5. **Completed Features** - ✅ status with details
6. **In-Progress Features** - 🟡 status with percentages
7. **Planned Features** - ⏳ status with estimates
8. **Technology Stack** - From package.json
9. **Database Schema** - From Prisma schema
10. **Detailed Specifications** - Per-feature breakdowns with links
11. **Footer** - Generation metadata

**See `skills/app-spec-generator/references/output-format.md` for complete format documentation.**

## Categories

Features are automatically categorized by folder name:

| Category | Keywords |
|----------|----------|
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

## Troubleshooting

### Common Issues

**tsx not found:**
```bash
npm install -g tsx
```

**Spec not appearing:**
- Verify folder is in `/specs/`
- Check it's not hidden (doesn't start with `.`)
- Ensure it has `requirements.md` or `implementation-plan.md`

**Wrong completion percentage:**
- Check checkbox format: `- [x]` or `- [ ]`
- Ensure space between `-` and `[`
- Verify checkboxes aren't in code blocks

**Category is incorrect:**
- Rename folder to include category keyword
- Or modify `inferCategory()` in `scripts/scanner.ts`

**Tech stack or schema missing:**
- Ensure `package.json` exists in project root
- Verify `prisma/schema.prisma` exists
- Check file permissions

**See `skills/app-spec-generator/references/troubleshooting.md` for comprehensive troubleshooting.**

## Advanced Usage

### Programmatic API

```typescript
import { updateAppSpecs } from './.claude-plugin/documentation-tools/skills/app-spec-generator/scripts/index';

const result = await updateAppSpecs('/specs', false);

console.log(`Processed: ${result.featuresCount} features`);
console.log(`Completion: ${result.completionPercentage}%`);
```

### Custom Output Formats

The plugin supports exporting to different formats:
- Markdown (default)
- JSON
- HTML
- CSV

**See `skills/app-spec-generator/references/advanced-usage.md` for detailed API documentation and integration examples.**

## Safety Features

When using cleanup mode, these protections activate:

✅ **Archive First** - All folders backed up before deletion
✅ **Validation** - Archive checked for completeness
✅ **Exclusions** - Critical folders never deleted
✅ **Rollback** - Automatic restoration if cleanup fails
✅ **Atomic** - Operations complete fully or not at all

Archive location: `/specs/.archive/[timestamp]/`

## Best Practices

1. **Run regularly** - Update after completing features or at sprint end
2. **Non-destructive first** - Use default mode until ready to consolidate
3. **Verify output** - Review generated `app-specs.md` before cleanup
4. **Use version control** - Commit before running cleanup mode
5. **Check prerequisites** - Ensure `tsx` is installed globally
6. **Follow checkbox format** - Use `- [x]` and `- [ ]` consistently

## Plugin Components

### Commands

- **`/update-specs`** - Generate or update documentation (with error handling and tsx check)

### Skills

- **`app-spec-generator`** - Skill providing spec generation knowledge and workflows

### Scripts

- **`types.ts`** - TypeScript interfaces and type definitions
- **`scanner.ts`** - Directory scanning, archiving, cleanup
- **`parser.ts`** - Markdown parsing, checkbox counting
- **`generator.ts`** - Document generation and validation
- **`index.ts`** - Main orchestrator
- **`update.ts`** - CLI entry point

### Reference Documentation

- **`configuration.md`** - Customization options
- **`output-format.md`** - Generated document structure
- **`troubleshooting.md`** - Common issues and solutions
- **`advanced-usage.md`** - Programmatic API and integrations

## Contributing

This plugin is part of the Perseon AI marketplace. Contributions are welcome!

1. Fork the marketplace repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues or questions:

- **GitHub Issues**: [perseon-ai-marketplace/issues](https://github.com/dbalanco/perseon-ai-marketplace/issues)
- **Documentation**: Check the `skills/app-spec-generator/references/` folder
- **Claude Code**: Use `/update-specs` and ask Claude for help

## License

MIT License - See LICENSE file for details

## Author

**Darryn Balanco**
Email: darryn@optimus01.com
GitHub: [@dbalanco](https://github.com/dbalanco)

---

**Version:** 1.0.0
**Last Updated:** December 2025
**Part of:** [Perseon AI Marketplace](https://github.com/dbalanco/perseon-ai-marketplace)
