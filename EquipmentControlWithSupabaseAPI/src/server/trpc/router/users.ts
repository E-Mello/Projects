/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { TRPCError } from "@trpc/server";
import { createRouter } from "../createRouter";
import { supabase } from "../../db/supabaseClient";
import { z } from "zod";

export const userRouter = createRouter()
  .query("byId", {
    input: z.object({ id: z.string().nullish() }),
    async resolve({ ctx, input }) {
      if (!input.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `User ID must not be null`,
        });
      }
      const user = await ctx.prisma.users.findUnique({
        where: { id: input.id },
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No user with id '${input}'`,
        });
      }
      user.profilePicture =
        supabase.storage.from("avatars").getPublicUrl(user.profilePicture)
          .publicURl ?? "";
      return user;
    },
  })
  .mutation("add", {
    input: z.object({
      id: z.string(),
      username: z.string(),
      password: z.string(),
      nome: z.string(),
      cpf: z.string(),
      email: z.string(),
      setor: z.string(),
      cargo: z.string(),
      create_at: z.date(),
      profilePicture: z.string(),
    }),
    async resolve({ ctx, input }) {
      const user = await ctx.prisma.users.create({ data: input });
      return user;
    },
  });
