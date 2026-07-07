import { PoterieLogo } from './ui/PoterieLogo'

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
      { label: 'Lun–Sam : 10h–19h', href: '#' },
      { label: '+33(0)6 77 33 13 58', href: 'tel:+33677331358' },
      { label: 'poterie-vieil-annecy@orange.fr', href: 'mailto:poterie-vieil-annecy@orange.fr' },
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

          {/* Identité marque */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <PoterieLogo size={38} />
              <div className="flex flex-col">
                <span
                  className="font-fraunces font-semibold text-encre text-[10px] uppercase"
                  style={{ letterSpacing: '0.14em' }}
                >
                  La Poterie
                </span>
                <span
                  className="font-fraunces font-semibold text-encre text-[10px] uppercase"
                  style={{ letterSpacing: '0.14em' }}
                >
                  du Vieil Annecy
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-mulish text-[12px] text-pierre">Maître Artisan Potier</p>
              <p className="font-mulish text-[12px] text-pierre">Groupement de créateurs</p>
              <p className="font-mulish text-[12px] text-pierre">Objets de décoration</p>
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <a
                href="tel:+33677331358"
                className="font-mulish text-[12px] text-pierre hover:text-encre transition-colors duration-200"
              >
                +33(0)6 77 33 13 58
              </a>
              <a
                href="mailto:poterie-vieil-annecy@orange.fr"
                className="font-mulish text-[12px] text-pierre hover:text-encre transition-colors duration-200"
              >
                poterie-vieil-annecy@orange.fr
              </a>
              <a
                href="https://maps.google.com/?q=15+rue+Sainte-Claire+74000+Annecy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mulish text-[12px] text-pierre hover:text-encre transition-colors duration-200"
              >
                15 rue Sainte-Claire, 74000 Annecy
              </a>
            </div>
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
