---
description: Create or update Next.js middleware with common patterns
---

# Add Middleware

Create or update Next.js middleware with authentication, redirects, and request handling.

## Instructions

1. Check if `middleware.ts` exists in the project root
2. If creating new middleware:
   - Create `middleware.ts` in the project root (same level as `app/`)
   - Import NextResponse and NextRequest
   - Create and export the middleware function
   - Add matcher config for specific routes
3. Common middleware patterns to offer:
   - Authentication/Authorization checks
   - Redirect logic (e.g., authenticated users away from /login)
   - Request/Response header manipulation
   - Geolocation-based routing
   - A/B testing logic
   - Rate limiting setup
   - Logging and analytics
4. Use proper TypeScript types
5. Include matcher configuration to optimize performance

## Example Structure

```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Middleware logic
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
```

Ensure middleware is efficient and only runs on necessary routes.
