// src/lib/definitions/users.ts
import { z } from "zod";
import { Role } from "@prisma/client";

// Schéma de base utilisateur
export const UserSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court (minimum 6 caractères)"),
  role: z.nativeEnum(Role).optional()
});

// Schéma étendu pour les fournisseurs
export const FournisseurSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court (minimum 6 caractères)"),
  nom: z.string().min(2, "Nom trop court (minimum 2 caractères)"),
  prenom: z.string().min(2, "Prénom trop court (minimum 2 caractères)"),
  telephone: z.string().regex(/^\d{8}$/, "Le numéro doit contenir 8 chiffres"),
  localisation: z.string().min(2, "Localisation requise"),
  region: z.string().min(2, "Région requise")
});

// Schéma étendu pour les preneurs
export const PreneurSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe trop court (minimum 6 caractères)"),
  nom: z.string().min(2, "Nom trop court (minimum 2 caractères)"),
  prenom: z.string().min(2, "Prénom trop court (minimum 2 caractères)"),
  type: z.string().optional(),
  telephone: z.string().regex(/^\d{8}$/, "Le numéro doit contenir 8 chiffres"),
  localisation: z.string().min(2, "Localisation requise"),
  region: z.string().min(2, "Région requise")
});

// Schéma pour la connexion
export const LoginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis")
});

// Schéma pour le formulaire complémentaire après authentification Google
export const GooglePreneurCompletionSchema = z.object({
  telephone: z.string().regex(/^\d{8}$/, "Le numéro doit contenir 8 chiffres"),
  localisation: z.string().min(2, "Localisation requise"),
  region: z.string().min(2, "Région requise"),
  type: z.string().optional()
});

// Types inférés pour une utilisation avec TypeScript
export type UserSchemaType = z.infer<typeof UserSchema>;
export type FournisseurSchemaType = z.infer<typeof FournisseurSchema>;
export type PreneurSchemaType = z.infer<typeof PreneurSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type GooglePreneurCompletionType = z.infer<typeof GooglePreneurCompletionSchema>;

// Types étendus avec l'ID pour les données issues de la base de données
export type UserWithId = UserSchemaType & { id: string };