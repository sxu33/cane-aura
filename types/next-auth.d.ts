import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string | null;
  }

  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role?: string | null;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role?: string | null;
  }
}
