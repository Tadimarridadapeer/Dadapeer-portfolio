import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dscsmolfrfqxntofqpmu.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseAdminClient: SupabaseClient | null = null;
let supabasePublicClient: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && (supabaseServiceKey || supabaseAnonKey));
}

/**
 * Returns admin/service-role client for server-side mutations, uploads, and queries
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl) return null;
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!key) return null;

  if (!supabaseAdminClient) {
    supabaseAdminClient = createClient(supabaseUrl, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  }
  return supabaseAdminClient;
}

/**
 * Returns public/anon client for public read operations
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl) return null;
  const key = supabaseAnonKey || supabaseServiceKey;
  if (!key) return null;

  if (!supabasePublicClient) {
    supabasePublicClient = createClient(supabaseUrl, key, {
      auth: {
        persistSession: false,
      },
    });
  }
  return supabasePublicClient;
}
