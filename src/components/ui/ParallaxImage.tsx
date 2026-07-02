import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/*
 * Image that drifts at ~60% of page scroll speed within its container.
 * The container must have overflow:hidden — this component handles the rest.
 * The image is rendered 20% taller than its slot; the motion shifts it
 * so the full range stays within the visible area.
 */

interface ParallaxImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  /** px shift range each side — default 40 (= 80px total travel) */
  travel?: number
}

export function ParallaxImage({
  src, alt, width, height, travel = 40,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-travel, travel])

  return (
    <div
      ref={ref}
      className="w-full h-full relative overflow-hidden"
      aria-hidden="false"
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        style={{
          y: prefersReduced ? 0 : y,
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: `calc(100% + ${travel * 2}px)`,
          top: `-${travel}px`,
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
