import { authRouter } from "./auth";
import { createRouter } from "../createRouter";
import { equipamentoRouter } from "./equipamento";
import { router } from "../trpc";
import superjson from "superjson";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = router({
  /**createRouter
   * Add data transformers
   * @link https://trpc.io/docs/data-transformers
   */
  //.transformer(superjson)
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  auth: authRouter,
  equipamento: equipamentoRouter,
  prestador: equipamentoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
