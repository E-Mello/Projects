import "../styles/globals.css";

import type { AppPropsWithLayout } from "../types/layout";
import { SessionProvider } from "next-auth/react";
import { api } from "../utils/api";

function MyApp({ Component, pageProps, session }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

export default api.withTRPC(MyApp);
