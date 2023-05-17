// @/src/server/router/equipamentoRouter.ts
import * as trpc from "@trpc/server";

import { Context } from "../context";
import { z } from "zod";

export const equipamentoRouter = trpc
  .router<Context>()
  .query("findAll", {
    resolve: async ({ ctx }) => {
      return await ctx.prisma.equipamento.findMany();
    },
  })
  .mutation("insertOne", {
    input: z.object({
      modelo: z.string(),
      serie: z.string(),
      active: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      return await ctx.prisma.equipamento.create({
        data: { modelo: input.modelo, serie: input.serie, active: true },
      });
    },
  })
  .mutation("updateOne", {
    input: z.object({
      id: z.number(),
      modelo: z.string(),
      serie: z.string(),
      active: z.boolean(),
    }),
    resolve: async ({ input, ctx }) => {
      const { id, ...rest } = input;

      return await ctx.prisma.equipamento.update({
        where: { id },
        data: { ...rest },
      });
    },
  })
  .mutation("deleteAll", {
    input: z.object({
      ids: z.number().array(),
    }),
    resolve: async ({ input, ctx }) => {
      const { ids } = input;

      return await ctx.prisma.equipamento.deleteMany({
        where: {
          id: { in: ids },
        },
      });
    },
  });

export type ServerRouter = typeof equipamentoRouter;
