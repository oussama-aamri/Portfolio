import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!supabaseUrl || !supabaseAnonKey) {
  // During build time or if env variables are not set, we can log a warning
  console.warn('Supabase env variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Helper to get the public URL of a media file in the portfolio-media bucket.
 */
export function getMediaPublicUrl(storagePath: string): string {
  if (!supabaseUrl) return '';
  // Format: [supabaseUrl]/storage/v1/object/public/portfolio-media/[storagePath]
  return `${supabaseUrl}/storage/v1/object/public/portfolio-media/${storagePath}`;
}
