---
description: Create a Next.js Server Action with proper types and validation
---

# Create Server Action

Generate a type-safe Server Action for form handling and server-side mutations in Next.js 15.

## Instructions

1. Ask the user for the action name and purpose
2. Create a new file in the appropriate location (usually `app/actions/` or co-located with the feature)
3. Generate the Server Action with:
   - 'use server' directive at the top
   - TypeScript types for input parameters
   - Input validation using Zod schema
   - Proper return type with success/error states
   - Error handling with try-catch
   - revalidatePath() or revalidateTag() calls where appropriate
   - Proper authorization checks if needed
4. Include usage example in comments

## Example Pattern

```typescript
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function createUser(formData: FormData) {
  // Validation
  // Database operation
  // Revalidation
  // Return result
}
```

Ensure proper error handling and type safety throughout.
