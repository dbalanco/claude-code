# Output Format Reference

This reference documents the structure and sections of the generated `app-specs.md` file.

## Document Structure

The generated documentation follows this consistent structure:

```markdown
# App Specifications

**Last Updated**: [Timestamp]
**Overall Completion**: [X]%

[Status Dashboard]
[Table of Contents]
[Overview]
[Completed Features]
[In-Progress Features]
[Planned Features]
[Technology Stack]
[Database Schema]
[Detailed Specifications]
[Footer]
```

## Section Details

### 1. Header

```markdown
# App Specifications

**Last Updated**: December 16, 2025 at 7:30 PM
**Overall Completion**: 67%
```

**Contains:**
- Document title
- Last generation timestamp
- Overall project completion percentage

### 2. Status Dashboard

A table showing progress by category:

```markdown
## Status Dashboard

| Category | Completed | In Progress | Planned | Total | Completion % |
|----------|-----------|-------------|---------|-------|--------------|
| Foundation | 5 | 1 | 0 | 6 | 83% |
| GitHub Integration | 3 | 2 | 1 | 6 | 50% |
| UX Enhancements | 2 | 1 | 2 | 5 | 40% |
| **Overall** | **10** | **4** | **3** | **17** | **67%** |
```

**Purpose:**
- High-level overview of progress
- Quick identification of focus areas
- Stakeholder-friendly metrics

### 3. Table of Contents

Navigation links to major sections:

```markdown
## Table of Contents

1. [Overview](#overview)
2. [Completed Features](#completed-features)
3. [In-Progress Features](#in-progress-features)
4. [Planned Features](#planned-features)
5. [Technology Stack](#technology-stack)
6. [Database Schema](#database-schema)
7. [Detailed Specifications](#detailed-specifications)
```

**Purpose:**
- Quick navigation in long documents
- Better readability for stakeholders

### 4. Overview

High-level project description:

```markdown
## Overview

This document tracks the implementation progress of all features in the [Project Name] project.
Features are organized by status and category, with detailed specifications linked for each item.

**Project Status**: 67% complete (10 of 17 features completed)
**Active Development**: 4 features in progress
**Planned Work**: 3 features queued
```

**Customization:**
Can be customized in `scripts/generator.ts` to include:
- Project goals
- Timeline information
- Key milestones
- Team information

### 5. Completed Features

List of features at 100% completion:

```markdown
## Completed Features (10)

✅ **User Authentication** (Foundation)
   - OAuth 2.0 implementation
   - Session management
   - Password reset flow

✅ **GitHub Repository Sync** (GitHub Integration)
   - Webhook integration
   - Real-time updates
   - Conflict resolution

[... more completed features]
```

**Format:**
- Status icon (✅)
- Feature title in bold
- Category in parentheses
- Optional bullet points for key components

### 6. In-Progress Features

Features with partial completion:

```markdown
## In-Progress Features (4)

🟡 **Dark Mode Support** (UX Enhancements) - 75% complete
   - Theme switching implemented
   - Component updates in progress
   - [Implementation Plan](./ux/dark-mode/implementation-plan.md)

🟡 **API Rate Limiting** (Performance) - 40% complete
   - Rate limiter configured
   - Testing pending
   - [Implementation Plan](./performance/rate-limiting/implementation-plan.md)

[... more in-progress features]
```

**Format:**
- Status icon (🟡)
- Feature title in bold
- Category in parentheses
- Completion percentage
- Key deliverables
- Link to implementation plan

### 7. Planned Features

Features not yet started:

```markdown
## Planned Features (3)

⏳ **Email Notifications** (Notifications)
   - Effort estimate: 2 weeks
   - Target date: Q1 2025
   - [Requirements](./notifications/email/requirements.md)

⏳ **Analytics Dashboard** (Analytics & Monitoring)
   - Effort estimate: 3 weeks
   - Dependencies: Database schema updates
   - [Requirements](./analytics/dashboard/requirements.md)

[... more planned features]
```

**Format:**
- Status icon (⏳)
- Feature title in bold
- Category in parentheses
- Effort estimate (if available)
- Target date (if available)
- Dependencies (if any)
- Link to requirements document

### 8. Technology Stack

Dependencies extracted from `package.json`:

```markdown
## Technology Stack

### Frontend
- **React** - v18.2.0
- **Next.js** - v15.0.0
- **Tailwind CSS** - v3.4.0
- **shadcn/ui** - Latest

### Backend
- **Node.js** - v20.x
- **Drizzle ORM** - v0.30.0
- **PostgreSQL** - v15

### Development Tools
- **TypeScript** - v5.3.0
- **ESLint** - v8.56.0
- **Prettier** - v3.2.0
```

**Extraction logic:**
1. Reads `package.json` from project root
2. Groups by `dependencies` and `devDependencies`
3. Optionally categorizes by type (frontend/backend/tools)
4. Includes version numbers

**Customization:**
Can be modified in `scripts/generator.ts` to:
- Group by custom categories
- Filter specific packages
- Add descriptions
- Include peer dependencies

### 9. Database Schema

Models extracted from `prisma/schema.prisma`:

```markdown
## Database Schema

### Core Models

**User**
- id: String (Primary Key)
- email: String (Unique)
- name: String
- createdAt: DateTime
- updatedAt: DateTime

**Project**
- id: String (Primary Key)
- name: String
- description: String
- ownerId: String (Foreign Key → User)
- createdAt: DateTime
- updatedAt: DateTime

**Feature**
- id: String (Primary Key)
- title: String
- status: Enum (planned, in_progress, completed)
- projectId: String (Foreign Key → Project)
- createdAt: DateTime
- updatedAt: DateTime

[... more models]
```

**Extraction logic:**
1. Parses `prisma/schema.prisma` if exists
2. Extracts model definitions
3. Lists fields with types
4. Identifies relationships

**Customization:**
Can be enhanced to include:
- Enum definitions
- Indexes
- Constraints
- Relationships diagram

### 10. Detailed Specifications

Per-feature breakdowns with full details:

```markdown
## Detailed Specifications

### User Authentication (Foundation)

**Status**: ✅ Completed (100%)

**Description**:
Comprehensive authentication system with OAuth 2.0, session management, and password reset functionality.

**Implementation Details**:
- OAuth providers: GitHub, Google
- Session storage: Redis
- Token expiration: 30 days
- Password requirements: Min 8 chars, uppercase, lowercase, number

**Checkboxes**: 12/12 completed

**Files**:
- [Requirements](./auth/user-authentication/requirements.md)
- [Implementation Plan](./auth/user-authentication/implementation-plan.md)

---

[... more detailed specs]
```

**Format:**
- Feature title with category
- Status icon and percentage
- Description
- Implementation details
- Checkbox count
- Links to spec files

### 11. Footer

Generation metadata:

```markdown
---

**Generated by**: App Spec Generator v1.0.0
**Timestamp**: December 16, 2025 at 7:30 PM
**Features Processed**: 17
**Categories**: 8

For issues or updates, regenerate using `/update-specs`.
```

## Customization Examples

### Example 1: Add Project Links

```typescript
// In scripts/generator.ts
const header = `
# ${projectName} Specifications

**Project**: [${projectName}](https://github.com/org/repo)
**Documentation**: [Wiki](https://github.com/org/repo/wiki)
**Last Updated**: ${timestamp}
`;
```

### Example 2: Add Team Information

```typescript
const overview = `
## Overview

**Project Lead**: Jane Doe
**Team Size**: 5 developers
**Sprint**: Sprint 12 (Week 3)
...
`;
```

### Example 3: Custom Status Icons

```typescript
const statusIcons = {
  completed: '🎉',    // Party popper
  inProgress: '🚧',   // Construction
  planned: '📋',      // Clipboard
  blocked: '🚫'       // Blocked
};
```

### Example 4: Add Effort Estimates

```typescript
// Extract from frontmatter
const effort = extractEffortEstimate(content);

const featureEntry = `
${icon} **${title}** (${category})
   - Effort: ${effort} days
   - Completion: ${percentage}%
`;
```

## Output File Locations

### Default Location

```
/specs/app-specs.md
```

### Custom Locations

Can be configured in `scripts/update.ts`:

```typescript
// In project root
const output = path.join(process.cwd(), 'PROJECT-STATUS.md');

// In docs folder
const output = path.join(process.cwd(), 'docs', 'status.md');

// Multiple outputs
generateDocs('/specs/app-specs.md');
generateDocs('/docs/README.md');
```

## File Size Considerations

**Typical sizes:**
- 10 features: ~5-10 KB
- 50 features: ~25-50 KB
- 100+ features: ~50-100 KB

**For large projects:**
- Consider splitting by category
- Generate multiple files
- Add pagination
- Use summary + detail pattern

## Version Control

**Recommended `.gitignore` entry:**

```gitignore
# Auto-generated docs (optional)
/specs/app-specs.md

# Archive folders
/specs/.archive/
```

**Or commit for tracking:**

```gitignore
# Keep auto-generated docs in version control
!/specs/app-specs.md
```

## Validation

The generator validates output for:
- ✅ Valid markdown syntax
- ✅ Working internal links
- ✅ Proper heading hierarchy
- ✅ Consistent formatting
- ✅ No duplicate sections

Validation logic is in `scripts/generator.ts`.
