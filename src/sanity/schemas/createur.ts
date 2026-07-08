import { defineType, defineField } from 'sanity'

export const createurSchema = defineType({
  name: 'createur',
  title: 'Créateur',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo / portrait',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'specialite',
      title: 'Spécialité',
      type: 'string',
      description: 'Ex : Céramiste, Bijoutière, Tisserande…',
    }),
    defineField({
      name: 'biographie',
      title: 'Présentation',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'photos',
      title: 'Photos de ses œuvres',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'specialite', media: 'photo' },
  },
})
