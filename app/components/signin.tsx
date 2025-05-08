"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignIn({ providers }: { providers: any }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {Object.values(providers).map((provider: any) => (
        <Button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          className="mb-4"
        >
          Se connecter avec {provider.name}
        </Button>
      ))}
    </div>
  );
}