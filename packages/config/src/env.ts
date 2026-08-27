import { z } from "zod";

const serverEnvSchema = z.object({
  // Core App
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("http://localhost:54321"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("demo-anon-key-reachradar-v1"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).default("demo-service-role-key-reachradar-v1"),

  // Encryption
  TOKEN_ENCRYPTION_KEY: z
    .string()
    .min(32)
    .default("reachradar_super_secret_encryption_key_32_bytes_len!!"),
  TOKEN_ENCRYPTION_KEY_VERSION: z.string().default("v1"),

  // Google / YouTube OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GOOGLE_OAUTH_REDIRECT_URI: z.string().url().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_CREATOR_MONTHLY: z.string().optional(),
  STRIPE_PRICE_CREATOR_YEARLY: z.string().optional(),
  STRIPE_PRICE_PRO_MONTHLY: z.string().optional(),
  STRIPE_PRICE_PRO_YEARLY: z.string().optional(),
  STRIPE_PRICE_STUDIO_MONTHLY: z.string().optional(),
  STRIPE_PRICE_STUDIO_YEARLY: z.string().optional(),
  STRIPE_PRICE_SCALE_MONTHLY: z.string().optional(),
  STRIPE_PRICE_SCALE_YEARLY: z.string().optional(),

  // Jobs & Cron
  CRON_SECRET: z.string().default("reachradar_cron_secret_internal_key"),

  // Optional AI & Email
  GEMINI_API_KEY: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default("intelligence@reachradar.io"),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let parsedEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (parsedEnv) return parsedEnv;

  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    console.warn("⚠️ Environment variables validation warning:", result.error.flatten().fieldErrors);
    // Return with defaults for building
    parsedEnv = serverEnvSchema.parse({
      ...process.env,
      NODE_ENV: process.env.NODE_ENV || "development",
    });
  } else {
    parsedEnv = result.data;
  }
  return parsedEnv;
}

/**
 * Returns safe environment diagnostic status without leaking secret values.
 */
export function getEnvDiagnostics() {
  const env = getServerEnv();
  return {
    nodeEnv: env.NODE_ENV,
    appUrl: env.NEXT_PUBLIC_APP_URL,
    supabaseConfigured:
      Boolean(env.NEXT_PUBLIC_SUPABASE_URL) &&
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "demo-anon-key-reachradar-v1",
    googleOAuthConfigured: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET),
    stripeConfigured: Boolean(env.STRIPE_SECRET_KEY && env.STRIPE_WEBHOOK_SECRET),
    geminiConfigured: Boolean(env.GEMINI_API_KEY),
    resendConfigured: Boolean(env.RESEND_API_KEY),
    encryptionConfigured: Boolean(env.TOKEN_ENCRYPTION_KEY),
    cronSecretConfigured: Boolean(env.CRON_SECRET),
  };
}
