// app/api/upload/route.ts
import { uploadImage, testCloudinaryConfig } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

// bodyParser: false ne fonctionne pas dans App Router - nous utilisons request.formData() à la place

export async function POST(request: Request) {
  try {
    // Vérifier la configuration de Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      console.error('Configuration Cloudinary manquante');
      return NextResponse.json(
        { error: 'Configuration Cloudinary incorrecte sur le serveur' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifiez que le fichier est une image
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Le fichier doit être une image' },
        { status: 400 }
      );
    }

    // Vérifiez la taille du fichier (limite à 10 Mo par exemple)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 Mo
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (maximum 10 Mo)' },
        { status: 400 }
      );
    }

    const result = await uploadImage(file, 'uploads');
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Erreur upload:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Échec de l\'upload',
        details: error.http_code ? `Code HTTP: ${error.http_code}` : undefined
      },
      { status: 500 }
    );
  }
}

// Optionnel: ajout d'une route GET pour vérifier la configuration
export async function GET() {
  return NextResponse.json(
    { 
      status: 'ok',
      message: 'API d\'upload d\'image prête à l\'emploi',
      config: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'Non configuré',
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ? 'Configuré' : 'Non configuré',
      }
    },
    { status: 200 }
  );
}