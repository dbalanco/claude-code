---
description: Create Polar webhook handlers for payment events
---

# Handle Polar Webhooks

Set up webhook handling for Polar payment and subscription events.

## Instructions

1. Create webhook route at `app/api/webhooks/polar/route.ts`
2. Implement webhook signature verification
3. Handle different event types:
   - `checkout.completed` - Payment successful
   - `subscription.created` - New subscription
   - `subscription.updated` - Subscription changed
   - `subscription.cancelled` - Subscription ended
   - `order.created` - One-time purchase
4. For each event:
   - Verify webhook signature
   - Parse event payload
   - Update database accordingly
   - Send confirmation emails if needed
   - Return 200 response
5. Implement idempotency to handle duplicate webhooks
6. Add proper error handling and logging
7. Test webhook handling locally with Polar CLI

## Webhook Handler Pattern

```typescript
import { headers } from 'next/headers'
import { polar } from '@/lib/polar'
import { db } from '@/db'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('polar-signature')

  // Verify signature
  const event = polar.webhooks.verify(body, signature!)

  switch (event.type) {
    case 'checkout.completed':
      // Update user subscription
      await db.update(users)
        .set({ subscriptionStatus: 'active' })
        .where(eq(users.email, event.data.customer.email))
      break
    
    // Handle other events
  }

  return new Response(null, { status: 200 })
}
```

Ensure secure webhook handling with proper verification.
