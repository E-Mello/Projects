import { Schema } from "zod";
import { createClient } from "@supabase/supabase-js";
// import { env } from "../../env/client.mjs";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-my-custom-header": "my-app-name" },
  },
  PublicKeyCredential: {},
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// export const supabase = createClient(
//   env.NEXT_PUBLIC_SUPABASE_URL,
//   env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string,
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  }
);
