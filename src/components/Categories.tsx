import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

/*
 * PHOTOS — 5 cartes catégories. Remplacer les placeholders par des photos pro.
 * Format recommandé : WebP 400×400, carré, fond naturel.
 */

const CATEGORIES = [
  {
    label: 'Art de la table',
    colors: ['#EDE4D3', '#CBB48E'],
  },
  {
    label: 'Déco de montagne',
    colors: ['#CBB48E', '#97A488'],
  },
  {
    label: 'Poterie savoyarde',
    colors: ['#97A488', '#6E7B5E'],
  },
  {
    label: 'Bijoux & accessoires',
    colors: ['#6E7B5E', '#CBB48E'],
  },
  {
    label: 'Affiches & illustrations',
    colors: ['#EDE4D3', '#97A488'],
  },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 my-10 md:my-12">
      <hr className="flex-1 border-encre/15" />
      <h2 className="font-fraunces font-bold text-encre text-[22px] md:text-[26px] whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
        {children}
      </h2>
      <hr className="flex-1 border-encre/15" />
    </div>
  )
}

function CategoryCard({ label, colors }: { label: string; colors: string[] }) {
  return (
    <a
      href="#univers"
      className="group flex flex-col items-center gap-3 cursor-pointer"
      aria-label={`Catégorie : ${label}`}
    >
      <div
        className="w-full overflow-hidden"
        style={{ borderRadius: 16, aspectRatio: '1/1' }}
      >
        {/* À remplacer : <img src={`/images/cat-${label.toLowerCase().replace(/\s+/g,'-')}.webp`} alt={label} width="220" height="220" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover'}} /> */}
        <div
          className="w-full h-full transition-transform duration-300 ease-out group-hover:scale-105 flex items-end justify-center"
          style={{ background: `linear-gradient(145deg,${colors[0]} 0%,${colors[1]} 100%)` }}
          aria-hidden="true"
        >
          <span className="font-caveat text-encre/25 text-xs pb-2 text-center px-1">{label}</span>
        </div>
      </div>
      <p className="font-mulish text-[14px] font-semibold text-encre text-center group-hover:text-pierre transition-colors duration-200">
        {label}
      </p>
    </a>
  )
}

export function Categories() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="univers"
      ref={ref}
      className="px-8 md:px-10 pb-12"
      aria-label="Nos univers"
    >
      <SectionTitle>Nos univers</SectionTitle>

      {/* 5 cartes — scroll horizontal sur mobile */}
      <div className="flex gap-5 overflow-x-auto md:grid md:grid-cols-5 md:overflow-visible pb-3 md:pb-0 snap-x snap-mandatory md:snap-none">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.label}
            className="shrink-0 w-[46vw] sm:w-[38vw] md:w-auto snap-start"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <CategoryCard {...cat} />
          </motion.div>
        ))}
      </div>

      {/* Bouton CTA centré */}
      <motion.div
        className="flex justify-center mt-8"
        initial={prefersReduced ? false : { opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <a
          href="#univers"
          className="px-7 py-3.5 rounded-full bg-encre text-creme font-mulish font-semibold text-[14px] hover:bg-encre/85 transition-colors duration-200 cursor-pointer"
        >
          Voir tous les univers
        </a>
      </motion.div>
    </section>
  )
}
