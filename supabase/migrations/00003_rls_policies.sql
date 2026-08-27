-- ReachRadar Row Level Security & Isolation Policies (00003_rls_policies.sql)

-- Enable RLS on all tenant-owned tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_source_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohort_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cohort_metrics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_shift_impacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_deliveries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- Security Helper Function: Get organizations for current user with explicit safe search_path
CREATE OR REPLACE FUNCTION public.get_user_org_ids()
RETURNS SETOF UUID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT organization_id
  FROM public.organization_memberships
  WHERE user_id = auth.uid();
$$;

-- Security Helper Function: Check if user has required role in organization
CREATE OR REPLACE FUNCTION public.has_org_role(target_org_id UUID, required_roles TEXT[])
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.organization_memberships
    WHERE user_id = auth.uid()
      AND organization_id = target_org_id
      AND role = ANY(required_roles)
  );
$$;

-- 1. Profiles
CREATE POLICY "Users can read their own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- 2. Organizations
CREATE POLICY "Users can read organizations they belong to"
  ON public.organizations FOR SELECT
  USING (id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Owners and admins can update their organization"
  ON public.organizations FOR UPDATE
  USING (public.has_org_role(id, ARRAY['owner', 'admin']));

-- 3. Memberships
CREATE POLICY "Members can view other members in their organization"
  ON public.organization_memberships FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Owners and admins can manage memberships"
  ON public.organization_memberships FOR ALL
  USING (public.has_org_role(organization_id, ARRAY['owner', 'admin']));

-- 4. User Preferences & Org Settings
CREATE POLICY "Users can read and update their own preferences"
  ON public.user_preferences FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Members can view org settings"
  ON public.organization_settings FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Admins can update org settings"
  ON public.organization_settings FOR UPDATE
  USING (public.has_org_role(organization_id, ARRAY['owner', 'admin']));

-- 5. Subscriptions & Billing
CREATE POLICY "Members can read billing details"
  ON public.billing_customers FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Members can read subscriptions"
  ON public.subscriptions FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

-- 6. Connected Accounts
CREATE POLICY "Members can view connected accounts"
  ON public.connected_accounts FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Owners and admins can manage connected accounts"
  ON public.connected_accounts FOR ALL
  USING (public.has_org_role(organization_id, ARRAY['owner', 'admin']));

-- 7. Channels & Videos
CREATE POLICY "Members can view channels in their org"
  ON public.youtube_channels FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Owners and admins can manage channels"
  ON public.youtube_channels FOR ALL
  USING (public.has_org_role(organization_id, ARRAY['owner', 'admin']));

CREATE POLICY "Members can view videos of channels in their org"
  ON public.youtube_videos FOR SELECT
  USING (channel_id IN (
    SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
  ));

-- 8. Metrics (Strict Cross-Tenant Isolation)
CREATE POLICY "Members can view channel daily metrics"
  ON public.channel_metrics_daily FOR SELECT
  USING (channel_id IN (
    SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
  ));

CREATE POLICY "Members can view traffic source metrics"
  ON public.traffic_source_metrics_daily FOR SELECT
  USING (channel_id IN (
    SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
  ));

CREATE POLICY "Members can view video metrics"
  ON public.video_metrics_daily FOR SELECT
  USING (channel_id IN (
    SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
  ));

-- 9. Cohorts & Public Aggregates (Privacy Preserving)
CREATE POLICY "Anyone can view public cohorts"
  ON public.cohorts FOR SELECT
  USING (is_publicly_visible = TRUE OR id IN (
    SELECT cohort_id FROM public.cohort_memberships WHERE channel_id IN (
      SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
    )
  ));

CREATE POLICY "Anyone can view unsuppressed cohort aggregates"
  ON public.cohort_metrics_daily FOR SELECT
  USING (is_suppressed = FALSE);

-- 10. Shifts & Recommendations
CREATE POLICY "Anyone can view public shifts"
  ON public.shift_events FOR SELECT
  USING (is_publicly_visible = TRUE);

CREATE POLICY "Members can view impacts on their channels"
  ON public.channel_shift_impacts FOR SELECT
  USING (channel_id IN (
    SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
  ));

CREATE POLICY "Members can view recommendations for their channels"
  ON public.recommendations FOR SELECT
  USING (channel_id IN (
    SELECT id FROM public.youtube_channels WHERE organization_id IN (SELECT public.get_user_org_ids())
  ));

-- 11. Alerts & Audit Log
CREATE POLICY "Members can view and manage alert rules"
  ON public.alert_rules FOR ALL
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Members can view alert deliveries"
  ON public.alert_deliveries FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Members can view audit logs"
  ON public.audit_log FOR SELECT
  USING (organization_id IN (SELECT public.get_user_org_ids()));

CREATE POLICY "Admins can manage API keys"
  ON public.api_keys FOR ALL
  USING (public.has_org_role(organization_id, ARRAY['owner', 'admin']));
