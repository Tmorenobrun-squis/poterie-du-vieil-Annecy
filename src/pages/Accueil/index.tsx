import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'
import { ParallaxImage } from '../../components/ui/ParallaxImage'
import { TiltCard } from '../../components/ui/TiltCard'
import { CroixDeSavoie, WaveDivider } from '../../components/ui/SavoieElements'

/* ─── Meta ─── */
function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

/* ─── Icônes atouts ─── */
function IconUnique() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
function IconCreateurs() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}
function IconTradition() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function IconEntree() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

const ATOUTS = [
  { icon: <IconUnique />, label: 'Pièces uniques', desc: 'Chaque objet est fait main, jamais deux identiques.' },
  { icon: <IconCreateurs />, label: 'Créateurs locaux', desc: 'Un collectif de talents de Savoie et des Alpes.' },
  { icon: <IconTradition />, label: 'Tradition savoyarde', desc: "Savoir-faire ancestral, glaçures naturelles, motifs d'ici." },
  { icon: <IconEntree />, label: 'Entrée libre', desc: 'Venez flâner, toucher, découvrir, sans engagement.' },
]

const UNIVERS_PREVIEW = [
  {
    label: 'Poterie savoyarde',
    desc: 'Bols, assiettes et vases aux glaçures naturelles, tournés à la main.',
    img: '/images/univers-poterie.jpg',
  },
  {
    label: 'Art de la table',
    desc: 'Tasses, carafes et accessoires pour sublimer chaque repas.',
    img: '/images/univers-art-de-la-table.jpg',
  },
  {
    label: 'Déco de montagne',
    desc: 'Objets et sculptures inspirés des paysages alpins.',
    img: '/images/univers-deco-montagne.jpg',
  },
]

/* ─── Composant Hero ─── */
function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Présentation de la boutique"
    >
      {/* Photo de fond */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/Hero3.png"
          alt="Intérieur de la boutique — étagères garnies de céramiques et poteries artisanales"
          width="1920"
          height="1080"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dégradé desktop : crème de gauche à droite */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(250,246,239,0.86) 0%, rgba(250,246,239,0.80) 36%, rgba(250,246,239,0.52) 50%, rgba(250,246,239,0.12) 60%, transparent 100%)',
          }}
        />
        {/* Dégradé mobile : crème du bas vers le haut */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to top, rgba(250,246,239,0.98) 0%, rgba(250,246,239,0.94) 35%, rgba(250,246,239,0.7) 58%, rgba(250,246,239,0.18) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* Contenu */}
      <div
        className="relative z-10 h-full flex flex-col justify-end md:justify-between gap-4 md:gap-0 px-5 md:pl-16 lg:pl-20 md:pr-12 pt-[88px] pb-10 w-full md:max-w-[47%]"
      >

        {/* 1 — Badge (desktop uniquement) */}
        <motion.div
          className="hidden md:inline-flex items-center gap-2 bg-sable/70 border border-encre/12 rounded-full px-3.5 py-1.5 self-start"
          initial={prefersReduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          <CroixDeSavoie size={15} />
          <span className="font-mulish text-[11px] font-bold text-encre/80 tracking-widest uppercase">
            Haute-Savoie · Annecy
          </span>
        </motion.div>

        {/* 2 — Accroche Caveat */}
        <motion.span
          className="font-caveat text-terracotta leading-tight block"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)' }}
          initial={prefersReduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.55 }}
        >
          Sous les arcades du vieil Annecy
        </motion.span>

        {/* 3 — Titre principal */}
        <motion.h1
          className="font-fraunces text-encre leading-[1.06]"
          style={{ fontSize: 'clamp(2.4rem, 7vw, 4.8rem)', letterSpacing: '-0.01em' }}
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6 }}
        >
          L'artisanat savoyard
          <br />
          <em
            className="not-italic text-terracotta"
            style={{ fontSize: 'clamp(2.8rem, 8.5vw, 5.8rem)' }}
          >
            à portée de main
          </em>
        </motion.h1>

        {/* 4 — Description (masquée sur mobile) */}
        <motion.p
          className="hidden sm:block font-mulish text-encre/70 leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 1.3vw, 1.2rem)' }}
          initial={prefersReduced ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
        >
          Poteries, bijoux, décorations, illustrations — tout est créé
          par des artisans locaux. Boutique vitrine, entrée libre,
          15&nbsp;rue Sainte-Claire.
        </motion.p>

        {/* 5 — CTAs */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.5 }}
        >
          <Link
            to="/boutique"
            className="inline-flex items-center px-6 py-3.5 md:px-7 md:py-4 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[15px] hover:bg-terracotta/85 transition-colors duration-200 shadow-[0_6px_18px_-6px_rgba(162,58,46,0.5)]"
          >
            Découvrir la boutique
          </Link>
          <Link
            to="/univers"
            className="inline-flex items-center px-6 py-3.5 md:px-7 md:py-4 rounded-full border border-encre/25 text-encre font-mulish font-semibold text-[15px] hover:bg-encre/5 transition-colors duration-200"
          >
            Nos univers
          </Link>
        </motion.div>

        {/* 6 — Tagline (masquée sur mobile) */}
        <motion.div
          className="hidden sm:flex items-center gap-3"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <span className="h-px w-8 bg-pierre/30" />
          <span className="font-mulish text-[13px] text-pierre/55 tracking-widest uppercase">
            Poterie · Bijoux · Art de la table
          </span>
        </motion.div>

      </div>

      {/* Flèche scroll */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 md:left-[26%] z-10"
        animate={prefersReduced ? {} : { y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(46,42,36,0.35)" strokeWidth="1.5" strokeLinecap="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}

/* ─── Bandeau atouts ─── */
function BandeauAtouts() {
  return (
    <section className="bg-argile" aria-label="Nos atouts">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-pierre/10 rounded-2xl overflow-hidden">
          {ATOUTS.map((a) => (
            <div key={a.label} className="bg-argile px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-3 sm:gap-4">
              <div className="w-11 h-11 rounded-xl bg-terracotta flex items-center justify-center text-sable shrink-0">
                {a.icon}
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-encre text-[17px] leading-snug mb-1.5" style={{ letterSpacing: '-0.01em' }}>
                  {a.label}
                </h3>
                <p className="font-mulish text-[13px] text-pierre leading-relaxed">
                  {a.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Aperçu Nos univers ─── */
function UniversApercu() {
  return (
    <section className="bg-sable" aria-label="Aperçu de nos univers">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
        <SectionReveal>
          <div className="flex items-center gap-4 mb-12">
            <hr className="flex-1 border-pierre/15" />
            <h2 className="font-fraunces font-bold text-encre text-[22px] md:text-[28px] whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
              Nos univers
            </h2>
            <hr className="flex-1 border-pierre/15" />
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {UNIVERS_PREVIEW.map((u, i) => (
            <SectionReveal key={u.label} delay={i * 0.1} variant="blur">
              <TiltCard className="rounded-2xl">
                <Link
                  to="/univers"
                  className="group block overflow-hidden rounded-2xl cursor-pointer bg-sable"
                  aria-label={`Univers : ${u.label}`}
                >
                  <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <ParallaxImage
                      src={u.img}
                      alt={u.label}
                      width={800}
                      height={600}
                      travel={30}
                    />
                  </div>
                  <div className="pt-4 pb-4 px-3">
                    <h3 className="font-fraunces font-bold text-encre text-[17px] leading-snug mb-1.5 group-hover:text-terracotta transition-colors duration-200" style={{ letterSpacing: '-0.01em' }}>
                      {u.label}
                    </h3>
                    <p className="font-mulish text-[13.5px] text-pierre leading-relaxed">
                      {u.desc}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.35}>
          <div className="flex justify-center mt-10">
            <Link
              to="/univers"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-encre/20 text-encre font-mulish font-semibold text-[14px] hover:bg-argile hover:border-argile transition-all duration-200"
            >
              Voir tous nos univers
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}

/* ─── Atmosphère Vieil Annecy ─── */
function VieuxAnnecySection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: 500 }}
      aria-label="La boutique au cœur du vieil Annecy"
    >
      {/* Photo fond — mur en pierre de la vieille ville */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/annecy-vieille-ville.jpg"
          alt=""
          width="900"
          height="1200"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(46,42,36,0.93) 0%, rgba(46,42,36,0.78) 45%, rgba(46,42,36,0.55) 100%)',
          }}
        />
      </div>

      {/* Contenu */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-5 md:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Texte gauche */}
        <div className="flex flex-col gap-5">
          <SectionReveal>
            <div className="flex items-center gap-3">
              <CroixDeSavoie size={24} />
              <span className="font-caveat text-terracotta text-[19px] md:text-[21px]">
                15 rue Sainte-Claire
              </span>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2
              className="font-fraunces font-black text-sable leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 4.2vw, 3rem)', letterSpacing: '-0.03em' }}
            >
              Au cœur<br />du vieil Annecy
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="font-mulish text-[15px] md:text-[15.5px] leading-relaxed max-w-[460px]" style={{ color: 'rgba(250,248,243,0.68)' }}>
              Sous les arcades médiévales de la rue Sainte-Claire, à deux pas du canal du Thiou,
              la boutique est installée là où la vieille ville respire encore. Pavés anciens,
              voûtes en pierre, façades colorées — un cadre unique pour des créations qui lui ressemblent.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <div className="flex items-center gap-3 mt-1">
              <span className="h-px w-10 bg-sable/20" />
              <p
                className="font-fraunces italic text-[14px] md:text-[15px]"
                style={{ color: 'rgba(250,248,243,0.4)' }}
              >
                Venise des Alpes, capitale de la Savoie
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* Repères architecturaux droite */}
        <SectionReveal delay={0.15} variant="blur">
          <div className="flex flex-col gap-5 md:pl-6">
            {[
              {
                label: 'Arcades médiévales',
                desc: 'Rue Sainte-Claire — construites au XIVe siècle, cœur du commerce annécien',
              },
              {
                label: 'Canal du Thiou',
                desc: 'La "Venise des Alpes" à votre porte — façades colorées et reflets alpins',
              },
              {
                label: 'Château d\'Annecy',
                desc: 'Vue sur les Alpes depuis la boutique — massif des Aravis en toile de fond',
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="text-terracotta font-mulish font-bold text-[20px] leading-none mt-0.5 shrink-0">—</span>
                <div className="flex flex-col gap-0.5">
                  <p className="font-mulish font-semibold text-[14px]" style={{ color: 'rgba(250,248,243,0.82)' }}>
                    {item.label}
                  </p>
                  <p className="font-mulish text-[13px] leading-relaxed" style={{ color: 'rgba(250,248,243,0.42)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}

/* ─── Extrait Notre histoire ─── */
function HistoireExtrait() {
  return (
    <section className="bg-argile" aria-label="Notre histoire">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">

          <SectionReveal variant="clip">
            <div
              className="rounded-[28px] overflow-hidden w-full max-w-[400px] mx-auto md:mx-0"
              style={{ aspectRatio: '4/5' }}
            >
              <ParallaxImage
                src="/images/boutique-interieur.jpg"
                alt="Fleurs artisanales devant les murs en pierre du vieil Annecy"
                width={800}
                height={1000}
                travel={50}
              />
            </div>
          </SectionReveal>

          {/* Texte */}
          <div className="flex flex-col gap-6">
            <SectionReveal delay={0.1}>
              <span className="font-caveat text-terracotta text-[18px]">Notre histoire</span>
            </SectionReveal>
            <SectionReveal delay={0.18}>
              <h2 className="font-fraunces font-bold text-encre leading-tight" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', letterSpacing: '-0.025em' }}>
                Un lieu de vie sous<br />les arcades médiévales
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.25}>
              <p className="font-mulish text-[15px] text-pierre leading-relaxed">
                La Poterie du Vieil Annecy est née d'un rêve simple : rassembler sous les
                arcades de la rue Sainte-Claire les plus belles créations artisanales de Savoie
                et des Alpes. Un collectif de créateurs locaux — potiers, céramistes, bijoutiers,
                illustrateurs — réunis par la passion du beau geste.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.32}>
              <blockquote className="border-l-2 border-terracotta pl-4 font-fraunces italic text-[16px] text-encre/80 leading-snug">
                « Chaque pièce raconte une histoire, celle d'une main, d'un tour, d'un four. »
              </blockquote>
            </SectionReveal>
            <SectionReveal delay={0.38}>
              <Link
                to="/boutique"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[14px] hover:bg-terracotta/85 transition-colors duration-200 self-start"
              >
                En savoir plus
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Bandeau défilant ─── */
function MarqueeBand() {
  const prefersReduced = useReducedMotion()
  const items = ['Poterie savoyarde', 'Art de la table', 'Collectif de créateurs', 'Déco de montagne']

  return (
    <section aria-hidden="true" className="bg-bleu-orage text-sable overflow-hidden py-[14px]">
      <style>{`@keyframes pva-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: prefersReduced ? 'none' : 'pva-marquee 26s linear infinite',
        }}
      >
        {[0, 1].map(rep => (
          <div key={rep} style={{ display: 'flex', gap: 48, paddingRight: 48 }}>
            {items.map(item => (
              <span key={item} className="font-fraunces text-[21px] font-medium whitespace-nowrap tracking-[-0.01em]">
                {item}
                <span className="text-or mx-5" aria-hidden="true">✻</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Teaser créateurs ─── */
const CREATORS_TEASE = [
  { name: 'Camille Roy',   specialty: 'Céramiste',          colors: ['#EDE4D3', '#CBB48E'] as [string, string] },
  { name: 'Léa Fontaine', specialty: 'Bijoutière',          colors: ['#CBB48E', '#8C9A82'] as [string, string] },
  { name: 'Marius Blanc', specialty: 'Illustrateur',        colors: ['#8C9A82', '#2B3B4A'] as [string, string] },
  { name: 'Sasha Morel',  specialty: 'Textile & doudous',   colors: ['#2B3B4A', '#EDE4D3'] as [string, string] },
]

function CreateursTease() {
  return (
    <section className="bg-sable" aria-label="Le collectif de créateurs">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <SectionReveal>
              <span className="font-caveat text-terracotta text-[22px] block">le collectif</span>
            </SectionReveal>
            <SectionReveal delay={0.06}>
              <h2 className="font-fraunces font-semibold text-encre" style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.6rem)', letterSpacing: '-0.02em' }}>
                Des mains d'ici
              </h2>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.1}>
            <Link
              to="/createurs"
              className="font-mulish font-semibold text-terracotta text-[15px] border-b-2 border-terracotta pb-0.5 hover:opacity-75 transition-opacity duration-200"
            >
              Rencontrer les créateurs →
            </Link>
          </SectionReveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {CREATORS_TEASE.map((c, i) => (
            <SectionReveal key={c.name} delay={i * 0.07} variant="blur">
              <div className="text-center flex flex-col items-center">
                <div
                  className="w-[140px] h-[140px] rounded-full mb-5 border-4 overflow-hidden shadow-[0_4px_24px_-6px_rgba(33,29,24,0.14)]"
                  style={{ borderColor: `${c.colors[1]}50` }}
                  aria-label={`Portrait de ${c.name}`}
                >
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(145deg, ${c.colors[0]} 0%, ${c.colors[1]} 100%)` }}
                    aria-hidden="true"
                  >
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(46,42,36,0.22)" strokeWidth="1.2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-fraunces font-semibold text-encre text-[17px] mb-0.5">{c.name}</h3>
                <p className="font-mulish text-pierre text-[13px]">{c.specialty}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Bandeau CTA ─── */
function CtaBand() {
  return (
    <section className="bg-sable" aria-label="Commander une pièce">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 pb-20">
        <div className="bg-terracotta text-sable rounded-[22px] px-8 md:px-12 py-14 text-center relative overflow-hidden">
          {/* Décorations en arrière-plan */}
          <span aria-hidden="true" className="absolute top-6 left-8 font-caveat text-[80px] opacity-[0.07] select-none leading-none">✻</span>
          <span aria-hidden="true" className="absolute bottom-4 right-8 font-caveat text-[110px] opacity-[0.06] select-none leading-none">✻</span>
          <SectionReveal>
            <span className="font-caveat text-[24px] opacity-90 block mb-1">on vous attend</span>
          </SectionReveal>
          <SectionReveal delay={0.07}>
            <h2
              className="font-fraunces font-semibold leading-tight mb-4"
              style={{ fontSize: 'clamp(1.7rem, 3.6vw, 2.8rem)' }}
            >
              Une pièce vous fait de l'œil ?
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.12}>
            <p className="font-mulish text-[16.5px] opacity-92 max-w-[540px] mx-auto mb-7 leading-relaxed">
              Réservez-la en quelques clics : la commande est une simple demande, le règlement se fait en boutique au retrait.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.18}>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                to="/univers"
                className="bg-sable text-terracotta px-7 py-3.5 rounded-full font-mulish font-semibold text-[15px] hover:bg-sable/90 transition-colors duration-200"
              >
                Parcourir les univers
              </Link>
              <Link
                to="/commander"
                className="bg-transparent border-[1.5px] border-sable text-sable px-7 py-3.5 rounded-full font-mulish font-semibold text-[15px] hover:bg-sable/10 transition-colors duration-200"
              >
                Faire une demande
              </Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Bandeau "Nous rendre visite" ─── */
function VisiteBandeau() {
  return (
    <section className="bg-encre" aria-label="Nous rendre visite">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-4">
            <SectionReveal>
              <h2 className="font-fraunces font-bold text-sable leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                Venez nous rendre visite
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.08}>
              <ul className="flex flex-col gap-2 font-mulish text-[14px] text-sable/70">
                <li>15 rue Sainte-Claire, 74000 Annecy</li>
                <li>
                  <a href="tel:+33450519134" className="hover:text-terracotta transition-colors duration-200">
                    04 50 51 91 34
                  </a>
                </li>
                <li>Lun – Sam : 10h – 18h <span className="text-sable/40">[à confirmer]</span></li>
                <li className="text-terracotta font-semibold">Entrée libre</li>
              </ul>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.15}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[15px] hover:bg-terracotta/85 transition-colors duration-200 shrink-0"
            >
              Voir le plan
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function AccueilPage() {
  useMeta(
    'La Poterie du Vieil Annecy — Décoration & artisanat à Annecy',
    "Boutique de décoration, art de la table et créations d'artisans sous les arcades du vieil Annecy. 15 rue Sainte-Claire, 74000 Annecy. Entrée libre.",
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <HeroSection />
      <MarqueeBand />
      {/* argile */}
      <BandeauAtouts />
      <WaveDivider from="#EDE4D3" to="#FAF6EF" variant={1} />
      {/* sable */}
      <UniversApercu />
      <WaveDivider from="#FAF6EF" to="#211D18" variant={2} />
      {/* encre / photo */}
      <VieuxAnnecySection />
      <WaveDivider from="#181410" to="#EDE4D3" variant={0} />
      {/* argile */}
      <HistoireExtrait />
      <WaveDivider from="#EDE4D3" to="#FAF6EF" variant={0} />
      {/* sable */}
      <CreateursTease />
      <CtaBand />
      <WaveDivider from="#FAF6EF" to="#211D18" variant={1} />
      {/* encre */}
      <VisiteBandeau />
    </motion.div>
  )
}
