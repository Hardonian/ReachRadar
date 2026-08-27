export type PlanId =
  | "observer"
  | "creator"
  | "pro"
  | "studio"
  | "scale"
  | "enterprise";

export interface PlanEntitlements {
  maxConnectedChannels: number;
  historyDays: number;
  maxAlerts: number; // -1 for unlimited
  hasPersonalImpactAnalysis: boolean;
  hasNicheComparison: boolean;
  hasSurfaceBreakdown: boolean;
  hasAdvancedBenchmarking: boolean;
  hasCustomCohorts: boolean;
  hasTeamWorkspace: boolean;
  maxTeamMembers: number;
  hasAgencyPortfolioDashboard: boolean;
  hasReportExports: boolean;
  hasAdvancedAlertRouting: boolean;
  hasPriorityDataProcessing: boolean;
  hasApiAccess: boolean;
  hasCustomRetention: boolean;
  hasSsoReady: boolean;
  hasDedicatedSupport: boolean;
}

export interface PlanDefinition {
  id: PlanId;
  name: string;
  badge?: string;
  description: string;
  monthlyPriceUsd: number;
  yearlyPriceUsd: number;
  envPriceKeyMonthly?: string;
  envPriceKeyYearly?: string;
  features: string[];
  entitlements: PlanEntitlements;
}

export const PRICING_PLANS: Record<PlanId, PlanDefinition> = {
  observer: {
    id: "observer",
    name: "Observer",
    description: "Public algorithm weather & basic channel sanity checking.",
    monthlyPriceUsd: 0,
    yearlyPriceUsd: 0,
    features: [
      "Public YouTube Weather",
      "1 connected channel",
      "30-day personal metric view",
      "Basic channel health assessment",
      "1 automated alert",
      "Public shift event notifications",
    ],
    entitlements: {
      maxConnectedChannels: 1,
      historyDays: 30,
      maxAlerts: 1,
      hasPersonalImpactAnalysis: false,
      hasNicheComparison: false,
      hasSurfaceBreakdown: false,
      hasAdvancedBenchmarking: false,
      hasCustomCohorts: false,
      hasTeamWorkspace: false,
      maxTeamMembers: 1,
      hasAgencyPortfolioDashboard: false,
      hasReportExports: false,
      hasAdvancedAlertRouting: false,
      hasPriorityDataProcessing: false,
      hasApiAccess: false,
      hasCustomRetention: false,
      hasSsoReady: false,
      hasDedicatedSupport: false,
    },
  },
  creator: {
    id: "creator",
    name: "Creator",
    badge: "Popular",
    description: "Full visibility for independent creators and individual operators.",
    monthlyPriceUsd: 19,
    yearlyPriceUsd: 190,
    envPriceKeyMonthly: "STRIPE_PRICE_CREATOR_MONTHLY",
    envPriceKeyYearly: "STRIPE_PRICE_CREATOR_YEARLY",
    features: [
      "1 connected channel",
      "365-day history & baseline models",
      "Personal impact analysis",
      "Niche & size cohort comparison",
      "Browse / Suggested / Search / Shorts breakdown",
      "10 custom alert rules",
      "Weekly creator intelligence report",
    ],
    entitlements: {
      maxConnectedChannels: 1,
      historyDays: 365,
      maxAlerts: 10,
      hasPersonalImpactAnalysis: true,
      hasNicheComparison: true,
      hasSurfaceBreakdown: true,
      hasAdvancedBenchmarking: false,
      hasCustomCohorts: false,
      hasTeamWorkspace: false,
      maxTeamMembers: 1,
      hasAgencyPortfolioDashboard: false,
      hasReportExports: true,
      hasAdvancedAlertRouting: false,
      hasPriorityDataProcessing: false,
      hasApiAccess: false,
      hasCustomRetention: false,
      hasSsoReady: false,
      hasDedicatedSupport: false,
    },
  },
  pro: {
    id: "pro",
    name: "Pro",
    description: "Power tools for serious creators and multi-channel operators.",
    monthlyPriceUsd: 49,
    yearlyPriceUsd: 490,
    envPriceKeyMonthly: "STRIPE_PRICE_PRO_MONTHLY",
    envPriceKeyYearly: "STRIPE_PRICE_PRO_YEARLY",
    features: [
      "5 connected channels",
      "Advanced cohort benchmarking",
      "Custom comparison cohorts",
      "Deeper longitudinal history",
      "Unlimited standard alerts",
      "CSV & summary report exports",
      "Priority anomaly calculation",
    ],
    entitlements: {
      maxConnectedChannels: 5,
      historyDays: 730,
      maxAlerts: -1,
      hasPersonalImpactAnalysis: true,
      hasNicheComparison: true,
      hasSurfaceBreakdown: true,
      hasAdvancedBenchmarking: true,
      hasCustomCohorts: true,
      hasTeamWorkspace: false,
      maxTeamMembers: 2,
      hasAgencyPortfolioDashboard: false,
      hasReportExports: true,
      hasAdvancedAlertRouting: true,
      hasPriorityDataProcessing: true,
      hasApiAccess: false,
      hasCustomRetention: false,
      hasSsoReady: false,
      hasDedicatedSupport: false,
    },
  },
  studio: {
    id: "studio",
    name: "Studio",
    description: "Built for creator studios, management companies, and agencies.",
    monthlyPriceUsd: 149,
    yearlyPriceUsd: 1490,
    envPriceKeyMonthly: "STRIPE_PRICE_STUDIO_MONTHLY",
    envPriceKeyYearly: "STRIPE_PRICE_STUDIO_YEARLY",
    features: [
      "25 connected channels",
      "Full team workspace (up to 10 seats)",
      "Client & channel groupings",
      "Agency portfolio dashboard",
      "White-label printable report exports",
      "Advanced alert routing (email & webhooks)",
      "Priority background data processing",
    ],
    entitlements: {
      maxConnectedChannels: 25,
      historyDays: 1095,
      maxAlerts: -1,
      hasPersonalImpactAnalysis: true,
      hasNicheComparison: true,
      hasSurfaceBreakdown: true,
      hasAdvancedBenchmarking: true,
      hasCustomCohorts: true,
      hasTeamWorkspace: true,
      maxTeamMembers: 10,
      hasAgencyPortfolioDashboard: true,
      hasReportExports: true,
      hasAdvancedAlertRouting: true,
      hasPriorityDataProcessing: true,
      hasApiAccess: false,
      hasCustomRetention: false,
      hasSsoReady: false,
      hasDedicatedSupport: false,
    },
  },
  scale: {
    id: "scale",
    name: "Scale",
    description: "For high-volume networks, media publishers, and MCNs.",
    monthlyPriceUsd: 399,
    yearlyPriceUsd: 3990,
    envPriceKeyMonthly: "STRIPE_PRICE_SCALE_MONTHLY",
    envPriceKeyYearly: "STRIPE_PRICE_SCALE_YEARLY",
    features: [
      "Up to 100 connected channels",
      "Enterprise REST API access",
      "Portfolio-level cross-niche analytics",
      "Configurable weekly automated reports",
      "Extended data retention",
      "Unlimited team seats",
      "Priority ingestion & support SLA",
    ],
    entitlements: {
      maxConnectedChannels: 100,
      historyDays: 1825,
      maxAlerts: -1,
      hasPersonalImpactAnalysis: true,
      hasNicheComparison: true,
      hasSurfaceBreakdown: true,
      hasAdvancedBenchmarking: true,
      hasCustomCohorts: true,
      hasTeamWorkspace: true,
      maxTeamMembers: 50,
      hasAgencyPortfolioDashboard: true,
      hasReportExports: true,
      hasAdvancedAlertRouting: true,
      hasPriorityDataProcessing: true,
      hasApiAccess: true,
      hasCustomRetention: true,
      hasSsoReady: true,
      hasDedicatedSupport: true,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom volume, bespoke cohorts, SLA, and enterprise integrations.",
    monthlyPriceUsd: 999,
    yearlyPriceUsd: 9990,
    features: [
      "Custom channel volume (100+)",
      "SAML / OIDC SSO & SCIM integration",
      "Full API access with elevated rate limits",
      "Custom cohort definitions & private benchmarks",
      "Custom data processing agreements & DPA",
      "Dedicated account manager & 99.9% uptime SLA",
    ],
    entitlements: {
      maxConnectedChannels: 1000,
      historyDays: 3650,
      maxAlerts: -1,
      hasPersonalImpactAnalysis: true,
      hasNicheComparison: true,
      hasSurfaceBreakdown: true,
      hasAdvancedBenchmarking: true,
      hasCustomCohorts: true,
      hasTeamWorkspace: true,
      maxTeamMembers: 999,
      hasAgencyPortfolioDashboard: true,
      hasReportExports: true,
      hasAdvancedAlertRouting: true,
      hasPriorityDataProcessing: true,
      hasApiAccess: true,
      hasCustomRetention: true,
      hasSsoReady: true,
      hasDedicatedSupport: true,
    },
  },
};

export function getPlan(id: string | null | undefined): PlanDefinition {
  if (!id || !(id in PRICING_PLANS)) {
    return PRICING_PLANS.observer;
  }
  return PRICING_PLANS[id as PlanId];
}
