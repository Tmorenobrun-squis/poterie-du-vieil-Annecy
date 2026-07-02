import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

/*
 * PHOTOS — 4 photos placeholder (arches). À remplacer par des photos pro.
 * Formats recommandés : WebP 400×480, ratio 5:6, fond neutre.
 */

const FEATURES = [
  {
    label: 'Unique',
    desc: 'Pièces uniques faites main, une par une, jamais deux identiques.',
    colors: ['#EDE4D3', '#CBB48E'],
  },
  {
    label: 'Sur-mesure',
    desc: 'Créations personnalisées imaginées avec nos artisans, à votre goût.',
    colors: ['#CBB48E', '#97A488'],
  },
  {
    label: 'Créateurs locaux',
    desc: 'Un collectif de talents de Savoie et des Alpes, réunis sous nos arcades.',
    colors: ['#97A488', '#6E7B5E'],
  },
  {
    label: 'Tradition savoyarde',
    desc: "Motifs à pois, glaçures naturelles : le savoir-faire d’ici, transmis avec fierté.",
    colors: ['#6E7B5E', '#CBB48E'],
  },
]

function ArchPlaceholder({ colors, label }: { colors: string[]; label: string }) {
  return (
    <div
      className="w-full flex items-end justify-center"
      style={{
        aspectRatio: '4/5',
        borderRadius: '999px 999px 10px 10px',
        background: `linear-gradient(175deg,${colors[0]} 0%,${colors[1]} 100%)`,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <span className="font-caveat text-encre/25 text-xs pb-3 text-center px-2">{label}</span>
    </div>
  )
}

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="boutique"
      ref={ref}
      className="px-8 md:px-10 py-12 md:py-16"
      aria-label="Nos atouts"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.label}
            className="flex flex-col gap-3"
            initial={prefersReduced ? false : { opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Image en arche */}
            {/* À remplacer : <img src={`/images/feature-${i+1}.webp`} alt={f.label} width="220" height="275" loading="lazy" style={{borderRadius:'999px 999px 10px 10px',aspectRatio:'4/5',objectFit:'cover'}} /> */}
            <ArchPlaceholder colors={f.colors} label={f.label} />

            {/* Label avec "+" doré */}
            <div className="flex items-start gap-1.5 mt-1">
              <span
                className="font-mulish font-bold text-[15px] shrink-0 mt-0.5"
                style={{ color: '#B08A3E' }}
                aria-hidden="true"
              >
                +
              </span>
              <div>
                <p className="font-mulish font-semibold text-[14px] text-encre leading-snug">
                  {f.label}
                </p>
                <p className="font-mulish text-[13px] text-pierre leading-snug mt-0.5">
                  {f.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
