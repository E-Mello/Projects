import { createClient } from "@supabase/supabase-js";
import { env as publicEnv } from "../../env/client.mjs";
import { env } from "../../env/server.mjs";

export const supabase = createClient(
  publicEnv.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_KEY
);
