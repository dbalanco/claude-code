# 🚀 New Next.js Project Setup Checklist

**Complete guide for starting a new project with the standard template workflow**

---

## 📦 Phase 1: Project Initialization (10 mins)

### Step 1: Create Next.js App

```bash
# Create new Next.js app with TypeScript and Tailwind
npx create-next-app@latest my-app \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"

cd my-app
```

**Checklist:**
- [ ] Next.js 14+ with App Router
- [ ] TypeScript enabled
- [ ] Tailwind CSS configured
- [ ] src/ directory created
- [ ] Import alias (@/*) configured

---

### Step 2: Copy Template Files

```bash
# Copy all 5 template files to project root
cp ~/dev-templates/ARCHITECTURE.md .
cp ~/dev-templates/APP_STRUCTURE.md .
cp ~/dev-templates/CLAUDE.md .
cp ~/dev-templates/.gitignore .
cp ~/dev-templates/CHANGELOG.md .
```

**Checklist:**
- [ ] ARCHITECTURE.md (patterns guide)
- [ ] APP_STRUCTURE.md (live state tracker)
- [ ] CLAUDE.md (AI instructions)
- [ ] .gitignore (version control)
- [ ] CHANGELOG.md (version history)

---

### Step 3: Initialize APP_STRUCTURE.md

```bash
# Open and customize APP_STRUCTURE.md
vim APP_STRUCTURE.md
```

**Update these sections:**
- [ ] Replace `[DATE]` with today's date
- [ ] Add your app name
- [ ] Add one-line description
- [ ] Set version to `0.1.0`
- [ ] Remove example features (keep auth if using NextAuth)
- [ ] Clear "Implemented Features" section
- [ ] Update "Next Steps" with your immediate goals

---

### Step 4: Initialize CHANGELOG.md

```bash
# Set initial version
vim CHANGELOG.md
```

**Set to:**
```markdown
# Changelog

## [Unreleased]

## [0.1.0] - 2025-11-07

### Added
- Initial project setup with Next.js 14 App Router
- Standard architecture template applied
- Core documentation files (ARCHITECTURE.md, APP_STRUCTURE.md, CLAUDE.md)
```

**Checklist:**
- [ ] Version set to 0.1.0
- [ ] Today's date added
- [ ] Initial setup documented

---

### Step 5: Customize CLAUDE.md

```bash
vim CLAUDE.md
```

**Update "Project-Specific Overrides" section:**
```markdown
### Technology Stack
Frontend: Next.js 14 App Router + React 18 + TypeScript 5
Backend: Next.js API Routes
Database: [Supabase / Prisma + PostgreSQL]
Auth: [NextAuth.js / Supabase Auth]
Styling: Tailwind CSS + shadcn/ui
State: React Query + [Zustand if needed]
Testing: Vitest + Playwright

### Environment Variables
Required:
- DATABASE_URL (or Supabase keys)
- NEXTAUTH_SECRET
- NEXTAUTH_URL
```

**Checklist:**
- [ ] Tech stack specified
- [ ] Environment variables listed
- [ ] Custom rules added (if any)

---

## 🏗️ Phase 2: Folder Structure (5 mins)

### Step 6: Create Core Directories

```bash
# Create feature-driven folder structure
mkdir -p src/features
mkdir -p src/core/{database,auth,email,config}
mkdir -p src/shared/{components,hooks,utils,types}

# Create test directories
mkdir -p tests/{e2e,integration,unit,mocks}
```

**Checklist:**
- [ ] src/features/ created
- [ ] src/core/ with subdirectories
- [ ] src/shared/ with subdirectories
- [ ] tests/ structure created

---

### Step 7: Create Docs Directory

```bash
mkdir -p docs
```

**Optional documentation:**
- [ ] docs/api/ (if building API docs)
- [ ] docs/deployment/ (deployment guides)
- [ ] docs/development/ (dev setup)

---

## 🎨 Phase 3: UI Setup (10 mins)

### Step 8: Install shadcn/ui

```bash
# Initialize shadcn/ui
npx shadcn-ui@latest init
```

**Configuration choices:**
- Style: `Default`
- Base color: `Slate` (or your preference)
- CSS variables: `Yes`

**Checklist:**
- [ ] shadcn/ui initialized
- [ ] components.json created
- [ ] Tailwind config updated
- [ ] Global CSS configured

---

### Step 9: Add Essential Components

```bash
# Add commonly used components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add toast
```

**Checklist:**
- [ ] Button component
- [ ] Input component
- [ ] Form components
- [ ] Dialog component
- [ ] Dropdown menu
- [ ] Toast notifications

---

## 🗄️ Phase 4: Database Setup (15 mins)

### Option A: Supabase Setup

```bash
# Install Supabase
npm install @supabase/supabase-js @supabase/ssr

# Create Supabase clients
mkdir -p src/core/database/supabase
```

**Create files:**

1. `src/core/database/supabase/client.ts`
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

2. `src/core/database/supabase/server.ts`
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
}
```

**Checklist:**
- [ ] Supabase installed
- [ ] Client-side client created
- [ ] Server-side client created
- [ ] Environment variables added

---

### Option B: Prisma Setup

```bash
# Install Prisma
npm install @prisma/client
npm install -D prisma

# Initialize Prisma
npx prisma init

# Create Prisma client
mkdir -p src/core/database/prisma
```

**Create file:** `src/core/database/prisma/client.ts`
```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

**Checklist:**
- [ ] Prisma installed
- [ ] Prisma initialized
- [ ] schema.prisma created
- [ ] Prisma client configured

---

## 🔐 Phase 5: Authentication (20 mins)

### Step 10: Install NextAuth

```bash
npm install next-auth
```

---

### Step 11: Create Auth Configuration

**Create:** `src/core/auth/nextauth.config.ts`

```typescript
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Implement your auth logic
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};
```

**Checklist:**
- [ ] NextAuth installed
- [ ] Auth config created
- [ ] Providers configured
- [ ] Session strategy set

---

### Step 12: Create Auth API Route

**Create:** `src/app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from 'next-auth';
import { authOptions } from '@/core/auth/nextauth.config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

**Checklist:**
- [ ] API route created
- [ ] Handler exported

---

### Step 13: Create Auth Routes

```bash
# Create auth route group
mkdir -p src/app/\(auth\)/{login,signup}
```

**Create basic pages:**
- [ ] `app/(auth)/login/page.tsx`
- [ ] `app/(auth)/signup/page.tsx`
- [ ] `app/(auth)/layout.tsx`

---

## ⚙️ Phase 6: Configuration (10 mins)

### Step 14: Environment Variables

**Create:** `.env.local`

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Database (choose one)
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OR Prisma
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Authentication
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000

# OAuth (optional)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

**Create:** `.env.example`
```bash
cp .env.local .env.example
# Remove actual values, keep structure
```

**Checklist:**
- [ ] .env.local created with real values
- [ ] .env.example created for repo
- [ ] All required variables set
- [ ] Generate NEXTAUTH_SECRET with: `openssl rand -base64 32`

---

### Step 15: Create Config Files

**Create:** `src/core/config/env.ts`

```typescript
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  // Add your variables here
});

export const env = envSchema.parse(process.env);
```

**Checklist:**
- [ ] env.ts created
- [ ] Zod validation added
- [ ] All env vars validated

---

## 📦 Phase 7: Essential Packages (5 mins)

### Step 16: Install Core Dependencies

```bash
# Validation
npm install zod

# Forms
npm install react-hook-form @hookform/resolvers

# Data Fetching
npm install @tanstack/react-query

# State (optional)
npm install zustand

# Utilities
npm install clsx tailwind-merge
npm install date-fns # or dayjs

# Dev dependencies
npm install -D @types/node
```

**Checklist:**
- [ ] Zod installed
- [ ] React Hook Form installed
- [ ] React Query installed
- [ ] Utility libraries installed

---

## 🧪 Phase 8: Testing Setup (10 mins)

### Step 17: Install Testing Tools

```bash
# Unit testing
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom

# E2E testing
npm install -D @playwright/test
npx playwright install
```

---

### Step 18: Configure Vitest

**Create:** `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Create:** `tests/setup.ts`

```typescript
import '@testing-library/jest-dom';
```

**Checklist:**
- [ ] Vitest configured
- [ ] Test setup file created
- [ ] Playwright installed

---

## 📝 Phase 9: Documentation Update (10 mins)

### Step 19: Update APP_STRUCTURE.md

**Document what you've set up:**

```markdown
## ✅ Current Features

### Implemented Features

- **auth** - User authentication
  - NextAuth.js with credentials and Google OAuth
  - Login and signup routes
  - Protected route middleware
  
## 🗺️ Route Structure

```
app/
├── (auth)/
│   ├── login/              ✅ Implemented
│   └── signup/             ✅ Implemented
└── api/
    └── auth/
        └── [...nextauth]/  ✅ Implemented
```

## 🗄️ Database Schema

Using: [Supabase / Prisma]
Status: ✅ Connected

## 🔐 Environment Variables

### Required
✅ NEXT_PUBLIC_APP_URL
✅ DATABASE_URL (or Supabase keys)
✅ NEXTAUTH_SECRET
✅ NEXTAUTH_URL
```

**Checklist:**
- [ ] Features documented
- [ ] Routes documented
- [ ] Database noted
- [ ] Environment variables listed

---

### Step 20: Update README.md

**Customize these sections:**
- [ ] Project name and description
- [ ] Tech stack (use actual versions)
- [ ] Installation steps
- [ ] Environment variables
- [ ] Development commands

---

### Step 21: Update CHANGELOG.md

**Add setup details:**

```markdown
## [0.1.0] - 2025-11-07

### Added
- Next.js 14 project with App Router
- TypeScript and Tailwind CSS
- shadcn/ui component system
- Database setup (Supabase/Prisma)
- NextAuth.js authentication
- React Query for data fetching
- Vitest and Playwright testing
- Standard folder structure (features, core, shared)
- Documentation (ARCHITECTURE.md, APP_STRUCTURE.md, CLAUDE.md)
```

**Checklist:**
- [ ] Initial version documented
- [ ] All setup steps listed

---

## 🔄 Phase 10: Git & GitHub (5 mins)

### Step 22: Initialize Git

```bash
# Initialize git
git init -b main

# Stage all files
git add .

# Initial commit
git commit -m "init: Next.js project with standard architecture v2.0"
```

**Checklist:**
- [ ] Git initialized
- [ ] All files staged
- [ ] Initial commit made

---

### Step 23: Create GitHub Repository

```bash
# Using GitHub CLI
gh repo create my-app --public --source=. --remote=origin --push

# Or manually
# 1. Create repo on GitHub
# 2. git remote add origin https://github.com/username/my-app.git
# 3. git push -u origin main
```

**Checklist:**
- [ ] GitHub repo created
- [ ] Remote added
- [ ] Code pushed

---

## ✅ Phase 11: Verify Setup (5 mins)

### Step 24: Run Development Server

```bash
npm run dev
```

**Visit:** http://localhost:3000

**Checklist:**
- [ ] Server starts without errors
- [ ] Homepage loads
- [ ] No TypeScript errors
- [ ] Tailwind styles working

---

### Step 25: Run Tests

```bash
# Type check
npm run type-check

# Linting
npm run lint

# Tests (once you add some)
npm test
```

**Checklist:**
- [ ] TypeScript passes
- [ ] Linter passes
- [ ] Ready to develop

---

## 🎯 Phase 12: Create First Feature (15 mins)

### Step 26: Create Your First Feature

**Example: Dashboard**

```bash
# Create feature structure
mkdir -p src/features/dashboard/{components,hooks,services,types}

# Create files
touch src/features/dashboard/components/DashboardCard.tsx
touch src/features/dashboard/types/index.ts
touch src/features/dashboard/index.ts
```

**Create simple dashboard:**

1. **Types:** `src/features/dashboard/types/index.ts`
```typescript
export interface DashboardStats {
  users: number;
  revenue: number;
  growth: number;
}
```

2. **Component:** `src/features/dashboard/components/DashboardCard.tsx`
```typescript
'use client';

export function DashboardCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="p-6 border rounded-lg">
      <h3 className="text-sm text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
```

3. **Export:** `src/features/dashboard/index.ts`
```typescript
export * from './components/DashboardCard';
export * from './types';
```

4. **Page:** `src/app/(dashboard)/dashboard/page.tsx`
```typescript
import { DashboardCard } from '@/features/dashboard';

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <DashboardCard title="Users" value={100} />
        <DashboardCard title="Revenue" value={5000} />
        <DashboardCard title="Growth" value={25} />
      </div>
    </div>
  );
}
```

**Checklist:**
- [ ] Feature created
- [ ] Components working
- [ ] Page renders
- [ ] APP_STRUCTURE.md updated

---

## 📋 Final Verification Checklist

### Core Setup
- [ ] Next.js 14+ with App Router
- [ ] TypeScript configured
- [ ] Tailwind CSS working
- [ ] shadcn/ui installed

### Architecture
- [ ] src/features/ folder created
- [ ] src/core/ folder created
- [ ] src/shared/ folder created
- [ ] tests/ folder created

### Documentation
- [ ] ARCHITECTURE.md (patterns)
- [ ] APP_STRUCTURE.md (live state)
- [ ] CLAUDE.md (AI instructions)
- [ ] CHANGELOG.md (version history)
- [ ] README.md (customized)

### Infrastructure
- [ ] Database connected (Supabase/Prisma)
- [ ] Authentication configured (NextAuth)
- [ ] Environment variables set
- [ ] Config with Zod validation

### Development
- [ ] Git initialized
- [ ] GitHub repo created
- [ ] Dev server running
- [ ] Tests configured
- [ ] First feature created

---

## 🎉 You're Ready!

### Next Steps

1. **Start building features:**
   ```bash
   # Always follow this workflow:
   # 1. Create feature in src/features/
   # 2. Create API routes in src/app/api/
   # 3. Create pages in src/app/
   # 4. Update APP_STRUCTURE.md
   # 5. Update CHANGELOG.md
   ```

2. **Reference documentation:**
   - Check ARCHITECTURE.md for patterns
   - Check APP_STRUCTURE.md for current state
   - Check CLAUDE.md for standards

3. **Commit frequently:**
   ```bash
   git add .
   git commit -m "feat: add feature-name"
   git push
   ```

---

## 🆘 Troubleshooting

### Common Issues

**"Module not found @/..."**
- Check tsconfig.json has correct path alias
- Restart TypeScript server in VS Code

**"Environment variable undefined"**
- Restart dev server after adding .env variables
- Check .env.local exists (not .env)

**"Supabase client error"**
- Verify NEXT_PUBLIC_SUPABASE_URL is set
- Check anon key is correct

**"NextAuth error"**
- Ensure NEXTAUTH_SECRET is at least 32 chars
- Check NEXTAUTH_URL matches your app URL

---

## 📚 Quick Reference

### Commands You'll Use Daily

```bash
npm run dev              # Start development
npm run build            # Build for production
npm run lint             # Lint code
npm run type-check       # Check TypeScript
npm test                 # Run tests
npm run db:push          # Push Prisma schema
npx shadcn-ui@latest add [component]  # Add UI component
```

### File Creation Pattern

```bash
# New feature
mkdir -p src/features/[name]/{components,hooks,services,schemas,types}

# New API route
mkdir -p src/app/api/[resource]
touch src/app/api/[resource]/route.ts

# New page
mkdir -p src/app/\(dashboard\)/[route]
touch src/app/\(dashboard\)/[route]/page.tsx
```

---

**Total Setup Time: ~90 minutes**

**Result: Production-ready Next.js app with:**
- ✅ Clean architecture
- ✅ Type safety
- ✅ Authentication
- ✅ Database
- ✅ Testing
- ✅ Documentation
- ✅ Ready to build features

**Happy coding! 🚀**