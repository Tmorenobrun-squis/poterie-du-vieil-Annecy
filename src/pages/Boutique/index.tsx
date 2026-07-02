import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'
import { ParallaxImage } from '../../components/ui/ParallaxImage'
import { ProductBounceCard } from '../../components/ui/ProductBounceCard'

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="relative pt-[100px] md:pt-[120px] pb-14 md:pb-16 px-5 md:px-8"
      style={{ background: 'linear-gradient(160deg, #EDE4D3 0%, #FAF6EF 100%)' }}
    >
      <div className="max-w-[1240px] mx-auto">
        <motion.h1
          className="font-fraunces font-black text-encre leading-tight mb-4"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="font-mulish text-[16px] text-pierre leading-relaxed max-w-[520px]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  )
}

const INTERIOR_PHOTOS = [
  { label: "Tasses en céramique dans la vitrine", src: '/images/interieur-1.jpg' },
  { label: "Étagères de la boutique", src: '/images/interieur-2.jpg' },
  { label: "Outils et pièces de poterie", src: '/images/interieur-3.jpg' },
  { label: "Pichet blanc en céramique", src: '/images/interieur-4.jpg' },
  { label: "Artisan façonnant une pièce", src: '/images/interieur-5.jpg' },
  { label: "Bols blancs en céramique", src: '/images/interieur-6.jpg' },
]

export default function BoutiquePage() {
  useMeta(
    'La boutique — La Poterie du Vieil Annecy',
    'Découvrez notre boutique d\'artisanat sous les arcades médiévales du vieil Annecy. Un lieu chaleureux, un collectif de créateurs locaux.',
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <PageHero
        title="La boutique"
        subtitle="Un lieu unique sous les arcades médiévales de la rue Sainte-Claire, à Annecy."
      />

      {/* Le lieu */}
      <section className="bg-sable" aria-label="Le lieu">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="flex flex-col gap-5">
              <SectionReveal>
                <span className="font-caveat text-terracotta text-[18px]">L'adresse</span>
              </SectionReveal>
              <SectionReveal delay={0.08}>
                <h2 className="font-fraunces font-bold text-encre leading-tight" style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)', letterSpacing: '-0.025em' }}>
                  Sous les arcades du vieil Annecy, depuis le premier jour
                </h2>
              </SectionReveal>
              <SectionReveal delay={0.15}>
                <p className="font-mulish text-[15px] text-pierre leading-relaxed">
                  Nichée au 15 rue Sainte-Claire, notre boutique occupe l'une des arcades les plus
                  emblématiques du cœur historique d'Annecy. Les pavés de la rue, les reflets du
                  canal tout proche, la lumière filtrant sous les voûtes — tout concourt à créer
                  une atmosphère unique, propice à la découverte et à la flânerie.
                </p>
              </SectionReveal>
              <SectionReveal delay={0.22}>
                <p className="font-mulish text-[15px] text-pierre leading-relaxed">
                  Nous avons voulu une boutique ouverte : pas de barrières, pas de vitrines fermées.
                  Vous pouvez toucher, prendre, poser, revenir. Nos créateurs souhaitent que leurs
                  pièces soient vécues, pas seulement regardées.
                </p>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.1} variant="clip">
              <div className="rounded-[24px] overflow-hidden" style={{ aspectRatio: '4/5' }}>
                <ParallaxImage
                  src="/images/boutique-devanture.jpg"
                  alt="Artisan potier au tour, façonnant une pièce de céramique"
                  width={800}
                  height={1000}
                  travel={55}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Photos intérieures */}
      <section className="bg-argile" aria-label="Galerie intérieure">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
          <SectionReveal>
            <div className="text-center mb-10">
              <span className="font-caveat text-terracotta text-[20px] block mb-1">en images</span>
              <h2 className="font-fraunces font-bold text-encre text-[22px] md:text-[28px]" style={{ letterSpacing: '-0.02em' }}>
                L'ambiance de la boutique
              </h2>
            </div>
          </SectionReveal>

          {/* Grille 3 colonnes — aspect-[4/3] uniforme */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {INTERIOR_PHOTOS.map((photo, i) => (
              <SectionReveal key={photo.label} delay={i * 0.06} variant="clip">
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <ParallaxImage
                    src={photo.src}
                    alt={photo.label}
                    width={800}
                    height={600}
                    travel={24}
                  />
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Bande de produits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 md:mt-5">
            {[
              { src: '/images/shot-1.jpg', alt: 'Céramiques vertes — collection boutique' },
              { src: '/images/shot-3.jpg', alt: 'Assiettes jaunes et bouquet feutrine' },
              { src: '/images/shot-10.jpg', alt: 'Service rouge tradition savoyard' },
              { src: '/images/shot-8.jpg', alt: 'Assiettes illustrées animaux des Alpes' },
            ].map((p, i) => (
              <SectionReveal key={p.src} delay={0.1 + i * 0.06} variant="blur">
                <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
                  <img src={p.src} alt={p.alt} loading="lazy" className="w-full h-full object-cover" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Le collectif */}
      <section className="bg-sable" aria-label="Le collectif de créateurs">
        <div className="relative max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">

          {/* Contenu centré */}
          <div className="max-w-[700px] mx-auto text-center flex flex-col gap-6 items-center">
            <SectionReveal>
              <span className="font-caveat text-terracotta text-[18px]">Notre modèle</span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-fraunces font-bold text-encre leading-tight" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', letterSpacing: '-0.025em' }}>
                Un collectif de créateurs, pas une boutique ordinaire
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.18}>
              <p className="font-mulish text-[15px] text-pierre leading-relaxed">
                La Poterie du Vieil Annecy fonctionne comme un collectif : plusieurs créateurs
                y exposent et vendent leurs œuvres en direct. Pas d'intermédiaire, pas de copie
                industrielle. Chaque pièce que vous achetez va directement soutenir l'artisan
                qui l'a créée, de ses mains, dans son atelier savoyard.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.25}>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <Link
                  to="/createurs"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[14px] hover:bg-terracotta/85 transition-colors duration-200"
                >
                  Rencontrer les créateurs
                </Link>
                <Link
                  to="/univers"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-encre/20 text-encre font-mulish font-semibold text-[14px] hover:bg-argile transition-colors duration-200"
                >
                  Nos univers
                </Link>
              </div>
            </SectionReveal>
          </div>

        </div>
      </section>
    </motion.div>
  )
}
