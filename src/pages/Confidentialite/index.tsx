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
    title: 'Responsable du traitement',
    body: 'La Poterie du Vieil Annecy, 15 rue Sainte-Claire, 74000 Annecy.',
  },
  {
    title: 'Données collectées',
    body: 'Via le formulaire de commande : nom, email, téléphone, mode de retrait et message. Aucune donnée bancaire n\'est collectée — aucun paiement n\'a lieu en ligne.',
  },
  {
    title: 'Finalité',
    body: 'Vos données servent uniquement à traiter votre demande de réservation et à vous recontacter pour confirmer disponibilité et prix.',
  },
  {
    title: 'Conservation & destinataires',
    body: 'Les informations ne sont utilisées que par la boutique, le temps nécessaire au traitement de votre demande, et ne sont jamais revendues.',
  },
  {
    title: 'Vos droits',
    body: 'Vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données. Pour l\'exercer, contactez-nous au 04 50 51 91 34.',
  },
]

export default function ConfidentialitePage() {
  useMeta(
    'Politique de confidentialité — La Poterie du Vieil Annecy',
    'Politique de confidentialité et gestion des données personnelles.',
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
          Politique de confidentialité
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
