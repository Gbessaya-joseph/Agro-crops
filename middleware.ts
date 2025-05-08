// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = [
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/api/auth',
  '/',
  '/about',
  '/contact'
];

// Routes accessibles même si le profil est incomplet
const allowedIncompleteRoutes = [
  '/profile/complete',
  '/auth/signout',
  '/api/auth'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ignorer les requêtes pour les ressources statiques
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Vérifier si le chemin est public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Récupérer le token pour vérifier l'authentification
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Rediriger vers la page de connexion si non authentifié
  if (!token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/signin';
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // Vérifier si le profil est incomplet et rediriger si nécessaire
  const needsCompletion = token.needsCompletion === true;
  const isAllowedWithIncomplete = allowedIncompleteRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (needsCompletion && !isAllowedWithIncomplete) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile/complete';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configuration des chemins à intercepter avec le middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};