import { createClient } from "@supabase/supabase-js";

const API_KEY = import.meta.env.API_KEY;
const URL = import.meta.env.URL;

export const supabase = createClient(URL, API_KEY);
