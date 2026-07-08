import { defineType, defineField } from 'sanity'

export const produitSchema = defineType({
  name: 'produit',
  title: 'Produit',
  type: 'document',
  fields: [
    defineField({
      name: 'nom',
      title: 'Nom du produit',
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
      name: 'description',
      title: 'Description courte',
      type: 'text',
      rows: 3,
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
          { title: 'Textile', value: 'textile' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'prix',
      title: 'Prix indicatif (€)',
      type: 'string',
      description: 'Ex : "45 €" ou "à partir de 30 €"',
    }),
    defineField({
      name: 'disponible',
      title: 'Disponible en boutique',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'nom', subtitle: 'categorie', media: 'photo' },
  },
})
