---
description: Set up Polar payment processing in Next.js
---

# Setup Polar

Initialize Polar SDK and configure payment processing for your SaaS application.

## Instructions

1. Install Polar SDK:
   ```bash
   pnpm add @polar-sh/sdk
   ```
2. Create Polar client configuration `src/lib/polar.ts`:
   - Initialize Polar client with access token
   - Configure server-side client
   - Set up webhook handling
3. Add environment variables to `.env.local`:
   - POLAR_ACCESS_TOKEN
   - POLAR_WEBHOOK_SECRET
   - NEXT_PUBLIC_POLAR_ORGANIZATION_ID
4. Create webhook handler at `app/api/webhooks/polar/route.ts`:
   - Verify webhook signatures
   - Handle subscription events
   - Update database with subscription status
5. Set up database schema for subscriptions:
   - User subscription status
   - Subscription metadata
   - Payment history
6. Create utility functions for:
   - Checking subscription status
   - Creating checkout sessions
   - Managing subscriptions

## Polar Client Example

```typescript
import { Polar } from '@polar-sh/sdk'

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
})
```

Provide complete integration setup with webhook handling.
