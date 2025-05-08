"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: "/auth/signin" })}>
      Déconnexion
    </button>
  );
}