import { Prisma, PrismaClient } from "@prisma/client";

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { UserLoginSchema } from "./../../../server/common/UserSchema";
import { appRouter } from "./../../../server/trpc/router/_app";
import { hashPassword } from "../../../server/trpc/router/user";
import { prisma } from "../../../server/db/client";
import { trpc } from "../../../utils/trpc";
import { z } from "zod";

async function handleCheckUser(input: z.infer<typeof UserLoginSchema>) {
  const caller = appRouter.createCaller({ prisma });
  const hashedPassword = await hashPassword(input.password);
  return await caller.user.checkUser({
    username: input.username,
    password: hashedPassword,
  });
}

const authOptions: NextAuthOptions = {
  // here, you can add your custom session, that is, the way you want to store your user session
  session: {
    strategy: "jwt",
  },
  // here, you can add your custom providers, that is, the way you want to authenticate your users
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // find out user from database
        if (credentials?.password && credentials?.username) {
          const user = await handleCheckUser(credentials);
          // if everything is fine
          return {
            id: user?.id,
            name: user?.username,
          };
        }

        // if everything is not fine
        return null;
      },
    }),
  ],
  // here, you can add your custom pages, that is, the way you want to authenticate your users or the way you want to show your users the error messages
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/auth/signout",
  },
};

export default NextAuth(authOptions);
