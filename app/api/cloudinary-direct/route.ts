// app/api/cloudinary-direct/route.ts
import { NextResponse } from 'next/server';
import { generateSignature } from '@/lib/cloudinary';

export async function GET() {
  try {
    const timestamp = Math.floor(Date.now() / 1000) + 3600*2; // 1 heure de marge pour le timestamp
    
    const paramsToSign = {
      timestamp,
      folder: 'uploads',
    };
    
    // Ajouter le upload_preset si défini
    if (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      const paramsToSign['upload_preset'] = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    }
    
    const signature = generateSignature(paramsToSign);
    
    return NextResponse.json({
      signature,
      timestamp,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: 'uploads',
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || undefined,
    });
  } catch (error: any) {
    console.error('Erreur lors de la génération de la signature:', error);
    return NextResponse.json(
      { error: error.message || 'Erreur de signature' },
      { status: 500 }
    );
  }
}