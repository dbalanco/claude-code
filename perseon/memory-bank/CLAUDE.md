# Claude Development Context

<!-- TEMPLATE VERSION: 3.0.0 -->
<!-- DO NOT EDIT ABOVE THIS LINE -->
<!-- PRESERVE: This section is updated by /init but never deleted -->

## Development Standards

**Always follow:**
- Vibe-coding approach with iterative delivery
- Platform-first thinking (web/mobile/both)
- Test before commit
- Atomic, semantic commits
- Documentation-driven development
- Security by default
- Performance first

**Development Philosophy:**
- **Platform-First Thinking**: Adapt based on web-first, mobile-first, or cross-platform needs
- **Responsive by Default**: All UIs scale cleanly across devices
- **Iterative Delivery**: Build in small, tested chunks with clear communication
- **Quality First**: Every feature ships with tests, documentation, and security
- **Type Safety**: Zod validation and TypeScript strict mode everywhere
- **Performance**: Streaming, Suspense, and optimization by default

---

## Output Format

Use this structure in every development session:

### 1. Requirements Summary
- Task: [What needs to be built]
- Platform Priority: [Web/Mobile/Both]
- User Context: [Who uses this and how]
- Technical Constraints: [Performance, accessibility, integrations, security]
- Clarifying Questions: [Any ambiguities]

### 2. Architecture Plan
- Folder Structure: [Component organization]
- Stack: [Technologies and frameworks]
- APIs: [External services and integrations]
- Performance Strategy: [Streaming, caching, optimization]
- Security Considerations: [Auth, validation, rate limiting]
- Testing Approach: [Unit, integration, E2E coverage]

### 3. Feature: [Feature Name]

#### Implementation Approach
- Server components vs client components
- Server actions vs API routes
- State management strategy
- Error handling approach

#### Code Diff
```language filepath:path/to/file
[Code implementation]
```

#### Tests
```bash
[Test execution commands and results]
```

#### Security Checklist
- [ ] Input validation with Zod
- [ ] Authentication checked
- [ ] Rate limiting applied
- [ ] CSRF protection (if needed)
- [ ] SQL injection prevention

#### Performance Checklist
- [ ] Streaming/Suspense used
- [ ] Images optimized
- [ ] Code splitting applied
- [ ] Caching strategy defined

#### Commit Message
`type(scope): description`

### 4. Feedback Prompt
> "Is this working as expected? Want to change or add anything?"

### 5. Platform Notes
- **Web**: [SEO, accessibility, keyboard support]
- **Mobile**: [Touch, gestures, performance]
- **Backend**: [API design, security, scalability]
- **Testing**: [Coverage, edge cases]

---

## Success Metrics

- **Dev Flow**: Clear steps, atomic commits, test coverage
- **Web Quality**: SEO, LCP < 2.5s, keyboard support, WCAG 2.1 compliance
- **Mobile Quality**: 60fps, battery-efficient, touch-friendly
- **Backend Reliability**: Fast APIs, clean schema, secure auth
- **Security**: Input validation, rate limiting, CSRF protection
- **Performance**: Streaming, code splitting, optimized assets
- **Testing**: 80%+ coverage, E2E for critical flows

---

<!-- DO NOT EDIT ABOVE THIS LINE -->
<!-- PROJECT_CONTEXT: Content below is populated during /init -->


## Project Information

**Project:** [INIT: Auto-populate from package.json name]
**Purpose:** [INIT: Auto-populate from package.json description or prompt user]
**Stack:** [INIT: Detect from package.json dependencies]
**Target Platforms:** [INIT: Prompt user - Web/Mobile/Desktop/All]

**Primary Technologies:**
- Framework: [INIT: Next.js version]
- Language: [INIT: TypeScript/JavaScript]
- Styling: [INIT: Tailwind/CSS-in-JS/etc]
- Database: [INIT: Detect or prompt]
- ORM: [INIT: Prisma/Drizzle/etc]
- Auth: [INIT: Detect or prompt]
- State Management: [INIT: React Query/Zustand/etc]
- Testing: [INIT: Vitest/Jest + Playwright]
- Deployment: [INIT: Vercel/Docker/etc]

---

## Related Documents

**Core Documentation:**
- `README.md` - Setup and installation instructions
- `ARCHITECTURE.md` - Master patterns guide (HOW to build)
- `APP_STRUCTURE.md` - Current app state (WHAT exists)
- `/memory-bank/changelog.md` - Version history and changes

**Documentation System:**
- **ARCHITECTURE.md** = Static patterns and principles (rarely changes)
- **APP_STRUCTURE.md** = Live state tracking (updates frequently)
- Check ARCHITECTURE.md for HOW to build
- Update APP_STRUCTURE.md for WHAT currently exists

---

## Development Conventions

[INIT: Extract from ARCHITECTURE.md and project setup]

### Code Organization

**Feature-First Structure:**
```
src/features/[feature-name]/
├── actions/       # Server actions
├── components/    # UI components
├── hooks/         # React hooks
├── services/      # Business logic
├── schemas/       # Zod validation
├── types/         # TypeScript types
├── constants/     # Feature constants
├── lib/           # Feature utilities
└── index.ts       # Public exports
```

**File Placement:**
- Pages/Routes → `app/(group)/[route]/page.tsx`
- API Endpoints → `app/api/[resource]/route.ts`
- Server Actions → `features/[feature-name]/actions/`
- Domain Logic → `features/[feature-name]/`
- Infrastructure → `core/[category]/`
- Reusable UI → `shared/components/`
- Utilities → `shared/utils/` or `shared/lib/`

### Naming Patterns

- Files: `kebab-case.tsx`
- Components: `PascalCase`
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Server Actions: `[action]Action` (e.g., `createItemAction`)
- API Routes: `route.ts` with HTTP method exports

### Import Order

1. React/Next.js
2. External libraries
3. Internal features (`@/features/*`)
4. Core infrastructure (`@/core/*`)
5. Shared components/utils (`@/shared/*`)
6. Types
7. Styles

### Component Patterns

**Server Components (default):**
```tsx
// No 'use client' directive
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}
```

**Client Components (when needed):**
```tsx
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [state, setState] = useState();
  // React hooks, event handlers, browser APIs
}
```

**Use client components for:**
- React hooks (useState, useEffect, useContext)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Third-party hooks (useQuery, useForm)

### Testing Requirements

**Unit Tests:**
- All services and business logic
- Complex utilities
- Custom hooks
- Target: 80%+ coverage

**Integration Tests:**
- All API routes
- Server actions
- Database operations
- External service integrations

**Component Tests:**
- Complex UI components
- Forms with validation
- Interactive features

**E2E Tests:**
- Critical user flows
- Authentication flows
- Key feature workflows
- Payment/checkout processes

### Security Requirements

**Every Feature Must Have:**
- [ ] Input validation with Zod
- [ ] Authentication checks
- [ ] Authorization logic
- [ ] Rate limiting (for API routes)
- [ ] CSRF protection (for sensitive actions)
- [ ] XSS prevention
- [ ] SQL injection prevention

### Performance Requirements

**Every Page/Component Should:**
- [ ] Use server components when possible
- [ ] Implement streaming with Suspense
- [ ] Optimize images with Next.js Image
- [ ] Apply code splitting
- [ ] Use proper caching strategies
- [ ] Minimize client-side JavaScript

### Commit Standards

```
<type>(scope): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting changes
- `refactor`: Code restructuring
- `test`: Adding tests
- `perf`: Performance improvements
- `security`: Security improvements
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(items): add create item server action with validation
fix(auth): resolve race condition in session refresh
security(api): add rate limiting to all endpoints
perf(items): implement streaming for item list
test(items): add E2E tests for item creation flow
```

---


## Feature Development Workflow

### 1. Check Current State

```bash
# See what exists
cat APP_STRUCTURE.md

# Check patterns
cat ARCHITECTURE.md
```

### 2. Plan Feature

- Define scope and boundaries
- Identify required components
- Plan state management approach
- Consider performance implications
- Identify security requirements
- Plan testing strategy

### 3. Create Feature Structure

```bash
mkdir -p src/features/[feature-name]/{actions,components,hooks,services,schemas,types,lib}
```

### 4. Implement Bottom-Up

1. **Types** (`types/index.ts`)
   - Define TypeScript interfaces
   - Export all types

2. **Schemas** (`schemas/[feature].schema.ts`)
   - Create Zod validation schemas
   - Export schema types

3. **Services** (`services/[feature].service.ts`)
   - Implement business logic
   - Database operations
   - External API calls

4. **Server Actions** (`actions/[action].ts`)
   - Create server actions for mutations
   - Add revalidation logic
   - Handle errors

5. **Hooks** (`hooks/use[Feature].ts`)
   - React Query hooks for data fetching
   - Mutation hooks
   - Custom hooks for logic

6. **Components** (`components/`)
   - Build UI components
   - Form components
   - Display components

7. **Public API** (`index.ts`)
   - Export public interface
   - Hide implementation details

### 5. Create API Routes (if needed)

```bash
mkdir -p src/app/api/[resource]
# Create route.ts with HTTP methods
```

### 6. Create Pages

```bash
mkdir -p src/app/(group)/[route]
# Create page.tsx, loading.tsx, error.tsx
```

### 7. Add Tests

```bash
# Unit tests
tests/unit/features/[feature-name]/services/[feature].service.test.ts

# Component tests
tests/unit/features/[feature-name]/components/[Component].test.tsx

# Integration tests
tests/integration/api/[resource].test.ts

# E2E tests
tests/e2e/[feature-name]/[flow].spec.ts
```

### 8. Update Documentation

- Update APP_STRUCTURE.md
  - Add feature to "Implemented Features"
  - Document routes
  - List API endpoints
  - Update component inventory

- Update CHANGELOG.md
  - Add to [Unreleased] section
  - Describe changes

### 9. Security Review

- [ ] All inputs validated with Zod
- [ ] Authentication implemented
- [ ] Authorization checked
- [ ] Rate limiting added
- [ ] CSRF protection (if needed)
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Sensitive data encrypted

### 10. Performance Review

- [ ] Server components used where possible
- [ ] Streaming implemented
- [ ] Images optimized
- [ ] Code splitting applied
- [ ] Caching strategy implemented
- [ ] No unnecessary client-side JS

### 11. Test and Commit

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Type check
npm run type-check

# Commit
git add .
git commit -m "feat([feature-name]): add feature with tests and documentation"
git push
```

---

## Documentation Maintenance

### ARCHITECTURE.md - Master Patterns Guide

**Purpose:** Defines HOW to build features across ALL projects

**Never modified by /init**
- Contains reusable patterns and principles
- Copied to every new project unchanged
- Only updated when discovering new architectural patterns
- Reference guide for file placement and structure

**When to Update ARCHITECTURE.md:**
- Discovering new architectural patterns (rare)
- Refining core principles (rare)
- Adding new framework conventions (rare)
- **Never** for project-specific changes

---

### APP_STRUCTURE.md - Live State Tracker

**Purpose:** Documents WHAT currently exists in THIS specific project

**Updated during /init:**
- Scans current codebase structure
- Documents existing routes and features
- Lists implemented API endpoints
- Inventories components and services
- Sets initial status indicators

**Maintained Manually After /init:**
- ✅ After adding a new feature module
- ✅ After creating new routes or pages
- ✅ After adding API endpoints
- ✅ When completing features (change 🚧 to ✅)
- ✅ When changing project structure significantly
- ✅ After modifying database schema
- ✅ After adding/removing environment variables
- ✅ After security updates
- ✅ After performance optimizations

**Update Process:**
1. Make code changes
2. Update APP_STRUCTURE.md to reflect changes
3. Update CHANGELOG.md with changes
4. Commit both code and documentation together

```bash
# After making changes:
git add .
git commit -m "feat(feature): add feature with documentation"
```

---

### CHANGELOG.md - Version History

**Purpose:** Track all changes to the project over time

**Updated for every meaningful change:**
- Follow Keep a Changelog format
- Use Semantic Versioning
- Update [Unreleased] section as you work
- Create version entries for releases

---

## /init Command Behavior

### What /init Does

When you run `claude code /init`:

1. **Reads ARCHITECTURE.md**
   - Extracts patterns and conventions
   - Uses as reference for project standards
   - Never modifies this file

2. **Scans Current Project**
   - Analyzes package.json for tech stack
   - Scans src/ directory structure
   - Identifies existing features and routes
   - Detects API endpoints
   - Lists environment variables
   - Checks testing setup
   - Identifies security measures

3. **Updates This File (CLAUDE.md)**
   - Populates [INIT] placeholders in Project Information
   - Fills in detected technologies and stack
   - Preserves [PRESERVE] sections unchanged
   - Adds Quick Reference based on project

4. **Updates APP_STRUCTURE.md**
   - Documents all discovered routes (✅ if exists)
   - Lists all features with status indicators
   - Inventories API endpoints
   - Documents database schema (if accessible)
   - Lists environment variables
   - Documents testing status
   - Lists security measures
   - Updates "Last Updated" timestamp

5. **Creates Initial CHANGELOG.md Entry** (if file is empty/template)
   - Adds v0.1.0 Initial Setup entry
   - Preserves existing entries if present

## Pattern Reference

### When to Use Server Actions vs API Routes

**Use Server Actions:**
- ✅ Form submissions
- ✅ Mutations from client components
- ✅ Simple CRUD operations
- ✅ When revalidation is needed
- ✅ Progressive enhancement

**Use API Routes:**
- ✅ Webhooks from external services
- ✅ Complex request/response handling
- ✅ When you need custom headers
- ✅ RESTful API for external consumption
- ✅ Rate limiting per endpoint

### When to Use Different State Management

**Server State (React Query):**
- ✅ Data fetching from APIs
- ✅ Cache management
- ✅ Automatic refetching
- ✅ Optimistic updates

**URL State (Search Params):**
- ✅ Filters and sorting
- ✅ Pagination
- ✅ Shareable state
- ✅ Browser history

**Form State (react-hook-form):**
- ✅ Complex forms
- ✅ Validation with Zod
- ✅ Multi-step forms
- ✅ Field-level validation

**Global UI State (Zustand):**
- ✅ Theme preferences
- ✅ Sidebar state
- ✅ UI-only state
- ✅ Cross-component state

### When to Add Tests

**Unit Tests (Always):**
- All services and business logic
- Complex utilities
- Custom hooks
- Validation schemas

**Integration Tests (Always):**
- All API routes
- Server actions
- Database operations
- External service integrations

**Component Tests (When Needed):**
- Complex UI components
- Forms with validation
- Interactive features
- Conditional rendering

**E2E Tests (Critical Paths):**
- Authentication flow
- Checkout/payment flow
- Key feature workflows
- Data creation flows

---

## Security Checklist

### For Every Feature

- [ ] Input validation with Zod at API boundaries
- [ ] Authentication checked in protected routes
- [ ] Authorization logic for user-owned resources
- [ ] Rate limiting for API endpoints
- [ ] CSRF protection for sensitive actions
- [ ] XSS prevention (sanitize HTML if rendering user content)
- [ ] SQL injection prevention (use Prisma parameterized queries)
- [ ] Sensitive data not logged
- [ ] Error messages don't leak sensitive info
- [ ] File uploads validated and sanitized

### For API Routes

- [ ] Authentication middleware applied
- [ ] Rate limiting configured
- [ ] Request validation with Zod
- [ ] Error handling doesn't expose internals
- [ ] CORS configured if needed
- [ ] Security headers set

### For Server Actions

- [ ] CSRF token validated
- [ ] User authentication checked
- [ ] Authorization verified
- [ ] Input validated with Zod
- [ ] Proper error handling
- [ ] Revalidation paths secured

---

## Performance Checklist

### For Every Page

- [ ] Server components used by default
- [ ] Streaming with Suspense implemented
- [ ] Loading states defined
- [ ] Error boundaries in place
- [ ] Images optimized with Next.js Image
- [ ] Fonts optimized
- [ ] Code splitting applied

### For API Routes

- [ ] Caching strategy defined
- [ ] Database queries optimized
- [ ] N+1 queries prevented
- [ ] Pagination implemented
- [ ] Rate limiting prevents abuse

### For Client Components

- [ ] Minimal client-side JavaScript
- [ ] Heavy components lazy loaded
- [ ] Proper memoization (useMemo, useCallback)
- [ ] Virtualization for long lists
- [ ] Debouncing for search inputs

---

## Status Indicators

Use these consistently in APP_STRUCTURE.md:

- ✅ **Implemented** - Feature is complete and working
- 🚧 **In Progress** - Currently being developed
- 📋 **Planned** - Scheduled for future development
- ⬜ **Not Started** - Acknowledged but no work begun
- ❌ **Deprecated** - No longer used/removed
- 🔒 **Security Review** - Needs security review
- ⚡ **Performance Review** - Needs performance optimization

---

## Critical Reminders

**For Claude:**
- ALWAYS check ARCHITECTURE.md for implementation patterns
- ALWAYS check APP_STRUCTURE.md for current project state
- ALWAYS update APP_STRUCTURE.md when adding features
- ALWAYS update CHANGELOG.md for significant changes
- NEVER modify ARCHITECTURE.md during normal development
- PRESERVE all [PRESERVE] marked sections
- Follow the output format for every response
- Include security and performance considerations
- Add tests before marking feature complete
- Use server components by default
- Validate all inputs with Zod
- Apply rate limiting to API routes

**For Developers:**
- Run /init after cloning template
- Review generated documentation
- Keep APP_STRUCTURE.md current
- Update CHANGELOG.md as you work
- Reference ARCHITECTURE.md for patterns
- Never edit [INIT] sections manually (let /init handle them)
- Test before committing
- Security review before deploying
- Performance optimization before production

---

<!-- END OF TEMPLATE -->
<!-- Everything below this line is preserved during /init -->

## Project-Specific Notes

[PRESERVE: Add any project-specific notes, decisions, or context here]

### Architecture Decisions

[PRESERVE: Document key architectural decisions made for this project]

### Known Issues

[PRESERVE: Track known issues or technical debt]

### Future Improvements

[PRESERVE: Ideas for future enhancements]