/**
 * Centralized brand configuration for ReachRadar.
 * Brand strings must live here rather than being scattered across components.
 */
export const brand = {
  name: "ReachRadar",
  category: "Algorithm Distribution Intelligence",
  tagline: "Know when distribution shifts — before your strategy does.",
  shortPromise: "See what changed. Know if it affects you.",
  mission: "Independent observability for recommendation algorithms.",
  supportingStatement: "Algorithm intelligence. Not creator folklore.",
  legalDisclaimer:
    "ReachRadar is an independent analytics service and is not affiliated with or endorsed by YouTube or Google.",
  hero: {
    headline: "The algorithm changed.",
    subheadline: "Know before your competitors do.",
    body: "ReachRadar detects unusual distribution shifts across YouTube Browse, Suggested, Search, and Shorts — then shows whether the change is platform-wide, niche-specific, or isolated to your channel.",
    primaryCta: "Check YouTube Weather",
    secondaryCta: "Connect My Channel",
  },
  alternativeCopy: [
    "Stop guessing what happened to your reach.",
    "Know whether it's you — or YouTube.",
    "Your early-warning system for digital distribution.",
    "Distribution changed. ReachRadar saw it.",
    "Evidence before reaction.",
    "Don't redesign your strategy because of a bad Tuesday.",
    "See the signal behind the views.",
  ],
  approvedTerms: [
    "observed distribution shift",
    "recommendation volatility",
    "anomalous distribution behaviour",
    "cohort-level change",
    "platform-level signal",
    "probable systemic change",
    "observed recommendation-surface movement",
  ],
  contacts: {
    support: "support@reachradar.io",
    privacy: "privacy@reachradar.io",
    security: "security@reachradar.io",
  },
} as const;

export type BrandConfig = typeof brand;
