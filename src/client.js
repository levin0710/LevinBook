import { createClient } from "@supabase/supabase-js";

const URL = "https://balqbsswfldlnaxgdwmy.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbHFic3N3ZmxkbG5heGdkd215Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA5NjYzNzcsImV4cCI6MTk5NjU0MjM3N30.-_z-O3VAUNvQrVv5wP7KCycPRjuk2DpHRdPXxc4dwX8";
export const supabase = createClient(URL, API_KEY);
