import "../styles/globals.css";

import type { AppPropsWithLayout } from "../types/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { trpc } from "../utils/trpc";

// function MyApp({ Component, pageProps }: AppPropsWithLayout) {
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider>
      {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
  );
}

export default trpc.withTRPC(MyApp);
