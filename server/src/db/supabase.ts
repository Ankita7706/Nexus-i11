import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseSecretKey) {
  console.warn(
    "⚠️ [Supabase] Warning: SUPABASE_URL or SUPABASE_SECRET_KEY is missing in server/.env.\n" +
    "Database operations will fail until valid Supabase credentials are provided."
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseSecretKey || "placeholder-key"
);