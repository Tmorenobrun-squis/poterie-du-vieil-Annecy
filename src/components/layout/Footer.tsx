import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'La boutique', to: '/boutique' },
  { label: 'Nos univers', to: '/univers' },
  { label: 'Les créateurs', to: '/createurs' },
  { label: 'Galerie', to: '/galerie' },
  { label: 'Nous trouver', to: '/contact' },
  { label: 'Commander', to: '/commander' },
]

export function Footer() {
  return (
    <footer className="bg-encre text-sable" aria-label="Pied de page">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 pt-14 pb-8">

        {/* Grand nom */}
        <div
          className="font-fraunces font-semibold leading-none mb-9"
          style={{ fontSize: 'clamp(2.2rem, 7vw, 5.8rem)', letterSpacing: '-1px' }}
          aria-hidden="true"
        >
          La Poterie<br />
          <span className="text-or">du Vieil Annecy</span>
        </div>

        {/* Grille infos */}
        <div
          className="grid gap-8 border-t pt-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', borderColor: '#CBB48E40' }}
        >
          <div>
            <p className="text-or text-[12px] font-mulish font-semibold tracking-[0.8px] uppercase mb-2">
              La boutique
            </p>
            <p className="font-mulish text-[15px] opacity-90 leading-relaxed">
              15 rue Sainte-Claire · 74000 Annecy<br />
              Sous les arcades · entrée libre · lun–sam
            </p>
          </div>
          <div>
            <p className="text-or text-[12px] font-mulish font-semibold tracking-[0.8px] uppercase mb-2">
              Contact
            </p>
            <p className="font-mulish text-[15px] opacity-90 leading-relaxed">
              <a href="tel:+33450519134" className="hover:text-or transition-colors duration-200">
                04 50 51 91 34
              </a>
              <br />
              <a
                href="https://www.instagram.com/la_poterie_du_vieil_annecy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-or transition-colors duration-200"
                aria-label="Instagram @la_poterie_du_vieil_annecy (ouvre un nouvel onglet)"
              >
                @la_poterie_du_vieil_annecy
              </a>
            </p>
          </div>
          <div>
            <p className="text-or text-[12px] font-mulish font-semibold tracking-[0.8px] uppercase mb-2">
              Navigation
            </p>
            <nav aria-label="Liens de pied de page" className="flex flex-col gap-1.5">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="font-mulish text-[15px] opacity-90 hover:text-or hover:opacity-100 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="text-or text-[12px] font-mulish font-semibold tracking-[0.8px] uppercase mb-2">
              Informations
            </p>
            <nav aria-label="Liens légaux" className="flex flex-col gap-1.5">
              <Link
                to="/mentions-legales"
                className="font-mulish text-[15px] opacity-90 hover:text-or hover:opacity-100 transition-colors duration-200"
              >
                Mentions légales
              </Link>
              <Link
                to="/confidentialite"
                className="font-mulish text-[15px] opacity-90 hover:text-or hover:opacity-100 transition-colors duration-200"
              >
                Confidentialité
              </Link>
            </nav>
          </div>
        </div>

        {/* Barre bas */}
        <div
          className="border-t mt-8 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ borderColor: '#CBB48E40' }}
        >
          <span className="font-mulish text-[12.5px] opacity-60">
            © {new Date().getFullYear()} La Poterie du Vieil Annecy
          </span>
          <span className="font-mulish text-[12.5px] opacity-60">
            Site réalisé par Titouan Moreno-Brun
          </span>
        </div>
      </div>
    </footer>
  )
}
