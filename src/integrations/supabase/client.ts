// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nmjcepbryslaxwiljucf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tamNlcGJyeXNsYXh3aWxqdWNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczMTk3MTEsImV4cCI6MjA1Mjg5NTcxMX0.m4wmVfqXGQQ6-bIffJH_t6gsSWCoqz5UCH7ysdCe4yU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);