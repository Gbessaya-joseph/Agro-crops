"use client";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages = {
    default: "Une erreur est survenue lors de la connexion",
    "account-exists-with-different-credential":
      "Un compte existe déjà avec cette adresse email mais avec une autre méthode de connexion",
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Alert variant="destructive" className="w-full max-w-md">
        <AlertTitle>Erreur de connexion</AlertTitle>
        <AlertDescription>
          {errorMessages[error as keyof typeof errorMessages] || errorMessages.default}
        </AlertDescription>
      </Alert>
    </div>
  );
}