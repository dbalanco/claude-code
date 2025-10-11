---
description: Create a new Next.js 15 App Router page with TypeScript
---

# Create Next.js Page

Create a new page in the Next.js 15 App Router with proper TypeScript types and conventions.

## Instructions

1. Ask the user for the page route (e.g., `/dashboard`, `/products/[id]`)
2. Create the appropriate directory structure under `app/`
3. Generate a `page.tsx` file with:
   - Proper TypeScript types
   - Server Component by default (use 'use client' only if needed)
   - Metadata export for SEO
   - Proper params and searchParams typing for dynamic routes
4. Include loading.tsx and error.tsx if the user requests them
5. Follow Next.js 15 best practices for data fetching and caching

## Example Structure

For `/dashboard/users/[id]`:
```
app/
  dashboard/
    users/
      [id]/
        page.tsx
        loading.tsx (optional)
        error.tsx (optional)
```

Use async Server Components for data fetching when possible.
