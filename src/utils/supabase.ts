import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate configuration
if (!supabaseUrl) {
  console.error('Missing VITE_SUPABASE_URL environment variable');
  throw new Error('Invalid Supabase URL. Please check your environment variables.');
}

if (!supabaseKey) {
  console.error('Missing VITE_SUPABASE_ANON_KEY environment variable');
  throw new Error('Invalid Supabase API key. Please check your environment variables.');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Health check function
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    // First try to get health check status
    const { data, error } = await supabase
      .from('health_check')
      .select('status')
      .limit(1)
      .single();

    if (error) {
      console.warn('Health check error:', error);
      return false;
    }

    return data?.status === 'ok';
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
}

// Function to update health check status
export async function updateHealthCheck(
  status: 'ok' | 'error' | 'maintenance',
  details?: Record<string, any>
): Promise<void> {
  try {
    const { error } = await supabase
      .from('health_check')
      .update({
        status,
        details: details || {},
        last_checked: new Date().toISOString()
      })
      .eq('id', 1);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating health check:', error);
    throw error;
  }
}