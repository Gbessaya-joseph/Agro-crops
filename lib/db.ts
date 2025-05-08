// src/lib/db.ts
import { PrismaClient } from '@prisma/client';
// import { hash } from 'bcryptjs';

// Déclaration TypeScript pour le global (sans var)
declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClient | undefined;
}

// Initialisation avec vérification du contexte global
const prisma = globalThis.prismaGlobal || new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error']
});

// Middleware de hachage unifié
// prisma.$use(async (params, next) => {
//   if (params.model === 'User' && ['create', 'update'].includes(params.action)) {
//     if (params.args.data?.password) {
//       params.args.data.password = await hash(params.args.data.password, 12);
//     }
//   }
//   return next(params);
// });

// Conservation en mode dev (uniquement hors production)
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;