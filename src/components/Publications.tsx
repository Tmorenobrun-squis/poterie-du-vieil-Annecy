import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/*
 * VISUELS — 5 couvertures magazine placeholder. À remplacer par les vraies
 * parutions presse ou photos d'inspiration. Format : WebP 3:4, 300×400.
 */

const PUBLICATIONS = [
  { title: 'Maisons Savoyardes', issue: 'Été 2025', colors: ['#EDE4D3', '#211D18'] },
  { title: 'Artisans des Alpes', issue: 'Printemps 2025', colors: ['#CBB48E', '#3d2a1a'] },
  { title: 'Annecy Mag', issue: 'Automne 2024', colors: ['#97A488', '#211D18'] },
  { title: 'Terre & Feu', issue: 'Hiver 2024', colors: ['#6E7B5E', '#EDE4D3'] },
  { title: 'Déco Savoie', issue: 'Été 2024', colors: ['#CBB48E', '#97A488'] },
]

function PubCard({ title, issue, colors }: { title: string; issue: string; colors: string[] }) {
  return (
    <div
      className="shrink-0 rounded-xl overflow-hidden"
      style={{ width: 160, aspectRatio: '3/4' }}
    >
      {/* À remplacer par <img src={`/images/pub-${title.toLowerCase().replace(/\s+/g,'-')}.webp`} alt={`Parution dans ${title}, ${issue}`} width="160" height="213" loading="lazy" /> */}
      <div
        className="w-full h-full flex flex-col items-start justify-between p-3"
        style={{
          background: `linear-gradient(165deg,${colors[0]} 0%,${colors[1]} 100%)`,
        }}
        aria-hidden="true"
      >
        <div className="w-8 h-0.5 bg-white/40 rounded" />
        <div>
          <p className="font-fraunces font-bold text-[11px] text-white/70 leading-snug">{title}</p>
          <p className="font-mulish text-[10px] text-white/50 mt-0.5">{issue}</p>
        </div>
      </div>
    </div>
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

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

const CARD_WIDTH = 160
const GAP = 20
const STEP = CARD_WIDTH + GAP

export function Publications() {
  const ref = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()
  const [offset, setOffset] = useState(0)

  const maxOffset = (PUBLICATIONS.length - 3) * STEP

  function prev() {
    setOffset((o) => Math.max(0, o - STEP))
  }
  function next() {
    setOffset((o) => Math.min(maxOffset, o + STEP))
  }

  return (
    <section
      id="presse"
      ref={ref}
      className="px-8 md:px-10 pb-14"
      aria-label="Presse et inspirations"
    >
      <SectionTitle>Ils en parlent</SectionTitle>

      <motion.div
        className="relative"
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Flèche gauche */}
        <button
          onClick={prev}
          disabled={offset === 0}
          aria-label="Précédent"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-creme border border-bois/30 flex items-center justify-center text-encre shadow-sm hover:bg-lin transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft />
        </button>

        {/* Track */}
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex gap-5"
            animate={{ x: -offset }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {PUBLICATIONS.map((pub) => (
              <PubCard key={pub.title} {...pub} />
            ))}
          </motion.div>
        </div>

        {/* Flèche droite */}
        <button
          onClick={next}
          disabled={offset >= maxOffset}
          aria-label="Suivant"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-creme border border-bois/30 flex items-center justify-center text-encre shadow-sm hover:bg-lin transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight />
        </button>
      </motion.div>
    </section>
  )
}
