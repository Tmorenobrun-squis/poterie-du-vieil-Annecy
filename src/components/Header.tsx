import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Nos univers', href: '#univers', hasDropdown: true },
  { label: 'La boutique', href: '#boutique' },
  { label: 'À propos', href: '#histoire' },
]

const UNIVERS_DROPDOWN = [
  { label: 'Art de la table', href: '#univers' },
  { label: 'Déco de montagne', href: '#univers' },
  { label: 'Poterie savoyarde', href: '#univers' },
  { label: 'Bijoux & accessoires', href: '#univers' },
  { label: 'Affiches & illustrations', href: '#univers' },
]

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="2 4 6 8 10 4" />
    </svg>
  )
}

/* Logo fleur SVG inline (edelweiss stylisé au trait) */
function LogoFlower() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <circle cx="15" cy="15" r="14" fill="#6E7B5E" />
      {[0,60,120,180,240,300].map((a) => (
        <ellipse
          key={a}
          cx="15" cy="8.5"
          rx="2.2" ry="4.5"
          fill="white"
          fillOpacity="0.85"
          transform={`rotate(${a},15,15)`}
        />
      ))}
      <circle cx="15" cy="15" r="3.5" fill="white" />
    </svg>
  )
}

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOut(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOut)
    return () => document.removeEventListener('mousedown', onClickOut)
  }, [])

  return (
    <header className="relative z-30">
      {/* Barre principale */}
      <div className="flex items-center justify-between px-8 md:px-10 h-[68px]">

        {/* NAV GAUCHE */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) =>
            item.hasDropdown ? (
              <div key={item.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 font-mulish text-[13px] font-semibold text-encre hover:text-pierre transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                  <motion.span
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: prefersReduced ? 0 : 0.2 }}
                    className="inline-block"
                  >
                    <ChevronDown />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={prefersReduced ? false : { opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-52 bg-creme border border-bois/20 rounded-2xl shadow-lg py-2 z-50"
                    >
                      {UNIVERS_DROPDOWN.map((u) => (
                        <a
                          key={u.label}
                          href={u.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2.5 font-mulish text-[13px] text-encre hover:bg-lin hover:text-encre transition-colors duration-150 cursor-pointer"
                        >
                          {u.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="font-mulish text-[13px] font-semibold text-encre hover:text-pierre transition-colors duration-200"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        {/* LOGO CENTRE */}
        <a
          href="#"
          aria-label="La Poterie du Vieil Annecy — retour en haut"
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group"
        >
          <LogoFlower />
          <span
            className="font-caveat text-[22px] font-semibold text-encre group-hover:text-vert transition-colors duration-200"
            style={{ letterSpacing: '-0.01em' }}
          >
            Poterie
          </span>
        </a>

        {/* ICÔNES DROITE */}
        <div className="hidden md:flex items-center gap-4 text-encre">
          <a
            href="#boutique"
            aria-label="La boutique (décoratif)"
            className="relative cursor-pointer hover:text-pierre transition-colors duration-200"
          >
            <CartIcon />
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-encre text-creme text-[9px] font-mulish font-bold flex items-center justify-center"
              aria-hidden="true"
            >
              0
            </span>
          </a>
          <a
            href="#histoire"
            aria-label="À propos"
            className="cursor-pointer hover:text-pierre transition-colors duration-200"
          >
            <UserIcon />
          </a>
        </div>

        {/* BURGER MOBILE */}
        <button
          className="md:hidden cursor-pointer p-2 rounded text-encre hover:bg-lin transition-colors duration-200"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
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

      {/* Filet bas */}
      <div className="border-b border-encre/10 mx-8 md:mx-10" />

      {/* MENU MOBILE */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden overflow-hidden border-b border-bois/20 bg-creme"
            aria-label="Navigation mobile"
          >
            <div className="flex flex-col px-8 py-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mulish font-semibold text-[16px] py-3 border-b border-lin text-encre hover:text-pierre transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
