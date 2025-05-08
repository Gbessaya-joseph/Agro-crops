// /lib/auth.ts
import prisma from "./db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Role, User } from "@prisma/client";

// Vérification des variables d'environnement requises
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("Variables d'environnement manquantes pour l'authentification Google");
}

// Déclaration des types pour les sessions Next Auth
declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      role: Role;
    };
  }
}

// Déclaration des types pour les jetons JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    updateAge: 24 * 60 * 60,   // 24 heures
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          avatar: profile.picture,
          role: "PRENEUR" as Role, // Définir par défaut comme PRENEUR
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Vérifier si l'email est vérifié pour les providers OAuth
      if (account?.provider !== "credentials" && !(profile as any)?.email_verified) {
        return false;
      }

      // Traitement spécifique pour Google
      if (account?.provider === "google" && profile?.email) {
        try {
          // Vérifier si l'utilisateur existe déjà
          const existingUser = await prisma.user.findUnique({
            where: { email: profile.email },
            include: { accounts: true }
          });

          // Si l'utilisateur existe mais n'a pas de compte Google, lier les comptes
          if (existingUser && !existingUser.accounts.some(a => a.provider === "google")) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              }
            });
          } else if (!existingUser) {
            // Créer un nouvel utilisateur avec le rôle PRENEUR par défaut
            await prisma.user.create({
              data: {
                email: profile.email,
                name: profile.name,
                avatar: profile.image,
                role: "PRENEUR",
                accounts: {
                  create: {
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                  }
                }
              }
            });
          }
        } catch (error) {
          console.error("Erreur d'authentification Google:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Si l'utilisateur vient de se connecter, on ajoute ses données au token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // Si c'est une connexion Google et que l'utilisateur n'a pas encore complété son profil
      if (account?.provider === "google") {
        // Vérifier si le profil Preneur est déjà créé
        const existingPreneur = await prisma.preneur.findFirst({
          where: { userId: token.id as string }
        });

        // Si non, on le marque pour redirection
        if (!existingPreneur) {
          token.needsCompletion = true;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        
        // On peut ajouter une propriété pour indiquer si le profil doit être complété
        if (token.needsCompletion) {
          (session as any).needsCompletion = true;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
};

export default authOptions;