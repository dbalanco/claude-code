# Configuration Guide

This reference provides detailed configuration options for customizing the app spec generator behavior.

## Custom Spec Directory

By default, the generator scans `/specs/`. To use a different directory, modify the path in `scripts/update.ts`:

```typescript
const result = await updateAppSpecs('/path/to/your/specs');
```

**Example for custom project structure:**

```typescript
// For specs in project root
const result = await updateAppSpecs('./specifications');

// For nested structure
const result = await updateAppSpecs('./docs/features');

// For absolute path
const result = await updateAppSpecs('/Users/username/projects/myapp/specs');
```

## Excluding Folders

To exclude specific folders from scanning, edit the `scanSpecsDirectory` function call in `scripts/scanner.ts`:

```typescript
// Default excludes the generator itself
scanSpecsDirectory(specsDirectory, ['app-spec-generator']);

// Add custom exclusions
scanSpecsDirectory(specsDirectory, [
  'app-spec-generator',
  'doc-generator',
  'templates',
  'archive',
  '.drafts'
]);
```

**Common exclusion patterns:**

- **Generator folders**: `app-spec-generator`, `doc-generator`
- **Templates**: `templates`, `boilerplate`, `_templates`
- **Archives**: `archive`, `.archive`, `old`
- **Drafts**: `drafts`, `.drafts`, `wip`
- **Hidden folders**: `.git`, `.vscode`, `node_modules`

## Adding Custom Categories

Categories are inferred from folder names using the `inferCategory()` function in `scripts/scanner.ts`.

### Current Category Logic

```typescript
function inferCategory(folderName: string): string {
  const lower = folderName.toLowerCase();

  if (lower.includes('auth') || lower.includes('workspace') || lower.includes('database')) {
    return 'Foundation';
  }
  if (lower.includes('github') || lower.includes('git')) {
    return 'GitHub Integration';
  }
  // ... more categories

  return 'Other';
}
```

### Adding New Categories

**Example: Adding a "Billing & Payments" category:**

```typescript
function inferCategory(folderName: string): string {
  const lower = folderName.toLowerCase();

  // Add your custom category
  if (lower.includes('billing') || lower.includes('payment') || lower.includes('stripe')) {
    return 'Billing & Payments';
  }

  // Keep existing categories
  if (lower.includes('auth') || lower.includes('workspace')) {
    return 'Foundation';
  }
  // ... rest of logic
}
```

**Example: Adding an "AI/ML Features" category:**

```typescript
if (lower.includes('ai') || lower.includes('ml') || lower.includes('machine-learning') ||
    lower.includes('gpt') || lower.includes('llm')) {
  return 'AI/ML Features';
}
```

### Category Best Practices

1. **Specific before general**: Check specific keywords before broad ones
2. **Multiple keywords**: Use `||` to match variations (billing, payment, stripe)
3. **Consistent naming**: Use title case for category names
4. **Logical grouping**: Group related features together
5. **Limit categories**: Aim for 8-12 categories max for readability

## Customizing Status Icons

Default status indicators can be customized in `scripts/parser.ts`:

```typescript
// Current defaults
const statusIcons = {
  completed: '✅',
  inProgress: '🟡',
  planned: '⏳',
  notStarted: '❌'
};
```

**Customization example:**

```typescript
// Use different icons
const statusIcons = {
  completed: '✓',
  inProgress: '▶',
  planned: '○',
  notStarted: '✗'
};
```

## Modifying Checkbox Counting

The completion percentage is calculated from markdown checkboxes. Logic is in `scripts/parser.ts`:

```typescript
// Counts: - [x] or - [X] as completed
// Counts: - [ ] as pending
const completedCheckboxes = (content.match(/- \[x\]/gi) || []).length;
const pendingCheckboxes = (content.match(/- \[ \]/g) || []).length;
const totalCheckboxes = completedCheckboxes + pendingCheckboxes;
const percentage = totalCheckboxes > 0
  ? Math.round((completedCheckboxes / totalCheckboxes) * 100)
  : 0;
```

**Custom weighting example:**

```typescript
// Give more weight to critical tasks marked with ⚠️
const criticalCompleted = (content.match(/- \[x\] ⚠️/gi) || []).length * 2;
const normalCompleted = (content.match(/- \[x\](?! ⚠️)/gi) || []).length;
const completed = criticalCompleted + normalCompleted;
```

## Archive Configuration

Archive settings are in `scripts/scanner.ts`:

### Archive Location

```typescript
// Default: .archive/ in specs directory
const archivePath = path.join(specsDirectory, '.archive', timestamp);

// Custom: Use different location
const archivePath = path.join('/backup', 'specs-archive', timestamp);
```

### Timestamp Format

```typescript
// Default: YYYY-MM-DD-HH-MM-SS
const timestamp = new Date().toISOString()
  .replace(/[:.]/g, '-')
  .slice(0, 19);

// Custom: Use different format
const timestamp = new Date().toISOString().split('T')[0]; // YYYY-MM-DD only
const timestamp = Date.now().toString(); // Unix timestamp
```

### Archive Validation

```typescript
// Default: Validates all files copied correctly
const validation = validateArchive(source, destination);

// Custom: Add additional checks
const validation = {
  ...validateArchive(source, destination),
  checksumMatch: compareChecksums(source, destination),
  sizeMatch: compareSizes(source, destination)
};
```

## Tech Stack Extraction

Tech stack is extracted from `package.json`. Customize in `scripts/generator.ts`:

```typescript
// Default: Extracts dependencies and devDependencies
const deps = packageJson.dependencies || {};
const devDeps = packageJson.devDependencies || {};

// Custom: Filter specific packages
const frontendDeps = Object.keys(deps)
  .filter(pkg => ['react', 'vue', 'angular'].some(fw => pkg.includes(fw)));

const backendDeps = Object.keys(deps)
  .filter(pkg => ['express', 'fastify', 'koa'].some(fw => pkg.includes(fw)));
```

## Database Schema Extraction

Prisma schema parsing can be customized in `scripts/generator.ts`:

```typescript
// Default: Extracts all models
const models = schemaContent.match(/model \w+ {[\s\S]*?}/g);

// Custom: Extract enums too
const models = schemaContent.match(/model \w+ {[\s\S]*?}/g);
const enums = schemaContent.match(/enum \w+ {[\s\S]*?}/g);
```

## Output File Name

Change the generated file name in `scripts/index.ts`:

```typescript
// Default: app-specs.md
const outputPath = path.join(specsDirectory, 'app-specs.md');

// Custom name
const outputPath = path.join(specsDirectory, 'project-status.md');
const outputPath = path.join(specsDirectory, 'implementation-progress.md');
```

## Environment Variables

Create a `.env` file for configuration:

```bash
# .env
SPECS_DIR=/specs
OUTPUT_FILE=app-specs.md
ARCHIVE_DIR=.archive
CATEGORIES_ENABLED=true
TECH_STACK_ENABLED=true
```

Then load in `scripts/update.ts`:

```typescript
import dotenv from 'dotenv';
dotenv.config();

const specsDir = process.env.SPECS_DIR || '/specs';
const outputFile = process.env.OUTPUT_FILE || 'app-specs.md';
```

## Examples

### Example 1: SaaS Product with Multiple Apps

```typescript
// Custom categories for multi-app product
if (lower.includes('dashboard') || lower.includes('admin')) {
  return 'Admin Dashboard';
}
if (lower.includes('mobile') || lower.includes('ios') || lower.includes('android')) {
  return 'Mobile Apps';
}
if (lower.includes('api') || lower.includes('backend')) {
  return 'Backend Services';
}
```

### Example 2: Compliance-Focused Project

```typescript
// Add compliance category
if (lower.includes('gdpr') || lower.includes('hipaa') ||
    lower.includes('compliance') || lower.includes('audit')) {
  return 'Compliance & Security';
}
```

### Example 3: Multi-Tenant System

```typescript
// Tenant-specific categories
if (lower.includes('tenant-') || lower.includes('org-')) {
  return 'Tenant Management';
}
if (lower.includes('permissions') || lower.includes('rbac')) {
  return 'Access Control';
}
```

## Configuration Checklist

When setting up the generator:

- [ ] Specify correct specs directory path
- [ ] Add exclusions for template/archive folders
- [ ] Define categories matching your project structure
- [ ] Configure status icons if needed
- [ ] Set archive location for cleanup mode
- [ ] Test on sample data before production use
- [ ] Document custom configurations for team
