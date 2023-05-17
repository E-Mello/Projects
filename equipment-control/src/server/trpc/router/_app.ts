import { deviceRouter } from "./device";
import { providerRouter } from "./provider";
import { router } from "../trpc";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  device: deviceRouter,
  provider: providerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
