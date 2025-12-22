# Quick Start Guide

Get your Next.js SaaS project documentation and development tools set up in 5 minutes with the Perseon AI Marketplace.

## Step 1: Install the Marketplace

From your project root (ensure you have [Claude Code](https://docs.anthropic.com/claude/docs/claude-code) installed):

```bash
# Start Claude Code
claude

# Add this directory as a plugin marketplace
/plugin marketplace add .
```

## Step 2: Install Core Plugins

Install the essential productivity tools:

```
/plugin install documentation-tools@perseon-ai-marketplace
```

**Note:** You may need to restart Claude Code to fully activate all plugin capabilities.

## Step 3: Configure MCP Plugins

External MCP plugins are pre-configured in `plugins_mcp/`. To enable those that require API keys (like GitHub or Firecrawl):

1. Open `env.local.mcp` in your project root.
2. Fill in your API keys:

   ```bash
   GITHUB_PERSONAL_ACCESS_TOKEN=your_token
   CONTEXT7_API_KEY=your_key
   FIRECRAWL_API_KEY=your_key
   ```

3. Claude Code will automatically detect these on the next start.

## Step 4: Use the Documentation Tools

The `documentation-tools` plugin helps you track progress through your feature specifications.

1. **Create Feature Specs:** Organize your features in `/specs/feature-name/` with an `implementation-plan.md` using markdown checkboxes:

   ```markdown
   - [x] Database model
   - [ ] API endpoint
   ```

2. **Generate Dashboard:**

   ```
   /update-specs
   ```

   This generates or updates `/specs/app-specs.md` with a visual progress dashboard.

## Common Commands Reference

| Command | Purpose | Plugin |
|---------|---------|--------|
| `/update-specs` | Update progress dashboard | `documentation-tools` |
| `/plugin` | Manage installed plugins | Claude Built-in |
| `/help` | See all available commands | Claude Built-in |

## Pro Tips

1. **Check MCP Status:** Use `/plugin` to see which MCP servers are currently connected.
2. **Auto-Discovery:** Claude automatically uses the appropriate tools based on your natural language requests.
3. **Customize:** Each plugin's behavior is defined in its `commands/` or `skills/` directory.

---

**Questions?** Contact Darryn Balanco at <darryn@optimus01.com>.
Happy building! 🚀
