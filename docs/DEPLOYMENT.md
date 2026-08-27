# ReachRadar — Deployment & Production Guide

## Hosting Architecture
- **Web & API:** Vercel (Next.js 15 App Router on Node.js Serverless runtime).
- **Database & Auth:** Supabase (PostgreSQL 15+ with pg_stat_statements & RLS).
- **Scheduled Jobs:** Vercel Cron invoking `/api/v1/cron/jobs` with `CRON_SECRET`.
- **Billing:** Stripe Subscriptions & Billing Portal.

## Deployment Checklist
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
