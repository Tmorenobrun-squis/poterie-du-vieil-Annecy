import { defineType, defineField } from 'sanity'

export const parametresSchema = defineType({
  name: 'parametres',
  title: 'Réglages du site',
  type: 'document',
  fields: [
    defineField({
      name: 'horaires',
      title: 'Horaires d\'ouverture',
      type: 'text',
      rows: 3,
      description: 'Ex : Lundi – Samedi : 10h – 19h',
    }),
    defineField({
      name: 'telephone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'instagram',
      title: 'Lien Instagram',
      type: 'url',
    }),
    defineField({
      name: 'texteAccueil',
      title: 'Texte d\'accueil (page principale)',
      type: 'text',
      rows: 5,
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Réglages du site' }),
  },
})
