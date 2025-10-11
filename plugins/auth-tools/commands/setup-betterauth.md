---
description: Set up BetterAuth in a Next.js 15 project
---

# Setup BetterAuth

Initialize BetterAuth with proper configuration for Next.js 15 and your database.

## Instructions

1. Install BetterAuth and dependencies:
   ```bash
   pnpm add better-auth
   ```
2. Create auth configuration file `src/lib/auth.ts`:
   - Configure BetterAuth instance
   - Set up database adapter (using Drizzle)
   - Configure providers (email, OAuth, etc.)
   - Set up session management
3. Create API route at `app/api/auth/[...betterauth]/route.ts`:
   - Import auth instance
   - Export GET and POST handlers
4. Create auth utilities:
   - `src/lib/auth-client.ts` for client-side auth
   - Server-side auth helpers
5. Set up environment variables in `.env.local`:
   - AUTH_SECRET
   - OAuth credentials if using OAuth
   - Base URL configuration
6. Create middleware integration if needed for protected routes
7. Provide example usage in Server Components and Client Components

## Configuration Example

```typescript
import { BetterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'

export const auth = new BetterAuth({
  database: drizzleAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    },
  },
})
```

Ensure proper TypeScript types and security best practices.
