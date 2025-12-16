# Perseon V2 - Application Specifications

> **Last Updated:** 2025-12-16
> **Overall Completion:** 56% (3 completed, 3 in progress, 0 planned)
> **Total Features:** 6

---

## 📊 Implementation Status Dashboard

| Category | Progress | Completed | In Progress | Planned | Total |
|----------|----------|-----------|-------------|---------|-------|
| UX Enhancements | █░░░░░░░░░ 17% | 0 | 2 | 0 | 2 |
| Developer Tools | ██████████ 100% | 1 | 0 | 0 | 1 |
| Community Features | █████████░ 98% | 0 | 1 | 0 | 1 |
| GitHub Integration | ██████████ 100% | 2 | 0 | 0 | 2 |


---

## Table of Contents

1. [Implementation Status Dashboard](#-implementation-status-dashboard)
2. [Overview](#overview)
3. [Completed Features](#-completed-features)
4. [Features in Progress](#-features-in-progress)
5. [Planned Features](#-planned-features)
6. [Technology Stack](#technology-stack)
7. [Database Schema](#database-schema)
8. [Detailed Feature Specifications](#detailed-feature-specifications)

---

## Overview

**Perseon V2** (powered by HagenKit) is a production-ready SaaS boilerplate built on Next.js 16 with comprehensive multi-tenant workspace management, GitHub integration, and community feedback features.

### Key Capabilities

- **Multi-Tenant Architecture:** Workspace-based isolation with role-based access control
- **GitHub Integration:** OAuth authentication, repository sync, webhook handling, and Actions monitoring
- **Project Management:** Kanban boards with issue tracking and team collaboration
- **Community Features:** Feature requests, bug reports, upvoting, and commenting systems
- **Authentication:** Better Auth with email/password, magic links, Google, and GitHub OAuth
- **Billing Integration:** Optional Polar integration for subscription management
- **Email System:** React Email templates with configurable providers (Resend, SMTP, SendGrid, Mailgun)
- **Developer Experience:** Enhanced error handling, contextual tooltips, and comprehensive documentation

### Target Users

- **SaaS Founders:** Looking for a battle-tested starting point
- **Development Teams:** Need a robust foundation for client projects
- **Indie Hackers:** Want to ship quickly without sacrificing quality
- **Enterprise Teams:** Require multi-tenancy and security out of the box

---

## ✅ Completed Features

**Total:** 3 features

### Developer Tools

- [x] **Commands Page Improvements - Requirements**
  - ## UI/UX Requirements
- Visual hierarchy for grouped commands
- Consistent spacing and typography
- Loading states for interactions
- Clear workflow step numbering
- Icon usage consistent with existing design
  - [View Implementation Plan](./specs/commands-page-improvements/implementation-plan.md)

### GitHub Integration

- [x] **Enhanced GitHub Dashboard Requirements**
  - ## Acceptance Criteria
- [ ] All filtering tabs work correctly and instantly
- [ ] Repository table displays complete health metrics
- [ ] Sortable columns provide expected functionality
- [ ] Responsive design works on mobile and desktop
- [ ] No horizontal scrolling in activity overview
- [ ] Performance meets stated requirements
- [ ] Existing functionality remains unchanged
- [ ] Code follows project conventions and patterns
  - [View Implementation Plan](./specs/enhanced-github-dashboard/implementation-plan.md)

- [x] **GitHub Project Manager - Requirements**
  - Transform Perseon into a GitHub-connected project management platform that allows users to connect their GitHub accounts via OAuth (as a secondary integration) and automatically create projects from repositories. Each project will have dedicated GitHub data views (branches, commits, PRs, issues, collaborators) with a full kanban-style project management system.
  - [View Implementation Plan](./specs/github-project-manager/implementation-plan.md)



---

## 🟡 Features in Progress

**Total:** 3 features

### UX Enhancements

- [ ] **App Enhancements for Novice Developers - Requirements** (33% complete)
  - **Total Estimated Timeline:** 4 months for complete implementation
**Recommended Approach:** Iterative releases after each phase
  - [View Implementation Plan](./specs/app-enhancements-for-novice-developers/implementation-plan.md)
  - Progress: 192/577 tasks completed

- [ ] **App Enhancements V2 - MVP Completion Requirements** (2% complete)
  - This feature set focuses on completing the MVP by finishing partially-done features and optimizing core performance. This is a strategic pivot from the original plan which prioritized onboarding features. Instead, we're completing the 80-85% finished features and ensuring the app is polished and performant before adding educational layers.
  - [View Implementation Plan](./specs/app-enhancements-v2-mvp-completion/implementation-plan.md)
  - Progress: 13/625 tasks completed

### Community Features

- [ ] **Community & Activity Features - Requirements** (98% complete)
  - Port 8 major features from perseon v1 to perseon-v2, creating a comprehensive community feedback system with activity tracking, enhanced dashboards, and learning resources.
  - [View Implementation Plan](./specs/community-and-activity-features/implementation-plan.md)
  - Progress: 601/613 tasks completed



---

## ⏳ Planned Features

No features in this status.

---

## Technology Stack

### Core Framework
- **Next.js** 16.0.10 - React framework with App Router
- **React** 19.2.3 - UI library
- **TypeScript** ^5 - Type safety

### Backend & Database
- **Prisma** ^7.0.0 - ORM for PostgreSQL
- **PostgreSQL** - Primary database
- **@prisma/adapter-pg** ^7.0.0 - Direct TCP connections

### Authentication
- **Better Auth** ^1.3.11 - Authentication framework
- OAuth providers: Google, GitHub
- Magic links and email/password auth

### UI & Styling
- **Tailwind CSS** ^4 - Utility-first CSS
- **Shadcn UI** - Component library
- **Radix UI** ^1.1.10 - Headless UI primitives
- **Lucide React** ^0.544.0 - Icon library

### Email & Notifications
- **React Email** 4.3.2 - Email templates
- **Resend** ^6.4.0 - Email delivery

### Development Tools
- **Turbopack** - Fast bundler
- **ESLint** ^9 - Code linting
- **ts-node**  - TypeScript execution

### Security
- **Zod** ^4.1.9 - Runtime validation
- **AES-256-GCM** - Token encryption

### Optional Integrations
- **Polar** - Billing and subscriptions (feature-flagged)
- **Redis** - Caching (optional)

---

## Database Schema

**Total Models:** 32

### User Management

- **User**
- **Session**
- **Account**
- **Verification**
- **UserGitHubConnection**

### Workspace & Teams

- **Workspace**
- **WorkspaceMember**
- **WorkspaceInvitation**
- **ProjectWorkspace**

### Configuration

- **PolarIntegration**
- **PolarProductMapping**
- **EmailProviderConfig**

### Projects

- **Project**
- **ProjectMember**

### GitHub Integration

- **GitHubBranch**
- **GitHubCommit**
- **GitHubPullRequest**
- **GitHubIssue**
- **GitHubCollaborator**
- **GitHubWebhook**
- **GitHubWorkflow**
- **GitHubWorkflowRun**

### Issue Tracking

- **Issue**
- **IssueActivity**

### Activity & Notifications

- **Activity**
- **Notification**

### Community Features

- **FeatureRequest**
- **FeatureUpvote**
- **FeatureComment**
- **BugReport**
- **BugUpvote**
- **BugComment**



---

## Detailed Feature Specifications

### 1. UX Enhancements

#### App Enhancements for Novice Developers - Requirements 🟡

**Total Estimated Timeline:** 4 months for complete implementation
**Recommended Approach:** Iterative releases after each phase

**Status:** in progress (33% complete)

[View Full Implementation Plan](./specs/app-enhancements-for-novice-developers/implementation-plan.md)

**Key Features:**
- Progressive complexity: Start with infrastructure, then UX, then delight
- Iterative releases: Ship after each phase for user feedback
- No breaking changes: Preserve existing functionality
- Mobile-first: All features work on mobile
- Accessibility: WCAG 2.1 AA minimum
- Audit all components for dark mode consistency issues
- Fix critical dark mode UI bugs (Marketing page pricing, Auth page sidebars)
- Fix moderate dark mode issues (Status badges, Health scores, Repository table layout)
- Create theme customization UI in settings (Appearance tab with theme toggle)
- Add theme toggle button to site header (Sun/Moon icon toggle)

#### App Enhancements V2 - MVP Completion Requirements 🟡

This feature set focuses on completing the MVP by finishing partially-done features and optimizing core performance. This is a strategic pivot from the original plan which prioritized onboarding features. Instead, we're completing the 80-85% finished features and ensuring the app is polished and performant before adding educational layers.

**Status:** in progress (2% complete)

[View Full Implementation Plan](./specs/app-enhancements-v2-mvp-completion/implementation-plan.md)

**Key Features:**
- Create `components/empty-states/empty-state.tsx` component
- Add props interface:
- `illustration` (ReactNode) - SVG illustration component
- `title` (string) - Main heading
- `description` (string) - Explanatory text
- `primaryAction` (object) - label, onClick, href
- `secondaryAction` (object, optional) - label, onClick, href
- `helpLink` (string, optional) - Link to documentation
- Add dark mode support using Tailwind dark: variants
- Add fade-in animation using Framer Motion or CSS transitions

### 2. Developer Tools

#### Commands Page Improvements - Requirements ✅

## UI/UX Requirements
- Visual hierarchy for grouped commands
- Consistent spacing and typography
- Loading states for interactions
- Clear workflow step numbering
- Icon usage consistent with existing design

**Status:** completed (100% complete)

[View Full Implementation Plan](./specs/commands-page-improvements/implementation-plan.md)

**Key Features:**
- Remove problematic wrapper divs on commands page to match workflow page structure
- Fix CommandsTable component tabs to be responsive (remove `min-w-[500px]`)
- Test horizontal scrolling elimination on various screen sizes - ✅ Build successfully generates responsive layout
- Verify mobile responsiveness without overflow - ✅ Mobile card view and responsive tabs confirmed in build output
- Add `subcategory` field to TerminalCommand interface in `lib/data/terminal-commands.ts`
- Update all git commands data arrays with appropriate subcategory groupings:
- Basic Commands
- Branch Management
- Staging & Committing
- Remote Operations

### 3. Community Features

#### Community & Activity Features - Requirements 🟡

Port 8 major features from perseon v1 to perseon-v2, creating a comprehensive community feedback system with activity tracking, enhanced dashboards, and learning resources.

**Status:** in progress (98% complete)

[View Full Implementation Plan](./specs/community-and-activity-features/implementation-plan.md)

**Key Features:**
- Open `/prisma/schema.prisma`
- Add `Activity` model with fields:
- `id` (String, cuid, primary key)
- `type` (ActivityType enum)
- `title` (String)
- `description` (String, optional)
- `metadata` (Json, optional)
- `userId` (String, relation to User)
- `projectId` (String, optional, relation to Project)
- `workspaceId` (String, optional, relation to Workspace)

### 4. GitHub Integration

#### Enhanced GitHub Dashboard Requirements ✅

## Acceptance Criteria
- [ ] All filtering tabs work correctly and instantly
- [ ] Repository table displays complete health metrics
- [ ] Sortable columns provide expected functionality
- [ ] Responsive design works on mobile and desktop
- [ ] No horizontal scrolling in activity overview
- [ ] Performance meets stated requirements
- [ ] Existing functionality remains unchanged
- [ ] Code follows project conventions and patterns

**Status:** completed (100% complete)

[View Full Implementation Plan](./specs/enhanced-github-dashboard/implementation-plan.md)

**Key Features:**
- Extend getRecentActivities action to support activity type filtering parameters - getRecentActivities already supports type filtering in GetActivitiesInput interface
- Add helper functions to map ActivityType enum to filter categories (commits, prs, merges, reviews) - filtering logic implemented in ActivityTimelineWithTabs component
- Create getRepositorySummaries action for repository health and metrics data - fully implemented with health score calculation and all required metrics
- Optimize repository data queries to include necessary metrics (health score, deployment status, contributors) - includes healthScore, deploymentStatus, contributorCount, openPRs, and more
- Add proper error handling and caching to new data actions - comprehensive error handling and success/error response structure implemented
- Update GetActivitiesInput interface to support filter types - GetActivitiesInput interface supports type filtering
- Create ActivityTimelineTabs component using existing Tabs UI component (ActivityTimelineWithTabs component exists and is in use)
- Implement tab structure with All, Commits, Pull Requests, Merges, Reviews (All tabs present with proper structure)
- Add appropriate icons for each tab using Lucide icons (Activity, GitBranch, GitPullRequest, GitMerge, FileCheck icons implemented)
- Implement client-side filtering logic without API calls (client-side filtering implemented without additional API calls)

#### GitHub Project Manager - Requirements ✅

Transform Perseon into a GitHub-connected project management platform that allows users to connect their GitHub accounts via OAuth (as a secondary integration) and automatically create projects from repositories. Each project will have dedicated GitHub data views (branches, commits, PRs, issues, collaborators) with a full kanban-style project management system.

**Status:** completed (100% complete)

[View Full Implementation Plan](./specs/github-project-manager/implementation-plan.md)

**Key Features:**
- Add `user_github_connections` table for encrypted GitHub tokens
- Add `project` table (user-owned projects)
- Add `project_workspace` join table (projects can belong to multiple workspaces)
- Add `project_member` table (project-level permissions)
- Add `github_branch` table (synced branches)
- Add `github_commit` table (synced commits)
- Add `github_pull_request` table (synced PRs, open + closed)
- Add `github_issue` table (synced issues, open + closed)
- Add `github_collaborator` table (synced collaborators)
- Add `issue` table (kanban issues/tasks)



---

## Appendix

### How to Update This Document

This document is automatically generated by the documentation generator system. To update it:

1. **Via Slash Command:** Type `/update-specs` in Claude Code
2. **Via CLI:** Run `pnpm update-specs` or `ts-node specs/doc-generator/update.ts`

The generator scans all specification folders in `/specs/` and aggregates their content.

### Links

- [Project Repository](https://github.com/your-org/perseon-v2)
- [Documentation](./README.md)

---

*This document is auto-generated by the `/update-specs` command. Last generated: 2025-12-16T10:40:18.438Z*