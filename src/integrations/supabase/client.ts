// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vrdhtgqxxzbyiekzrbjo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyZGh0Z3F4eHpieWlla3pyYmpvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MTkwNjgsImV4cCI6MjA2NjA5NTA2OH0.LYMJ_vtTpDo7fxq70lf1Th_QQdKshvXvzi6aApd3T3c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);