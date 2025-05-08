// src/lib/session.ts
import { User, Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserById } from "./data/users";

// Type pour la session utilisateur étendue
export type ExtendedSession = {
  user: User & {
    id: string;
    role: Role;
    needsCompletion?: boolean;
  };
};

/**
 * Récupère la session utilisateur côté serveur
 */
export async function getUserSession(): Promise<ExtendedSession | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return null;
  }
  
  return session as ExtendedSession;
}

/**
 * Récupère l'utilisateur complet avec ses relations (fournisseur/preneur)
 */
export async function getCurrentUser() {
  const session = await getUserSession();
  
  if (!session?.user?.id) {
    return null;
  }
  
  return getUserById(session.user.id);
}

/**
 * Middleware pour protection des routes qui nécessitent une authentification
 */
export async function requireAuth() {
  const session = await getUserSession();
  
  if (!session) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }
  
  return session;
}

/**
 * Middleware pour protection des routes qui nécessitent un rôle spécifique
 */
export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();
  
  if (!allowedRoles.includes(session.user.role)) {
    redirect("/unauthorized");
  }
  
  return session;
}

/**
 * Vérifie si l'utilisateur doit compléter son profil
 * Et redirige vers le formulaire de complétion si nécessaire
 */
export async function checkProfileCompletion(redirectPath = "/profile/complete") {
  const session = await getUserSession();
  
  if (session && session.user.needsCompletion) {
    redirect(redirectPath);
  }
  
  return session;
}