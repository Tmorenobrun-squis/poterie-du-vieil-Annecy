import { useState } from 'react'

const FOOTER_COLS = [
  {
    title: 'La boutique',
    links: [
      { label: 'Toutes les créations', href: '#univers' },
      { label: 'Nouveautés', href: '#univers' },
      { label: 'Coup de cœur', href: '#univers' },
    ],
  },
  {
    title: 'Découvrir',
    links: [
      { label: 'Notre histoire', href: '#histoire' },
      { label: 'Les créateurs', href: '#histoire' },
      { label: 'Ils en parlent', href: '#presse' },
    ],
  },
  {
    title: 'Infos pratiques',
    links: [
      { label: '15 rue Sainte-Claire, 74000 Annecy', href: 'https://maps.google.com/?q=15+rue+Sainte-Claire+74000+Annecy', external: true },
      { label: 'Lun–Sam : 10h–18h [à confirmer]', href: '#' },
      { label: '04 50 51 91 34', href: 'tel:+33450519134' },
    ],
  },
  {
    title: 'Suivez-nous',
    links: [
      { label: '@la_poterie_du_vieil_annecy', href: 'https://www.instagram.com/la_poterie_du_vieil_annecy', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/la_poterie_du_vieil_annecy', external: true },
    ],
  },
]

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      id="nous-trouver"
      className="bg-lin/60 border-t border-bois/20"
      aria-label="Pied de page"
    >
      {/* Corps footer */}
      <div className="px-8 md:px-10 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">

          {/* Newsletter */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <h3 className="font-fraunces font-bold text-encre text-[16px]" style={{ letterSpacing: '-0.01em' }}>
              Restez informé de nos nouveautés
            </h3>
            <p className="font-mulish text-[13px] text-pierre leading-snug">
              Recevez en avant-première nos arrivages et événements.
            </p>
            {submitted ? (
              <p className="font-mulish text-[13px] text-vert font-semibold">Merci ! À bientôt.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
                <label htmlFor="footer-email" className="sr-only">Votre adresse e-mail</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  required
                  className="px-4 py-2.5 rounded-full border border-bois/30 bg-creme font-mulish text-[13px] text-encre placeholder:text-pierre/50 focus:outline-none focus:ring-2 focus:ring-dore/40"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-encre text-creme font-mulish font-semibold text-[13px] hover:bg-encre/85 transition-colors duration-200 cursor-pointer self-start"
                >
                  Envoyer
                </button>
              </form>
            )}
          </div>

          {/* 4 colonnes liens */}
          {FOOTER_COLS.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <h4 className="font-mulish font-bold text-encre text-[13px] tracking-wide uppercase">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="font-mulish text-[13px] text-pierre hover:text-encre transition-colors duration-200 flex items-center gap-1.5"
                    >
                      {col.title === 'Suivez-nous' && link.label === 'Instagram' && (
                        <InstagramIcon />
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Barre bas */}
      <div className="border-t border-bois/20 px-8 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mulish text-[12px] text-pierre/70">
          Copyright ©2026 La Poterie du Vieil Annecy. Tous droits réservés.
        </p>
        <button
          onClick={scrollToTop}
          className="font-mulish text-[12px] text-pierre/70 hover:text-encre transition-colors duration-200 flex items-center gap-1 cursor-pointer"
          aria-label="Retour en haut de page"
        >
          Click To Go Top
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
