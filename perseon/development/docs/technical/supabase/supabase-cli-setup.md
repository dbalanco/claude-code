# Supabase CLI Setup Guide

This document explains how to use the Supabase CLI for local development and managing migrations.

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed (already done!)
- A Supabase account at [supabase.com](https://supabase.com)
- Docker installed (for running local Supabase instance)

## Quick Start

### 1. Start Local Supabase Instance

```bash
supabase start
```

This will:
- Start a local PostgreSQL database
- Initialize Supabase services (Auth, Storage, Realtime, etc.)
- Display connection strings and credentials

**Output will show:**
```
Started Supabase local development server.

API URL: http://127.0.0.1:54321
GraphQL URL: http://127.0.0.1:54321/graphql/v1
S3 Storage URL: http://127.0.0.1:54321/storage/v1
Inbucket URL: http://127.0.0.1:54324
Realtime WebSocket: ws://127.0.0.1:54321/realtime/v1
Studio: http://127.0.0.1:54323
...
```

### 2. Access Local Studio

Open http://127.0.0.1:54323 to manage your local database

**Default credentials:**
- Email: `supabase`
- Password: `postgres`

### 3. Create Migrations

Create a migration file:

```bash
supabase migration new initial_schema
```

This creates: `supabase/migrations/[timestamp]_initial_schema.sql`

Edit the file and add your SQL schema:

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);
```

### 4. Run Migrations Locally

```bash
supabase db push
```

This applies all pending migrations to your local database.

### 5. Link to Remote Project (Optional)

To sync migrations with your remote Supabase project:

```bash
supabase link --project-ref your-project-id
```

You'll be prompted for your database password.

### 6. Push Migrations to Production

```bash
supabase db push --remote
```

⚠️ **WARNING:** This modifies your production database. Always test locally first!

## Common Workflows

### Create a New Migration

```bash
supabase migration new create_users_table
```

Edit `supabase/migrations/[timestamp]_create_users_table.sql` with your SQL.

### Reset Local Database

```bash
supabase db reset
```

This:
1. Drops all tables
2. Re-runs all migrations
3. Executes seed file (if `supabase/seed.sql` exists)

### View Local Database

```bash
supabase start  # if not already running
psql postgresql://postgres:postgres@127.0.0.1:54322/postgres
```

### Stop Local Services

```bash
supabase stop
```

### Check Status

```bash
supabase status
```

## Migration Best Practices

### 1. Keep Migrations Isolated

Each migration file should make ONE logical change:

```sql
-- ✅ GOOD: One focused migration
-- supabase/migrations/20250111_add_user_profiles.sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Always Include Rollback Logic

Add a comment with rollback instructions:

```sql
-- To rollback: DROP TABLE IF EXISTS public.profiles;
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE
);
```

### 3. Use Row Level Security (RLS)

Enable RLS for security:

```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_can_view_own_profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);
```

### 4. Use Transactions for Safety

Group related changes:

```sql
BEGIN;

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id),
  title TEXT NOT NULL,
  content TEXT
);

CREATE INDEX idx_posts_user_id ON public.posts(user_id);

COMMIT;
```

### 5. Test Migrations Locally

Always test locally before pushing to production:

```bash
# Run migrations locally
supabase db push

# Test your app locally
pnpm dev

# If issues occur, reset and fix
supabase db reset
```

## Seed Data

Create `supabase/seed.sql` for test data:

```sql
-- Seed test users
INSERT INTO public.profiles (id, username, full_name)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'testuser',
  'Test User'
);
```

Seed runs automatically on `supabase db reset`.

## Troubleshooting

### Issue: "Connection refused"

```bash
# Ensure local services are running
supabase status

# If not running, start them
supabase start
```

### Issue: "Migration failed"

1. Check the error message
2. Fix the SQL syntax
3. Reset local database: `supabase db reset`
4. Try again

### Issue: Out of sync with remote

```bash
# Pull latest remote schema
supabase db pull

# This creates a migration for any remote changes
```

## Project Structure

```
supabase/
├── config.toml              # Local dev configuration
├── migrations/              # SQL migration files
│   ├── 20250111143022_initial_schema.sql
│   └── 20250111145500_add_profiles.sql
├── seed.sql                 # Seed data
├── tests/                   # SQL tests (optional)
└── functions/               # Edge functions (optional)
```

## Environment Variables

For connecting to remote Supabase:

1. Create `supabase/.env.local`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
```

2. Get credentials from [Supabase Dashboard](https://app.supabase.com):
   - Project Settings → API
   - Copy `Project URL` and `Service Role Key`

## Next Steps

1. ✅ CLI installed and project initialized
2. 🔄 Start local development: `supabase start`
3. 🗂️ Create your first migration: `supabase migration new initial_schema`
4. 🔗 Link to remote project: `supabase link --project-ref your-id`
5. 🚀 Push to production: `supabase db push --remote`

## Resources

- [Supabase CLI Docs](https://supabase.com/docs/guides/cli)
- [Database Migrations Guide](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
