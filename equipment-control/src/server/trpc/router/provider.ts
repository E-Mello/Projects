import {
  ProviderCreateSchema,
  ProviderUpdateSchema,
} from "../../common/ProviderSchema";
import { publicProcedure, router } from "../trpc";

export const providerRouter = router({
  create: publicProcedure
    .input(ProviderCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const provider = await ctx.prisma.providers.create({
          data: input,
        });
        return provider;
      } catch (error) {
        console.log("Error creating device:", error);
      }
    }),
  update: publicProcedure
    .input(ProviderUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { vinc_id_device, ...data } = input;
        const deviceId = vinc_id_device
          ? {
              connect: {
                id: vinc_id_device,
              },
            }
          : undefined;

        const device = await ctx.prisma.providers.update({
          data: {
            ...data,
            vinc_id_device: deviceId
          },
          where: {
            id: input.id,
          },
        });
        return device;
      } catch (error) {
        console.log("Error update device:", error);
      }
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.providers.findMany({
        select: {
          id: true,
          codigo: true,
          email: true,
          nome: true,
          cpf: true,
          cnpj: true,
          tel_first: true,
          tel_sec: false,
          vinc_id_device: false,
          active: true,
        },
        orderBy: {
          id: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),
  delete: publicProcedure
    .input(ProviderUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.providers.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
