-- ReachRadar Greenfield Production Schema (00001_initial_schema.sql)
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles (linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Organizations (multi-tenant boundary)
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan_id TEXT NOT NULL DEFAULT 'observer',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- 3. Organization Memberships
CREATE TABLE IF NOT EXISTS public.organization_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'analyst', 'viewer')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (organization_id, user_id)
);

-- 4. Organization Settings & User Preferences
CREATE TABLE IF NOT EXISTS public.organization_settings (
  organization_id UUID PRIMARY KEY REFERENCES public.organizations(id) ON DELETE CASCADE,
  allowed_domains JSONB DEFAULT '[]'::jsonb,
  alert_webhook_url TEXT,
  default_timezone TEXT NOT NULL DEFAULT 'UTC',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  theme TEXT NOT NULL DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  weekly_digest_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Billing & Subscriptions
CREATE TABLE IF NOT EXISTS public.billing_customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
  stripe_customer_id TEXT NOT NULL UNIQUE,
  billing_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL UNIQUE REFERENCES public.organizations(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT NOT NULL UNIQUE,
  plan_id TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('trialing', 'active', 'past_due', 'unpaid', 'canceled', 'incomplete', 'incomplete_expired', 'paused')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.stripe_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  stripe_event_id TEXT NOT NULL UNIQUE,
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  error TEXT
);

-- 6. Connected Accounts (Encrypted Tokens)
CREATE TABLE IF NOT EXISTS public.connected_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  platform TEXT NOT NULL DEFAULT 'youtube',
  provider_account_id TEXT NOT NULL,
  granted_scopes TEXT[] NOT NULL DEFAULT '{}',
  access_token_expiry TIMESTAMPTZ,
  encrypted_refresh_token TEXT,
  token_key_version TEXT NOT NULL DEFAULT 'v1',
  connection_status TEXT NOT NULL DEFAULT 'connected' CHECK (connection_status IN ('connected', 'disconnected', 'expired', 'revoked', 'rate_limited', 'error')),
  last_successful_sync_at TIMESTAMPTZ,
  last_error_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (organization_id, platform, provider_account_id)
);

-- 7. YouTube Channels & Videos
CREATE TABLE IF NOT EXISTS public.youtube_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  connected_account_id UUID REFERENCES public.connected_accounts(id) ON DELETE SET NULL,
  platform_channel_id TEXT NOT NULL,
  title TEXT NOT NULL,
  custom_url TEXT,
  thumbnail_url TEXT,
  published_at TIMESTAMPTZ,
  country TEXT,
  primary_language TEXT,
  niche TEXT NOT NULL DEFAULT 'general',
  content_format TEXT NOT NULL DEFAULT 'long_form' CHECK (content_format IN ('long_form', 'shorts', 'mixed', 'live')),
  size_band TEXT NOT NULL DEFAULT 'mid' CHECK (size_band IN ('nano', 'micro', 'mid', 'macro', 'mega')),
  subscriber_count BIGINT NOT NULL DEFAULT 0,
  video_count INT NOT NULL DEFAULT 0,
  total_views BIGINT NOT NULL DEFAULT 0,
  data_quality_tier TEXT NOT NULL DEFAULT 'GOOD' CHECK (data_quality_tier IN ('HIGH', 'GOOD', 'LIMITED', 'INSUFFICIENT')),
  baseline_status TEXT NOT NULL DEFAULT 'building' CHECK (baseline_status IN ('building', 'ready', 'stale', 'insufficient')),
  client_group TEXT,
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (organization_id, platform_channel_id)
);

CREATE TABLE IF NOT EXISTS public.youtube_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  platform_video_id TEXT NOT NULL,
  title TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  duration_seconds INT NOT NULL DEFAULT 0,
  is_short BOOLEAN NOT NULL DEFAULT FALSE,
  view_count BIGINT NOT NULL DEFAULT 0,
  like_count BIGINT NOT NULL DEFAULT 0,
  comment_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (channel_id, platform_video_id)
);

-- 8. Metrics Time Series
CREATE TABLE IF NOT EXISTS public.channel_metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  views BIGINT NOT NULL DEFAULT 0,
  estimated_minutes_watched DOUBLE PRECISION NOT NULL DEFAULT 0,
  average_view_duration_seconds DOUBLE PRECISION NOT NULL DEFAULT 0,
  average_view_percentage DOUBLE PRECISION NOT NULL DEFAULT 0,
  subscribers_gained INT NOT NULL DEFAULT 0,
  subscribers_lost INT NOT NULL DEFAULT 0,
  likes INT NOT NULL DEFAULT 0,
  comments INT NOT NULL DEFAULT 0,
  shares INT NOT NULL DEFAULT 0,
  impressions BIGINT,
  impressions_ctr DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (channel_id, metric_date)
);

CREATE TABLE IF NOT EXISTS public.traffic_source_metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  surface TEXT NOT NULL CHECK (surface IN ('browse', 'suggested', 'search', 'shorts', 'notifications', 'channel_pages', 'playlists', 'external', 'other')),
  raw_source_type TEXT NOT NULL,
  views BIGINT NOT NULL DEFAULT 0,
  estimated_minutes_watched DOUBLE PRECISION NOT NULL DEFAULT 0,
  impressions BIGINT,
  impressions_ctr DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (channel_id, metric_date, surface)
);

CREATE TABLE IF NOT EXISTS public.video_metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_id UUID NOT NULL REFERENCES public.youtube_videos(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  views BIGINT NOT NULL DEFAULT 0,
  estimated_minutes_watched DOUBLE PRECISION NOT NULL DEFAULT 0,
  average_view_duration_seconds DOUBLE PRECISION NOT NULL DEFAULT 0,
  likes INT NOT NULL DEFAULT 0,
  comments INT NOT NULL DEFAULT 0,
  shares INT NOT NULL DEFAULT 0,
  impressions BIGINT,
  impressions_ctr DOUBLE PRECISION,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (video_id, metric_date)
);

-- 9. Cohorts & Aggregates
CREATE TABLE IF NOT EXISTS public.cohorts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL DEFAULT 'youtube',
  level TEXT NOT NULL CHECK (level IN ('exact', 'niche', 'category', 'format', 'platform')),
  niche TEXT,
  content_format TEXT,
  size_band TEXT,
  geography TEXT,
  language TEXT,
  channel_count INT NOT NULL DEFAULT 0,
  distinct_owners_count INT NOT NULL DEFAULT 0,
  herfindahl_index DOUBLE PRECISION NOT NULL DEFAULT 0,
  is_publicly_visible BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cohort_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (cohort_id, channel_id)
);

CREATE TABLE IF NOT EXISTS public.cohort_metrics_daily (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cohort_id UUID NOT NULL REFERENCES public.cohorts(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  channel_count INT NOT NULL DEFAULT 0,
  distinct_owners_count INT NOT NULL DEFAULT 0,
  median_views DOUBLE PRECISION NOT NULL DEFAULT 0,
  p25_views DOUBLE PRECISION NOT NULL DEFAULT 0,
  p75_views DOUBLE PRECISION NOT NULL DEFAULT 0,
  median_view_duration DOUBLE PRECISION NOT NULL DEFAULT 0,
  median_ctr DOUBLE PRECISION NOT NULL DEFAULT 0,
  browse_share DOUBLE PRECISION NOT NULL DEFAULT 0,
  suggested_share DOUBLE PRECISION NOT NULL DEFAULT 0,
  search_share DOUBLE PRECISION NOT NULL DEFAULT 0,
  shorts_share DOUBLE PRECISION NOT NULL DEFAULT 0,
  volatility_score DOUBLE PRECISION NOT NULL DEFAULT 0,
  is_suppressed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (cohort_id, metric_date)
);

-- 10. Shifts, Anomaly Observations & Recommendations
CREATE TABLE IF NOT EXISTS public.shift_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  platform TEXT NOT NULL DEFAULT 'youtube',
  cohort_id UUID REFERENCES public.cohorts(id) ON DELETE SET NULL,
  cohort_name TEXT NOT NULL,
  surface TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  state TEXT NOT NULL CHECK (state IN ('active', 'developing', 'stabilizing', 'resolved')),
  first_detected_at TIMESTAMPTZ NOT NULL,
  last_updated_at TIMESTAMPTZ NOT NULL,
  evidence_score INT NOT NULL CHECK (evidence_score BETWEEN 0 AND 100),
  confidence_label TEXT NOT NULL CHECK (confidence_label IN ('LOW_SIGNAL', 'WATCH', 'LIKELY_SHIFT', 'STRONG_SIGNAL')),
  scoring_version TEXT NOT NULL DEFAULT '1.0.0',
  component_scores JSONB NOT NULL,
  affected_channels_percentage INT NOT NULL DEFAULT 0,
  median_distribution_movement DOUBLE PRECISION NOT NULL DEFAULT 0,
  channels_analyzed INT NOT NULL DEFAULT 0,
  distinct_owners INT NOT NULL DEFAULT 0,
  is_publicly_visible BOOLEAN NOT NULL DEFAULT FALSE,
  suppression_reason TEXT,
  what_changed TEXT NOT NULL,
  where_it_changed TEXT NOT NULL,
  who_appears_affected TEXT NOT NULL,
  metrics_that_did_not_change TEXT[] NOT NULL DEFAULT '{}',
  alternative_explanations TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.channel_shift_impacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shift_id UUID NOT NULL REFERENCES public.shift_events(id) ON DELETE CASCADE,
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  classification TEXT NOT NULL CHECK (classification IN ('LIKELY_AFFECTED', 'NOT_CLEARLY_AFFECTED', 'OUTPERFORMING_COHORT', 'CHANNEL_SPECIFIC_DECLINE', 'INSUFFICIENT_DATA')),
  confidence_score INT NOT NULL CHECK (confidence_score BETWEEN 0 AND 100),
  observed_delta_percentage DOUBLE PRECISION NOT NULL,
  cohort_delta_percentage DOUBLE PRECISION NOT NULL,
  relative_performance_delta DOUBLE PRECISION NOT NULL,
  surface_impacts JSONB NOT NULL DEFAULT '{}'::jsonb,
  evidence_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (shift_id, channel_id)
);

CREATE TABLE IF NOT EXISTS public.recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES public.shift_events(id) ON DELETE SET NULL,
  action TEXT NOT NULL CHECK (action IN ('HOLD_STRATEGY', 'REVIEW_PACKAGING', 'REVIEW_TOPIC_MIX', 'MONITOR_SHIFT', 'DOUBLE_DOWN')),
  title TEXT NOT NULL,
  rationale TEXT NOT NULL,
  evidence_points TEXT[] NOT NULL DEFAULT '{}',
  confidence INT NOT NULL CHECK (confidence BETWEEN 0 AND 100),
  suggested_review_date DATE,
  version TEXT NOT NULL DEFAULT '1.0.0',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Alerts & Deliveries
CREATE TABLE IF NOT EXISTS public.alert_rules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  condition_type TEXT NOT NULL CHECK (condition_type IN ('platform_weather_elevated', 'niche_shift_detected', 'channel_likely_affected', 'surface_movement_exceeds', 'shift_status_changed')),
  threshold_value DOUBLE PRECISION,
  surface_filter TEXT,
  channels TEXT[] NOT NULL DEFAULT '{"in_app"}',
  email_recipients TEXT[] NOT NULL DEFAULT '{}',
  webhook_url TEXT,
  cooldown_hours INT NOT NULL DEFAULT 24,
  last_triggered_at TIMESTAMPTZ,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.alert_deliveries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_rule_id UUID NOT NULL REFERENCES public.alert_rules(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  shift_id UUID REFERENCES public.shift_events(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical')),
  channel TEXT NOT NULL CHECK (channel IN ('in_app', 'email', 'webhook')),
  delivery_status TEXT NOT NULL DEFAULT 'delivered' CHECK (delivery_status IN ('delivered', 'failed', 'suppressed_cooldown')),
  delivered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- 12. Reports
CREATE TABLE IF NOT EXISTS public.report_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES public.youtube_channels(id) ON DELETE SET NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('weekly_creator_intelligence', 'agency_portfolio_report', 'shift_incident_report')),
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  summary_text TEXT NOT NULL,
  structured_payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  format TEXT NOT NULL DEFAULT 'web' CHECK (format IN ('web', 'csv', 'print_html', 'pdf_ready')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Jobs & Ingestion Runs
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_type TEXT NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  state TEXT NOT NULL DEFAULT 'queued' CHECK (state IN ('queued', 'running', 'completed', 'failed', 'dead')),
  attempts INT NOT NULL DEFAULT 0,
  max_attempts INT NOT NULL DEFAULT 5,
  available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  locked_at TIMESTAMPTZ,
  locked_by TEXT,
  last_error TEXT,
  completed_at TIMESTAMPTZ,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ingestion_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES public.youtube_channels(id) ON DELETE CASCADE,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'success', 'partial', 'failed')),
  records_processed INT NOT NULL DEFAULT 0,
  earliest_date DATE,
  latest_date DATE,
  error_message TEXT
);

CREATE TABLE IF NOT EXISTS public.provider_quota_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  usage_date DATE NOT NULL,
  operation TEXT NOT NULL,
  estimated_units INT NOT NULL DEFAULT 0,
  request_count INT NOT NULL DEFAULT 0,
  success_count INT NOT NULL DEFAULT 0,
  failure_count INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, usage_date, operation)
);

-- 14. API Keys & Audit Log
CREATE TABLE IF NOT EXISTS public.api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  key_hash TEXT NOT NULL UNIQUE,
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  actor_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  request_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
