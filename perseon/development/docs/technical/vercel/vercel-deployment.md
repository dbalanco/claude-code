# Deploying Perseon to Vercel

This guide will help you deploy your Perseon application to Vercel with Better Auth and PostgreSQL.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub repository connected to Vercel
- GitHub OAuth App credentials

## Step 1: Create Vercel Postgres Database

1. Go to your Vercel dashboard
2. Click on your project (or create a new one)
3. Go to the **Storage** tab
4. Click **Create Database**
5. Select **Postgres**
6. Choose a database name (e.g., "perseon-db")
7. Select your region (closest to your users)
8. Click **Create**

Vercel will automatically create and inject the following environment variables:
- `POSTGRES_URL` - Full connection string
- `POSTGRES_PRISMA_URL` - Prisma connection string
- `POSTGRES_URL_NON_POOLING` - Direct connection
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

## Step 2: Add Environment Variables

In your Vercel project settings, go to **Settings > Environment Variables** and add:

### Required Variables:

```bash
# Better Auth (IMPORTANT: Update these!)
BETTER_AUTH_SECRET=your_production_secret_here
BETTER_AUTH_URL=https://your-app.vercel.app

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# App URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

**IMPORTANT:**
1. Generate a new `BETTER_AUTH_SECRET` for production:
   ```bash
   openssl rand -base64 32
   ```
2. Update `BETTER_AUTH_URL` with your actual Vercel URL
3. Update your GitHub OAuth App callback URL to:
   ```
   https://your-app.vercel.app/api/auth/callback/github
   ```

## Step 3: Run Database Migration

After deployment, you need to create the database tables. You have two options:

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Link your project:
   ```bash
   vercel link
   ```

3. Pull environment variables:
   ```bash
   vercel env pull .env.local
   ```

4. Run migration:
   ```bash
   npx @better-auth/cli migrate
   ```

### Option B: Manually via Vercel Dashboard

1. Go to your Vercel Postgres dashboard
2. Click **Query** tab
3. Run the Better Auth schema SQL (you can generate this with `npx @better-auth/cli generate`)

## Step 4: Update GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Find your OAuth App
3. Update **Authorization callback URL** to:
   ```
   https://your-app.vercel.app/api/auth/callback/github
   ```
4. You can add multiple callback URLs:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://your-app.vercel.app/api/auth/callback/github` (production)

## Step 5: Deploy

### Automatic Deployment (Recommended)

Push to your main branch and Vercel will automatically deploy:

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push
```

### Manual Deployment

```bash
vercel --prod
```

## Troubleshooting

### Error: Database connection failed

- Check that `POSTGRES_URL` is set in environment variables
- Ensure your Vercel Postgres database is created
- Verify the database is in the same region as your function

### Error: GitHub OAuth not working

- Verify callback URL is set correctly in GitHub OAuth App
- Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are set in Vercel
- Ensure `BETTER_AUTH_URL` matches your Vercel deployment URL

### Error: Missing environment variables

- All environment variables must be set in **Vercel Dashboard > Settings > Environment Variables**
- After adding variables, redeploy your application

### Database tables not created

- Run the migration using Vercel CLI: `npx @better-auth/cli migrate`
- Or manually create tables via Vercel Postgres Query tab

## Local Development

For local development, you can still use the existing `.env.local` file with the `POSTGRES_URL` from your `.env.local`:

```bash
pnpm run dev
```

## Production Checklist

- [ ] Vercel Postgres database created
- [ ] All environment variables set in Vercel
- [ ] Database tables migrated
- [ ] GitHub OAuth callback URL updated
- [ ] `BETTER_AUTH_SECRET` changed from development value
- [ ] `BETTER_AUTH_URL` points to production domain
- [ ] Application deployed and accessible
- [ ] GitHub login tested in production

## Architecture Notes

- **Database**: PostgreSQL via Vercel Postgres (serverless-compatible)
- **Authentication**: Better Auth with GitHub OAuth
- **Platform**: Vercel Serverless Functions
- **Region**: Choose region closest to your users for best performance

---

**Need Help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Better Auth Documentation](https://better-auth.com/docs)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
