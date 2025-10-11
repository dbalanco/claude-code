# Quick Start Guide

Get your Next.js SaaS project up and running with Claude Code plugins in 5 minutes.

## Step 1: Install the Marketplace

From your project directory:

```bash
# Start Claude Code
claude
```

In Claude Code:

```
/plugin marketplace add .
```

## Step 2: Install Core Plugins

Install the essential plugins for your stack:

```
/plugin install nextjs-core@nextjs-saas-marketplace
/plugin install database-tools@nextjs-saas-marketplace
/plugin install auth-tools@nextjs-saas-marketplace
/plugin install ui-components@nextjs-saas-marketplace
```

**Restart Claude Code** to activate the plugins.

## Step 3: Initialize Your Stack

### Set up Database (Drizzle + Postgres)

```
/setup-drizzle
```

Follow the prompts to configure Drizzle ORM with your Postgres database.

### Set up Authentication (BetterAuth)

```
/setup-betterauth
```

Configure authentication with email/password and optional OAuth.

### Set up UI (shadcn/ui)

```
/add-shadcn-component button
/add-shadcn-component form
/add-shadcn-component card
```

Install the shadcn/ui components you need.

## Step 4: Create Your First Feature

### Create a Protected Dashboard Page

```
/create-page /dashboard
```

Then:

```
/create-protected-route
```

### Add a Database Schema

```
/create-schema
```

Follow prompts to create your first table (e.g., "users", "posts", "products").

### Generate Migration

```
/generate-migration
```

### Create a Form

```
/create-form
```

## Step 5: Optional Services

### Add Payments (Polar)

```
/plugin install payment-tools@nextjs-saas-marketplace
/setup-polar
/create-checkout
```

### Add AI Features (Vercel AI SDK)

```
/plugin install ai-integration@nextjs-saas-marketplace
/setup-ai-sdk
/create-chat-endpoint
```

### Add Testing

```
/plugin install testing-quality@nextjs-saas-marketplace
/setup-vitest
/setup-playwright
```

## Common Workflows

### Building a User Profile Page

```
Can you create a user profile page at /profile with:
- Display user information from the database
- Edit form for updating profile
- Protected route requiring authentication
- Proper error handling
```

Claude will automatically:
- Create the page with Next.js patterns
- Add database queries with Drizzle
- Implement authentication checks
- Generate form components with shadcn/ui

### Creating an API Endpoint

```
/create-api /api/posts
```

Then describe what the API should do:

```
Create CRUD operations for blog posts with authentication
```

### Adding a New Component

```
/create-custom-component
```

Or use shadcn:

```
/add-shadcn-component dialog
```

## Using Specialized Agents

You don't need to explicitly call agents - Claude automatically uses them based on context:

**Ask naturally:**
```
- "Help me optimize this page's performance"        → performance-optimizer
- "Design a pricing table component"                → ui-designer  
- "How should I structure my database schema?"      → database-architect
- "Set up OAuth with Google"                        → auth-specialist
- "Implement subscription webhooks"                 → payments-specialist
```

## Pro Tips

1. **Use Interactive Plugin Manager**: `/plugin` to browse and manage plugins
2. **Check Available Commands**: `/help` to see all commands
3. **Combine Commands**: Chain commands for complete features
4. **Ask Questions**: Claude understands natural language - just describe what you need
5. **Iterate Quickly**: Use commands to scaffold, then refine with natural conversation

## Common Commands Reference

| Command | Purpose |
|---------|---------|
| `/create-page` | New Next.js page |
| `/create-api` | New API route |
| `/create-schema` | New database table |
| `/create-query` | Database query |
| `/create-protected-route` | Auth-protected route |
| `/add-shadcn-component` | Install UI component |
| `/create-form` | Form with validation |
| `/create-test` | Test file |
| `/setup-*` | Initialize services |

## Environment Variables

After setup, add these to `.env.local`:

```bash
# Database
DATABASE_URL="postgres://..."

# Auth
AUTH_SECRET="your-secret"
GITHUB_ID="..."         # If using OAuth
GITHUB_SECRET="..."     # If using OAuth

# Payments (if using Polar)
POLAR_ACCESS_TOKEN="..."
POLAR_WEBHOOK_SECRET="..."
NEXT_PUBLIC_POLAR_ORGANIZATION_ID="..."

# AI (if using AI SDK)
OPENAI_API_KEY="..."
# or
ANTHROPIC_API_KEY="..."
```

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore individual plugin directories for customization
- Check command help: `/help [command-name]`
- Start building your SaaS! 🚀

---

**Questions?** Email leon.vanzyl@gmail.com
