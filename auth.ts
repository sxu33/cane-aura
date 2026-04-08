import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/sign-in",

    error: "/sign-in",
  },

  session: {
    strategy: "jwt",

    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        //query to find the user in the database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        //check whether the user exists or password matches
        if (user && user.password) {
          const isMatched = compareSync(credentials.password as string, user.password);

          if (isMatched)
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
        }

        //if user does not exist or password does not match
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }) {
      // Set the user ID from the token
      if (token.sub) session.user.id = token.sub;

      // If there is an update, set the user name
      if (trigger === "update") {
        session.user.name = user.name;
      }

      return session;
    },
  },
});
