# Marketplace Structure Overview

Complete structure of the Perseon AI Marketplace for Claude Code.

## Directory Tree

```
perseon-ai-marketplace/
├── .claude-plugin/
│   └── marketplace.json              # Main marketplace manifest
│
├── plugins/
│   └── documentation-tools/          # Internal documentation system
│       ├── .claude-plugin/
│       │   └── plugin.json           # Plugin manifest
│       ├── commands/
│       │   └── update-specs.md       # /update-specs command
│       ├── skills/
│       │   └── app-spec-generator/   # Implementation logic & scripts
│       └── README.md
│
├── plugins_mcp/                      # External MCP Server definitions
│   ├── context7/                     # Documentation lookup
│   ├── github/                       # Repo management
│   ├── playwright/                   # Browser automation
│   ├── shadcn/                       # UI components
│   ├── chrome-devtools/              # Browser inspection
│   ├── slack/                        # Team communication
│   ├── apify/                        # Web scraping
│   ├── firecrawl/                    # Intelligent scraping
│   ├── neon/                         # Database branching
│   ├── prisma/                       # Database management
│   ├── supabase/                     # Backend operations
│   ├── stripe/                       # Payments
│   └── vercel/                       # Deployment
│
├── README.md                         # Full documentation
├── QUICKSTART.md                     # Quick start guide
└── MARKETPLACE_STRUCTURE.md          # This file
```

## Plugin Summary

| Component Type | Count | Description |
|----------------|-------|-------------|
| **Internal Plugins** | 1 | `documentation-tools` |
| **MCP Servers** | 13 | Pre-configured external integrations |
| **Total Commands** | 1 | `/update-specs` (Internal) |
| **Specialized Skills** | 1 | `app-spec-generator` |

## Component Reference

### 1. Internal Plugin: Documentation Tools

The core internal plugin for project management and spec tracking.

- `/update-specs` - Scans `/specs/` and generates `/specs/app-specs.md`.
- Uses markdown checkboxes for zero-config progress tracking.
- Extracts tech stack and database schema information.

### 2. External MCP Integrations

These are located in `plugins_mcp/` and provide deep integrations with external platforms.

| Area | Plugins |
|------|---------|
| **Development** | `github`, `context7`, `playwright`, `shadcn`, `chrome-devtools` |
| **Data & Scraping** | `apify`, `firecrawl` |
| **Database** | `neon`, `prisma`, `supabase` |
| **Services** | `stripe`, `vercel`, `slack` |

## Tech Stack Coverage

✅ **Framework:** Next.js 15, React 19
✅ **Styling:** Tailwind CSS, shadcn/ui
✅ **Database:** Postgres, Drizzle ORM, Prisma, Neon, Supabase
✅ **AI SDK:** Vercel AI SDK
✅ **Testing:** Vitest, Playwright
✅ **Workflow:** GitHub, Vercel, Slack

## Files Created/Maintained

- **Marketplace Manifest:** `.claude-plugin/marketplace.json`
- **Plugin Manifests:** `plugins/documentation-tools/.claude-plugin/plugin.json`
- **Documentation:** `README.md`, `QUICKSTART.md`, `MARKETPLACE_STRUCTURE.md`
- **MCP Configs:** 13 files in `plugins_mcp/`

## Versioning & Metadata

- **Marketplace Version:** 1.0.0
- **Authors:** Darryn Balanco (<darryn@optimus01.com>)
- **Repository:** [github.com/dbalanco/perseon-ai-marketplace](https://github.com/dbalanco/perseon-ai-marketplace)

---

**Ready to use!** Follow the [QUICKSTART.md](QUICKSTART.md) to get started. 🚀
