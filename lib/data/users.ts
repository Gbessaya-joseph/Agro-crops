// src/lib/data/users.ts
import prisma from "../db";
import { hash } from "bcryptjs";
import { Role } from "@prisma/client";

// Types pour les données d'utilisateur et de fournisseur
interface UserData {
  email: string;
  password: string;
  name?: string;
}

interface FournisseurData {
  nom: string;
  prenom: string;
  telephone: string;
  localisation: string;
  region: string;
}

interface PreneurData {
  nom: string;
  prenom: string;
  telephone: string;
  localisation: string;
  region: string;
  type?: string;
}

/**
 * Crée un utilisateur avec un profil fournisseur
 */
export async function createUserWithFournisseur(
  userData: UserData,
  fournisseurData: FournisseurData
) {
  // Vérification de la validité de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Email invalide.");
  }

  // Vérification de l'existence de l'utilisateur
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  });

  if (existingUser) {
    throw new Error("Cet email est déjà utilisé.");
  }

  // Vérification de l'existence du numéro de téléphone
  const existingPhone = await prisma.fournisseur.findFirst({
    where: { TelFourn: fournisseurData.telephone }
  });

  if (existingPhone) {
    throw new Error("Ce numéro de téléphone est déjà utilisé.");
  }

  // Hachage du mot de passe
  const hashedPassword = await hash(userData.password, 12);

  // Création de l'utilisateur avec son profil fournisseur
  return prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      name: userData.name || `${fournisseurData.prenom} ${fournisseurData.nom}`,
      role: "FOURNISSEUR" as Role,
      fournisseur: {
        create: {
          NomFourn: fournisseurData.nom,
          PrenFourn: fournisseurData.prenom,
          TelFourn: fournisseurData.telephone,
          LocalFourn: fournisseurData.localisation,
          RegionFourn: fournisseurData.region,
        }
      }
    },
    include: { fournisseur: true }
  });
}

/**
 * Crée un utilisateur avec un profil preneur
 */
export async function createUserWithPreneur(
  userData: UserData,
  preneurData: PreneurData
) {
  // Vérification de la validité de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Email invalide.");
  }

  // Vérification de l'existence de l'utilisateur
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email }
  });

  if (existingUser) {
    throw new Error("Cet email est déjà utilisé.");
  }

  // Vérification de l'existence du numéro de téléphone
  const existingPhone = await prisma.preneur.findFirst({
    where: { TelPren: preneurData.telephone }
  });

  if (existingPhone) {
    throw new Error("Ce numéro de téléphone est déjà utilisé.");
  }

  // Hachage du mot de passe
  const hashedPassword = await hash(userData.password, 12);

  // Création de l'utilisateur avec son profil preneur
  return prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      name: userData.name || `${preneurData.prenom} ${preneurData.nom}`,
      role: "PRENEUR" as Role,
      preneur: {
        create: {
          NomPren: preneurData.nom,
          PrenPren: preneurData.prenom,
          TyPren: preneurData.type,
          TelPren: preneurData.telephone,
          LocPren: preneurData.localisation,
          regionPren: preneurData.region,
        }
      }
    },
    include: { preneur: true }
  });
}

/**
 * Complète le profil d'un preneur après inscription via Google
 */
export async function completePreneurProfile(
  userId: string,
  preneurData: Omit<PreneurData, "nom" | "prenom">
) {
  // Récupération des informations de l'utilisateur
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error("Utilisateur non trouvé.");
  }

  // Extraction du nom et prénom depuis le champ name
  const [prenom, ...nomParts] = (user.name || "Utilisateur Inconnu").split(" ");
  const nom = nomParts.join(" ") || prenom;

  // Vérification de l'existence du numéro de téléphone
  const existingPhone = await prisma.preneur.findFirst({
    where: { TelPren: preneurData.telephone }
  });

  if (existingPhone) {
    throw new Error("Ce numéro de téléphone est déjà utilisé.");
  }

  // Création du profil preneur
  return prisma.preneur.create({
    data: {
      userId: userId,
      NomPren: nom,
      PrenPren: prenom,
      TyPren: preneurData.type,
      TelPren: preneurData.telephone,
      LocPren: preneurData.localisation,
      regionPren: preneurData.region,
    }
  });
}

/**
 * Récupère un utilisateur par son email avec ses relations
 */
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      fournisseur: true,
      preneur: true
    }
  });
}

/**
 * Récupère un utilisateur par son ID avec ses relations
 */
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      fournisseur: true,
      preneur: true
    }
  });
}