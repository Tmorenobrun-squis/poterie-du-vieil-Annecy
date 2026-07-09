import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'La boutique', to: '/boutique' },
  { label: 'Nos univers', to: '/univers' },
  { label: 'Les créateurs', to: '/createurs' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Nous trouver', to: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location                  = useLocation()
  const prefersReduced            = useReducedMotion()
  const menuRef                   = useRef<HTMLDivElement>(null)
  const isHome                    = location.pathname === '/'

  useEffect(() => {
    let rafId: number
    function tick() {
      setScrolled(window.scrollY > 72)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  /* Reset on route change */
  useEffect(() => {
    setMenuOpen(false)
    setScrolled(window.scrollY > 72)
  }, [location.pathname])

  /* Escape closes mobile menu */
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const transparent = isHome && !scrolled

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50',
        'transition-[background-color,box-shadow] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        transparent
          ? 'bg-transparent'
          : 'bg-sable/96 backdrop-blur-sm shadow-[0_1px_0_0_rgba(33,29,24,0.08)]',
      ].join(' ')}
      role="banner"
    >
      {/*
        Gradient veil behind header text on hero images.
        Makes logo + nav readable over any photo without a solid background.
      */}
      {transparent && (
        <div
          className="absolute inset-0 -bottom-8 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(15,12,9,0.52) 0%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      )}

      <div className="relative max-w-[1240px] mx-auto px-5 md:px-8 flex items-center justify-between h-[74px]">

        {/* Logo */}
        <Link
          to="/"
          aria-label="La Poterie du Vieil Annecy — accueil"
          className="flex items-center gap-2.5 group shrink-0"
        >
          <span
            className={[
              'font-fraunces font-semibold text-[15px] leading-[1.15] transition-colors duration-300',
              transparent ? 'text-sable' : 'text-encre',
            ].join(' ')}
            style={{ letterSpacing: '0.1em' }}
          >
            La Poterie
            <span
              className={[
                'block text-[11px] font-normal transition-colors duration-300',
                transparent ? 'text-sable/70' : 'text-pierre',
              ].join(' ')}
              style={{ letterSpacing: '0.08em' }}
            >
              du Vieil Annecy
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={[
                'font-mulish text-[14px] font-semibold relative py-1 transition-colors duration-200',
                'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-terracotta after:transition-all after:duration-200 hover:after:w-full',
                transparent
                  ? 'text-sable/90 hover:text-sable'
                  : 'text-encre hover:text-terracotta',
                location.pathname === link.to
                  ? transparent
                    ? 'text-sable after:!w-full'
                    : 'text-terracotta after:!w-full'
                  : '',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA Formulaire desktop */}
        <Link
          to="/commander"
          className="hidden md:inline-flex items-center gap-2 px-5 py-[11px] rounded-full bg-terracotta text-sable font-mulish font-semibold text-[14px] hover:bg-terracotta/85 transition-all duration-200 shrink-0 shadow-[0_6px_16px_-8px_rgba(162,58,46,0.7)]"
          aria-label="Formulaire de commande"
        >
          Faire une demande
        </Link>

        {/* Burger mobile */}
        <button
          className={[
            'md:hidden p-2 rounded-lg transition-colors duration-200 cursor-pointer',
            transparent ? 'text-sable hover:bg-sable/10' : 'text-encre hover:bg-argile',
          ].join(' ')}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden bg-sable border-t border-or/30"
            aria-label="Navigation mobile"
          >
            <nav className="flex flex-col px-5 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    'font-fraunces font-medium text-[22px] py-3 border-b border-argile text-encre transition-colors duration-200',
                    location.pathname === link.to ? 'text-terracotta' : 'hover:text-terracotta',
                  ].join(' ')}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/commander"
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[16px] hover:bg-terracotta/85 transition-colors duration-200"
              >
                Faire une demande
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
