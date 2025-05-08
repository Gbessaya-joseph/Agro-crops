// app/api/cloudinary-config/route.ts
import { testCloudinaryConfig } from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const config = testCloudinaryConfig();
    
    // Masquer les détails sensibles
    const safeConfig = {
      cloud_name: config.cloud_name || 'Non configuré',
      api_key: config.api_key ? '✓ Configuré' : '✗ Manquant',
      api_secret: config.api_secret,
      upload_preset: config.upload_preset
    };
    
    return NextResponse.json(
      { 
        status: 'ok',
        message: 'Vérification de la configuration Cloudinary',
        config: safeConfig
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { 
        status: 'error',
        message: 'Erreur lors de la vérification de la configuration',
        error: error.message 
      },
      { status: 500 }
    );
  }
}