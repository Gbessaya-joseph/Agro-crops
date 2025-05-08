"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerFournisseur, registerPreneur } from "@/lib/actions/users";
import { useEffect, useState } from "react";

// Composant pour le bouton de soumission
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        pending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Inscription en cours..." : "S'inscrire"}
    </button>
  );
}

// Composant principal du formulaire
export default function FournisseurRegisterForm() {
  // Gestion du register en fonction du role
  const [role, setRole] = useState("fournisseur");
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);
    console.log(event.target.value);
  }
  // Gestion de l'état du formulaire avec useFormState
  const [state, formAction] = useFormState((_, formData) => role === "fournisseur" ? registerFournisseur(formData) : registerPreneur(formData), {
    success: false,
    errors: {} as Record<string, string>, // Add an empty errors object
  });

  // Afficher les erreurs globales (si présentes)
  useEffect(() => {
    if (state.error) {
      // Vous pouvez utiliser une bibliothèque comme react-toastify pour des notifications
      console.error(state.error);
    }
  }, [state.error]);
  if (state.success) {
    // Rediriger ou afficher un message de succès
    console.log("Inscription réussie !");
  }



  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        Inscription Fournisseur
      </h2>
      {state.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {state.error}
        </div>
      )}
      {state.errors?.email === "Cet Email déjà utilisé" && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-md">
          Cet email est déjà utilisé.{" "}
          <a
        href="/login"
        className="text-blue-600 hover:underline"
          >
        Connectez-vous ici
          </a>.
        </div>
      )}
      <form action={formAction} className="space-y-4">
        {/* create selector for role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Rôle
          </label>
          <select
            id="role"
            name="role"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="fournisseur">Fournisseur</option>
            <option value="client">Client</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="prenom"
            className="block text-sm font-medium text-gray-700"
          >
            Prénom
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700"
          >
            Nom
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          aria-invalid={state.errors?.email ? "true" : "false"}
          aria-errormessage={state.errors?.email ? "email-error" : undefined}
          />
          {state.errors?.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {state.errors.email}
          </p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="telephone"
            className="block text-sm font-medium text-gray-700"
          >
            Téléphone
          </label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            required
            pattern="\d{8}"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="localisation"
            className="block text-sm font-medium text-gray-700"
          >
            Localisation
          </label>
          <input
            type="text"
            id="localisation"
            name="localisation"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700"
          >
            Région
          </label>
          <input
            type="text"
            id="region"
            name="region"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        {role === "client" && (
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type de compte
            </label>
            <select
              id="type"
              name="type"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="fournisseur">Fournisseur</option>
              <option value="client">Client</option>
              </select>
              </div>
              )}
        <SubmitButton />
      </form>
    </div>
  );
}