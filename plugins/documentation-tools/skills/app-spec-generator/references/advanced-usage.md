# Advanced Usage Guide

Advanced techniques and programmatic usage of the app spec generator.

## Programmatic API

Use the generator in your own scripts and automation workflows.

### Basic Usage

```typescript
import { updateAppSpecs } from './skills/app-spec-generator/scripts/index';

// Non-destructive update
const result = await updateAppSpecs('/specs', false);

console.log(`Features processed: ${result.featuresCount}`);
console.log(`Overall completion: ${result.completionPercentage}%`);
console.log(`Completed: ${result.completed}`);
console.log(`In Progress: ${result.inProgress}`);
console.log(`Planned: ${result.planned}`);
```

### With Cleanup

```typescript
// Destructive mode - archives and removes spec folders
const result = await updateAppSpecs('/specs', true);

if (result.cleanupSucceeded) {
  console.log(`Archive path: ${result.archivePath}`);
  console.log(`Folders archived: ${result.foldersArchived}`);
  console.log(`Folders removed: ${result.foldersRemoved}`);
} else {
  console.error(`Cleanup failed: ${result.error}`);
}
```

### Return Type

```typescript
interface GenerationResult {
  // Generation info
  featuresCount: number;
  completionPercentage: number;
  completed: number;
  inProgress: number;
  planned: number;
  outputPath: string;

  // Cleanup info (if cleanup mode enabled)
  cleanupSucceeded?: boolean;
  archivePath?: string;
  foldersArchived?: number;
  foldersRemoved?: number;
  error?: string;
}
```

## Custom Generators

Create specialized generators for different purposes.

### Example: Category-Specific Generator

Generate docs for a single category:

```typescript
import { scanSpecsDirectory } from './scripts/scanner';
import { generateDocument } from './scripts/generator';

async function generateCategoryDoc(category: string, outputPath: string) {
  const allFeatures = await scanSpecsDirectory('/specs');

  const categoryFeatures = allFeatures.filter(f =>
    f.category === category
  );

  const doc = generateDocument(categoryFeatures, {
    title: `${category} Features`,
    includeOverall: false,
    includeTechStack: false,
    includeDbSchema: false
  });

  fs.writeFileSync(outputPath, doc);

  return {
    count: categoryFeatures.length,
    path: outputPath
  };
}

// Usage
await generateCategoryDoc('GitHub Integration', './docs/github-features.md');
await generateCategoryDoc('UX Enhancements', './docs/ux-features.md');
```

### Example: Team-Specific Generator

Generate docs filtered by team or assignee:

```typescript
interface FeatureWithOwner {
  title: string;
  owner: string;
  // ... other fields
}

async function generateTeamDoc(team: string, outputPath: string) {
  const features = await scanSpecsDirectory('/specs');

  // Filter by team (assumes team info in frontmatter)
  const teamFeatures = features.filter(f =>
    f.metadata?.team === team
  );

  const doc = generateDocument(teamFeatures, {
    title: `${team} Team Progress`,
    showOwnership: true
  });

  fs.writeFileSync(outputPath, doc);
}

// Usage
await generateTeamDoc('Frontend', './docs/frontend-progress.md');
await generateTeamDoc('Backend', './docs/backend-progress.md');
```

### Example: Milestone Generator

Generate progress reports for specific milestones:

```typescript
async function generateMilestoneDoc(milestone: string) {
  const features = await scanSpecsDirectory('/specs');

  const milestoneFeatures = features.filter(f =>
    f.metadata?.milestone === milestone
  );

  const completed = milestoneFeatures.filter(f => f.status === 'completed');
  const inProgress = milestoneFeatures.filter(f => f.status === 'in-progress');
  const planned = milestoneFeatures.filter(f => f.status === 'planned');

  return {
    milestone,
    total: milestoneFeatures.length,
    completed: completed.length,
    inProgress: inProgress.length,
    planned: planned.length,
    percentage: Math.round((completed.length / milestoneFeatures.length) * 100)
  };
}

// Usage
const q4Report = await generateMilestoneDoc('Q4-2025');
console.log(`Q4 Progress: ${q4Report.percentage}% complete`);
```

## Automation & CI/CD

Integrate the generator into automated workflows.

### GitHub Actions

Auto-generate docs on push:

```yaml
# .github/workflows/update-docs.yml
name: Update Documentation

on:
  push:
    branches: [main]
    paths:
      - 'perseon/specs/**'

jobs:
  update-docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install tsx
        run: npm install -g tsx

      - name: Generate docs
        run: tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts

      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add perseon/specs/app-specs.md
          git commit -m "docs: auto-update app specs [skip ci]" || exit 0
          git push
```

### Pre-commit Hook

Update docs before committing:

```bash
# .git/hooks/pre-commit
#!/bin/bash

# Check if any spec files changed
if git diff --cached --name-only | grep -q "perseon/specs/"; then
  echo "Updating app-specs.md..."

  tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts

  # Stage the updated docs
  git add perseon/specs/app-specs.md

  echo "✅ Documentation updated"
fi
```

### Scheduled Updates

Use cron to generate docs nightly:

```bash
# crontab -e
0 2 * * * cd /path/to/project && tsx ${CLAUDE_PLUGIN_ROOT}/skills/app-spec-generator/scripts/update.ts
```

## Custom Parsers

Extend parsing capabilities for custom markdown formats.

### Parse Custom Frontmatter

```typescript
// In scripts/parser.ts
function parseCustomFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return {};

  const frontmatter = match[1];

  return {
    team: extractField(frontmatter, 'team'),
    milestone: extractField(frontmatter, 'milestone'),
    priority: extractField(frontmatter, 'priority'),
    effort: extractField(frontmatter, 'effort'),
    dependencies: extractField(frontmatter, 'dependencies')?.split(',')
  };
}
```

### Extract Effort Estimates

```typescript
function extractEffortEstimate(content: string): number | null {
  // Look for patterns like "Effort: 2 weeks" or "Estimate: 5 days"
  const effortRegex = /(?:effort|estimate):\s*(\d+)\s*(days?|weeks?|hours?)/i;
  const match = content.match(effortRegex);

  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  // Normalize to days
  if (unit.startsWith('week')) return value * 5;
  if (unit.startsWith('hour')) return value / 8;

  return value;
}
```

### Parse Dependencies

```typescript
function extractDependencies(content: string): string[] {
  // Look for "Depends on: Feature1, Feature2"
  const depRegex = /depends?\s+on:\s*([^\n]+)/i;
  const match = content.match(depRegex);

  if (!match) return [];

  return match[1]
    .split(',')
    .map(dep => dep.trim())
    .filter(Boolean);
}
```

## Custom Output Formats

Generate different output formats beyond markdown.

### JSON Export

```typescript
import { scanSpecsDirectory } from './scripts/scanner';

async function exportJSON(outputPath: string) {
  const features = await scanSpecsDirectory('/specs');

  const json = {
    generated: new Date().toISOString(),
    totalFeatures: features.length,
    completionPercentage: calculateOverallCompletion(features),
    byCategory: groupByCategory(features),
    byStatus: groupByStatus(features),
    features: features.map(f => ({
      id: f.id,
      title: f.title,
      category: f.category,
      status: f.status,
      completion: f.completionPercentage,
      path: f.path
    }))
  };

  fs.writeFileSync(outputPath, JSON.stringify(json, null, 2));

  return json;
}

// Usage
await exportJSON('./docs/specs.json');
```

### HTML Report

```typescript
async function generateHTMLReport(outputPath: string) {
  const features = await scanSpecsDirectory('/specs');

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Project Status</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
    .status-completed { color: green; }
    .status-in-progress { color: orange; }
    .status-planned { color: gray; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 8px; border-bottom: 1px solid #ddd; }
  </style>
</head>
<body>
  <h1>Project Status Dashboard</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>

  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Category</th>
        <th>Status</th>
        <th>Completion</th>
      </tr>
    </thead>
    <tbody>
      ${features.map(f => `
        <tr>
          <td>${f.title}</td>
          <td>${f.category}</td>
          <td class="status-${f.status}">${f.status}</td>
          <td>${f.completionPercentage}%</td>
        </tr>
      `).join('')}
    </tbody>
  </table>
</body>
</html>
  `;

  fs.writeFileSync(outputPath, html);
}

// Usage
await generateHTMLReport('./docs/status.html');
```

### CSV Export

```typescript
import { stringify } from 'csv-stringify/sync';

async function exportCSV(outputPath: string) {
  const features = await scanSpecsDirectory('/specs');

  const records = features.map(f => ({
    Title: f.title,
    Category: f.category,
    Status: f.status,
    'Completion %': f.completionPercentage,
    Path: f.path,
    'Last Modified': f.lastModified
  }));

  const csv = stringify(records, { header: true });

  fs.writeFileSync(outputPath, csv);

  return records.length;
}

// Usage
await exportCSV('./docs/features.csv');
```

## Integration Examples

### Slack Notifications

Send progress updates to Slack:

```typescript
import { WebClient } from '@slack/web-api';

async function notifySlack(webhookUrl: string) {
  const result = await updateAppSpecs('/specs');

  const message = {
    text: `📊 Project Status Update`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Project Status Update*\n\n` +
                `Overall: ${result.completionPercentage}% complete\n` +
                `✅ Completed: ${result.completed}\n` +
                `🟡 In Progress: ${result.inProgress}\n` +
                `⏳ Planned: ${result.planned}`
        }
      }
    ]
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
}
```

### Jira Integration

Sync completion status to Jira:

```typescript
import JiraApi from 'jira-client';

async function syncToJira() {
  const jira = new JiraApi({
    protocol: 'https',
    host: 'your-domain.atlassian.net',
    username: process.env.JIRA_EMAIL,
    password: process.env.JIRA_API_TOKEN,
    apiVersion: '2',
    strictSSL: true
  });

  const features = await scanSpecsDirectory('/specs');

  for (const feature of features) {
    // Find corresponding Jira issue
    const issueKey = feature.metadata?.jiraKey;

    if (!issueKey) continue;

    // Update issue with completion %
    await jira.updateIssue(issueKey, {
      fields: {
        customfield_10001: feature.completionPercentage, // Custom field for %
        status: mapStatus(feature.status)
      }
    });
  }
}
```

### Notion Integration

Export to Notion database:

```typescript
import { Client } from '@notionhq/client';

async function syncToNotion() {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  const features = await scanSpecsDirectory('/specs');

  for (const feature of features) {
    await notion.pages.create({
      parent: { database_id: process.env.NOTION_DB_ID },
      properties: {
        Name: { title: [{ text: { content: feature.title } }] },
        Category: { select: { name: feature.category } },
        Status: { select: { name: feature.status } },
        'Completion %': { number: feature.completionPercentage }
      }
    });
  }
}
```

## Performance Optimization

### Caching

Implement caching for faster regeneration:

```typescript
interface CacheEntry {
  hash: string;
  data: Feature;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();

async function scanWithCache(directory: string): Promise<Feature[]> {
  const folders = await readdir(directory);
  const features: Feature[] = [];

  for (const folder of folders) {
    const folderPath = path.join(directory, folder);
    const hash = await getDirectoryHash(folderPath);

    // Check cache
    const cached = cache.get(folderPath);
    if (cached && cached.hash === hash) {
      features.push(cached.data);
      continue;
    }

    // Parse and cache
    const feature = await parseFeature(folderPath);
    cache.set(folderPath, { hash, data: feature, timestamp: Date.now() });
    features.push(feature);
  }

  return features;
}
```

### Parallel Processing

Process features in parallel:

```typescript
async function scanParallel(directory: string): Promise<Feature[]> {
  const folders = await readdir(directory);

  const features = await Promise.all(
    folders.map(folder =>
      parseFeature(path.join(directory, folder))
    )
  );

  return features.filter(Boolean);
}
```

### Incremental Updates

Only update changed features:

```typescript
async function incrementalUpdate(directory: string) {
  const existingDoc = await readExistingDoc();
  const lastUpdate = existingDoc.timestamp;

  const folders = await readdir(directory);

  const changedFeatures = [];

  for (const folder of folders) {
    const folderPath = path.join(directory, folder);
    const stats = await stat(folderPath);

    if (stats.mtime > lastUpdate) {
      changedFeatures.push(await parseFeature(folderPath));
    }
  }

  // Merge with existing data
  const updated = mergeFeatures(existingDoc.features, changedFeatures);

  return generateDocument(updated);
}
```

## Testing

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { parseMarkdown, calculateCompletion } from './parser';

describe('Parser', () => {
  it('should count checkboxes correctly', () => {
    const content = `
- [x] Task 1
- [x] Task 2
- [ ] Task 3
    `;

    const result = calculateCompletion(content);

    expect(result.completed).toBe(2);
    expect(result.total).toBe(3);
    expect(result.percentage).toBe(67);
  });

  it('should extract title from markdown', () => {
    const content = '# Feature Title\n\nDescription here';

    const result = parseMarkdown(content);

    expect(result.title).toBe('Feature Title');
  });
});
```

### Integration Tests

```typescript
describe('Generator Integration', () => {
  it('should generate valid markdown', async () => {
    const result = await updateAppSpecs('./test-fixtures');

    expect(result.featuresCount).toBeGreaterThan(0);
    expect(result.completionPercentage).toBeGreaterThanOrEqual(0);
    expect(result.completionPercentage).toBeLessThanOrEqual(100);

    const doc = await readFile(result.outputPath, 'utf-8');

    expect(doc).toContain('# App Specifications');
    expect(doc).toContain('## Status Dashboard');
  });
});
```

This guide covers advanced use cases. For basic usage, refer to the main SKILL.md documentation.
