import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getVideoUrl(path: string) {
  try {
    const { data } = await supabase
      .storage
      .from('videos')
      .getPublicUrl(path);

    if (!data) {
      console.error('No data returned from getPublicUrl');
      return null;
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error getting video URL:', error);
    return null;
  }
} 