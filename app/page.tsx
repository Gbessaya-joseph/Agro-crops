// // import Image from "next/image";
// import { Gallery4Demo } from "@/components/caroussel";
// import { FeatureDemo } from "@/components/feature-section";
// import { HeroBackground } from "@/components/hero_background";
// import { NavbarDemo } from "@/components/navbar";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { getUserSession } from '@/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SignOutButton } from './components/sign-out';
import FournisseurRegisterForm from './profile/page';
config.autoAddCss = false; // Prevent Font Awesome from adding CSS automatically

export default async function Home() {
  // const user = await getUserSession();
  // if (!user) {
  //   redirect('/api/auth/signin');
  // }
  
  return (
    // <main>
    //   {user ? (
    //     <div>Bienvenue {user?.user?.name || 'Utilisateur'}</div>
    //   ) : (
    //     <div>
    //       <Link href="/api/auth/signin">Se connecter</Link>
    //     </div>
    //   )}
    //   <div>
    //     <SignOutButton />
    //   </div>
    // </main>

    <div>
      <FournisseurRegisterForm />
    </div>
  );
}