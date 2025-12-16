# Architecture Guide - Master Patterns

**Version:** 3.0.0  
**Last Updated:** 2025-11-11  
**Purpose:** Complete master reference for production-grade Next.js full-stack applications

---

## ⚠️ CRITICAL: This File's Role

**This is the MASTER patterns guide for ALL Next.js projects using Perseon Workflow.**

### Key Principles

1. **Never Modified by /init Command**
   - This file is READ by /init
   - /init uses these patterns to generate project-specific docs
   - Only update when discovering new architectural patterns (rare)

2. **Copy to Every New Project**
   - Same file across all projects
   - Ensures consistency
   - Single source of truth for patterns

3. **Generic Examples Only**
   - Use `[feature-name]` placeholders
   - Use `[resource]` for APIs
   - Never use specific feature names

4. **Production-Ready Patterns**
   - Battle-tested approaches
   - Performance optimized
   - Security hardened
   - Fully tested

---

## 📋 Table of Contents

1. [Documentation System](#documentation-system)
2. [Project Structure](#project-structure)
3. [Core Principles](#core-principles)
4. [Environment Setup](#environment-setup)
5. [File Placement Patterns](#file-placement-patterns)
6. [Feature Modules](#feature-modules)
7. [Server Actions](#server-actions)
8. [State Management](#state-management)
9. [Error Handling](#error-handling)
10. [Testing Strategy](#testing-strategy)
11. [Performance Patterns](#performance-patterns)
12. [Security Patterns](#security-patterns)
13. [Observability](#observability)
14. [Deployment](#deployment)
15. [Advanced Patterns](#advanced-patterns)

---

## 📋 Documentation System

### The Four Files

1. **ARCHITECTURE.md (this file)** - Master patterns guide
   - HOW to build features
   - Reusable across ALL projects
   - Generic examples with placeholders
   - **Never modified by /init**

2. **APP_STRUCTURE.md** - Live state tracker
   - WHAT exists in THIS specific app
   - Updated by /init on first run
   - Maintained manually thereafter
   - Feature status tracking

3. **CLAUDE.md** - AI development standards
   - Development workflow
   - Coding standards
   - Project-specific tech stack (populated by /init)
   - Session management

4. **/memory-bank/changelog.md** - Version history
   - Tracks all changes
   - Follows Keep a Changelog format
   - Semantic versioning

---

## 📁 Project Structure

```
nextjs-app/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── deploy-preview.yml
│   │   └── deploy-production.yml
│   └── dependabot.yml
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── [feature]/
│   │   │   └── layout.tsx
│   │   ├── (marketing)/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── [resource]/route.ts
│   │   │   └── webhooks/[service]/route.ts
│   │   ├── layout.tsx
│   │   ├── error.tsx
│   │   ├── global-error.tsx
│   │   ├── not-found.tsx
│   │   └── providers.tsx
│   │
│   ├── features/
│   │   └── [feature-name]/
│   │       ├── actions/          # Server actions
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       ├── schemas/
│   │       ├── types/
│   │       ├── constants/
│   │       ├── lib/              # Feature utilities
│   │       └── index.ts
│   │
│   ├── core/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   └── error-handler.ts
│   │   ├── auth/
│   │   │   ├── nextauth.config.ts
│   │   │   ├── middleware.ts
│   │   │   └── providers/
│   │   ├── database/
│   │   │   ├── client.ts
│   │   │   ├── migrations/
│   │   │   └── seed.ts
│   │   ├── email/
│   │   │   ├── client.ts
│   │   │   └── templates/
│   │   ├── storage/
│   │   │   └── client.ts
│   │   ├── cache/
│   │   │   └── redis.ts
│   │   ├── monitoring/
│   │   │   ├── logger.ts
│   │   │   ├── metrics.ts
│   │   │   └── tracing.ts
│   │   ├── security/
│   │   │   ├── rate-limit.ts
│   │   │   ├── csrf.ts
│   │   │   └── sanitize.ts
│   │   └── config/
│   │       ├── env.ts
│   │       ├── constants.ts
│   │       └── features.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── forms/
│   │   │   └── data-display/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── types/
│   │   ├── constants/
│   │   └── lib/
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── themes/
│   │
│   └── middleware.ts
│
├── tests/
│   ├── e2e/
│   │   ├── [feature-name]/
│   │   └── fixtures/
│   ├── integration/
│   │   └── api/
│   ├── unit/
│   │   └── features/
│   ├── setup/
│   │   ├── test-utils.tsx
│   │   └── msw-handlers.ts
│   └── mocks/
│
├── public/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── .dockerignore
│
├── .env.example
├── .env.local
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── ARCHITECTURE.md
├── APP_STRUCTURE.md
├── CLAUDE.md
├── CHANGELOG.md
└── README.md
```

---

## 🧩 Core Principles

### 1. Feature-First Architecture
- Self-contained modules with clear boundaries
- Features own their domain logic
- No direct cross-feature imports
- Communication through shared types or services

### 2. App Router Patterns
- Server components by default
- Client components only when needed
- Route groups for organization
- Thin routes, thick features

### 3. Type Safety
- Zod schemas for all validation
- TypeScript strict mode
- Generated types from database
- No `any` in production code

### 4. Performance First
- Streaming with Suspense
- Partial Prerendering (PPR)
- Code splitting
- Image/font optimization

### 5. Security by Default
- CSRF protection
- Rate limiting
- Input sanitization
- Secure headers

---

## ⚙️ Environment Setup

### TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/core/*": ["./src/core/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/tests/*": ["./tests/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Environment Variables Validation

```typescript
// src/core/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Node
  NODE_ENV: z.enum(['development', 'production', 'test']),
  
  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  
  // OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  
  // Email
  RESEND_API_KEY: z.string().optional(),
  
  // Storage
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  AWS_REGION: z.string().optional(),
  AWS_S3_BUCKET: z.string().optional(),
  
  // Monitoring
  SENTRY_DSN: z.string().url().optional(),
  
  // Feature Flags
  ENABLE_ANALYTICS: z.string().transform(val => val === 'true').default('false'),
});

export const env = envSchema.parse(process.env);

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
```

### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    ppr: 'incremental', // Partial Prerendering
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn.com',
      },
    ],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    return config;
  },
};

module.exports = nextConfig;
```

---

## 📂 File Placement Patterns

### Decision Tree

```
Creating new code?
├─ Page/Route?
│  └─> app/(group)/[route]/page.tsx
├─ API Endpoint?
│  └─> app/api/[resource]/route.ts
├─ Server Action?
│  └─> features/[feature-name]/actions/[action].ts
├─ Domain Logic?
│  └─> features/[feature-name]/
├─ Infrastructure?
│  └─> core/[category]/
├─ Reusable UI?
│  └─> shared/components/
└─ Utility?
   └─> shared/utils/ or shared/lib/
```

---

## 🎯 Feature Modules

### Standard Feature Structure

```
src/features/[feature-name]/
├── actions/                  # Server actions
│   ├── create-item.ts
│   ├── update-item.ts
│   └── delete-item.ts
├── components/               # UI components
│   ├── ItemCard.tsx
│   ├── ItemList.tsx
│   └── ItemForm.tsx
├── hooks/                    # React hooks
│   ├── useItems.ts
│   ├── useItem.ts
│   └── useItemMutations.ts
├── services/                 # Business logic
│   └── item.service.ts
├── schemas/                  # Zod validation
│   └── item.schema.ts
├── types/                    # TypeScript types
│   └── index.ts
├── constants/                # Feature constants
│   └── index.ts
├── lib/                      # Feature utilities
│   └── helpers.ts
└── index.ts                  # Public exports
```

### Feature Types

```typescript
// src/features/[feature-name]/types/index.ts
export interface FeatureItem {
  id: string;
  title: string;
  description: string | null;
  userId: string;
  status: 'active' | 'inactive' | 'archived';
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null; // Soft delete
}

export interface CreateFeatureInput {
  title: string;
  description?: string;
  status?: 'active' | 'inactive';
  metadata?: Record<string, unknown>;
}

export interface UpdateFeatureInput extends Partial<CreateFeatureInput> {
  id: string;
}

export interface FeatureFilters {
  status?: 'active' | 'inactive' | 'archived';
  search?: string;
  userId?: string;
}

export interface FeaturePagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}
```

### Feature Schemas

```typescript
// src/features/[feature-name]/schemas/item.schema.ts
import { z } from 'zod';

export const itemSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .trim()
    .optional(),
  status: z.enum(['active', 'inactive', 'archived'])
    .default('active'),
  metadata: z.record(z.unknown()).optional(),
});

export const updateItemSchema = itemSchema.partial().extend({
  id: z.string().uuid(),
});

export const itemFiltersSchema = z.object({
  status: z.enum(['active', 'inactive', 'archived']).optional(),
  search: z.string().optional(),
  userId: z.string().uuid().optional(),
});

export const itemPaginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  perPage: z.coerce.number().min(1).max(100).default(10),
});

export type ItemFormData = z.infer<typeof itemSchema>;
export type UpdateItemFormData = z.infer<typeof updateItemSchema>;
export type ItemFilters = z.infer<typeof itemFiltersSchema>;
export type ItemPagination = z.infer<typeof itemPaginationSchema>;
```

### Feature Services

```typescript
// src/features/[feature-name]/services/item.service.ts
import { prisma } from '@/core/database/client';
import { logger } from '@/core/monitoring/logger';
import type { 
  FeatureItem, 
  CreateFeatureInput, 
  UpdateFeatureInput,
  FeatureFilters,
  FeaturePagination 
} from '../types';

export class ItemService {
  /**
   * Get all items with filters and pagination
   */
  async getAll(
    filters: FeatureFilters = {},
    pagination: { page: number; perPage: number }
  ): Promise<{ items: FeatureItem[]; pagination: FeaturePagination }> {
    try {
      const { page, perPage } = pagination;
      const skip = (page - 1) * perPage;

      const where = {
        deletedAt: null, // Exclude soft-deleted
        ...(filters.status && { status: filters.status }),
        ...(filters.userId && { userId: filters.userId }),
        ...(filters.search && {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
          ],
        }),
      };

      const [items, total] = await Promise.all([
        prisma.item.findMany({
          where,
          skip,
          take: perPage,
          orderBy: { createdAt: 'desc' },
        }),
        prisma.item.count({ where }),
      ]);

      return {
        items,
        pagination: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
        },
      };
    } catch (error) {
      logger.error('Failed to fetch items', { error, filters });
      throw error;
    }
  }

  /**
   * Get single item by ID
   */
  async getById(id: string): Promise<FeatureItem | null> {
    try {
      return await prisma.item.findFirst({
        where: { id, deletedAt: null },
      });
    } catch (error) {
      logger.error('Failed to fetch item', { error, id });
      throw error;
    }
  }

  /**
   * Create new item
   */
  async create(input: CreateFeatureInput, userId: string): Promise<FeatureItem> {
    try {
      const item = await prisma.item.create({
        data: {
          ...input,
          userId,
        },
      });

      logger.info('Item created', { itemId: item.id, userId });
      return item;
    } catch (error) {
      logger.error('Failed to create item', { error, input });
      throw error;
    }
  }

  /**
   * Update existing item
   */
  async update(id: string, input: UpdateFeatureInput): Promise<FeatureItem> {
    try {
      const item = await prisma.item.update({
        where: { id },
        data: {
          ...input,
          updatedAt: new Date(),
        },
      });

      logger.info('Item updated', { itemId: id });
      return item;
    } catch (error) {
      logger.error('Failed to update item', { error, id, input });
      throw error;
    }
  }

  /**
   * Soft delete item
   */
  async delete(id: string): Promise<void> {
    try {
      await prisma.item.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      logger.info('Item soft deleted', { itemId: id });
    } catch (error) {
      logger.error('Failed to delete item', { error, id });
      throw error;
    }
  }

  /**
   * Permanently delete item
   */
  async hardDelete(id: string): Promise<void> {
    try {
      await prisma.item.delete({
        where: { id },
      });

      logger.warn('Item permanently deleted', { itemId: id });
    } catch (error) {
      logger.error('Failed to hard delete item', { error, id });
      throw error;
    }
  }

  /**
   * Restore soft-deleted item
   */
  async restore(id: string): Promise<FeatureItem> {
    try {
      const item = await prisma.item.update({
        where: { id },
        data: { deletedAt: null },
      });

      logger.info('Item restored', { itemId: id });
      return item;
    } catch (error) {
      logger.error('Failed to restore item', { error, id });
      throw error;
    }
  }
}

export const itemService = new ItemService();
```

### Feature Hooks

```typescript
// src/features/[feature-name]/hooks/useItems.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { itemService } from '../services/item.service';
import type { FeatureFilters, ItemPagination } from '../types';

export function useItems(
  filters: FeatureFilters = {},
  pagination: { page: number; perPage: number } = { page: 1, perPage: 10 }
) {
  return useQuery({
    queryKey: ['items', filters, pagination],
    queryFn: () => itemService.getAll(filters, pagination),
    staleTime: 5000, // 5 seconds
  });
}

export function useItem(id: string | null) {
  return useQuery({
    queryKey: ['items', id],
    queryFn: () => (id ? itemService.getById(id) : null),
    enabled: !!id,
  });
}

export function useItemMutations() {
  const queryClient = useQueryClient();

  const createItem = useMutation({
    mutationFn: itemService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  const updateItem = useMutation({
    mutationFn: ({ id, input }: { id: string; input: any }) =>
      itemService.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['items', variables.id] });
    },
  });

  const deleteItem = useMutation({
    mutationFn: itemService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });

  return {
    createItem,
    updateItem,
    deleteItem,
  };
}
```

---

## ⚡ Server Actions

### Server Action Pattern

```typescript
// src/features/[feature-name]/actions/create-item.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { itemSchema } from '../schemas/item.schema';
import { itemService } from '../services/item.service';
import { logger } from '@/core/monitoring/logger';

export async function createItemAction(formData: FormData) {
  try {
    // 1. Authenticate
    const session = await getServerSession();
    if (!session?.user?.id) {
      return { error: 'Unauthorized' };
    }

    // 2. Validate input
    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      status: formData.get('status'),
    };

    const validated = itemSchema.parse(rawData);

    // 3. Create item
    const item = await itemService.create(validated, session.user.id);

    // 4. Revalidate cache
    revalidatePath('/dashboard/items');
    revalidatePath(`/dashboard/items/${item.id}`);

    // 5. Return success
    return { success: true, item };
  } catch (error) {
    logger.error('Create item action failed', { error });
    
    if (error instanceof z.ZodError) {
      return { error: 'Validation failed', details: error.errors };
    }
    
    return { error: 'Failed to create item' };
  }
}

// With redirect
export async function createItemActionWithRedirect(formData: FormData) {
  const result = await createItemAction(formData);
  
  if (result.error) {
    // Handle error (you'll use error boundary or state)
    throw new Error(result.error);
  }
  
  redirect(`/dashboard/items/${result.item.id}`);
}
```

### Optimistic Updates with Server Actions

```typescript
// src/features/[feature-name]/actions/update-item.ts
'use server';

import { revalidateTag } from 'next/cache';
import { updateItemSchema } from '../schemas/item.schema';
import { itemService } from '../services/item.service';

export async function updateItemAction(prevState: any, formData: FormData) {
  try {
    const rawData = {
      id: formData.get('id'),
      title: formData.get('title'),
      description: formData.get('description'),
    };

    const validated = updateItemSchema.parse(rawData);
    const item = await itemService.update(validated.id, validated);

    revalidateTag('items');
    
    return { success: true, item };
  } catch (error) {
    return { success: false, error: 'Failed to update' };
  }
}
```

### Using Server Actions in Components

```tsx
// src/features/[feature-name]/components/ItemForm.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createItemAction } from '../actions/create-item';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Item'}
    </button>
  );
}

export function ItemForm() {
  const [state, formAction] = useFormState(createItemAction, { error: null });

  return (
    <form action={formAction}>
      <input name="title" required />
      <textarea name="description" />
      {state?.error && <p className="error">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
```

---

## 🎨 State Management

### 1. Server State (React Query)

```typescript
// src/shared/lib/react-query.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Query key factory
export const queryKeys = {
  items: {
    all: ['items'] as const,
    lists: () => [...queryKeys.items.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.items.lists(), { filters }] as const,
    details: () => [...queryKeys.items.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.items.details(), id] as const,
  },
};
```

### 2. URL State (Search Params)

```tsx
// src/features/[feature-name]/components/ItemList.tsx
'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function ItemFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset to page 1 when filters change
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <input
        type="search"
        value={searchParams.get('search') || ''}
        onChange={(e) => updateFilters('search', e.target.value)}
        placeholder="Search..."
      />
      <select
        value={searchParams.get('status') || ''}
        onChange={(e) => updateFilters('status', e.target.value)}
      >
        <option value="">All</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
```

### 3. Form State (react-hook-form + Zod)

```tsx
// src/features/[feature-name]/components/ItemForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { itemSchema, type ItemFormData } from '../schemas/item.schema';
import { useItemMutations } from '../hooks/useItems';

export function ItemForm({ defaultValues }: { defaultValues?: ItemFormData }) {
  const { createItem } = useItemMutations();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });

  const onSubmit = async (data: ItemFormData) => {
    try {
      await createItem.mutateAsync(data);
      reset();
    } catch (error) {
      // Error handling
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register('title')}
          aria-invalid={errors.title ? 'true' : 'false'}
        />
        {errors.title && (
          <span role="alert">{errors.title.message}</span>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register('description')}
        />
        {errors.description && (
          <span role="alert">{errors.description.message}</span>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
}
```

### 4. Global UI State (Zustand)

```typescript
// src/shared/store/ui-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  sidebarOpen: boolean;
  theme: 'light' | 'dark' | 'system';
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      theme: 'system',
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-storage',
    }
  )
);
```

### 5. Optimistic Updates

```typescript
// src/features/[feature-name]/hooks/useOptimisticItems.ts
import { useOptimistic } from 'react';
import { updateItemAction } from '../actions/update-item';

export function useOptimisticItems(items: Item[]) {
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    items,
    (state, newItem: Item) => {
      return state.map((item) =>
        item.id === newItem.id ? newItem : item
      );
    }
  );

  const updateItem = async (id: string, updates: Partial<Item>) => {
    // Optimistically update UI
    setOptimisticItems({ ...items.find(i => i.id === id), ...updates });
    
    // Make actual update
    await updateItemAction(updates);
  };

  return { optimisticItems, updateItem };
}
```

---

## 🚨 Error Handling

### Error Boundary (Route Level)

```tsx
// app/(dashboard)/[feature]/error.tsx
'use client';

import { useEffect } from 'react';
import { logger } from '@/core/monitoring/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('Route error', { error, digest: error.digest });
  }, [error]);

  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Global Error Boundary

```tsx
// app/global-error.tsx
'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
```

### API Error Handler

```typescript
// src/core/api/error-handler.ts
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { logger } from '@/core/monitoring/logger';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export function handleApiError(error: unknown) {
  logger.error('API Error', { error });

  // Validation errors
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        code: 'VALIDATION_ERROR',
        message: 'Validation failed',
        details: error.errors,
      },
      { status: 400 }
    );
  }

  // Custom app errors
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        code: error.code,
        message: error.message,
        details: error.details,
      },
      { status: error.statusCode }
    );
  }

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        {
          code: 'DUPLICATE_ENTRY',
          message: 'Resource already exists',
          details: error.meta,
        },
        { status: 409 }
      );
    }

    if (error.code === 'P2025') {
      return NextResponse.json(
        {
          code: 'NOT_FOUND',
          message: 'Resource not found',
        },
        { status: 404 }
      );
    }
  }

  // Unknown errors
  return NextResponse.json(
    {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred',
    },
    { status: 500 }
  );
}
```

### API Route with Error Handling

```typescript
// app/api/[resource]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { itemSchema } from '@/features/[feature-name]/schemas/item.schema';
import { itemService } from '@/features/[feature-name]/services/item.service';
import { handleApiError, AppError } from '@/core/api/error-handler';

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate
    const session = await getServerSession();
    if (!session?.user?.id) {
      throw new AppError(401, 'UNAUTHORIZED', 'Authentication required');
    }

    // 2. Validate
    const body = await req.json();
    const validated = itemSchema.parse(body);

    // 3. Business logic
    const item = await itemService.create(validated, session.user.id);

    // 4. Response
    return NextResponse.json({ data: item }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
```

---

## 🧪 Testing Strategy

### Test Setup

```typescript
// tests/setup/test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
```

### Unit Tests (Vitest)

```typescript
// tests/unit/features/[feature-name]/services/item.service.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { itemService } from '@/features/[feature-name]/services/item.service';
import { prisma } from '@/core/database/client';

vi.mock('@/core/database/client', () => ({
  prisma: {
    item: {
      findMany: vi.fn(),
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
      count: vi.fn(),
    },
  },
}));

describe('ItemService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should return items with pagination', async () => {
      const mockItems = [
        { id: '1', title: 'Item 1', userId: 'user1' },
        { id: '2', title: 'Item 2', userId: 'user1' },
      ];

      vi.mocked(prisma.item.findMany).mockResolvedValue(mockItems);
      vi.mocked(prisma.item.count).mockResolvedValue(10);

      const result = await itemService.getAll({}, { page: 1, perPage: 10 });

      expect(result.items).toEqual(mockItems);
      expect(result.pagination.total).toBe(10);
      expect(prisma.item.findMany).toHaveBeenCalledWith({
        where: { deletedAt: null },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
      });
    });

    it('should apply filters correctly', async () => {
      await itemService.getAll(
        { status: 'active', search: 'test' },
        { page: 1, perPage: 10 }
      );

      expect(prisma.item.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            status: 'active',
            OR: expect.any(Array),
          }),
        })
      );
    });
  });

  describe('create', () => {
    it('should create item successfully', async () => {
      const input = { title: 'New Item', description: 'Test' };
      const mockItem = { id: '1', ...input, userId: 'user1' };

      vi.mocked(prisma.item.create).mockResolvedValue(mockItem);

      const result = await itemService.create(input, 'user1');

      expect(result).toEqual(mockItem);
      expect(prisma.item.create).toHaveBeenCalledWith({
        data: { ...input, userId: 'user1' },
      });
    });
  });
});
```

### Integration Tests (API Routes)

```typescript
// tests/integration/api/items.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createMocks } from 'node-mocks-http';
import { POST, GET } from '@/app/api/items/route';

describe('/api/items', () => {
  describe('POST', () => {
    it('should create item with valid data', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          title: 'Test Item',
          description: 'Test description',
        },
      });

      const response = await POST(req as any);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.data).toHaveProperty('id');
      expect(data.data.title).toBe('Test Item');
    });

    it('should return 400 for invalid data', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: {
          title: 'ab', // Too short
        },
      });

      const response = await POST(req as any);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.code).toBe('VALIDATION_ERROR');
    });
  });
});
```

### Component Tests

```typescript
// tests/unit/features/[feature-name]/components/ItemForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/tests/setup/test-utils';
import { ItemForm } from '@/features/[feature-name]/components/ItemForm';

describe('ItemForm', () => {
  it('should render form fields', () => {
    renderWithProviders(<ItemForm />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('should show validation errors', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ItemForm />);
    
    const submitButton = screen.getByRole('button', { name: /save/i });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ItemForm />);
    
    await user.type(screen.getByLabelText(/title/i), 'Test Item');
    await user.type(screen.getByLabelText(/description/i), 'Test description');
    await user.click(screen.getByRole('button', { name: /save/i }));
    
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/items/create-item.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Create Item Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/dashboard');
  });

  test('should create item successfully', async ({ page }) => {
    // Navigate to items page
    await page.goto('/dashboard/items');
    
    // Click create button
    await page.click('button:has-text("Create Item")');
    
    // Fill form
    await page.fill('input[name="title"]', 'E2E Test Item');
    await page.fill('textarea[name="description"]', 'Created via E2E test');
    
    // Submit
    await page.click('button[type="submit"]');
    
    // Verify redirect and item appears
    await expect(page).toHaveURL(/\/dashboard\/items\/[a-f0-9-]+/);
    await expect(page.locator('h1')).toContainText('E2E Test Item');
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/dashboard/items/new');
    
    // Submit empty form
    await page.click('button[type="submit"]');
    
    // Check for error messages
    await expect(page.locator('text=Title must be at least 3 characters')).toBeVisible();
  });
});
```

### MSW Handlers for Mocking

```typescript
// tests/setup/msw-handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/items', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: [
          { id: '1', title: 'Mock Item 1' },
          { id: '2', title: 'Mock Item 2' },
        ],
      })
    );
  }),

  rest.post('/api/items', async (req, res, ctx) => {
    const body = await req.json();
    return res(
      ctx.status(201),
      ctx.json({
        data: {
          id: 'new-id',
          ...body,
        },
      })
    );
  }),
];
```

---

## ⚡ Performance Patterns

### 1. Streaming with Suspense

```tsx
// app/(dashboard)/items/page.tsx
import { Suspense } from 'react';
import { ItemList } from '@/features/[feature-name]/components/ItemList';
import { ItemListSkeleton } from '@/features/[feature-name]/components/ItemListSkeleton';

export default function ItemsPage() {
  return (
    <div>
      <h1>Items</h1>
      <Suspense fallback={<ItemListSkeleton />}>
        <ItemList />
      </Suspense>
    </div>
  );
}

// Async server component
async function ItemList() {
  const items = await itemService.getAll({}, { page: 1, perPage: 10 });
  
  return (
    <div>
      {items.items.map(item => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
```

### 2. Partial Prerendering (PPR)

```typescript
// next.config.js
module.exports = {
  experimental: {
    ppr: 'incremental',
  },
};

// app/(dashboard)/items/[id]/page.tsx
import { Suspense } from 'react';

export const experimental_ppr = true;

export default function ItemPage({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* Static shell renders immediately */}
      <Header />
      
      {/* Dynamic content streams in */}
      <Suspense fallback={<ItemSkeleton />}>
        <ItemDetails id={params.id} />
      </Suspense>
      
      <Suspense fallback={<CommentsSkeleton />}>
        <ItemComments id={params.id} />
      </Suspense>
    </div>
  );
}
```

### 3. Parallel Data Fetching

```tsx
// app/(dashboard)/items/[id]/page.tsx
async function ItemPage({ params }: { params: { id: string } }) {
  // Fetch in parallel
  const [item, comments, relatedItems] = await Promise.all([
    itemService.getById(params.id),
    commentsService.getByItemId(params.id),
    itemService.getRelated(params.id),
  ]);

  return (
    <div>
      <ItemDetails item={item} />
      <CommentsList comments={comments} />
      <RelatedItems items={relatedItems} />
    </div>
  );
}
```

### 4. Static Generation with Revalidation

```tsx
// app/(marketing)/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return <Post post={post} />;
}
```

### 5. Image Optimization

```tsx
// src/shared/components/OptimizedImage.tsx
import Image from 'next/image';

export function OptimizedImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={630}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      quality={85}
      priority={false}
      loading="lazy"
    />
  );
}
```

### 6. Code Splitting

```tsx
// app/(dashboard)/items/page.tsx
import dynamic from 'next/dynamic';

// Lazy load heavy components
const ItemChart = dynamic(
  () => import('@/features/[feature-name]/components/ItemChart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false, // Skip server-side rendering if needed
  }
);

export default function ItemsPage() {
  return (
    <div>
      <ItemList />
      <ItemChart />
    </div>
  );
}
```

### 7. React Query Optimization

```typescript
// src/features/[feature-name]/hooks/useItems.ts
export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

// Prefetch for better UX
export function usePrefetchItem() {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['items', id],
      queryFn: () => fetchItem(id),
    });
  };
}
```

---

## 🔒 Security Patterns

### 1. Middleware Authentication

```typescript
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/login');
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard');

  // Redirect to login if accessing protected page without auth
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect to dashboard if accessing auth page while logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 2. Rate Limiting

```typescript
// src/core/security/rate-limit.ts
import { LRUCache } from 'lru-cache';

type RateLimitOptions = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token: string): Promise<void> =>
      new Promise((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        
        if (tokenCount[0] === 0) {
          tokenCache.set(token, [1]);
        }
        
        tokenCount[0] += 1;
        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        
        return isRateLimited ? reject() : resolve();
      }),
  };
}

// Usage in API route
const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500,
});

export async function POST(req: NextRequest) {
  try {
    const ip = req.ip ?? '127.0.0.1';
    await limiter.check(10, ip); // 10 requests per minute
    
    // Handle request
  } catch {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    );
  }
}
```

### 3. CSRF Protection

```typescript
// src/core/security/csrf.ts
import { createHash, randomBytes } from 'crypto';

export function generateCsrfToken(): string {
  return randomBytes(32).toString('hex');
}

export function hashCsrfToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function verifyCsrfToken(token: string, hash: string): boolean {
  const expectedHash = hashCsrfToken(token);
  return expectedHash === hash;
}

// Usage in server action
'use server';

import { cookies } from 'next/headers';
import { verifyCsrfToken } from '@/core/security/csrf';

export async function protectedAction(formData: FormData) {
  const token = formData.get('csrf_token') as string;
  const cookieStore = cookies();
  const storedHash = cookieStore.get('csrf_token')?.value;
  
  if (!token || !storedHash || !verifyCsrfToken(token, storedHash)) {
    throw new Error('Invalid CSRF token');
  }
  
  // Proceed with action
}
```

### 4. Input Sanitization

```typescript
// src/core/security/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'title'],
  });
}

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[^a-z0-9.-]/gi, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase();
}
```

### 5. SQL Injection Prevention (Prisma)

```typescript
// ✅ SAFE - Parameterized query
const items = await prisma.item.findMany({
  where: {
    title: { contains: searchTerm },
  },
});

// ❌ DANGEROUS - Raw SQL (avoid if possible)
const items = await prisma.$queryRawUnsafe(
  `SELECT * FROM items WHERE title LIKE '%${searchTerm}%'`
);

// ✅ SAFE - Raw SQL with parameters
const items = await prisma.$queryRaw`
  SELECT * FROM items WHERE title LIKE ${`%${searchTerm}%`}
`;
```

### 6. Secure Headers

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};
```

---

## 📊 Observability

### 1. Structured Logging

```typescript
// src/core/monitoring/logger.ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? { target: 'pino-pretty' }
      : undefined,
  formatters: {
    level: (label) => ({ level: label }),
  },
});

// Usage
logger.info('User logged in', { userId: '123' });
logger.error('Failed to create item', { error, userId });
logger.warn('Rate limit approaching', { ip, usage });
```

### 2. Metrics Collection

```typescript
// src/core/monitoring/metrics.ts
class Metrics {
  private metrics: Map<string, number> = new Map();

  increment(key: string, value: number = 1) {
    const current = this.metrics.get(key) || 0;
    this.metrics.set(key, current + value);
  }

  gauge(key: string, value: number) {
    this.metrics.set(key, value);
  }

  timing(key: string, duration: number) {
    this.metrics.set(`${key}.duration`, duration);
  }

  getAll() {
    return Object.fromEntries(this.metrics);
  }
}

export const metrics = new Metrics();

// Usage
metrics.increment('api.items.create');
metrics.timing('api.items.duration', Date.now() - startTime);
```

### 3. Performance Monitoring

```typescript
// src/core/monitoring/tracing.ts
export function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const startTime = Date.now();
    
    try {
      const result = await fn();
      const duration = Date.now() - startTime;
      
      logger.info('Performance metric', {
        name,
        duration,
        success: true,
      });
      
      resolve(result);
    } catch (error) {
      const duration = Date.now() - startTime;
      
      logger.error('Performance metric', {
        name,
        duration,
        success: false,
        error,
      });
      
      reject(error);
    }
  });
}

// Usage
const items = await measurePerformance('fetchItems', async () => {
  return await itemService.getAll({}, { page: 1, perPage: 10 });
});
```

---

## 🚀 Deployment

### 1. Vercel Deployment

```yaml
# vercel.json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

### 2. Docker Deployment

```dockerfile
# docker/Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker/docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - NEXTAUTH_SECRET=your-secret
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 3. CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run type check
        run: npm run type-check
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

```yaml
# .github/workflows/deploy-production.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production

    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 🔧 Advanced Patterns

### 1. Multi-Tenancy

```typescript
// src/core/database/tenant.ts
import { AsyncLocalStorage } from 'async_hooks';

const tenantContext = new AsyncLocalStorage<{ tenantId: string }>();

export function getTenantId(): string | undefined {
  return tenantContext.getStore()?.tenantId;
}

export function runWithTenant<T>(tenantId: string, fn: () => T): T {
  return tenantContext.run({ tenantId }, fn);
}

// Middleware
export function tenantMiddleware(tenantId: string) {
  return (handler: Function) => {
    return (...args: any[]) => {
      return runWithTenant(tenantId, () => handler(...args));
    };
  };
}

// Usage in Prisma
export const prisma = new PrismaClient().$extends({
  query: {
    $allModels: {
      async findMany({ args, query }) {
        const tenantId = getTenantId();
        if (tenantId) {
          args.where = { ...args.where, tenantId };
        }
        return query(args);
      },
    },
  },
});
```

### 2. Background Jobs

```typescript
// src/core/jobs/queue.ts
import Bull from 'bull';

export const emailQueue = new Bull('email', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
  },
});

// Process jobs
emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  await sendEmail({ to, subject, html });
});

// Add job
export async function scheduleEmail(data: any) {
  await emailQueue.add(data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  });
}
```

### 3. Webhooks

```typescript
// src/features/webhooks/services/webhook.service.ts
export class WebhookService {
  async sendWebhook(url: string, data: any, secret: string) {
    const signature = this.generateSignature(data, secret);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }
      
      return { success: true };
    } catch (error) {
      logger.error('Webhook delivery failed', { error, url });
      throw error;
    }
  }
  
  private generateSignature(data: any, secret: string): string {
    const payload = JSON.stringify(data);
    return createHmac('sha256', secret).update(payload).digest('hex');
  }
  
  verifySignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    return signature === expectedSignature;
  }
}
```

### 4. Audit Logging

```typescript
// src/core/monitoring/audit.ts
interface AuditLog {
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: Record<string, { old: any; new: any }>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}

export async function logAudit(log: Omit<AuditLog, 'timestamp'>) {
  await prisma.auditLog.create({
    data: {
      ...log,
      timestamp: new Date(),
    },
  });
}

// Usage
await logAudit({
  userId: session.user.id,
  action: 'UPDATE',
  resource: 'item',
  resourceId: item.id,
  changes: {
    title: { old: 'Old Title', new: 'New Title' },
  },
});
```

### 5. Soft Delete Pattern

```typescript
// Prisma middleware
prisma.$use(async (params, next) => {
  if (params.action === 'delete') {
    params.action = 'update';
    params.args.data = { deletedAt: new Date() };
  }
  
  if (params.action === 'deleteMany') {
    params.action = 'updateMany';
    if (params.args.data !== undefined) {
      params.args.data.deletedAt = new Date();
    } else {
      params.args.data = { deletedAt: new Date() };
    }
  }
  
  return next(params);
});

// Query extension
prisma.$extends({
  query: {
    $allModels: {
      async findMany({ args, query }) {
        args.where = { ...args.where, deletedAt: null };
        return query(args);
      },
    },
  },
});
```

---

## 📝 Summary

This architecture provides:

✅ **Production-Ready Patterns**
- Comprehensive testing strategy
- Performance optimization
- Security hardening
- Error handling
- Observability

✅ **Modern Next.js 14+**
- Server actions
- Streaming & Suspense
- Partial Prerendering
- App Router best practices

✅ **Developer Experience**
- Type safety everywhere
- Clear file organization
- Reusable patterns
- AI-friendly structure

✅ **Scalability**
- Feature-first architecture
- Multi-tenancy support
- Background jobs
- Webhooks & integrations

---

## 🎯 Quick Reference

| Pattern | Location |
|---------|----------|
| Server Actions | `features/[feature]/actions/` |
| API Routes | `app/api/[resource]/route.ts` |
| Components | `features/[feature]/components/` |
| Services | `features/[feature]/services/` |
| Tests | `tests/unit/features/[feature]/` |
| E2E Tests | `tests/e2e/[feature]/` |

---

**Version History:**
- v3.0.0 (2025-11-11): Complete production patterns
- v2.1.0 (2025-11-11): /init integration
- v2.0.0 (2025-11-07): Feature-first architecture
- v1.0.0 (2025-10-01): Initial patterns

---

**Remember:** This is your master patterns file. Copy it unchanged to every project. Update only when discovering new architectural patterns.