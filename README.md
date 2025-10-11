# Next.js SaaS Marketplace for Claude Code

A comprehensive plugin marketplace for Next.js 15 SaaS developers, featuring tools and agents for modern full-stack development.

## Tech Stack Coverage

This marketplace provides plugins for the complete Next.js SaaS stack:

- **Next.js 15** with App Router and React 19
- **Tailwind CSS** and **shadcn/ui** for styling
- **Postgres** database with **Drizzle ORM**
- **BetterAuth** for authentication
- **Polar** for payments and subscriptions
- **Vercel AI SDK** for AI features
- **Vitest** and **Playwright** for testing

## Installation

### Add the Marketplace

From your project root (where this marketplace is located):

```bash
claude
```

Then in Claude Code:

```
/plugin marketplace add .
```

### Install All Plugins

Install all plugins at once, or pick specific ones:

```
/plugin install nextjs-core@nextjs-saas-marketplace
/plugin install database-tools@nextjs-saas-marketplace
/plugin install auth-tools@nextjs-saas-marketplace
/plugin install payment-tools@nextjs-saas-marketplace
/plugin install ui-components@nextjs-saas-marketplace
/plugin install ai-integration@nextjs-saas-marketplace
/plugin install testing-quality@nextjs-saas-marketplace
```

Or use the interactive installer:

```
/plugin
```

Then select "Browse Plugins" and install from the marketplace.

## Available Plugins

### 1. Next.js Core (`nextjs-core`)

Essential Next.js 15 and React 19 development tools.

**Commands:**
- `/create-page` - Create new App Router pages with TypeScript
- `/create-api` - Generate API route handlers
- `/create-server-action` - Create Server Actions with validation
- `/add-middleware` - Set up or update middleware
- `/optimize-images` - Implement Next.js Image optimization

**Agents:**
- `nextjs-expert` - App Router and React Server Components specialist
- `performance-optimizer` - Performance and caching optimization

### 2. Database Tools (`database-tools`)

Drizzle ORM and Postgres management.

**Commands:**
- `/setup-drizzle` - Initialize Drizzle ORM with Postgres
- `/create-schema` - Generate Drizzle table schemas
- `/generate-migration` - Create database migrations
- `/create-query` - Generate type-safe database queries

**Agents:**
- `database-architect` - Database design and optimization specialist

### 3. Auth Tools (`auth-tools`)

BetterAuth integration and authentication patterns.

**Commands:**
- `/setup-betterauth` - Initialize BetterAuth
- `/create-protected-route` - Generate protected pages/APIs
- `/add-oauth-provider` - Configure OAuth providers

**Agents:**
- `auth-specialist` - Authentication and security expert

### 4. Payment Tools (`payment-tools`)

Polar payment processing and subscription management.

**Commands:**
- `/setup-polar` - Initialize Polar SDK
- `/create-checkout` - Generate checkout flows
- `/handle-webhooks` - Set up webhook handlers

**Agents:**
- `payments-specialist` - Payments and subscription expert

### 5. UI Components (`ui-components`)

shadcn/ui and Tailwind CSS tools.

**Commands:**
- `/add-shadcn-component` - Install shadcn/ui components
- `/create-custom-component` - Generate custom React components
- `/create-form` - Create forms with validation

**Agents:**
- `ui-designer` - UI/UX and component design specialist

**MCP Servers:**
- `shadcn` - shadcn/ui MCP integration

### 6. AI Integration (`ai-integration`)

Vercel AI SDK integration helpers.

**Commands:**
- `/setup-ai-sdk` - Initialize Vercel AI SDK
- `/create-chat-endpoint` - Create streaming chat APIs
- `/add-function-calling` - Implement AI function calling

**Agents:**
- `ai-integration-specialist` - LLM and AI SDK expert

### 7. Testing & Quality (`testing-quality`)

Testing and code quality tools.

**Commands:**
- `/setup-vitest` - Configure Vitest for unit testing
- `/create-test` - Generate test files
- `/setup-playwright` - Configure E2E testing
- `/setup-eslint` - Enhanced ESLint configuration

**Agents:**
- `quality-engineer` - Testing and quality specialist

**MCP Servers:**
- `playwright` - Playwright MCP integration

## Usage Examples

### Creating a New Feature

```
I need to create a user profile page with authentication
```

Claude will automatically:
1. Use the `nextjs-expert` agent to create the page structure
2. Use the `auth-specialist` to add authentication
3. Use the `database-architect` to create necessary queries
4. Use the `ui-designer` to create the UI components

### Setting Up a New Project

```
/setup-drizzle
/setup-betterauth
/setup-polar
/setup-ai-sdk
```

Follow each command's prompts to configure your full stack.

### Building Features with Commands

```
/create-page /dashboard/settings
/create-protected-route
/add-shadcn-component dialog
/create-form
```

## Specialized Agents

The marketplace includes 10 specialized agents that Claude Code can automatically invoke:

- **nextjs-expert** - Next.js 15 and App Router patterns
- **performance-optimizer** - Performance and Core Web Vitals
- **database-architect** - Schema design and query optimization  
- **auth-specialist** - Authentication and security
- **payments-specialist** - Subscription and billing logic
- **ui-designer** - Component and UI/UX design
- **ai-integration-specialist** - LLM integration patterns
- **quality-engineer** - Testing and code quality

Claude will automatically use the appropriate agent based on your task.

## Project Structure

```
.claude-plugin/
  marketplace.json          # Marketplace manifest
plugins/
  nextjs-core/             # Next.js development tools
  database-tools/          # Drizzle ORM tools
  auth-tools/              # BetterAuth integration
  payment-tools/           # Polar payments
  ui-components/           # shadcn/ui tools
  ai-integration/          # AI SDK helpers
  testing-quality/         # Testing tools
```

## Customization

Each plugin can be customized by editing the files in the `plugins/` directory:

- **Commands**: Edit `.md` files in `commands/` directories
- **Agents**: Modify `.md` files in `agents/` directories  
- **Hooks**: Update `hooks/hooks.json` files
- **MCP Servers**: Edit `.mcp.json` files

After making changes, reinstall the plugin:

```
/plugin uninstall plugin-name@nextjs-saas-marketplace
/plugin install plugin-name@nextjs-saas-marketplace
```

## Contributing

To add new commands or improve existing ones:

1. Edit the plugin files in the `plugins/` directory
2. Test locally by reinstalling the plugin
3. Share your improvements!

## Support

For issues or questions:
- Email: leon.vanzyl@gmail.com
- Check command help: `/help`

## License

MIT License - See individual plugin licenses for details.

---

**Built for Next.js SaaS developers by Leon van Zyl**

Happy building! 🚀
