import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'
import { ParallaxImage } from '../../components/ui/ParallaxImage'

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

/*
 * Photos finales : /public/images/galerie-{n}.webp — fournir par la boutique.
 * Format recommandé : WebP, largeur 800–1200px, compression qualité 80.
 */
const GALLERY_ITEMS = [
  { id: 1, src: '/images/galerie-1.jpg', alt: 'Bol, pichet et tasse en céramique verte avec branches de coton', ratio: '4/5' },
  { id: 2, src: '/images/galerie-2.jpg', alt: 'Assiettes et bols jaune soleil disposés sur une table fleurie', ratio: '3/4' },
  { id: 3, src: '/images/galerie-3.jpg', alt: 'Intérieur de la boutique — étagères garnies de céramiques et décorations', ratio: '1/1' },
  { id: 4, src: '/images/galerie-4.jpg', alt: 'Cruche en céramique bleue tenue devant les murs en pierre du vieil Annecy', ratio: '4/3' },
  { id: 5, src: '/images/galerie-5.jpg', alt: 'Assiettes en céramique blanche illustrées de motifs d\'animaux', ratio: '3/4' },
  { id: 6, src: '/images/galerie-6.jpg', alt: 'Collection de céramiques rouge intense — carafes, bols et assiettes', ratio: '1/1' },
  { id: 7, src: '/images/galerie-7.jpg', alt: 'Bol en céramique blanche avec pommes et poire sur table en marbre', ratio: '4/5' },
  { id: 8, src: '/images/galerie-8.jpg', alt: 'Poulette en céramique blanche à pois noirs', ratio: '3/2' },
  { id: 9, src: '/images/galerie-9.jpg', alt: 'Bouquet de roses en feutre rose dans un seau zinc, mur en pierre du vieil Annecy', ratio: '4/3' },
  { id: 10, src: '/images/galerie-10.jpg', alt: 'Mug blanc illustré d\'un téléphérique de montagne avec graminées séchées', ratio: '2/3' },
]

/* ─── Lightbox ─── */
interface LightboxProps {
  items: typeof GALLERY_ITEMS
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const prefersReduced = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const current = items[currentIndex]

  useEffect(() => {
    closeRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label={`Image ${currentIndex + 1} sur ${items.length} : ${current.alt}`}
        initial={prefersReduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Fond */}
        <div
          className="absolute inset-0 bg-encre/90 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Contenu */}
        <div className="relative z-10 w-full max-w-[900px] px-4 md:px-10 flex flex-col items-center gap-4">

          {/* Fermer */}
          <button
            ref={closeRef}
            onClick={onClose}
            className="absolute -top-2 right-4 md:right-10 z-20 w-10 h-10 rounded-full bg-sable/10 text-sable flex items-center justify-center hover:bg-sable/20 transition-colors duration-150 cursor-pointer"
            aria-label="Fermer la lightbox"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Image principale */}
          <motion.div
            key={currentIndex}
            className="w-full rounded-2xl overflow-hidden"
            style={{ maxHeight: '70vh' }}
            initial={prefersReduced ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            <img
              src={current.src}
              alt={current.alt}
              width="900"
              height="700"
              className="w-full object-contain"
              style={{ maxHeight: '70vh' }}
              loading="lazy"
            />
          </motion.div>

          {/* Légende + navigation */}
          <div className="flex items-center justify-between w-full">
            <button
              onClick={onPrev}
              disabled={currentIndex === 0}
              aria-label="Image précédente"
              className="w-10 h-10 rounded-full bg-sable/10 text-sable flex items-center justify-center hover:bg-sable/20 transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <p className="font-mulish text-sable/70 text-[13px] text-center px-4">
              {current.alt}
              <span className="block text-sable/40 text-[11px] mt-0.5">
                {currentIndex + 1} / {items.length}
              </span>
            </p>
            <button
              onClick={onNext}
              disabled={currentIndex === items.length - 1}
              aria-label="Image suivante"
              className="w-10 h-10 rounded-full bg-sable/10 text-sable flex items-center justify-center hover:bg-sable/20 transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Page ─── */
export default function GaleriePage() {
  useMeta(
    'Galerie — La Poterie du Vieil Annecy',
    'Galerie photos de la boutique La Poterie du Vieil Annecy : poteries, bijoux, décorations et ambiance de notre boutique sous les arcades d\'Annecy.',
  )

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i)), [])
  const nextImage = useCallback(() => setLightboxIndex((i) => (i !== null && i < GALLERY_ITEMS.length - 1 ? i + 1 : i)), [])

  /* Split items into 3 columns for masonry effect */
  const col1 = GALLERY_ITEMS.filter((_, i) => i % 3 === 0)
  const col2 = GALLERY_ITEMS.filter((_, i) => i % 3 === 1)
  const col3 = GALLERY_ITEMS.filter((_, i) => i % 3 === 2)

  function GalleryItem({ item }: { item: typeof GALLERY_ITEMS[0] }) {
    const index = GALLERY_ITEMS.findIndex((g) => g.id === item.id)
    return (
      <SectionReveal>
        <button
          onClick={() => openLightbox(index)}
          className="group block w-full rounded-2xl overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2"
          aria-label={`Ouvrir en grand : ${item.alt}`}
          style={{ marginBottom: 16 }}
        >
          <div className="w-full relative overflow-hidden" style={{ aspectRatio: item.ratio }}>
            <ParallaxImage
              src={item.src}
              alt={item.alt}
              width={800}
              height={800}
              travel={22}
            />
            {/* Overlay hover */}
            <div className="absolute inset-0 bg-encre/0 group-hover:bg-encre/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-10 h-10 rounded-full bg-sable/90 flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#211D18" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </SectionReveal>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* En-tête */}
      <div
        className="relative pt-[100px] md:pt-[120px] pb-14 px-5 md:px-8"
        style={{ background: 'linear-gradient(160deg, #EDE4D3 0%, #FAF6EF 100%)' }}
      >
        <div className="max-w-[1240px] mx-auto">
          <motion.h1
            className="font-fraunces font-black text-encre leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '0.06em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Galerie
          </motion.h1>
          <motion.p
            className="font-mulish text-[16px] text-pierre leading-relaxed max-w-[520px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Un aperçu de nos créations et de l'ambiance de la boutique. Cliquez pour agrandir.
          </motion.p>
        </div>
      </div>

      {/* Grille masonry */}
      <section className="bg-sable" aria-label="Galerie de photos">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-16">

          {/* 3 columns masonry — hidden on mobile, single column */}
          <div className="hidden md:grid md:grid-cols-3 gap-4" role="list">
            <div role="listitem">
              {col1.map((item) => <GalleryItem key={item.id} item={item} />)}
            </div>
            <div role="listitem" className="mt-8">
              {col2.map((item) => <GalleryItem key={item.id} item={item} />)}
            </div>
            <div role="listitem">
              {col3.map((item) => <GalleryItem key={item.id} item={item} />)}
              {/* Vidéo de la boutique */}
              <SectionReveal>
                <div style={{ marginBottom: 16 }}>
                  <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(46,42,36,0.12)]">
                    <video
                      className="w-full h-auto block"
                      src="/images/boutique-video.mov"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>

          {/* Mobile : 2-col grid */}
          <div className="grid grid-cols-2 gap-3 md:hidden" role="list">
            {GALLERY_ITEMS.map((item) => (
              <div key={item.id} role="listitem">
                <GalleryItem item={item} />
              </div>
            ))}
            {/* Vidéo de la boutique — mobile */}
            <div role="listitem" className="col-span-2">
              <SectionReveal>
                <div className="rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(46,42,36,0.12)]">
                  <video
                    className="w-full h-auto block"
                    src="/images/boutique-video.mov"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </motion.div>
  )
}
