# App Structure

**Purpose:** Live documentation of what currently exists in THIS application.

**Created:** [INIT: YYYY-MM-DD]  
**Last Updated:** [INIT: YYYY-MM-DD HH:mm]  
**Version:** 0.1.0

> **Note:** This file tracks the current state of your app. Updated by `/init` on first run and maintained manually during development.

---

## 📊 Project Overview

**App Name:** [INIT: From package.json name]  
**Description:** [INIT: From package.json description or prompt]  
**Tech Stack:** [INIT: Detected from dependencies]  
**Target Platform:** [INIT: Prompt user - Web/Mobile/Desktop/All]

**Key Technologies:**
[INIT: Auto-populate from package.json dependencies]
- Framework: Next.js [version]
- Language: TypeScript [version]
- Styling: [Tailwind/styled-components/etc]
- Database: [PostgreSQL/MySQL/MongoDB/Supabase/etc]
- ORM: [Prisma/Drizzle/etc]
- Auth: [NextAuth/Supabase Auth/Clerk/etc]
- State: [React Query/Zustand/etc]
- Testing: [Vitest + Playwright/Jest + Cypress]
- Deployment: [Vercel/Docker/AWS/etc]

**Project Stats:**
- Total Routes: [INIT: Count]
- API Endpoints: [INIT: Count]
- Features: [INIT: Count]
- Components: [INIT: Count]
- Test Coverage: [INIT: Calculate or "Not configured"]

---

## ✅ Current Features

### Implemented Features

[INIT: Scan src/features/ and mark existing folders as ✅]

*Features that are fully built and working*

[EXAMPLE FORMAT - REMOVE AFTER /init]
- **auth** ✅ - User authentication system
  - Email/password login and signup
  - OAuth providers (Google, GitHub)
  - Password reset flow
  - Session management with NextAuth.js
  - Protected routes via middleware
  - Rate limiting on auth endpoints
  - CSRF protection

[INIT: Replace examples with actual features found]

---

### 🚧 In Progress

*Features currently being developed*

[INIT: Leave empty on first run]
[MANUAL: Add features during development]

[EXAMPLE FORMAT - REMOVE AFTER /init]
- **[feature-name]** 🚧 - [Brief description]
  - [x] Types and schemas defined
  - [x] Service layer implemented
  - [x] Server actions created
  - [ ] Components created
  - [ ] API routes added (if needed)
  - [ ] Tests written
  - [ ] Security review completed
  - [ ] Performance optimization done

---

### 📋 Planned Features

*Features planned for future development (priority order)*

[INIT: Leave empty on first run]
[MANUAL: Add planned features]

[EXAMPLE FORMAT - REMOVE AFTER /init]
1. **[feature-name]** 📋 - [Brief description and business value]
2. **[feature-name]** 📋 - [Brief description and business value]

---

## 🗺️ Route Structure

[INIT: Scan app/ directory and document all routes with status]

### Public Routes (Marketing)

```
[INIT: Scan app/(marketing) or similar]
app/
├── (marketing)/
│   ├── page.tsx            [INIT: ✅ if exists, 📋 if missing]
│   ├── about/
│   │   └── page.tsx        [INIT: Status]
│   ├── pricing/
│   │   └── page.tsx        [INIT: Status]
│   ├── blog/
│   │   ├── page.tsx        [INIT: Status]
│   │   └── [slug]/
│   │       └── page.tsx    [INIT: Status]
│   ├── loading.tsx         [INIT: Status]
│   ├── error.tsx           [INIT: Status]
│   └── layout.tsx          [INIT: Status]
```

### Authentication Routes

```
[INIT: Scan app/(auth) or similar]
app/
├── (auth)/
│   ├── login/
│   │   ├── page.tsx        [INIT: Status]
│   │   ├── loading.tsx     [INIT: Status]
│   │   └── error.tsx       [INIT: Status]
│   ├── signup/
│   │   └── page.tsx        [INIT: Status]
│   ├── forgot-password/
│   │   └── page.tsx        [INIT: Status]
│   ├── reset-password/
│   │   └── page.tsx        [INIT: Status]
│   └── layout.tsx          [INIT: Status]
```

### Protected Routes (Dashboard)

```
[INIT: Scan app/(dashboard) or similar]
app/
├── (dashboard)/
│   ├── dashboard/
│   │   ├── page.tsx        [INIT: Status]
│   │   ├── loading.tsx     [INIT: Status]
│   │   └── error.tsx       [INIT: Status]
│   ├── settings/
│   │   ├── page.tsx        [INIT: Status]
│   │   ├── profile/
│   │   │   └── page.tsx    [INIT: Status]
│   │   └── security/
│   │       └── page.tsx    [INIT: Status]
│   ├── [feature-routes]/   [INIT: List discovered routes]
│   ├── layout.tsx          [INIT: Status]
│   └── error.tsx           [INIT: Status]
```

### Admin Routes (If applicable)

```
[INIT: Scan app/(admin) if exists]
app/
├── (admin)/
│   ├── dashboard/
│   │   └── page.tsx        [INIT: Status]
│   └── layout.tsx          [INIT: Status]
```

**Route Statistics:**
- Total Pages: [INIT: Count]
- With Loading States: [INIT: Count]
- With Error Boundaries: [INIT: Count]
- Using Suspense: [INIT: Count]

---

## 🔌 API Endpoints

[INIT: Scan app/api/ directory and detect HTTP methods]

### Authentication

[INIT: Scan app/api/auth/]

| Method | Endpoint | Status | Rate Limit | Description |
|--------|----------|--------|------------|-------------|
[INIT: List all discovered auth endpoints with methods]

[EXAMPLE - REMOVE AFTER /init]
| POST | `/api/auth/signup` | ✅ | 5/min | Create new user account |
| POST | `/api/auth/login` | ✅ | 10/min | Authenticate user |
| POST | `/api/auth/logout` | ✅ | - | End user session |
| GET | `/api/auth/session` | ✅ | - | Get current session |

### [Feature Name]

[INIT: Create section for each feature with API endpoints]

| Method | Endpoint | Status | Rate Limit | Description |
|--------|----------|--------|------------|-------------|
[INIT: Populate from discovered routes]

**API Statistics:**
- Total Endpoints: [INIT: Count]
- With Rate Limiting: [INIT: Count]
- With Authentication: [INIT: Count]
- With Validation: [INIT: Count]

---

## ⚡ Server Actions

[INIT: Scan features/*/actions/ directories]

### [Feature Name] Actions

| Action | File | Revalidates | Security | Status |
|--------|------|-------------|----------|--------|
[INIT: List discovered server actions]

[EXAMPLE - REMOVE AFTER /init]
| createItem | `actions/create-item.ts` | `/dashboard/items` | ✅ Auth + CSRF | ✅ |
| updateItem | `actions/update-item.ts` | `/dashboard/items/[id]` | ✅ Auth + Owner | ✅ |

**Server Actions Statistics:**
- Total Actions: [INIT: Count]
- With CSRF Protection: [INIT: Count]
- With Auth Checks: [INIT: Count]

---

## 📂 Feature Modules

[INIT: Scan src/features/ directory]

### Implemented

[INIT: List features with complete folder structure]

```
src/features/
├── [feature-name]/         [INIT: ✅ if complete]
│   ├── actions/            [INIT: ✅ if exists]
│   │   ├── create-item.ts
│   │   └── update-item.ts
│   ├── components/         [INIT: ✅ with count]
│   │   ├── ItemCard.tsx
│   │   ├── ItemList.tsx
│   │   └── ItemForm.tsx
│   ├── hooks/              [INIT: ✅ with count]
│   │   ├── useItems.ts
│   │   └── useItemMutations.ts
│   ├── services/           [INIT: ✅ if exists]
│   │   └── item.service.ts
│   ├── schemas/            [INIT: ✅ if exists]
│   │   └── item.schema.ts
│   ├── types/              [INIT: ✅ if exists]
│   │   └── index.ts
│   ├── constants/          [INIT: Status]
│   ├── lib/                [INIT: Status]
│   └── index.ts            [INIT: ✅ if exists]
```

### In Progress

[INIT: List features with incomplete structure]

```
src/features/
├── [feature-name]/         [INIT: 🚧 if partially complete]
│   ├── actions/            [INIT: Status]
│   ├── components/         [INIT: Status]
│   ├── hooks/              [INIT: Status]
│   ├── services/           [INIT: Status]
│   ├── schemas/            [INIT: Status]
│   └── types/              [INIT: Status]
```

### Planned

[INIT: Leave empty on first run]
[MANUAL: Add planned features]

**Feature Statistics:**
- Implemented: [INIT: Count] ✅
- In Progress: [INIT: Count] 🚧
- Planned: [INIT: Count] 📋

---

## 🎨 UI Components

[INIT: Scan src/shared/components/]

### Core Components (src/shared/components/ui/)

[INIT: List all discovered shadcn/ui or base components]

| Component | Status | Variants | Accessibility | Description |
|-----------|--------|----------|---------------|-------------|
[INIT: Populate from ui/ folder]

[EXAMPLE - REMOVE AFTER /init]
| Button | ✅ | default, destructive, outline, ghost | ✅ ARIA | Primary actions |
| Input | ✅ | text, email, password | ✅ ARIA | Form inputs |
| Dialog | ✅ | - | ✅ Focus trap | Modal dialogs |

### Layout Components (src/shared/components/layout/)

[INIT: List layout components]

| Component | Status | Responsive | Description |
|-----------|--------|------------|-------------|
[INIT: Populate from layout/ folder]

### Form Components (src/shared/components/forms/)

[INIT: List form components]

| Component | Status | Validation | Description |
|-----------|--------|------------|-------------|
[INIT: Populate from forms/ folder]

### Feature Components

[INIT: Aggregate all feature components]

| Component | Feature | Type | Status | Description |
|-----------|---------|------|--------|-------------|
[INIT: List major feature components]

**Component Statistics:**
- Total Components: [INIT: Count]
- UI Components: [INIT: Count]
- Layout Components: [INIT: Count]
- Form Components: [INIT: Count]
- Feature Components: [INIT: Count]

---

## 🗄️ Database Schema

[INIT: If using Prisma, read schema.prisma]
[INIT: If using Supabase, attempt to read from supabase/migrations/]
[MANUAL: Add schema details if not auto-detectable]

### Current Tables

[INIT: Document discovered tables]

**users**
```sql
[INIT: If readable, show schema]
id          UUID PRIMARY KEY
email       VARCHAR UNIQUE NOT NULL
name        VARCHAR
password    VARCHAR (hashed)
role        ENUM('user', 'admin')
createdAt   TIMESTAMP
updatedAt   TIMESTAMP
deletedAt   TIMESTAMP NULL  -- Soft delete
```

**[table_name]**
```sql
[INIT: Auto-populate if accessible]
[MANUAL: Otherwise add manually]
```

### Relationships

[INIT: Document foreign keys if detectable]
[MANUAL: Otherwise add manually]

- `table1.columnId` → `table2.id` (many-to-one)
- [Add your relationships]

### Indexes

[INIT: List indexes if detectable]
- `users.email` (unique)
- [Add your indexes]

**Database Statistics:**
- Total Tables: [INIT: Count]
- With Soft Delete: [INIT: Count]
- Total Indexes: [INIT: Count]

---

## 🔐 Environment Variables

[INIT: Read .env.example if exists]

### Required (.env.example provided)

[INIT: List all variables from .env.example]

| Variable | Status | Description | Example |
|----------|--------|-------------|---------|
[INIT: Populate from .env.example]

[EXAMPLE - REMOVE AFTER /init]
| `NODE_ENV` | ✅ | Environment | `production` |
| `DATABASE_URL` | ✅ | PostgreSQL connection | `postgresql://...` |
| `NEXTAUTH_URL` | ✅ | App URL | `https://app.example.com` |
| `NEXTAUTH_SECRET` | ✅ | Auth encryption key | `openssl rand -base64 32` |

### Optional

[INIT: List optional variables if documented]

| Variable | Status | Description | Default |
|----------|--------|-------------|---------|
[INIT: Populate optional vars]

### Feature Flags

[INIT: If using feature flags, list them]

| Flag | Status | Description | Default |
|------|--------|-------------|---------|
[INIT: Populate feature flags]

---

## 🧪 Testing Status

[INIT: Scan tests/ directory for existing test files]

### Unit Tests

| Module | Files | Coverage | Status | Notes |
|--------|-------|----------|--------|-------|
[INIT: List modules with tests]

[EXAMPLE - REMOVE AFTER /init]
| auth/services | 3 | 85% | ✅ | All core flows tested |
| items/services | 2 | 78% | ✅ | Missing edge cases |

### Integration Tests

[INIT: Check for integration test files]

| Test Suite | Tests | Status | Notes |
|------------|-------|--------|-------|
[INIT: List integration tests if found]

### Component Tests

[INIT: Check for component test files]

| Component | Tests | Coverage | Status | Notes |
|-----------|-------|----------|--------|-------|
[INIT: List component tests]

### E2E Tests (Playwright/Cypress)

[INIT: Check for E2E test files]

| Scenario | File | Status | Notes |
|----------|------|--------|-------|
[INIT: List E2E tests if found]

[EXAMPLE - REMOVE AFTER /init]
| Auth flow | `auth/login-flow.spec.ts` | ✅ | All providers tested |
| Item CRUD | `items/crud-flow.spec.ts` | 🚧 | Delete not covered |

**Testing Statistics:**
- Total Test Files: [INIT: Count]
- Unit Tests: [INIT: Count]
- Integration Tests: [INIT: Count]
- Component Tests: [INIT: Count]
- E2E Tests: [INIT: Count]
- Overall Coverage: [INIT: Calculate or "Not configured"]

### Coverage Report

[INIT: If coverage reports exist]
```
Statements   : 75% ( 450/600 )
Branches     : 70% ( 210/300 )
Functions    : 80% ( 160/200 )
Lines        : 75% ( 450/600 )
```

---

## ⚡ Performance Metrics

[INIT: If lighthouse or similar reports exist]

### Core Web Vitals

| Metric | Target | Current | Status | Notes |
|--------|--------|---------|--------|-------|
| LCP | < 2.5s | [INIT] | [Status] | Largest Contentful Paint |
| FID | < 100ms | [INIT] | [Status] | First Input Delay |
| CLS | < 0.1 | [INIT] | [Status] | Cumulative Layout Shift |
| FCP | < 1.8s | [INIT] | [Status] | First Contentful Paint |
| TTFB | < 600ms | [INIT] | [Status] | Time to First Byte |

### Page Performance

| Page | Load Time | Bundle Size | Status | Notes |
|------|-----------|-------------|--------|-------|
[MANUAL: Add key pages]

### Optimization Status

- [ ] [INIT: Check] Images optimized with Next.js Image
- [ ] [INIT: Check] Fonts optimized
- [ ] [INIT: Check] Code splitting implemented
- [ ] [INIT: Check] Streaming with Suspense used
- [ ] [INIT: Check] Static generation where possible
- [ ] [INIT: Check] ISR (Incremental Static Regeneration) configured
- [ ] [INIT: Check] CDN configured
- [ ] [INIT: Check] Compression enabled

---

## 🔒 Security Status

[INIT: Scan for security implementations]

### Authentication & Authorization

- [ ] [INIT: Check] NextAuth or similar configured
- [ ] [INIT: Check] Password hashing (bcrypt/argon2)
- [ ] [INIT: Check] JWT tokens secured
- [ ] [INIT: Check] Session management
- [ ] [INIT: Check] RBAC (Role-Based Access Control)
- [ ] [INIT: Check] Protected routes middleware

### Input Validation

- [ ] [INIT: Check] Zod schemas for all inputs
- [ ] [INIT: Check] API route validation
- [ ] [INIT: Check] Server action validation
- [ ] [INIT: Check] File upload validation
- [ ] [INIT: Check] SQL injection prevention
- [ ] [INIT: Check] XSS prevention

### Security Measures

- [ ] [INIT: Check] CSRF protection
- [ ] [INIT: Check] Rate limiting implemented
- [ ] [INIT: Check] CORS configured
- [ ] [INIT: Check] Security headers set
- [ ] [INIT: Check] HTTPS enforced
- [ ] [INIT: Check] Secrets not in code
- [ ] [INIT: Check] Environment variables validated
- [ ] [INIT: Check] Error messages don't leak info

### Vulnerabilities

[INIT: Run npm audit and document]
- Critical: [Count]
- High: [Count]
- Moderate: [Count]
- Low: [Count]

**Last Security Audit:** [Date]

---

## 📦 Dependencies

[INIT: Extract from package.json]

### Core Dependencies

[INIT: List main dependencies with versions]
```json
{
  "next": "[version]",
  "react": "[version]",
  "typescript": "[version]",
  "tailwindcss": "[version]"
}
```

### Authentication

[INIT: Group auth-related dependencies]

### Database & ORM

[INIT: Group database dependencies]

### State Management

[INIT: Group state management dependencies]

### Forms & Validation

[INIT: Group forms dependencies]

### Testing

[INIT: Group testing dependencies]

### Dev Dependencies

[INIT: List key dev dependencies]

**Dependency Statistics:**
- Total Dependencies: [INIT: Count]
- Total Dev Dependencies: [INIT: Count]
- Outdated Packages: [INIT: Check with npm outdated]

**Dependency Health:**
```bash
[INIT: Run npm audit]
# vulnerabilities: X critical, Y high, Z moderate
```

---

## 🚀 Deployment

### Environments

[INIT: Detect from package.json scripts or config files]

| Environment | URL | Status | Branch | Last Deploy |
|-------------|-----|--------|--------|-------------|
| Development | `http://localhost:3000` | ✅ | `main` | - |
| Staging | [MANUAL: Add URL] | 📋 | `staging` | [Date] |
| Production | [MANUAL: Add URL] | 📋 | `production` | [Date] |

### CI/CD Pipeline

[INIT: Check for .github/workflows/]

**GitHub Actions:**
- [x] [INIT: Check] CI workflow (lint, test, build)
- [ ] [INIT: Check] Preview deployments
- [ ] [INIT: Check] Production deployments
- [ ] [INIT: Check] Dependency updates (Dependabot)

**Build & Deploy:**
- Build Command: [INIT: From package.json]
- Output Directory: [INIT: `.next` or custom]
- Node Version: [INIT: From package.json engines]

### Infrastructure

[INIT: Document deployment infrastructure]

**Platform:** [Vercel/Docker/AWS/etc]
**Region:** [INIT: If detectable]
**CDN:** [INIT: If configured]
**Database:** [INIT: Hosting provider]

---

## 🐛 Known Issues

[MANUAL: Track issues during development]

| Issue | Priority | Status | Assigned | Notes |
|-------|----------|--------|----------|-------|
| [Description] | High | 🚧 | [Name] | [Workaround] |
| [Description] | Medium | 📋 | - | [Planned fix] |

---

## 📝 Next Steps

### Immediate (This Week)

[MANUAL: Add after /init or during development]

1. [ ] [Task description]
2. [ ] [Task description]
3. [ ] [Task description]

### Short-term (This Sprint/Month)

[MANUAL: Add during development]

- [ ] Complete [feature-name]
- [ ] Add tests for [feature-name]
- [ ] Security audit
- [ ] Performance optimization
- [ ] [Add your goals]

### Long-term (This Quarter)

[MANUAL: Strategic goals]

- [ ] Launch [major feature]
- [ ] Optimize performance
- [ ] Mobile app development
- [ ] Scale to X users
- [ ] [Add your goals]

---

## 🔧 Development Environment

### Required Tools

[INIT: Document required tools]
- Node.js: [version from .nvmrc or package.json]
- npm/pnpm/yarn: [version]
- Docker: [if using]
- PostgreSQL: [version if local]

### Setup Steps

[INIT: Basic setup, expand manually]
1. Clone repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local`
4. Set up database: `npm run db:migrate`
5. Seed database: `npm run db:seed`
6. Run development server: `npm run dev`

### Common Issues

[MANUAL: Document common setup issues and solutions]

---

## 📊 Analytics & Monitoring

[INIT: Check for analytics/monitoring setup]

### Analytics

- [ ] [INIT: Check] Google Analytics
- [ ] [INIT: Check] Plausible/Fathom
- [ ] [INIT: Check] PostHog
- [ ] [INIT: Check] Custom analytics

### Error Tracking

- [ ] [INIT: Check] Sentry
- [ ] [INIT: Check] LogRocket
- [ ] [INIT: Check] Custom error tracking

### Performance Monitoring

- [ ] [INIT: Check] Vercel Analytics
- [ ] [INIT: Check] New Relic
- [ ] [INIT: Check] DataDog

### Logging

- [ ] [INIT: Check] Structured logging (Pino/Winston)
- [ ] [INIT: Check] Log aggregation (CloudWatch/Papertrail)

---

## 📚 Related Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Master patterns guide (HOW to build)
- [CLAUDE.md](CLAUDE.md) - Development standards and workflow
- [README.md](README.md) - Project setup and overview
- [CHANGELOG.md](CHANGELOG.md) - Version history

---

## 🔄 Update History

[INIT: Create first entry on /init]

| Date | Change | Updated By | Version |
|------|--------|-----------|---------|
| [INIT: Date] | Initial structure created via /init | Claude Code | 0.1.0 |

[MANUAL: Add entries for significant updates]

---

**Status Legend:**
- ✅ **Implemented** - Feature is complete and working
- 🚧 **In Progress** - Currently being developed
- 📋 **Planned** - Scheduled for future development
- ⬜ **Not Started** - Acknowledged but no work begun
- ❌ **Deprecated** - No longer used or removed
- 🔒 **Security Review Needed** - Requires security audit
- ⚡ **Performance Review Needed** - Requires optimization

---

**Maintenance Instructions:**

1. **After /init**: Review and confirm all auto-populated sections
2. **After adding feature**: Update "Current Features" and relevant sections
3. **After creating route**: Update "Route Structure"
4. **After adding API**: Update "API Endpoints"
5. **After tests**: Update "Testing Status"
6. **Daily**: Keep "Next Steps" and "Known Issues" current
7. **Before commits**: Ensure this file reflects code changes
8. **Weekly**: Review security and performance sections
9. **Monthly**: Update dependency health and coverage reports

*This file is updated by `/init` on first run and maintained manually thereafter.*