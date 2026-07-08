import { defineType, defineField } from 'sanity'

export const galerieSchema = defineType({
  name: 'galerie',
  title: 'Galerie photos',
  type: 'document',
  fields: [
    defineField({
      name: 'titre',
      title: 'Titre / description',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Poterie', value: 'poterie' },
          { title: 'Bijoux', value: 'bijoux' },
          { title: 'Art de la table', value: 'art-de-la-table' },
          { title: 'Décoration', value: 'decoration' },
          { title: 'Boutique', value: 'boutique' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Les photos avec un numéro plus petit apparaissent en premier.',
    }),
  ],
  orderings: [
    { title: 'Ordre d\'affichage', name: 'ordre', by: [{ field: 'ordre', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'categorie', media: 'photo' },
  },
})
