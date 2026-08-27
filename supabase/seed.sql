-- ReachRadar Seed SQL for Local Development and Testing (seed.sql)

-- Insert Public Cohorts
INSERT INTO public.cohorts (id, name, slug, platform, level, niche, content_format, size_band, channel_count, distinct_owners_count, herfindahl_index, is_publicly_visible)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'YouTube Global Baseline', 'youtube-global', 'youtube', 'platform', NULL, NULL, NULL, 240, 160, 0.02, TRUE),
  ('c0000000-0000-0000-0000-000000000002', 'Finance & Wealth · Macro Band', 'finance-macro-longform', 'youtube', 'exact', 'finance', 'long_form', 'macro', 48, 29, 0.05, TRUE),
  ('c0000000-0000-0000-0000-000000000003', 'Tech Reviews & Hardware', 'tech-reviews-mid', 'youtube', 'niche', 'technology', 'long_form', 'mid', 55, 38, 0.04, TRUE),
  ('c0000000-0000-0000-0000-000000000004', 'Shorts · Fitness & Wellness', 'shorts-fitness-macro', 'youtube', 'exact', 'fitness', 'shorts', 'macro', 82, 54, 0.03, TRUE),
  ('c0000000-0000-0000-0000-000000000005', 'Gaming Let''s Play & Streams', 'gaming-lets-play', 'youtube', 'category', 'gaming', 'mixed', 'mid', 95, 62, 0.03, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Insert Public Shift Events
INSERT INTO public.shift_events (
  id, slug, platform, cohort_id, cohort_name, surface, title, summary, state, first_detected_at, last_updated_at,
  evidence_score, confidence_label, scoring_version, component_scores, affected_channels_percentage, median_distribution_movement,
  channels_analyzed, distinct_owners, is_publicly_visible, what_changed, where_it_changed, who_appears_affected, metrics_that_did_not_change, alternative_explanations
)
VALUES
  (
    's0000000-0000-0000-0000-000000000001',
    'youtube-browse-finance-shift-2026-08-25',
    'youtube',
    'c0000000-0000-0000-0000-000000000002',
    'Finance & Wealth · Macro Band',
    'browse',
    'Systemic Browse Reach Contraction in Finance Cohort',
    'A 64% consensus decline in Browse impression allocation observed across macro finance channels, with content-level CTR and AVD remaining steady.',
    'active',
    '2026-08-25 14:30:00+00',
    '2026-08-26 18:00:00+00',
    91,
    'STRONG_SIGNAL',
    '1.0.0',
    '{"effectMagnitude": 88, "cohortConsensus": 92, "persistence": 90, "sampleQuality": 94, "ownerDiversity": 89, "crossMetricCoherence": 95, "surfaceConcentration": 92, "demandIndependence": 85}'::jsonb,
    64,
    -18.7,
    48,
    29,
    TRUE,
    'YouTube Browse features redistributed impressions away from general macroeconomic topics toward focused personal finance guides.',
    'Concentrated 85% on YouTube Browse Home and Watch Next feeds.',
    '64% of channels with >250k subscribers in the English finance category.',
    ARRAY['Click-Through Rate (CTR) essentially unchanged (+0.2%)', 'Average View Duration (AVD) stable across new releases (-0.5%)', 'Search volume for macroeconomic terms within normal bounds'],
    ARRAY['Late-summer seasonal audience availability dip', 'Topic fatigue following heavy market news cycle earlier in month']
  ),
  (
    's0000000-0000-0000-0000-000000000002',
    'youtube-shorts-elevated-volatility-2026-08-22',
    'youtube',
    'c0000000-0000-0000-0000-000000000004',
    'Shorts · Fitness & Wellness',
    'shorts',
    'Elevated Shorts Recommendation Volatility & Seed Testing',
    'Increased variance in first-hour seed testing audience size across fitness and tech Shorts creators.',
    'developing',
    '2026-08-22 09:00:00+00',
    '2026-08-26 12:00:00+00',
    74,
    'LIKELY_SHIFT',
    '1.0.0',
    '{"effectMagnitude": 76, "cohortConsensus": 70, "persistence": 80, "sampleQuality": 85, "ownerDiversity": 82, "crossMetricCoherence": 65, "surfaceConcentration": 95, "demandIndependence": 80}'::jsonb,
    52,
    -12.4,
    82,
    54,
    TRUE,
    'YouTube Shorts feed expanded exploration testing, causing wider swings in initial impression velocity.',
    'Exclusively within YouTube Shorts feed distribution.',
    'Creators posting short-form vertical video under 60 seconds.',
    ARRAY['Viewed vs Swiped away percentage remains consistent (72% average)', 'Channel subscriber conversion rate unchanged'],
    ARRAY['Increased competition from high-volume automated channels in specific sub-niches']
  )
ON CONFLICT (slug) DO NOTHING;
