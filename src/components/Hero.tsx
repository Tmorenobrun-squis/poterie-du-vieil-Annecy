import { motion, useReducedMotion } from 'framer-motion'

/*
 * PHOTOS — Remplacer par les vraies photos de la boutique / artisans.
 * Photos finales à fournir par la boutique ou par un photographe pro.
 * Format recommandé : WebP, fond crème/naturel, éclairage doux.
 */

function InlineRoundPhoto() {
  return (
    <span
      className="inline-flex align-middle mx-1.5 rounded-full overflow-hidden border-2 border-bois/30"
      style={{ width: 52, height: 52, verticalAlign: 'middle', marginBottom: 4 }}
      aria-hidden="true"
    >
      <span
        className="flex items-center justify-center w-full h-full text-[9px] font-mulish text-pierre leading-tight text-center"
        style={{ background: 'linear-gradient(135deg,#EDE4D3 0%,#CBB48E 100%)' }}
      >
        photo
      </span>
    </span>
  )
}

function ArchPhoto() {
  return (
    <div
      className="w-full h-full flex items-end justify-center"
      style={{
        background: 'linear-gradient(160deg,#CBB48E 0%,#97A488 55%,#6E7B5E 100%)',
      }}
    >
      <span className="font-caveat text-creme/40 text-sm pb-6">
        Photo artisan — à remplacer
      </span>
    </div>
  )
}

function FloralDecor({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="180" height="240"
      viewBox="0 0 180 240"
      fill="none"
      aria-hidden="true"
    >
      <path d="M90 220 C88 175 92 130 85 90" stroke="#CBB48E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M85 135 C65 118 50 108 42 90" stroke="#CBB48E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      <path d="M87 110 C105 96 120 86 130 72" stroke="#CBB48E" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
      {[0,60,120,180,240,300].map((a) => (
        <ellipse key={a} cx="85" cy="76" rx="5" ry="11"
          fill="none" stroke="#CBB48E" strokeWidth="0.9" opacity="0.45"
          transform={`rotate(${a},85,90)`}
        />
      ))}
      <circle cx="85" cy="90" r="5" fill="none" stroke="#CBB48E" strokeWidth="1" opacity="0.5" />
      {[0,60,120,180,240,300].map((a) => (
        <ellipse key={a} cx="42" cy="72" rx="3.5" ry="8"
          fill="none" stroke="#97A488" strokeWidth="0.8" opacity="0.35"
          transform={`rotate(${a},42,82)`}
        />
      ))}
      <circle cx="42" cy="82" r="3.5" fill="none" stroke="#97A488" strokeWidth="0.9" opacity="0.4" />
      <path d="M87 155 C80 145 72 140 68 130" stroke="#97A488" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
      <path d="M88 155 C95 143 102 137 110 126" stroke="#97A488" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />
    </svg>
  )
}

const slideUp = (delay: number) => ({
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1, y: 0,
    transition: { delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
})

export function Hero() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-8 md:px-12 pt-10 pb-8 md:pt-14 md:pb-10"
      aria-label="Présentation de la boutique"
    >
      {/* Décos florales fond */}
      <FloralDecor className="absolute left-2 top-4 pointer-events-none select-none hidden md:block" />
      <FloralDecor className="absolute right-[39%] top-10 pointer-events-none select-none hidden lg:block opacity-40 scale-75 origin-top" />

      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">

        {/* COL GAUCHE */}
        <div className="flex flex-col gap-6">
          <h1
            className="font-fraunces font-black text-encre leading-[1.05]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', letterSpacing: '-0.03em' }}
          >
            <motion.span
              className="block"
              initial={prefersReduced ? false : 'hidden'}
              animate="show"
              variants={prefersReduced ? {} : slideUp(0)}
            >
              Découvrez le meilleur
            </motion.span>
            <motion.span
              className="flex items-center flex-wrap"
              initial={prefersReduced ? false : 'hidden'}
              animate="show"
              variants={prefersReduced ? {} : slideUp(0.12)}
            >
              <InlineRoundPhoto />
              de l'artisanat
            </motion.span>
            <motion.span
              className="block"
              initial={prefersReduced ? false : 'hidden'}
              animate="show"
              variants={prefersReduced ? {} : slideUp(0.24)}
            >
              savoyard
            </motion.span>
          </h1>

          <motion.p
            className="font-mulish text-[15px] leading-relaxed text-encre/70 max-w-sm"
            initial={prefersReduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Notre boutique est le reflet de notre amour pour la terre et le beau,{' '}
            <em className="not-italic font-semibold text-vert underline underline-offset-2 decoration-vert/50">
              inspiré par la montagne
            </em>
            {' '}et les saisons. Chaque pièce naît des mains de créateurs savoyards,
            de l'argile à l'émail, une à une.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <a
              href="#boutique"
              className="inline-flex items-center px-7 py-3.5 rounded-full bg-encre text-creme font-mulish font-semibold text-[14px] hover:bg-encre/85 transition-colors duration-200 cursor-pointer"
            >
              Découvrir
            </a>
          </motion.div>
        </div>

        {/* COL DROITE — arche photo */}
        <motion.div
          className="flex justify-center md:justify-end"
          initial={prefersReduced ? false : { opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Forme arche : border-radius top = 50%, bottom = flat */}
          <div
            className="relative overflow-hidden"
            style={{
              width: '100%',
              maxWidth: 390,
              aspectRatio: '3/4',
              borderRadius: '999px 999px 16px 16px',
            }}
          >
            {/* À remplacer : <img src="/images/artisan-arche.webp" alt="Artisan tenant une pièce de poterie" width="390" height="520" loading="eager" /> */}
            <ArchPhoto />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
