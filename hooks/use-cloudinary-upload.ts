import { useState, useCallback } from 'react';

export type DirectUploadResponse = {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  [key: string]: any;
};

interface UseDirectUploadOptions {
  onSuccess?: (data: DirectUploadResponse) => void;
  onError?: (error: Error) => void;
}

export function useDirectUpload({
  onSuccess,
  onError,
}: UseDirectUploadOptions = {}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<DirectUploadResponse | null>(null);

  const uploadToCloudinaryDirect = useCallback(async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);
    setError(null);

    try {
      // 1. Obtenir la signature et les paramètres d'upload de notre API
      const signatureResponse = await fetch('/api/cloudinary-direct');
      if (!signatureResponse.ok) {
        throw new Error('Erreur lors de la récupération de la signature');
      }
      
      const {
        signature,
        timestamp,
        cloudName,
        apiKey,
        folder,
        uploadPreset,
      } = await signatureResponse.json();

      // 2. Préparer les données pour l'upload direct
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', apiKey);
      formData.append('timestamp', timestamp.toString());
      formData.append('signature', signature);
      formData.append('folder', folder);
      
      if (uploadPreset) {
        formData.append('upload_preset', uploadPreset);
      }

      // 3. Uploader directement à Cloudinary
      const xhr = new XMLHttpRequest();
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      
      // Configurer la progression
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setProgress(percentComplete);
        }
      });

      // Wrapper XHR dans une promesse
      const response = await new Promise<DirectUploadResponse>((resolve, reject) => {
        xhr.open('POST', cloudinaryUrl);
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              const data = JSON.parse(xhr.responseText);
              resolve(data);
            } catch (e) {
              reject(new Error('Format de réponse invalide'));
            }
          } else {
            try {
              const errorData = JSON.parse(xhr.responseText);
              reject(new Error(errorData.error?.message || `Upload échoué avec le statut ${xhr.status}`));
            } catch (e) {
              reject(new Error(`Upload échoué avec le statut ${xhr.status}`));
            }
          }
        };
        
        xhr.onerror = () => reject(new Error('Erreur réseau pendant l\'upload'));
        xhr.send(formData);
      });

      setData(response);
      onSuccess?.(response);
      return response;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erreur d\'upload inconnue');
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  });

  const reset = () => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
    setData(null);
  };

  return {
    uploadToCloudinaryDirect,
    isUploading,
    progress,
    error,
    data,
    reset,
  };
}