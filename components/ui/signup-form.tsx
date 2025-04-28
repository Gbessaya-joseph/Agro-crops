"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { registerFournisseur, googleSignup, facebookSignup } from "@/lib/actions/users";
import Facebook from "@/app/ui/icons_svg/facebook";
import Google from "@/app/ui/icons_svg/google";
export function SignupForm() {
//gerer l'etat du boutton
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    await registerFournisseur(formData);
    setIsLoading(false);
  };
  const handleGoogleSignup = async () => {
    setIsLoading(true);
    await googleSignup();
    setIsLoading(false);
  };
  const handleFacebookSignup = async () => {
    setIsLoading(true);
    await facebookSignup();
    setIsLoading(false);
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" action={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" name="prenom"/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" name="nom" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" placeholder="••••••••" type="password" minLength={6} required/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="telephone">Phone number</Label>
          <Input
            id="telephone"
            name="telephone"
            placeholder="12345678"
            type="text"
            pattern="\d{8}"
            title="Numéro togolais (8 chiffres)"
            required
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="localisation">Location</Label>
          <Input id="localisation" placeholder="Lomé" type="text" name="localisation"/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="region">Region</Label>
          <Input id="region" placeholder="Maritime" type="text" name="region"/>
        </LabelInputContainer>

        <button
          disabled={isLoading}
          className="cursor-pointer bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] "
          type="submit"
          onClick={() => handleSubmit(new FormData())}
        >
          {isLoading ? "Signing up..." : "Sign up"}
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-row space-y-4 gap-4">
          <button
            className="cursor-pointer relative group/btn flex space-x-2 items-center border border-red-500 justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={handleGoogleSignup}
          >
            <Google />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
          </button>

          <button
            className="cursor-pointer relative group/btn flex space-x-2 items-center border border-red-500 justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
            onClick={handleFacebookSignup}
          >
            <Facebook />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Facebook
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent cursor-pointer" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
