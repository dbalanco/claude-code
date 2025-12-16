# Marketplace Structure Overview

Complete structure of the Next.js SaaS Marketplace for Claude Code.

## Directory Tree

```
nextjs-saas-marketplace/
├── .claude-plugin/
│   └── marketplace.json              # Main marketplace manifest
│
├── plugins/
│   ├── nextjs-core/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json           # Plugin manifest
│   │   ├── commands/
│   │   │   ├── create-page.md
│   │   │   ├── create-api.md
│   │   │   ├── create-server-action.md
│   │   │   ├── add-middleware.md
│   │   │   └── optimize-images.md
│   │   ├── agents/
│   │   │   ├── nextjs-expert.md
│   │   │   └── performance-optimizer.md
│   │   └── hooks/
│   │       └── hooks.json
│   │
│   ├── database-tools/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── commands/
│   │   │   ├── setup-drizzle.md
│   │   │   ├── create-schema.md
│   │   │   ├── generate-migration.md
│   │   │   └── create-query.md
│   │   └── agents/
│   │       └── database-architect.md
│   │
│   ├── auth-tools/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── commands/
│   │   │   ├── setup-betterauth.md
│   │   │   ├── create-protected-route.md
│   │   │   └── add-oauth-provider.md
│   │   └── agents/
│   │       └── auth-specialist.md
│   │
│   ├── payment-tools/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── commands/
│   │   │   ├── setup-polar.md
│   │   │   ├── create-checkout.md
│   │   │   └── handle-webhooks.md
│   │   └── agents/
│   │       └── payments-specialist.md
│   │
│   ├── ui-components/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── .mcp.json                 # shadcn MCP server
│   │   ├── commands/
│   │   │   ├── add-shadcn-component.md
│   │   │   ├── create-custom-component.md
│   │   │   └── create-form.md
│   │   └── agents/
│   │       └── ui-designer.md
│   │
│   ├── ai-integration/
│   │   ├── .claude-plugin/
│   │   │   └── plugin.json
│   │   ├── commands/
│   │   │   ├── setup-ai-sdk.md
│   │   │   ├── create-chat-endpoint.md
│   │   │   └── add-function-calling.md
│   │   └── agents/
│   │       └── ai-integration-specialist.md
│   │
│   └── testing-quality/
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── .mcp.json                 # Playwright MCP server
│       ├── commands/
│       │   ├── setup-vitest.md
│       │   ├── create-test.md
│       │   ├── setup-playwright.md
│       │   └── setup-eslint.md
│       └── agents/
│           └── quality-engineer.md
│
├── README.md                         # Full documentation
├── QUICKSTART.md                     # Quick start guide
└── MARKETPLACE_STRUCTURE.md          # This file
```

## Plugin Summary

### Total Commands: 25

| Plugin | Commands | Agents | MCP Servers |
|--------|----------|--------|-------------|
| nextjs-core | 5 | 2 | 0 |
| database-tools | 4 | 1 | 0 |
| auth-tools | 3 | 1 | 0 |
| payment-tools | 3 | 1 | 0 |
| ui-components | 3 | 1 | 1 (shadcn) |
| ai-integration | 3 | 1 | 0 |
| testing-quality | 4 | 1 | 1 (playwright) |
| **TOTAL** | **25** | **8** | **2** |

## Command Reference

### Next.js Core

- `/create-page` - Create App Router pages
- `/create-api` - Generate API routes
- `/create-server-action` - Create Server Actions
- `/add-middleware` - Setup middleware
- `/optimize-images` - Image optimization

### Database Tools

- `/setup-drizzle` - Initialize Drizzle ORM
- `/create-schema` - Generate database schemas
- `/generate-migration` - Create migrations
- `/create-query` - Generate database queries

### Auth Tools

- `/setup-betterauth` - Initialize BetterAuth
- `/create-protected-route` - Create protected routes
- `/add-oauth-provider` - Add OAuth providers

### Payment Tools

- `/setup-polar` - Initialize Polar
- `/create-checkout` - Generate checkout flows
- `/handle-webhooks` - Setup webhook handlers

### UI Components

- `/add-shadcn-component` - Install shadcn/ui components
- `/create-custom-component` - Create custom components
- `/create-form` - Generate forms with validation

### AI Integration

- `/setup-ai-sdk` - Initialize AI SDK
- `/create-chat-endpoint` - Create chat APIs
- `/add-function-calling` - Implement function calling

### Testing & Quality

- `/setup-vitest` - Configure Vitest
- `/create-test` - Generate test files
- `/setup-playwright` - Configure Playwright
- `/setup-eslint` - Enhanced ESLint setup

## Specialized Agents

### 1. nextjs-expert

- **Focus**: Next.js 15, App Router, React 19
- **Capabilities**: Routing, Server Components, data fetching, performance

### 2. performance-optimizer

- **Focus**: Performance optimization
- **Capabilities**: Caching, Core Web Vitals, bundle optimization

### 3. database-architect

- **Focus**: Database design and Drizzle ORM
- **Capabilities**: Schema design, migrations, query optimization

### 4. auth-specialist

- **Focus**: BetterAuth and security
- **Capabilities**: Authentication, OAuth, session management, security

### 5. payments-specialist

- **Focus**: Polar payments
- **Capabilities**: Checkout flows, subscriptions, webhooks, billing

### 6. ui-designer

- **Focus**: UI/UX with shadcn/ui and Tailwind
- **Capabilities**: Component design, responsive layouts, accessibility

### 7. ai-integration-specialist

- **Focus**: Vercel AI SDK
- **Capabilities**: LLM integration, streaming, function calling

### 8. quality-engineer

- **Focus**: Testing and code quality
- **Capabilities**: Unit tests, E2E tests, linting, CI/CD

## MCP Servers

### shadcn (ui-components plugin)

- **Purpose**: shadcn/ui integration
- **Command**: `npx shadcn@latest mcp`

### playwright (testing-quality plugin)

- **Purpose**: Playwright integration
- **Command**: `npx @playwright/mcp@latest`

## Tech Stack Coverage

✅ Next.js 15 with App Router
✅ React 19 with Server Components
✅ TypeScript
✅ Tailwind CSS
✅ shadcn/ui components
✅ Postgres database
✅ Drizzle ORM
✅ BetterAuth authentication
✅ Polar payments
✅ Vercel AI SDK
✅ Vitest unit testing
✅ Playwright E2E testing
✅ ESLint code quality

## Files Created

- **1** Marketplace manifest (`.claude-plugin/marketplace.json`)
- **7** Plugin manifests
- **25** Command files
- **8** Agent definitions
- **1** Hook configuration
- **2** MCP server configurations
- **3** Documentation files (README.md, QUICKSTART.md, this file)

**Total: 47 files** providing comprehensive Next.js SaaS development support.

## Installation Size

Approximate sizes:

- Commands: ~25-50 KB total
- Agents: ~15-30 KB total
- Manifests: ~5 KB total
- Documentation: ~20 KB total

**Total marketplace size: ~70-100 KB** (text files only, no dependencies)

## Maintenance

To update or add features:

1. Edit command/agent files in `plugins/[plugin-name]/`
2. Update version in plugin manifest
3. Reinstall plugin in Claude Code
4. Test changes

## Version

- **Marketplace Version**: 1.0.0
- **All Plugin Versions**: 1.0.0
- **Created**: 2025
- **Author**: Leon van Zyl (<leon.vanzyl@gmail.com>)

---

**Ready to use!** Follow the [QUICKSTART.md](QUICKSTART.md) to get started.
