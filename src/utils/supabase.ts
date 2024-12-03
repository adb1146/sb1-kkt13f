import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://osbpcojswvrpncsywbzw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zYnBjb2pzd3ZycG5jc3l3Ynp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxODIwNjgsImV4cCI6MjA0ODc1ODA2OH0.NZWCwY5kzkQiHjibwVIq1BuvqWs8kUSQBCcz4278atU';

export const supabase = createClient(supabaseUrl, supabaseKey);