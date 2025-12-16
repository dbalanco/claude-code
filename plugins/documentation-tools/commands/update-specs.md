---
name: update-specs
description: Generate or update app-specs.md documentation from feature specifications
allowed-tools:
  - Bash
  - Read
---

Generate or update the `/specs/app-specs.md` document by analyzing all feature implementation plans in the project.

## What This Command Does

1. **Scans** all subdirectories in `/specs/` for `requirements.md` and `implementation-plan.md` files
2. **Extracts** feature statuses, completion percentages, and metadata from markdown checkboxes
3. **Generates** a comprehensive `app-specs.md` document with:
   - Implementation status dashboard showing progress by category
   - Completed, in-progress, and planned features lists
   - Technology stack extracted from `package.json` (if available)
   - Database schema extracted from Prisma schema (if available)
   - Detailed feature specifications with links to implementation plans
4. **Provides** clear status indicators (✅ Completed, 🟡 In Progress, ⏳ Planned)
5. **Links** to detailed implementation plans for each feature

## Instructions for Claude

### Step 1: Check Prerequisites

First, verify that `tsx` is installed:

```bash
which tsx
```

If `tsx` is not found, inform the user:

```
❌ Error: tsx is not installed.

To use this command, install tsx globally:

  npm install -g tsx
  # or
  pnpm add -g tsx

Then run this command again.
```

Do not proceed if `tsx` is not installed.

### Step 2: Verify Spec Directory Exists

Check that the default spec directory exists:

```bash
test -d /specs && echo "exists" || echo "not found"
```

If the directory doesn't exist, ask the user:

```
The default spec directory `/specs/` was not found.

Would you like to:
1. Create it now
2. Specify a different directory
3. Cancel
```

### Step 3: Run the Update Script (Default Mode)

Execute the generator in non-destructive mode:

```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts
```

**Important:** This is the default, safe mode that generates/updates `app-specs.md` WITHOUT modifying any spec folders.

### Step 4: Show Results

After the script completes successfully, display a summary:

```
✅ Updated app-specs.md:
   - [X] features processed
   - [Y]% overall completion
   - [A] completed, [B] in progress, [C] planned
   - [N] categories tracked

📄 File: /specs/app-specs.md

Would you like me to open the generated file so you can review it?
```

If the user wants to review, use the Read tool to show the file contents or relevant sections.

### Step 5: Handle Errors

If the script fails, check the error message:

**Common errors:**

1. **tsx not found:**
   ```
   Explain that tsx must be installed globally
   Provide installation command
   ```

2. **Permission denied:**
   ```
   Check file permissions on /specs/
   Suggest: chmod 755 /specs/
   ```

3. **No specs found:**
   ```
   Verify spec folders exist in /specs/
   Confirm folders have requirements.md or implementation-plan.md files
   ```

4. **Script errors:**
   ```
   Show the error message
   Suggest checking the troubleshooting reference:
   ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/references/troubleshooting.md
   ```

## Optional: Cleanup Mode

⚠️ **WARNING:** Only use cleanup mode if the user explicitly requests it.

### What Cleanup Mode Does

The `--cleanup` flag is **DESTRUCTIVE** and will:

1. **Archive** all spec folders to `/specs/.archive/[timestamp]/`
2. **Remove** processed spec folders from `/specs/` after archival
3. Validate archive completeness before cleanup
4. Provide rollback mechanism if cleanup fails

### When to Use Cleanup Mode

**Only run cleanup mode if the user:**

- Explicitly asks to "archive" or "clean up" spec folders
- Confirms they want to consolidate documentation into a single file
- Understands that spec folders will be removed

### Running Cleanup Mode

If the user confirms they want cleanup mode:

1. **Explain what will happen:**
   ```
   ⚠️ Cleanup Mode Warning:

   This will:
   - Archive all spec folders to /specs/.archive/[timestamp]/
   - Remove original spec folders from /specs/
   - Leave only app-specs.md as the documentation source

   All folders will be backed up before removal, and the operation can be rolled back if something goes wrong.

   Are you sure you want to proceed? (yes/no)
   ```

2. **If confirmed, run:**
   ```bash
   tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts --cleanup
   ```

3. **Show detailed results:**
   ```
   ✅ Updated app-specs.md:
      - [X] features processed
      - [Y]% overall completion
      - [A] completed, [B] in progress, [C] planned
      - [N] categories tracked

   📦 Archive Created:
      - Location: /specs/.archive/[timestamp]/
      - [M] folders archived
      - Archive validated successfully ✓

   🗑️ Cleanup Completed:
      - [M] spec folders removed from /specs/
      - All folders safely backed up to archive
      - Rollback available at archive location if needed

   📄 File: /specs/app-specs.md
   ```

4. **If cleanup fails:**
   ```
   ⚠️ Cleanup Failed:

   The script detected an issue and automatically rolled back changes.
   Your spec folders are safe and unchanged.

   Error: [error message]

   The generated app-specs.md file is still available, but folder cleanup did not complete.
   ```

## Usage Examples

### Example 1: First Time Usage

User: `/update-specs`

Claude:
1. Checks tsx is installed
2. Verifies /specs/ exists
3. Runs script in default mode
4. Shows summary with feature count and completion %
5. Offers to show generated file

### Example 2: With Cleanup Request

User: `/update-specs` and clean up the folders

Claude:
1. Checks tsx is installed
2. Explains what cleanup mode does (archive + remove)
3. Asks for explicit confirmation
4. If confirmed, runs with --cleanup flag
5. Shows detailed results including archive location

### Example 3: Custom Directory

User: `/update-specs` but use ./docs/features instead

Claude:
1. Acknowledges custom directory request
2. Explains that custom directories require modifying the script
3. Offers to:
   - Run with default directory
   - Help modify the script
   - Use programmatic API instead

## Alternative Execution Methods

If the user prefers, they can also run:

**With npm/pnpm (if configured):**
```bash
pnpm update-specs
```

**Directly with tsx:**
```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts
```

**With cleanup:**
```bash
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts --cleanup
```

## When to Use This Command

Use this command when the user:

- Completes a new feature implementation
- Updates an implementation plan with progress
- Wants to consolidate all specs into a single document
- Needs comprehensive documentation for stakeholders
- Wants to clean up completed feature folders (use `--cleanup` flag)
- Is ready to finalize a development sprint

## Safety Features

- ✅ **Non-destructive by default** - No cleanup unless `--cleanup` flag is used
- ✅ **Complete archival before any deletion** - Full backup created first
- ✅ **Archive validation** - Ensures all files copied correctly
- ✅ **Safety checks** - Verifies conditions before cleanup proceeds
- ✅ **Rollback mechanism** - Automatic restoration if cleanup fails
- ✅ **Detailed logging** - Clear output of all operations
- ✅ **Clear warnings** - Explicit warnings for destructive operations

## Technical Details

The documentation generator system:

- Scans ALL spec folders in `/specs/` (excluding itself and archives)
- Parses markdown files using regex patterns
- Counts checkboxes `[x]` vs `[ ]` to calculate completion percentages
- Infers categories from folder names
- Extracts metadata like effort estimates and target dates
- Generates structured markdown with tables and progress indicators
- Uses atomic file writes to prevent corruption
- **Optional:** Archives folders with timestamp before cleanup
- **Optional:** Validates archive before removing original folders
- **Optional:** Provides rollback mechanism if cleanup fails

## Categories

Features are automatically organized into these categories based on folder names:

- **Foundation** - Authentication, workspace system, database schema
- **GitHub Integration** - OAuth, repository sync, webhooks, GitHub Actions
- **Project Management** - Kanban boards, issues, team collaboration
- **Community Features** - Feature requests, bug reports, upvoting system
- **Analytics & Monitoring** - Dashboards, performance tracking, metrics
- **UX Enhancements** - Dark mode, tooltips, error messages, onboarding tours
- **Performance** - Pagination, caching, virtualization, optimization
- **Learning Resources** - Tutorials, documentation, user guides
- **Developer Tools** - CLI commands, scripts, code generators, utilities
- **Notifications** - Email and in-app notification systems

## Best Practices

When running this command:

1. **Run regularly** - Update after completing features or at sprint end
2. **Default mode first** - Use non-destructive mode until ready to consolidate
3. **Review output** - Check generated app-specs.md before using cleanup
4. **Version control** - Commit changes before running cleanup mode
5. **Communicate** - Let the user know what's happening at each step
6. **Handle errors gracefully** - Provide clear, actionable error messages
