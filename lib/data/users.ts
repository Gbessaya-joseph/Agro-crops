// src/lib/data/users.ts
import prisma from "../db";
import { hashSync } from "bcryptjs";
//import { Role } from "@prisma/client";

export async function createUserWithFournisseur(
  userData: { email: string; password: string },
  fournisseurData: { 
    nom: string; 
    prenom: string;
    telephone: string;
    localisation: string;
    region: string; 
  }
) {
  // Vérification de la validité de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Email invalide.");
  }
  // Vérification de l'existence de l'utilisateur
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new Error("L'utilisateur existe déjà.");
  }
  console.log("Création de l'utilisateur:", userData.email); // Debug
  return prisma.user.create({
    data: {
      email: userData.email,
      password: hashSync(userData.password, 12),
      role: "FOURNISSEUR",
      fournisseur: {
        create: {
          NomFourn: fournisseurData.nom,
          PrenFourn: fournisseurData.prenom,
          TelFourn: fournisseurData.telephone,
          LocalFourn: fournisseurData.localisation,
          RegionFourn: fournisseurData.region,
          // ...
        },
      },
    },
    include: { fournisseur: true },
  });
}

//register preneur with tanstack
export async function createUserWithPreneur(userData: { email: string; password: string }, preneurData: { nom: string; prenom: string; telephone: string; localisation: string; region: string; type: string}) {
  // Vérification de la validité de l'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(userData.email)) {
    throw new Error("Email invalide.");
  }
  // Vérification de l'existence de l'utilisateur
  const existingUser = await prisma.user.findUnique({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new Error("L'utilisateur existe déjà.");
  }
  console.log("Création de l'utilisateur:", userData.email); // Debug
  return prisma.user.create({
    data: {
      email: userData.email,
      password: hashSync(userData.password, 12),
      role: "PRENEUR",
      preneur: {
        create: {
          NomPren: preneurData.nom,
          PrenPren: preneurData.prenom,
          TyPren: preneurData.type,
          TelPren: preneurData.telephone,
          LocPren: preneurData.localisation,
          regionPren: preneurData.region,
          // ...
        },
      },
    },
    include: { preneur: true },
  });
}
