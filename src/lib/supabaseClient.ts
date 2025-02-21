import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://brfwkyrluwntblzrfoal.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZndreXJsdXdudGJsenJmb2FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwODAzOTksImV4cCI6MjA1NTY1NjM5OX0.yXTQWc0ltKjPPhcQE72jxEjjP_EhShTXSbN_1256124";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
