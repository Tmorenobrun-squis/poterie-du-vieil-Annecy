import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/*
 * PHOTO — Portrait en arche. À remplacer par une photo pro de l'artisan/boutique.
 * Format recommandé : WebP 400×480, portrait, fond naturel.
 */

function PortraitArche() {
  return (
    <div
      className="w-full flex items-end justify-center"
      style={{
        aspectRatio: '5/6',
        borderRadius: '999px 999px 14px 14px',
        background: 'linear-gradient(170deg,#CBB48E 0%,#97A488 60%,#6E7B5E 100%)',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <span className="font-caveat text-creme/40 text-sm pb-6">Portrait — à remplacer</span>
    </div>
  )
}

function FloralRight({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="150" height="200" viewBox="0 0 150 200" fill="none" aria-hidden="true">
      <path d="M75 190 C73 150 77 110 70 72" stroke="#CBB48E" strokeWidth="1.1" strokeLinecap="round" opacity="0.4" />
      {[0,60,120,180,240,300].map((a) => (
        <ellipse key={a} cx="70" cy="60" rx="4" ry="9"
          fill="none" stroke="#CBB48E" strokeWidth="0.8" opacity="0.4"
          transform={`rotate(${a},70,72)`}
        />
      ))}
      <circle cx="70" cy="72" r="4.5" fill="none" stroke="#CBB48E" strokeWidth="0.9" opacity="0.45" />
      <path d="M72 120 C60 108 52 102 44 92" stroke="#97A488" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <path d="M73 120 C85 108 92 102 100 90" stroke="#97A488" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
    </svg>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 my-10 md:my-12">
      <hr className="flex-1 border-encre/15" />
      <h2 className="font-fraunces font-bold text-encre text-[22px] md:text-[26px] whitespace-nowrap" style={{ letterSpacing: '0.04em' }}>
        {children}
      </h2>
      <hr className="flex-1 border-encre/15" />
    </div>
  )
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="histoire"
      ref={ref}
      className="relative px-8 md:px-10 pb-14 overflow-hidden"
      aria-label="Notre histoire"
    >
      <SectionTitle>Notre histoire</SectionTitle>

      {/* Déco florale droite */}
      <FloralRight className="absolute right-4 top-16 pointer-events-none select-none hidden md:block opacity-60" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

        {/* Portrait */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-[340px] mx-auto md:mx-0 w-full"
        >
          {/* À remplacer : <img src="/images/portrait-boutique.webp" alt="L'artisane dans sa boutique sous les arcades" width="340" height="408" loading="lazy" style={{borderRadius:'999px 999px 14px 14px',aspectRatio:'5/6',objectFit:'cover'}} /> */}
          <PortraitArche />
        </motion.div>

        {/* Texte */}
        <motion.div
          className="flex flex-col gap-5"
          initial={prefersReduced ? false : { opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="font-mulish text-[15px] leading-relaxed text-encre/80">
            La Poterie du Vieil Annecy est née d'un rêve simple : rassembler sous les
            arcades de la rue Sainte-Claire les plus belles créations artisanales de Savoie
            et des Alpes. Fondée avec passion, notre boutique est aujourd'hui un lieu de
            vie autant que de commerce.
          </p>
          <p className="font-mulish text-[15px] leading-relaxed text-encre/80">
            Nous travaillons avec un collectif de créateurs locaux — potiers, céramistes,
            bijoutiers, illustrateurs — qui partagent notre amour du beau geste et du
            matériau naturel. Chaque objet que vous trouvez ici raconte une histoire, celle
            d'une main, d'un tour, d'un four.
          </p>
          <p className="font-mulish text-[15px] leading-relaxed text-encre/80">
            Notre boutique est un oasis de tranquillité au cœur du vieil Annecy,
            entourée du murmure du canal et des pavés séculaires. Nous aimons recevoir
            nos visiteurs, partager un thé, parler des créateurs derrière les pièces.
          </p>
          <p className="font-mulish text-[15px] leading-relaxed text-encre/80">
            <strong className="font-semibold text-encre">
              Entrée libre, venez nous rendre visite — vous êtes toujours les bienvenus.
            </strong>
          </p>

          <a
            href="#nous-trouver"
            className="inline-flex items-center self-start mt-2 px-7 py-3.5 rounded-full bg-encre text-creme font-mulish font-semibold text-[14px] hover:bg-encre/85 transition-colors duration-200 cursor-pointer"
          >
            Nous rendre visite
          </a>
        </motion.div>
      </div>
    </section>
  )
}
