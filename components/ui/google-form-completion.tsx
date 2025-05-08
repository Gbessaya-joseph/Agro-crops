'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GooglePreneurCompletionSchema, GooglePreneurCompletionType } from '@/lib/definitions/users';
import { completeGooglePreneurProfile } from '@/lib/actions/users';

// Liste des régions pour le formulaire
const REGIONS = [
  'Tunis',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Bizerte',
  'Nabeul',
  'Béja',
  'Jendouba',
  'Zaghouan',
  'Siliana',
  'Le Kef',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Gabès',
  'Médenine',
  'Tozeur',
  'Kebili',
  'Tataouine',
  'Gafsa'
];

export default function GoogleProfileCompletionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<GooglePreneurCompletionType>({
    resolver: zodResolver(GooglePreneurCompletionSchema),
    defaultValues: {
      telephone: '',
      localisation: '',
      region: '',
      type: 'Particulier'
    }
  });

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await completeGooglePreneurProfile(formData);
      
      if (!result.success && result.error) {
        setError(result.error);
      }
      
    } catch (err) {
      setError('Une erreur est survenue lors de la complétion de votre profil');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Compléter votre profil</h2>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form action={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
            Téléphone (8 chiffres)
          </label>
          <input
            id="telephone"
            name="telephone"
            type="text"
            {...register('telephone')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="12345678"
          />
          {errors.telephone && (
            <p className="mt-1 text-sm text-red-500">{errors.telephone.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="localisation" className="block text-sm font-medium text-gray-700 mb-1">
            Localisation précise
          </label>
          <input
            id="localisation"
            name="localisation"
            type="text"
            {...register('localisation')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Votre adresse"
          />
          {errors.localisation && (
            <p className="mt-1 text-sm text-red-500">{errors.localisation.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
            Région
          </label>
          <select
            id="region"
            name="region"
            {...register('region')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sélectionnez une région</option>
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="mt-1 text-sm text-red-500">{errors.region.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
            Type de compte
          </label>
          <select
            id="type"
            name="type"
            {...register('type')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Particulier">Particulier</option>
            <option value="Entreprise">Entreprise</option>
            <option value="Association">Association</option>
          </select>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-300 disabled:opacity-50"
        >
          {isSubmitting ? 'Chargement...' : 'Compléter mon profil'}
        </button>
      </form>
    </div>
  );
}