'use client'
import React from 'react'
import { useForm } from '@tanstack/react-form'
import { registerFournisseur } from '@/lib/actions/users';
import useAppForm from '@/lib/tanstack-form';
export default function PreneurSignupForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      type: '',
      nom: '',
      prenom: '',
      telephone: '',
      localisation: '',
      region: '',
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      Object.entries(value).forEach(([key, value]) => {
        formData.append(key, value);
      });
      await registerFournisseur(formData);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-8"
    >
      <form.AppField
        name="email"
        children={(field) => <field.TextField />}
      />
            {/* Components in `form.AppForm` have access to the form context */}
      <form.AppForm>
      <form.SubmitButton />
      </form.AppForm >
    </form>
  );
}
  
