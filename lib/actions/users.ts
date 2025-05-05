// src/lib/actions/users.ts
"use server";

import { createUserWithFournisseur } from "../data/users";
import { FournisseurSchema } from "../definitions/users";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { PreneurSchema } from "../definitions/users";
import { createUserWithPreneur } from "../data/users";


export async function registerFournisseur(formData: FormData) {
    try {
  const rawData = Object.fromEntries(formData.entries())

  // Validation Zod
  const validatedData = FournisseurSchema.parse(rawData);
  console.log("Données validées:", validatedData); // Debug
  //l

  // Création en DB
  await createUserWithFournisseur(
    {
      email: validatedData.email,
      password: validatedData.password,
    },
    {
      nom: validatedData.nom,
      prenom: validatedData.prenom,
      telephone: validatedData.telephone,
      localisation: validatedData.localisation,
      region: validatedData.region,
        // ...
    }
  );

// Redirection explicite
const redirectPath = "/login?success=1"; // <-- Chaîne hardcodée pour test
console.log("Redirection vers:", redirectPath); // Debug
redirect(redirectPath); // <-- Garanti d'être une string

} catch (error) {
console.error("Erreur d'inscription:", error);
return { error: "Échec de l'inscription" }; // Gestion d'erreur
}
}

export async function googleSignup() {
  try {
    await signIn("google", { callbackUrl: "/" });
  } catch (error) {
    console.error("Google signup failed:", error);
    throw error;
  }
}
    
export async function facebookSignup() {
  try {
    await signIn("facebook", { callbackUrl: "/" });
  } catch (error) {
    console.error("Facebook signup failed:", error);
    throw error;
  }
}

// register buyer with tanstack
export async function registerPreuneur(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email"),
      password: formData.get("password"),
      nom: formData.get("nom")?.toString(),
      prenom: formData.get("prenom"),
      type: formData.get("type"),
      telephone: formData.get("telephone"),
      localisation: formData.get("localisation"),
      region: formData.get("region"),
    };

    // Validation Zod
    const validatedData = PreneurSchema.parse(rawData);

    // Création en DB
    await createUserWithPreneur(
      {
        email: validatedData.email,
        password: validatedData.password,
      },
      {
        nom: validatedData.nom,
        prenom: validatedData.prenom,
        type: validatedData.type,
        telephone: validatedData.telephone,
        localisation: validatedData.localisation,
        region: validatedData.region,
      }
    );

    // Redirection explicite
    const redirectPath = "/login?success=1"; // <-- Chaîne hardcodée pour test
    console.log("Redirection vers:", redirectPath); // Debug
    redirect(redirectPath); // <-- Garanti d'être une string

  } catch (error) {
    console.error("Erreur d'inscription:", error);
  }
}
