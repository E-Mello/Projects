// @/src/server/router/prestadorRouter.ts
import { protectedProcedure, publicProcedure, router } from "../trpc";

import { Context } from "../context";
import { z } from "zod";

// export const prestadorRouter = trpc
//   .router<Context>()
//   .query("findAll", {
//     resolve: async ({ ctx }) => {
//       return await ctx.prisma.prestador.findMany();
//     },
//   })
//   .mutation("insertOne", {
//     input: z.object({
//       codigo: z.string(),
//       email: z.string(),
//       nome: z.string(),
//       cpf: z.string(),
//       cnpj: z.string(),
//       tel_first: z.string(),
//       tel_sec: z.string(),
//       active: z.boolean(),
//     }),
//     resolve: async ({ input, ctx }) => {
//       return await ctx.prisma.prestador.create({
//         data: {
//           codigo: input.codigo,
//           email: input.email,
//           nome: input.nome,
//           cpf: input.cpf,
//           cnpj: input.cnpj,
//           tel_first: input.tel_first,
//           tel_sec: input.tel_sec,
//           active: true,
//         },
//       });
//     },
//   })
//   .mutation("updateOne", {
//     input: z.object({
//       id: z.number(),
//       codigo: z.string(),
//       email: z.string(),
//       nome: z.string(),
//       cpf: z.string(),
//       cnpj: z.string(),
//       tel_first: z.string(),
//       tel_sec: z.string(),
//       active: z.boolean(),
//     }),
//     resolve: async ({ input, ctx }) => {
//       const { id, ...rest } = input;

//       return await ctx.prisma.equipamento.update({
//         where: { id },
//         data: { ...rest },
//       });
//     },
//   })
//   .mutation("deleteAll", {
//     input: z.object({
//       ids: z.number().array(),
//     }),
//     resolve: async ({ input, ctx }) => {
//       const { ids } = input;

//       return await ctx.prisma.equipamento.deleteMany({
//         where: {
//           id: { in: ids },
//         },
//       });
//     },
//   });

// export type ServerRouter = typeof prestadorRouter;

export const prestadorRouter = router({
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
