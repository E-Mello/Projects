import { publicProcedure, router } from "../trpc";

import { DeviceCreateSchema } from "../../common/DeviceSchema";
import { DeviceUpdateSchema } from "../../common/DeviceSchema";

export const deviceRouter = router({
  create: publicProcedure
    .input(DeviceCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const device = await ctx.prisma.devices.create({
          data: input,
        });
        return device;
      } catch (error) {
        console.log("Error creating device:", error);
      }
    }),
  update: publicProcedure
    .input(DeviceUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        const { vinc_id_prest, ...data } = input;
        const providerId = vinc_id_prest
          ? {
              connect: {
                id: vinc_id_prest,
              },
            }
          : undefined;
        const device = await ctx.prisma.devices.update({
          data: {
            ...data,
            vinc_id_prest: providerId,
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
      return await ctx.prisma.devices.findMany({
        select: {
          id: true,
          modelo: true,
          serie: true,
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
    .input(DeviceUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.devices.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),
});
