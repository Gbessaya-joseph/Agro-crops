// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadImage = async (file: File, folder: string = 'uploads') => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    // Configuration de l'upload
    const uploadOptions: any = {
      folder,
      resource_type: 'auto',
      // Désactiver la validation du timestamp pour éviter les erreurs de date
      timestamp: Math.floor(Date.now() / 1000) + 36000, // 1 heure de marge
      use_filename: true,
      unique_filename: true,
    };
    
    // Ajoutez le upload_preset SEULEMENT s'il est défini
    if (process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      uploadOptions.upload_preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    }

    cloudinary.uploader
      .upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      )
      .end(buffer);
  });
};

// Fonction pour générer une signature pour l'upload direct
export const generateSignature = (paramsToSign: any) => {
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    throw new Error('API Secret manquant');
  }
  
  return cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
};

// Fonction de test pour vérifier la configuration
export const testCloudinaryConfig = () => {
  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✓ Configured' : '✗ Missing',
    upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'Not set (optional)',
    current_time: new Date().toISOString(),
    timestamp: Math.floor(Date.now() / 1000),
  };
  
  return config;
};

export default cloudinary;