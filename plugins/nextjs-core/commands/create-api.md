---
description: Create a new Next.js API route with route handlers
---

# Create API Route

Create a new API route using Next.js 15 Route Handlers with proper TypeScript types.

## Instructions

1. Ask the user for the API endpoint path (e.g., `/api/users`, `/api/products/[id]`)
2. Create the route.ts file in the appropriate app directory
3. Generate route handlers with:
   - TypeScript types for Request and Response
   - Proper HTTP method exports (GET, POST, PUT, DELETE, PATCH)
   - NextRequest and NextResponse imports
   - Error handling with try-catch
   - Proper status codes and JSON responses
   - Type-safe params for dynamic routes
4. Include input validation patterns
5. Add CORS headers if needed for external API calls

## Best Practices

- Use NextResponse.json() for JSON responses
- Implement proper error handling
- Validate request bodies with Zod or similar
- Use appropriate HTTP status codes
- Handle authentication/authorization checks
- Implement rate limiting considerations
