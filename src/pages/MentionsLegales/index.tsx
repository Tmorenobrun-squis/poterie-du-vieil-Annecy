import { useEffect } from 'react'
import { motion } from 'framer-motion'

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

const SECTIONS = [
  {
    title: 'Éditeur du site',
    body: 'La Poterie du Vieil Annecy — 15 rue Sainte-Claire, 74000 Annecy. Téléphone : 04 50 51 91 34. [Forme juridique, SIRET et directeur de la publication à compléter.]',
  },
  {
    title: 'Hébergement',
    body: 'Site hébergé sur Vercel Inc. [coordonnées de l\'hébergeur à compléter].',
  },
  {
    title: 'Propriété intellectuelle',
    body: 'L\'ensemble des contenus (textes, visuels, identité) est protégé. Toute reproduction sans autorisation est interdite. Les photographies définitives seront fournies par la boutique ou réalisées par un professionnel (droits d\'image réservés).',
  },
  {
    title: 'Crédits',
    body: 'Conception et réalisation du site : Titouan Moreno-Brun.',
  },
]

export default function MentionsLegalesPage() {
  useMeta(
    'Mentions légales — La Poterie du Vieil Annecy',
    'Mentions légales du site La Poterie du Vieil Annecy.',
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="pt-[100px] md:pt-[120px]"
    >
      <section className="max-w-[780px] mx-auto px-6 py-14">
        <h1
          className="font-fraunces font-semibold text-encre mb-8"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
        >
          Mentions légales
        </h1>
        <div className="flex flex-col gap-7">
          {SECTIONS.map(s => (
            <div key={s.title}>
              <h2 className="font-fraunces font-semibold text-encre text-[20px] mb-2">{s.title}</h2>
              <p className="font-mulish text-[15.5px] text-encre leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
