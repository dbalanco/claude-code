---
description: Add OAuth provider to BetterAuth configuration
---

# Add OAuth Provider

Configure a new OAuth provider (GitHub, Google, etc.) in BetterAuth.

## Instructions

1. Ask which OAuth provider to add (GitHub, Google, Twitter, Discord, etc.)
2. Update the BetterAuth configuration in `src/lib/auth.ts`
3. Add the provider to socialProviders configuration
4. Guide user to:
   - Create OAuth app on provider platform
   - Get Client ID and Client Secret
   - Set up redirect URLs
   - Add credentials to `.env.local`
5. Create or update sign-in UI to include the new provider
6. Test the OAuth flow

## Supported Providers

- GitHub
- Google
- Microsoft
- Discord
- Twitter
- Facebook
- Apple
- And more...

## Configuration Pattern

```typescript
socialProviders: {
  google: {
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!,
  },
  github: {
    clientId: process.env.GITHUB_ID!,
    clientSecret: process.env.GITHUB_SECRET!,
  },
}
```

Provide setup instructions for the specific OAuth provider.
