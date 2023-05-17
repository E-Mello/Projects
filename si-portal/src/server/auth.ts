import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  Awaitable,
  RequestInternal,
  User,
} from "next-auth";
import bcrypt from "bcrypt";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env/server.mjs";
import { prisma } from "./db";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { UserLoginSchema } from "./common/UserSchema";
import { JWT, JWTDecodeParams, JWTEncodeParams } from "next-auth/jwt/types.js";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Validate the user credentials with your UserLoginSchema
          const validatedCredentials = UserLoginSchema.parse(credentials);

          // Find the user in your database using the provided username
          const user = await prisma.user.findFirst({
            where: {
              username: validatedCredentials.username,
            },
          });

          // If the user doesn't exist, throw an error
          if (!user) {
            throw new Error("Invalid username or password");
          }

          // Compare the hashed password stored in the database with the hashed version of the provided password
          const passwordsMatch = await bcrypt.compare(
            validatedCredentials.password,
            user.password
          );

          if (!passwordsMatch) {
            throw new Error("Password don't match");
          }

          // Return the user object if everything checks out
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  pages: {
    /**
     * Here you can override the default pages and their props.
     * @see https://next-auth.js.org/configuration/pages
     */
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
