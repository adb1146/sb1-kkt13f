import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

interface HealthCheckResponse {
  status: 'ok' | 'error' | 'maintenance';
  details?: Record<string, any>;
}

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function validateConfig(): { isValid: boolean; error?: string } {
  if (!supabaseUrl || !supabaseKey) {
    return { 
      isValid: false, 
      error: 'Missing Supabase configuration. Please check your environment variables.' 
    };
  }

  try {
    new URL(supabaseUrl);
    return { isValid: true };
  } catch (e) {
    return { 
      isValid: false, 
      error: 'Invalid Supabase URL format. Please check your configuration.' 
    };
  }
}

const config = validateConfig();
if (!config.isValid) {
  console.error(config.error);
}

export const supabase = createClient(supabaseUrl || 'https://example.supabase.co', supabaseKey || '', {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  global: {
    headers: { 'x-client-info': 'workers-comp-rating@1.0.0' },
    fetch: fetch.bind(globalThis)
  }
});

export async function checkSupabaseConnection(retryCount = 0): Promise<boolean> {
  if (!supabaseUrl || !supabaseKey) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('health_check')
      .select('status')
      .limit(1)
      .single();
    
    if (error) {
      // If we haven't exceeded max retries, attempt again
      if (retryCount < MAX_RETRIES) {
        console.warn(`Supabase connection attempt ${retryCount + 1} failed, retrying...`);
        await delay(RETRY_DELAY);
        return checkSupabaseConnection(retryCount + 1);
      }
      throw error;
    }
    
    return data?.status === 'ok';
  } catch (error) {
    if (retryCount === MAX_RETRIES) {
      console.error('Supabase connection failed after max retries:', error);
    }
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
      .rpc('update_health_check', {
        new_status: status,
        new_details: details ? JSON.stringify(details) : null
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error updating health check:', error);
    throw error;
  }
}