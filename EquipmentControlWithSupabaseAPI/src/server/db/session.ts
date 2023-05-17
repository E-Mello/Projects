import type { User } from "@supabase/supabase-js";

interface Session {
  provider_token?: string | null;
  access_token: string;
  expires_in?: number;
  expires_at?: number;
  refresh_token: string;
  token_type: string;
  user: User;
}

export default Session;
