import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function TiltCard({ children, className = '', intensity = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [shinePos, setShinePos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 300, damping: 26, mass: 0.7 })
  const rotateY = useSpring(rawY, { stiffness: 300, damping: 26, mass: 0.7 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width
    const ny = (e.clientY - r.top) / r.height
    rawX.set((ny - 0.5) * -intensity * 2)
    rawY.set((nx - 0.5) * intensity * 2)
    setShinePos({ x: nx * 100, y: ny * 100 })
  }

  function onLeave() {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={`relative will-change-transform ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.025, z: 10 }}
      transition={{ scale: { duration: 0.22, ease: 'easeOut' } }}
    >
      {children}

      {/* Specular shine following cursor */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] transition-opacity duration-200"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(circle at ${shinePos.x}% ${shinePos.y}%, rgba(255,255,255,0.18) 0%, transparent 58%)`,
        }}
      />

      {/* Terracotta edge glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-20 rounded-[inherit] transition-all duration-350"
        style={{
          opacity: hovered ? 1 : 0,
          boxShadow: '0 0 0 1px rgba(162,58,46,0.25), 0 24px 50px rgba(33,29,24,0.14)',
        }}
      />
    </motion.div>
  )
}
