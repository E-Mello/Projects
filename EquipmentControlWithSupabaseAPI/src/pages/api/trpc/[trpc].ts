import * as trpcNext from "@trpc/server/adapters/next";

import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";
import { env } from "../../../env/server.mjs";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.log(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
