---
description: Create a Polar checkout flow for subscriptions or products
---

# Create Polar Checkout

Generate a checkout flow using Polar for subscription or one-time payments.

## Instructions

1. Ask the user what type of checkout:
   - Subscription checkout
   - One-time product purchase
   - Custom checkout
2. Create Server Action or API route for checkout creation
3. Generate checkout session with Polar SDK:
   - Set up product/pricing
   - Configure success/cancel URLs
   - Add customer metadata
   - Set billing intervals for subscriptions
4. Create checkout page or component:
   - Render Polar checkout UI
   - Handle success/cancel redirects
   - Show loading states
5. Implement post-checkout logic:
   - Success page with confirmation
   - Webhook handling for fulfillment
   - Update user subscription status
6. Add proper error handling and validation

## Checkout Example

```typescript
'use server'

import { polar } from '@/lib/polar'
import { auth } from '@/lib/auth'

export async function createCheckoutSession(priceId: string) {
  const session = await auth.getSession()
  if (!session) throw new Error('Unauthorized')

  const checkout = await polar.checkouts.create({
    productPriceId: priceId,
    successUrl: `${process.env.NEXT_PUBLIC_URL}/success`,
    customerEmail: session.user.email,
  })

  return checkout.url
}
```

Ensure secure checkout flow with proper authentication.
