// src/lib/actions/users.ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { 
  FournisseurSchema, 
  PreneurSchema, 
  GooglePreneurCompletionSchema 
} from "../definitions/users";
import { 
  createUserWithFournisseur, 
  createUserWithPreneur,
  completePreneurProfile 
} from "../data/users";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { revalidatePath } from "next/cache";

/**
 * Gestion des erreurs standard pour les actions
 */
type ActionResult = {
  errors: any;
  success: boolean;
  message?: string;
  error?: string;
};

/**
 * Inscription d'un fournisseur
 */
export async function registerFournisseur(formData: FormData): Promise<ActionResult> {
  try {
    // Extraction et validation des données du formulaire
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = FournisseurSchema.parse(rawData);

    // Création dans la base de données
    await createUserWithFournisseur(
      {
        email: validatedData.email,
        password: validatedData.password,
        name: `${validatedData.prenom} ${validatedData.nom}`
      },
      {
        nom: validatedData.nom,
        prenom: validatedData.prenom,
        telephone: validatedData.telephone,
        localisation: validatedData.localisation,
        region: validatedData.region,
      }
    );

    // Redirection vers la page de connexion avec un message de succès
    redirect("app/api/auth/signin?success=register");

  } catch (error) {
    console.error("Erreur d'inscription fournisseur:", error);
    
    // Gestion des erreurs de validation Zod
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { 
        success: false, 
        error: firstError.message 
      };
    }
    
    // Autres erreurs
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Échec de l'inscription" 
    };
  }
}

/**
 * Inscription d'un preneur
 */
export async function registerPreneur(formData: FormData): Promise<ActionResult> {
  try {
    // Construction et validation des données
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      nom: formData.get("nom") as string,
      prenom: formData.get("prenom") as string,
      type: formData.get("type") as string,
      telephone: formData.get("telephone") as string,
      localisation: formData.get("localisation") as string,
      region: formData.get("region") as string,
    };

    // Validation avec Zod
    const validatedData = PreneurSchema.parse(rawData);

    // Création dans la base de données
    await createUserWithPreneur(
      {
        email: validatedData.email,
        password: validatedData.password,
        name: `${validatedData.prenom} ${validatedData.nom}`
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

    // Redirection vers la page de connexion avec un message de succès
    redirect("/auth/signin?success=register");

  } catch (error) {
    console.error("Erreur d'inscription preneur:", error);
    
    // Gestion des erreurs de validation Zod
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { 
        success: false, 
        error: firstError.message 
      };
    }
    
    // Autres erreurs
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Échec de l'inscription" 
    };
  }
}

/**
 * Complétion du profil preneur après authentification Google
 */
export async function completeGooglePreneurProfile(formData: FormData): Promise<ActionResult> {
  try {
    // Vérification de la session utilisateur
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        error: "Vous devez être connecté pour compléter votre profil"
      };
    }
    
    // Extraction et validation des données du formulaire
    const rawData = {
      telephone: formData.get("telephone") as string,
      localisation: formData.get("localisation") as string,
      region: formData.get("region") as string,
      type: formData.get("type") as string,
    };
    
    // Validation avec Zod
    const validatedData = GooglePreneurCompletionSchema.parse(rawData);
    
    // Complétion du profil preneur
    await completePreneurProfile(session.user.id, {
      telephone: validatedData.telephone,
      localisation: validatedData.localisation,
      region: validatedData.region,
      type: validatedData.type
    });
    
    // Revalidation du chemin pour rafraîchir les données
    revalidatePath("/profile");
    
    // Redirection vers la page d'accueil ou profil
    redirect("/dashboard");
    
  } catch (error) {
    console.error("Erreur lors de la complétion du profil:", error);
    
    // Gestion des erreurs de validation Zod
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0];
      return { 
        success: false, 
        error: firstError.message 
      };
    }
    
    // Autres erreurs
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Échec de la mise à jour du profil" 
    };
  }
}

/**
 * Vérifie si l'utilisateur actuel doit compléter son profil
 */
export async function checkProfileCompletion(): Promise<{ needsCompletion: boolean }> {
  const session = await getServerSession(authOptions);
  
  // Si pas de session ou pas connecté via Google, pas besoin de compléter
  if (!session || !session.user || !(session as any).needsCompletion) {
    return { needsCompletion: false };
  }
  
  return { needsCompletion: true };
}