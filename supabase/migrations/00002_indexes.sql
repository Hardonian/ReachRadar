-- ReachRadar Database Indexes (00002_indexes.sql)

-- Membership lookups
CREATE INDEX IF NOT EXISTS idx_memberships_user_org ON public.organization_memberships(user_id, organization_id);
CREATE INDEX IF NOT EXISTS idx_memberships_org_role ON public.organization_memberships(organization_id, role);

-- Channel & Video lookups
CREATE INDEX IF NOT EXISTS idx_youtube_channels_org ON public.youtube_channels(organization_id);
CREATE INDEX IF NOT EXISTS idx_youtube_channels_platform_id ON public.youtube_channels(platform_channel_id);
CREATE INDEX IF NOT EXISTS idx_youtube_channels_niche ON public.youtube_channels(niche, size_band);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_channel ON public.youtube_videos(channel_id);

-- Time series metrics indexing
CREATE INDEX IF NOT EXISTS idx_channel_metrics_daily_lookup ON public.channel_metrics_daily(channel_id, metric_date DESC);
CREATE INDEX IF NOT EXISTS idx_traffic_source_metrics_lookup ON public.traffic_source_metrics_daily(channel_id, metric_date DESC, surface);
CREATE INDEX IF NOT EXISTS idx_video_metrics_daily_lookup ON public.video_metrics_daily(video_id, metric_date DESC);

-- Cohort lookups & daily aggregates
CREATE INDEX IF NOT EXISTS idx_cohorts_lookup ON public.cohorts(platform, level, niche, size_band);
CREATE INDEX IF NOT EXISTS idx_cohort_memberships_lookup ON public.cohort_memberships(cohort_id, channel_id);
CREATE INDEX IF NOT EXISTS idx_cohort_metrics_daily_lookup ON public.cohort_metrics_daily(cohort_id, metric_date DESC);

-- Shift events & impacts
CREATE INDEX IF NOT EXISTS idx_shift_events_active ON public.shift_events(platform, state, first_detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_shift_events_public ON public.shift_events(is_publicly_visible, evidence_score DESC);
CREATE INDEX IF NOT EXISTS idx_channel_shift_impacts_lookup ON public.channel_shift_impacts(channel_id, shift_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_channel ON public.recommendations(channel_id, created_at DESC);

-- Job queue indexing (for SKIP LOCKED performance)
CREATE INDEX IF NOT EXISTS idx_jobs_claim ON public.jobs(state, available_at, attempts) WHERE state = 'queued';
CREATE INDEX IF NOT EXISTS idx_ingestion_runs_channel ON public.ingestion_runs(channel_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_quota_usage_lookup ON public.provider_quota_usage(provider, usage_date, operation);

-- Alerts & Audit Log
CREATE INDEX IF NOT EXISTS idx_alert_rules_org ON public.alert_rules(organization_id, is_enabled);
CREATE INDEX IF NOT EXISTS idx_alert_deliveries_org ON public.alert_deliveries(organization_id, delivered_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_org ON public.audit_log(organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_keys_hash ON public.api_keys(key_hash);
