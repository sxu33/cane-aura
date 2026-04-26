import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";
import Google from "next-auth/providers/google";

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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
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

          if (isMatched) {
            if (!user.emailVerified) {
              return null;
            }
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }

        //if user does not exist or password does not match
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      //if user exists, set token sub to user id or remain

      if (user) {
        token.sub = user.id ?? token.sub;
      }
      return token;
    },

    async session({ session, user, trigger, token }) {
      // if token's sub exists, set the user ID in the session to the token's sub
      if (token.sub) session.user.id = token.sub;

      return session;
    },
  },
});
