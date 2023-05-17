import NextAuth, { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

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
        passsword: { label: "Password", type: "password" },
      },
      authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { username, passsword } = credentials as {
          username: string;
          passsword: string;
        };
        //perform you login logic here
        // find out user from database
        if (username !== "mello" && passsword !== "1234") {
          throw new Error("Invalid username or password");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "Mello",
          email: "edio.pereira@unimed279.com.br",
        };
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
