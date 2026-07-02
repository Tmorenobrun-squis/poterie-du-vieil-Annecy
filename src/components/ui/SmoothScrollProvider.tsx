import { useEffect } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'framer-motion'

// Module-level ref so scrollToTop() can reach Lenis without a React context
let _lenis: Lenis | null = null

export function scrollToTop() {
  if (_lenis) {
    _lenis.scrollTo(0, { immediate: true })
  } else {
    window.scrollTo(0, 0)
  }
}

interface Props {
  children: React.ReactNode
}

export function SmoothScrollProvider({ children }: Props) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 1.3,
    })

    _lenis = lenis

    let rafId = 0
    function tick(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
      _lenis = null
    }
  }, [prefersReduced])

  return <>{children}</>
}
