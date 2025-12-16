# Troubleshooting Guide

Common issues and solutions when using the app spec generator.

## Installation Issues

### tsx Not Found

**Problem:**
```bash
bash: tsx: command not found
```

**Solution:**

Install `tsx` globally:

```bash
npm install -g tsx
# or
pnpm add -g tsx
# or
yarn global add tsx
```

**Verify installation:**

```bash
tsx --version
```

### Node.js Version Too Old

**Problem:**
```
Error: Node.js v16.x.x is not supported
```

**Solution:**

Upgrade to Node.js 18 or later:

```bash
# Using nvm
nvm install 18
nvm use 18

# Using homebrew (macOS)
brew install node@20

# Verify version
node --version
```

## Scanning Issues

### Spec Not Appearing in Output

**Problem:** Created a new spec folder but it doesn't appear in `app-specs.md`.

**Diagnosis checklist:**

1. **Verify folder location:**
   ```bash
   ls -la /specs/
   ```
   Folder must be in the specs directory.

2. **Check folder isn't hidden:**
   ```bash
   # Hidden folders start with . and are excluded
   ls -a /specs/
   ```

3. **Verify required files exist:**
   ```bash
   ls /specs/your-feature/
   # Should have: requirements.md or implementation-plan.md
   ```

4. **Check exclusion list:**
   Look in `scripts/scanner.ts` for excluded folders.

**Solution:**

```bash
# Move folder to correct location
mv ~/your-feature /specs/

# Ensure it's not hidden
mv /specs/.your-feature /specs/your-feature

# Add required markdown files
touch /specs/your-feature/implementation-plan.md
```

### Empty or Missing app-specs.md

**Problem:** Script runs but doesn't generate `app-specs.md`.

**Diagnosis:**

1. Check script output for errors
2. Verify write permissions
3. Check disk space

**Solution:**

```bash
# Check permissions
ls -la /specs/

# Fix permissions if needed
chmod 755 /specs/

# Check disk space
df -h
```

## Parsing Issues

### Incorrect Completion Percentage

**Problem:** Feature shows 0% or 100% when it should be partial.

**Common causes:**

1. **Incorrect checkbox format**
2. **Checkboxes in code blocks**
3. **Non-standard markdown**

**Diagnosis:**

Check checkbox format in `implementation-plan.md`:

```markdown
# Correct format
- [x] Completed task
- [ ] Pending task

# Incorrect formats (won't be counted)
-[x] No space after dash
- [X] Capital X (won't match lowercase search)
* [x] Using asterisk instead of dash
```

**Solution:**

Use correct checkbox syntax:
- Space after `-` and before `[`
- Lowercase `x` for completed
- Space inside `[ ]` for pending

```markdown
## Implementation Tasks

- [x] Setup database schema
- [x] Create API endpoints
- [ ] Add authentication
- [ ] Write tests
```

### Wrong Category Assignment

**Problem:** Feature assigned to "Other" or wrong category.

**Diagnosis:**

Categories are inferred from folder names. Check `scripts/scanner.ts` for keyword mappings.

**Current keywords:**
- **Foundation**: auth, workspace, database
- **GitHub Integration**: github, git
- **UX Enhancements**: ux, ui, enhancement, dark-mode
- **Performance**: performance, optimization, cache

**Solution:**

Rename folder to include category keyword:

```bash
# Wrong (assigned to "Other")
/specs/login-system/

# Correct (assigned to "Foundation")
/specs/auth-login-system/

# Or modify inferCategory() in scripts/scanner.ts
```

## Generation Issues

### Missing Tech Stack Section

**Problem:** "Technology Stack" section is empty or missing.

**Diagnosis:**

1. **Check package.json exists:**
   ```bash
   ls package.json
   ```

2. **Verify JSON is valid:**
   ```bash
   cat package.json | jq .
   ```

3. **Check file permissions:**
   ```bash
   ls -l package.json
   ```

**Solution:**

```bash
# If package.json is missing
npm init -y

# If in wrong location
mv package.json /path/to/project/root/

# If corrupted
npm install  # Regenerates package-lock.json
```

### Missing Database Schema Section

**Problem:** "Database Schema" section is empty or missing.

**Diagnosis:**

1. **Check schema.prisma exists:**
   ```bash
   ls prisma/schema.prisma
   ```

2. **Verify it's not empty:**
   ```bash
   cat prisma/schema.prisma
   ```

3. **Check for syntax errors:**
   ```bash
   npx prisma validate
   ```

**Solution:**

```bash
# If Prisma not initialized
npx prisma init

# If file exists but empty
# Add at least one model to schema.prisma
```

## Cleanup Mode Issues

### Archive Creation Failed

**Problem:**
```
Error: Failed to create archive
```

**Diagnosis:**

1. Check disk space
2. Verify write permissions
3. Check archive directory doesn't exist

**Solution:**

```bash
# Check disk space
df -h

# Remove existing archive if present
rm -rf /specs/.archive/2025-12-16-19-30-00

# Fix permissions
chmod 755 /specs/
```

### Cleanup Rollback Occurred

**Problem:**
```
Warning: Cleanup failed, rolling back changes
```

**This is a safety feature!** The generator detected an issue and automatically restored your files.

**Common triggers:**

1. File validation failed
2. Disk space issue mid-cleanup
3. Permission denied during removal

**What to do:**

1. **Don't panic** - Your files are safe
2. Check the error message for details
3. Fix the underlying issue
4. Try again or skip cleanup mode

**Example:**

```bash
# Error message might say:
# "Archive validation failed: Missing file xyz.md"

# Solution: Ensure all files are accessible
chmod -R 755 /specs/

# Then retry
tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts --cleanup
```

### Folders Not Removed After Cleanup

**Problem:** Cleanup completed but some folders still exist.

**Diagnosis:**

Check if folders are in exclusion list:

```typescript
// In scripts/scanner.ts
const excludedFolders = [
  'app-spec-generator',  // Never delete the generator itself
  'doc-generator',       // Protected folders
  '.archive'             // Archive directory
];
```

**Solution:**

This is intentional for critical folders. If you need to remove them, do so manually after verifying safety.

## Performance Issues

### Slow Scanning (Many Features)

**Problem:** Script takes >30 seconds to run with 100+ features.

**Optimization options:**

1. **Exclude archived folders:**
   ```typescript
   scanSpecsDirectory(specsDir, ['.archive', 'old', 'deprecated']);
   ```

2. **Limit recursion depth:**
   ```typescript
   // Only scan one level deep
   const maxDepth = 1;
   ```

3. **Cache results:**
   ```typescript
   // Add caching for unchanged folders
   const cache = readCache();
   if (cache[folderPath] && !hasChanged(folderPath)) {
     return cache[folderPath];
   }
   ```

### Large Output File

**Problem:** `app-specs.md` becomes too large (>1 MB).

**Solutions:**

1. **Split by category:**
   ```typescript
   // Generate separate files per category
   generateByCategory('Foundation', 'docs/foundation.md');
   generateByCategory('GitHub', 'docs/github.md');
   ```

2. **Limit detail level:**
   ```typescript
   // Reduce verbose descriptions
   const maxDescriptionLength = 500;
   ```

3. **Use summary + details pattern:**
   ```typescript
   // Main file: summary only
   // Category files: full details
   ```

## Script Errors

### TypeScript Compilation Errors

**Problem:**
```
Error: Cannot find module 'xyz'
```

**Solution:**

```bash
# Install dependencies if package.json exists
npm install

# Or use tsx which handles TypeScript directly
tsx scripts/update.ts
```

### Import Path Errors

**Problem:**
```
Error: Cannot find module './scanner'
```

**Diagnosis:**

Check relative import paths in TypeScript files.

**Solution:**

Ensure imports use correct relative paths:

```typescript
// Correct
import { scanSpecs } from './scanner';
import { parseMarkdown } from './parser';

// Incorrect
import { scanSpecs } from '../scanner';  // Wrong path
```

### File Permission Errors

**Problem:**
```
Error: EACCES: permission denied
```

**Solution:**

```bash
# Fix permissions on specs directory
chmod -R 755 /specs/

# If still failing, check parent directories
ls -ld $(dirname /specs)
```

## Data Issues

### Unicode/Emoji Problems

**Problem:** Emojis or special characters appear garbled.

**Solution:**

Ensure UTF-8 encoding:

```typescript
// In scripts/generator.ts
fs.writeFileSync(outputPath, content, { encoding: 'utf-8' });
```

### Markdown Formatting Issues

**Problem:** Generated markdown doesn't render correctly.

**Common issues:**

1. **Tables not aligned:**
   ```markdown
   # Wrong
   | Column1|Column2|
   |---|---|

   # Correct
   | Column1 | Column2 |
   |---------|---------|
   ```

2. **Broken links:**
   ```markdown
   # Wrong
   [Link](./path with spaces/file.md)

   # Correct
   [Link](./path%20with%20spaces/file.md)
   ```

3. **Unescaped special characters:**
   ```markdown
   # Wrong
   Description with <angle brackets>

   # Correct
   Description with &lt;angle brackets&gt;
   ```

## Debugging

### Enable Verbose Logging

Add console.log statements in scripts:

```typescript
// In scripts/scanner.ts
console.log('Scanning directory:', directory);
console.log('Found folders:', folders);

// In scripts/parser.ts
console.log('Parsing file:', filePath);
console.log('Checkboxes found:', completed, '/', total);
```

### Inspect Intermediate Data

Add data dumps to debug:

```typescript
// After scanning
fs.writeFileSync('debug-scan.json', JSON.stringify(features, null, 2));

// After parsing
fs.writeFileSync('debug-parse.json', JSON.stringify(parsed, null, 2));
```

### Test Individual Functions

Run functions in isolation:

```typescript
// Test scanner only
import { scanSpecsDirectory } from './scanner';
const results = scanSpecsDirectory('/specs');
console.log(results);

// Test parser only
import { parseMarkdown } from './parser';
const parsed = parseMarkdown('/path/to/implementation-plan.md');
console.log(parsed);
```

## Getting Help

If issues persist:

1. Check script output for detailed error messages
2. Enable verbose logging
3. Inspect intermediate data files
4. Verify file permissions and paths
5. Test with minimal dataset
6. Review recent changes to spec files
7. Check for disk space and system resources

For plugin-specific issues, verify:
- Plugin is installed correctly
- `${CLAUDE_PLUGIN_ROOT}` resolves properly
- Command has necessary tool permissions
