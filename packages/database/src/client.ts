import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getServerEnv } from "@reachradar/config";

let adminClient: SupabaseClient | null = null;

/**
 * Creates an authenticated Supabase client using a user's JWT access token.
 * Evaluates Supabase RLS policies from the perspective of that user.
 */
export function createScopedClient(accessToken?: string): SupabaseClient {
  const env = getServerEnv();
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
  });
}

/**
 * Creates a privileged service-role Supabase client for trusted background jobs and ingestion pipelines.
 * NEVER exposed to client-side bundles.
 */
export function createAdminClient(): SupabaseClient {
  if (adminClient) return adminClient;
  const env = getServerEnv();
  adminClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return adminClient;
}
