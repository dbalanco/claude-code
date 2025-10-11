---
description: Create a protected Next.js route with BetterAuth
---

# Create Protected Route

Generate a protected page or API route with BetterAuth authentication checks.

## Instructions

1. Ask the user if they want to protect a page or an API route
2. For protected pages:
   - Create Server Component with auth check
   - Get session using BetterAuth server helpers
   - Redirect to login if not authenticated
   - Pass user data to page component
3. For protected API routes:
   - Add auth check at the beginning of route handler
   - Return 401 if not authenticated
   - Include user in request context
4. Implement role-based access if needed
5. Add proper TypeScript types for user and session
6. Handle authentication errors gracefully

## Protected Page Example

```typescript
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function ProtectedPage() {
  const session = await auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  return <div>Welcome {session.user.name}</div>
}
```

## Protected API Example

```typescript
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth.getSession()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Protected logic here
}
```

Ensure proper security and error handling.
