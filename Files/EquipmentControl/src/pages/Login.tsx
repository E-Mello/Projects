import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Account from "../supabase/Account";
import Auth from "../supabase/Auth";
import { supabase } from "../supabase/supabaseClient";

export function Login() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <ChakraProvider>
      <Flex>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </Flex>
    </ChakraProvider>
  );
}
