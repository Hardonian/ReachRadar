# ReachRadar — Operational Runbook

## Health Verification
- **API Health:** `GET /api/health` returns status of DB, keyrings, and external integrations.
- **Admin Dashboard:** `GET /admin/health` exposes worker lag, quota usage, and dead-letter queue metrics.

## Common Operational Procedures

### 1. Job Queue Worker Lag / Stuck Jobs
If jobs backlog exceeds threshold:
1. Inspect dead letter state: `SELECT * FROM public.jobs WHERE state = 'dead';`
2. Inspect worker locks: `SELECT * FROM public.jobs WHERE state = 'running' AND locked_at < NOW() - INTERVAL '10 minutes';`
3. Retry dead jobs: `UPDATE public.jobs SET state = 'queued', attempts = 0, available_at = NOW() WHERE state = 'dead';`

### 2. Encryption Key Rotation
To rotate token encryption keys:
1. Generate new 32-byte key: `openssl rand -hex 32`
2. Add existing key to secondary keyring as `v1`.
3. Set `TOKEN_ENCRYPTION_KEY` to new key and `TOKEN_ENCRYPTION_KEY_VERSION="v2"`.
4. Trigger token re-encryption background job (`maintenance.reencrypt_tokens`).

### 3. YouTube API Quota Throttle
If quota limit reached:
1. The provider marks status as `PROVIDER_RATE_LIMITED`.
2. Background queue schedules backoff for non-critical channel syncs until 00:00 PST quota reset.
3. Historical analytics remain 100% available to users.
