import { UserCreateSchema, UserLoginSchema } from "../../common/UserSchema";
import { publicProcedure, router } from "../trpc";

import { UserUpdateSchema } from "./../../common/UserSchema";
import bcrypt from "bcrypt";
import { env } from "../../../env/server.mjs";
import { randomUUID } from "crypto";
import { useAnimationFrame } from "framer-motion";

export async function hashPassword(password: string | Buffer) {
  // Generate a salt for the password
  const hashKey = env.HASH_KEY;
  // Hash the password using the salt
  const hashedPassword = await bcrypt.hash(password, hashKey);
  console.log(hashKey, "oi eu sou o salt");
  return hashedPassword;
}

export const userRouter = router({
  // create seria uma funcionalidade de criar os usuários
  create: publicProcedure
    .input(UserCreateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        // Hash the password using a suitable cryptographic hashing function
        const hashedPassword = await hashPassword(input.password);
        // Update the input object to use the hashed password
        const data = UserCreateSchema.parse({
          ...input,
          password: hashedPassword,
        });
        // Save the user to the database with the hashed password
        const user = await ctx.prisma.users.create({
          data,
        });
        return user;
      } catch (error) {
        console.log("Error creating user:", error);
      }
    }),

  update: publicProcedure
    .input(UserUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        if (input.password) {
          // Hash the password using a suitable cryptographic hashing function
          const hashedPassword = await hashPassword(input.password);
          // Update the input object to use the hashed password
          const data = UserUpdateSchema.parse({
            ...input,
            password: hashedPassword,
          });
          // Save the user to the database with the hashed password
          const user = await ctx.prisma.users.update({
            data,
            where: {
              id: input.id,
            },
          });
          return user;
        }
        // Save the user to the database with the hashed password
        const user = await ctx.prisma.users.update({
          data: input,
          where: {
            id: input.id,
          },
        });
        return user;
      } catch (error) {
        console.log("Error update user:", error);
      }
    }),

  // getAll seria uma funcionalidade de listar todos os dados dos usuarios
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.users.findMany({
        select: {
          id: true,
          username: true,
          telefone: true,
          nome: true,
          cpf: true,
          email: true,
          setor: true,
          cargo: true,
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
    .input(UserUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.prisma.users.delete({
          where: {
            id: input.id,
          },
        });
      } catch (error) {
        console.log("error", error);
      }
    }),

  checkUser: publicProcedure
    .input(UserLoginSchema)
    .query(async ({ input, ctx }) => {
      try {
        const user = await ctx.prisma.users.findFirst({
          select: {
            id: true,
            username: true,
          },
          where: {
            username: input.username,
            password: input.password,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }),
});
