# Perseon AI Marketplace for Claude Code

A specialized plugin marketplace for Next.js 15 SaaS developers, focusing on automated documentation, project management, and developer productivity using AI-powered capabilities.

## Tech Stack Focus

This marketplace is designed for the modern Next.js SaaS stack:

- **Next.js 15** (App Router, React 19)
- **Tailwind CSS** & **shadcn/ui**
- **Drizzle ORM** & **Prisma**
- **Vercel AI SDK**
- **Vitest** & **Playwright**

## Core Marketplace Plugins

The marketplace currently features the following core internal plugins:

### 1. Documentation Tools (`documentation-tools`)

An automated documentation system that scans feature specifications, tracks implementation progress via markdown checkboxes, and generates comprehensive `app-specs.md` documents.

**Commands:**

- `/update-specs` - Scan project for specs and update the `app-specs.md` dashboard.

**Features:**

- Recursive spec scanning in `/specs/` or `/perseon/specs/`.
- Progress calculation from `implementation-plan.md` checkboxes.
- Automated tech stack and database schema extraction.
- Safety-first cleanup and archiving system.

---

## External MCP Plugins

The marketplace includes **13 pre-configured MCP plugins** to extend Claude Code's capabilities across your entire stack:

### 🔧 Integration & Development

| Plugin | Description | Requirements |
|--------|-------------|--------------|
| **context7** | Pull version-specific documentation from source repositories | `CONTEXT7_API_KEY` |
| **github** | Repository management, issues, PRs, and code review | `GITHUB_PERSONAL_ACCESS_TOKEN` |
| **playwright** | Browser automation and E2E testing | Local installation |
| **shadcn** | shadcn/ui component registry and customization | Local installation |
| **chrome-devtools** | Control and inspect live Chrome browser | Local installation |
| **slack** | Workspace integration and message search | Local installation |
| **apify** | Web scraping and data extraction marketplace | `APIFY_TOKEN` |
| **firecrawl** | Intelligent web scraping with JS rendering | `FIRECRAWL_API_KEY` |

### 🗄️ Database & Backend

| Plugin | Description | Requirements |
|--------|-------------|--------------|
| **neon** | Serverless Postgres with instant branching | Neon Account |
| **prisma** | Manage databases with natural language via MCP | Prisma Schema |
| **supabase** | Database, auth, storage, and real-time operations | Supabase Project |

### 💳 Services & Payments

| Plugin | Description | Requirements |
|--------|-------------|--------------|
| **stripe** | Payment processing and API integration | Stripe Account |
| **vercel** | Deployment management and project configuration | Vercel Account |

---

## Environment Configuration

External MCP plugins requiring API keys use `env.local.mcp`. Ensure these are set in your project root:

```bash
# Apify - Web scraping
APIFY_TOKEN=your_apify_token

# Context7 - Documentation lookup
CONTEXT7_API_KEY=your_context7_key

# Firecrawl - Intelligent web scraping
FIRECRAWL_API_KEY=your_firecrawl_key

# GitHub - Repository management
GITHUB_PERSONAL_ACCESS_TOKEN=your_github_token
```

All MCP plugins are automatically loaded via their configuration files in `plugins_mcp/`.

## Installation & Setup

1. **Add the Marketplace:**

   ```bash
   # In your project root
   claude
   # Then in Claude Code:
   /plugin marketplace add .
   ```

2. **Install Core Plugins:**

   ```
   /plugin install documentation-tools@perseon-ai-marketplace
   ```

3. **Check Status:**

   ```
   /plugin
   ```

   Select "View Installed Plugins" to verify.

## Project Structure

```
.
├── .claude-plugin/         # Marketplace manifest
├── plugins/                # Internal plugins (documentation-tools)
├── plugins_mcp/            # External MCP server definitions
├── specs/                  # Project specifications and generated docs
└── perseon/                # Core repository data and assets
```

## Contributing

To improve existing commands or add new ones:

1. Modify files in `plugins/` or `plugins_mcp/`.
2. Reload Claude Code to pick up changes.
3. Test thoroughly using the built-in commands.

## Support & Author

- **Author:** Darryn Balanco
- **Email:** <darryn@optimus01.com>
- **GitHub:** [github.com/dbalanco](https://github.com/dbalanco)

---

**Perseon AI Marketplace - Built for Next.js SaaS Developers**
Maintained by Darryn Balanco. Happy building! 🚀
