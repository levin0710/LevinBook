import { createClient } from "@supabase/supabase-js";

const URL = "https://ugjntjgktczmnlajhxco.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVnam50amdrdGN6bW5sYWpoeGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE2ODQ1MjUsImV4cCI6MTk5NzI2MDUyNX0.rit5iWL1Ftjc2JVR-UiRUNBBMbfa3yQIKTmgx-4WhDs";
export const supabase = createClient(URL, API_KEY);
