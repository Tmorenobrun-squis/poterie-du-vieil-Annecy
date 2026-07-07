import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'La boutique', to: '/boutique' },
  { label: 'Nos univers', to: '/univers' },
  { label: 'Les créateurs', to: '/createurs' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Nous trouver', to: '/contact' },
  { label: 'Commander', to: '/commander' },
]

const DESCRIPTIONS = ['Maître Artisan Potier', 'Groupement de créateurs', 'Objets de décoration']

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mulish text-[10.5px] font-semibold tracking-[1.4px] uppercase text-or/80 mb-5">
      {children}
    </p>
  )
}

export function Footer() {
  return (
    <footer className="bg-encre text-sable" aria-label="Pied de page">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 pt-16 pb-8">

        {/* Identité marque */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-10 border-b" style={{ borderColor: 'rgba(203,180,142,0.18)' }}>
          <div className="flex items-center gap-5">
            <div>
              <div
                className="font-fraunces font-semibold text-sable leading-[1.15]"
                style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.55rem)', letterSpacing: '0.12em' }}
              >
                La Poterie
                <span className="block text-or">du Vieil Annecy</span>
              </div>
              <div className="flex flex-col gap-0.5 mt-2">
                {DESCRIPTIONS.map(d => (
                  <span key={d} className="font-mulish text-[12px] text-sable/50 leading-snug">{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact rapide */}
          <address className="not-italic flex flex-col gap-1.5 sm:text-right">
            <a href="tel:+33677331358" className="font-mulish text-[13.5px] text-sable/70 hover:text-or transition-colors duration-200">
              +33(0)6 77 33 13 58
            </a>
            <a href="mailto:poterie-vieil-annecy@orange.fr" className="font-mulish text-[13.5px] text-sable/70 hover:text-or transition-colors duration-200">
              poterie-vieil-annecy@orange.fr
            </a>
            <a
              href="https://maps.google.com/?q=15+rue+Sainte-Claire+74000+Annecy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mulish text-[13.5px] text-sable/70 hover:text-or transition-colors duration-200"
            >
              15 rue Sainte-Claire · 74000 Annecy
            </a>
          </address>
        </div>

        {/* Grille liens */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10">

          <div>
            <SectionLabel>Navigation</SectionLabel>
            <nav aria-label="Navigation principale pied de page" className="flex flex-col gap-2.5">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-mulish text-[14px] text-sable/70 hover:text-or transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <SectionLabel>Horaires</SectionLabel>
            <p className="font-mulish text-[14px] text-sable/70 leading-relaxed">
              Lun – Sam<br />
              10h – 19h<br />
              <span className="text-sable/40 text-[12.5px]">Entrée libre · sous les arcades</span>
            </p>
          </div>

          <div>
            <SectionLabel>Informations</SectionLabel>
            <nav aria-label="Liens légaux" className="flex flex-col gap-2.5">
              <Link to="/mentions-legales" className="font-mulish text-[14px] text-sable/70 hover:text-or transition-colors duration-200">
                Mentions légales
              </Link>
              <Link to="/confidentialite" className="font-mulish text-[14px] text-sable/70 hover:text-or transition-colors duration-200">
                Confidentialité
              </Link>
              <a
                href="https://www.instagram.com/la_poterie_du_vieil_annecy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @la_poterie_du_vieil_annecy"
                className="font-mulish text-[14px] text-sable/70 hover:text-or transition-colors duration-200"
              >
                @la_poterie_du_vieil_annecy
              </a>
            </nav>
          </div>
        </div>

        {/* Barre copyright */}
        <div
          className="border-t mt-12 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ borderColor: 'rgba(203,180,142,0.12)' }}
        >
          <span className="font-mulish text-[12px] text-sable/35">
            © {new Date().getFullYear()} La Poterie du Vieil Annecy. Tous droits réservés.
          </span>
          <span className="font-mulish text-[12px] text-sable/35">
            Conception Titouan Moreno-Brun
          </span>
        </div>
      </div>
    </footer>
  )
}
