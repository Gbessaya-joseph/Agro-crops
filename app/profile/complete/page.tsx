import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/session';
import GoogleProfileCompletionForm from '@/components/ui/google-form-completion';

export default async function CompleteProfilePage() {
  const session = await getUserSession();
  
  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!session) {
    redirect('/auth/signin');
  }
  
  // Si l'utilisateur n'a pas besoin de compléter son profil, rediriger vers le tableau de bord
  if (!(session as any).needsCompletion) {
    redirect('/dashboard');
  }
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Compléter votre profil
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Veuillez fournir quelques informations supplémentaires pour finaliser votre inscription.
          </p>
        </div>
        
        <GoogleProfileCompletionForm />
      </div>
    </div>
  );
}