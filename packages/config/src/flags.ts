export interface FeatureFlags {
  youtubeOAuth: boolean;
  publicWeather: boolean;
  customCohorts: boolean;
  aiNarratives: boolean;
  enterpriseApi: boolean;
  emailAlerts: boolean;
  demoMode: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  youtubeOAuth: true,
  publicWeather: true,
  customCohorts: true,
  aiNarratives: true,
  enterpriseApi: true,
  emailAlerts: true,
  demoMode: true,
};

export function parseFeatureFlags(env: Record<string, string | undefined>): FeatureFlags {
  return {
    youtubeOAuth: env.FEATURE_FLAG_YOUTUBE_OAUTH !== "false",
    publicWeather: env.FEATURE_FLAG_PUBLIC_WEATHER !== "false",
    customCohorts: env.FEATURE_FLAG_CUSTOM_COHORTS !== "false",
    aiNarratives: env.FEATURE_FLAG_AI_NARRATIVES !== "false",
    enterpriseApi: env.FEATURE_FLAG_ENTERPRISE_API !== "false",
    emailAlerts: env.FEATURE_FLAG_EMAIL_ALERTS !== "false",
    demoMode: env.FEATURE_FLAG_DEMO_MODE !== "false",
  };
}
