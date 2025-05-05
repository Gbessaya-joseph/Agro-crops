// src/lib/auth.ts
import  prisma  from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { hashSync } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials!.email },
        });

        if (user && user.password === hashSync(credentials!.password)) {
          return { ...user, id: user.id.toString() };
        }
        return null;
      },
    }),
    // ... autres providers (Google, Facebook)
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: undefined, // Will disable the new account creation screen
  },
  cookies: {
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      },
    },
  },
};

export default authOptions;
export const getServerAuthSession = (req: any, res: any) => {
  return getServerSession(req, res, authOptions);
}