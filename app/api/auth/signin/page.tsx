import SignIn from "@/app/components/signin";
import { getProviders } from "next-auth/react";

export default async function SignInPage() {
  const providers = await getProviders();
  return <SignIn providers={providers} />;
}