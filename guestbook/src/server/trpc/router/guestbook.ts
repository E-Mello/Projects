// import { protectedProcedure } from './../trpc';
// src/server/trpc/router/guestbook.ts

import { z } from "zod";
import { guestbookInput } from "../../shared/guestbookInput";
import { router, protectedProcedure, publicProcedure } from "../trpc";

export const guestbookRouter = router({
  // Desse postMessage utilizaremos o .input e o .mutation
  postMessage: protectedProcedure
    .input(guestbookInput)
    .mutation(async ({ ctx, input }) => {
      try {
        // Ctx e o contexto da pagina (ou seja, ele fica ao redor da pagina e permite inserir as coisas)
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),

  // getAll seria uma outra funcionalidade do router
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany({
        select: {
          id: true,
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  getUserMessages: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.guestbook.findMany({
        where: { name: ctx.session.user.name as string },
      });
    } catch (error) {}
  }),
});
