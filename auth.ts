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
      allowDangerousEmailAccountLinking: true,
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
              role: user.role,
            };
          }
        }

        //if user does not exist or password does not match
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      //assign the user fields to token

      if (user) {
        token.sub = user.id ?? token.sub;
        token.email = user.email ?? token.email;
        token.role = user.role ?? token.role;
        token.name = user.name ?? token.name;

        const rawName = user.name?.trim() ?? "";
        const fallbackName = user.email ? user.email.split("@")[0] : "User";

        token.name = rawName ? rawName : fallbackName;
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      return token;
    },

    async session({ session, user, trigger, token }) {
      // if token's sub exists, set the user ID in the session to the token's sub
      if (token.sub) session.user.id = token.sub;
      if (token.name) session.user.name = token.name;
      if (token.email) session.user.email = token.email;
      if (token.role) session.user.role = token.role;

      return session;
    },
  },
});
