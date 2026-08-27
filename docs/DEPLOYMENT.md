# ReachRadar — Deployment & Production Guide

## Hosting Architecture
- **Web & API:** Vercel (Next.js 15 App Router on Node.js Serverless runtime).
- **Database & Auth:** Supabase (PostgreSQL 15+ with pg_stat_statements & RLS).
- **Scheduled Jobs:** Vercel Cron invoking `/api/v1/cron/jobs` with `CRON_SECRET`.
- **Billing:** Stripe Subscriptions & Billing Portal.

## Deployment Checklist
0. Import the **repository root** in Vercel; do not set `apps/web` as the Vercel
   Root Directory. The root manifest exposes Next.js for framework detection and
   `vercel.json` owns the workspace-aware install, build output, and cron settings.
1. Apply migrations: `supabase db push` or execute SQL in `supabase/migrations/`.
2. Configure production environment variables on Vercel:
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
   - `TOKEN_ENCRYPTION_KEY`, `TOKEN_ENCRYPTION_KEY_VERSION`
   - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_OAUTH_REDIRECT_URI`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `CRON_SECRET`
3. Configure Stripe webhook endpoint: `https://<domain>/api/v1/billing/webhook`.
4. Configure Google Cloud Console OAuth redirect: `https://<domain>/api/v1/auth/google/callback`.

## Build Contract

- Node.js is pinned to `22.x` and pnpm to the root manifest's `packageManager`.
- Vercel runs `pnpm install --frozen-lockfile` followed by `pnpm run vercel-build`.
- The build command uses Turborepo's `--filter=web`, which also builds all
  transitive workspace packages required by the Next.js application.
- The deployment output is `apps/web/.next`.
- Vercel Cron calls `/api/v1/cron/jobs` every 15 minutes and automatically sends
  `Authorization: Bearer $CRON_SECRET`. Set a strong `CRON_SECRET` in every
  deployed environment that enables the cron. This cadence requires a Vercel plan
  that supports sub-daily cron schedules.

Run the same production build locally with:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run vercel-build
```
