// src/lib/definitions/users.ts
import { z } from "zod";
import { Role } from "@prisma/client";

// Schéma de base utilisateur
export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
});

// Schéma étendu pour les fournisseurs
export const FournisseurSchema = UserSchema.extend({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  telephone: z.string().regex(/^\d{8}$/),
  localisation: z.string(),
  region: z.string(),
}).omit({ role: true }); // Role forcé à "FOURNISSEUR"

//register preneur with tanstack
export const PreneurSchema = UserSchema.extend({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  type: z.string(),
  telephone: z.string().regex(/^\d{8}$/),
  localisation: z.string(),
  region: z.string(),
}).omit({ role: true }); // Role forcé à "PRENEUR"


