import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { galerieSchema } from './src/sanity/schemas/galerie'
import { produitSchema } from './src/sanity/schemas/produit'
import { createurSchema } from './src/sanity/schemas/createur'
import { parametresSchema } from './src/sanity/schemas/parametres'

export default defineConfig({
  name: 'poterie-vieil-annecy',
  title: 'La Poterie du Vieil Annecy',
  projectId: 'tpsv1jht',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu du site')
          .items([
            S.listItem().title('Galerie photos').schemaType('galerie').child(S.documentTypeList('galerie')),
            S.listItem().title('Boutique — Produits').schemaType('produit').child(S.documentTypeList('produit')),
            S.listItem().title('Les Créateurs').schemaType('createur').child(S.documentTypeList('createur')),
            S.listItem()
              .title('Réglages du site')
              .schemaType('parametres')
              .child(S.document().schemaType('parametres').documentId('parametres')),
          ]),
    }),
  ],
  schema: {
    types: [galerieSchema, produitSchema, createurSchema, parametresSchema],
  },
})
