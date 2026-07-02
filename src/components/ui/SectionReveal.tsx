import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { TargetAndTransition, Transition } from 'framer-motion'

/*
 * SectionReveal variants:
 *   rise  (default) — 3D perspective tilt-up, like pottery emerging from a kiln
 *   clip            — clip-path wipe from bottom, for images
 *   blur            — scale + blur dissolve, for feature cards
 */

type Variant = 'rise' | 'clip' | 'blur'

interface SectionRevealProps {
  children: ReactNode
  delay?: number
  className?: string
  variant?: Variant
}

const CONFIGS: Record<Variant, {
  hidden: TargetAndTransition
  visible: TargetAndTransition
  transition: Transition
  perspective?: string
}> = {
  rise: {
    perspective: '700px',
    hidden: { opacity: 0, y: 58, rotateX: 13, scale: 0.97 },
    visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 },
    transition: {
      type: 'spring',
      damping: 22,
      stiffness: 75,
      mass: 0.9,
    },
  },
  clip: {
    hidden: { clipPath: 'inset(100% 0 0 0 round 10px)', opacity: 0.6 },
    visible: { clipPath: 'inset(0% 0 0% 0 round 0px)', opacity: 1 },
    transition: {
      duration: 0.72,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  blur: {
    hidden: { opacity: 0, scale: 0.88, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function SectionReveal({
  children,
  delay = 0,
  className = '',
  variant = 'rise',
}: SectionRevealProps) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-7% 0px' })

  const cfg = CONFIGS[variant]
  const isVisible = isInView

  const inner = (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      initial={prefersReduced ? false : cfg.hidden}
      animate={isVisible ? cfg.visible : (prefersReduced ? undefined : cfg.hidden)}
      transition={{ ...cfg.transition, delay }}
    >
      {children}
    </motion.div>
  )

  if (cfg.perspective) {
    return (
      <div style={{ perspective: cfg.perspective }}>
        {inner}
      </div>
    )
  }

  return inner
}
