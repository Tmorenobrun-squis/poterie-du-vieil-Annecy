import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

/* Remplacer ces données par les vrais créateurs */
const CREATEURS = [
  {
    nom: 'Prénom NOM',
    specialite: 'Poterie & céramique',
    bio: 'Description courte du créateur, son parcours et sa spécialité. À personnaliser.',
    colors: ['#EDE4D3', '#CBB48E'],
  },
  {
    nom: 'Prénom NOM',
    specialite: 'Art de la table',
    bio: 'Description courte du créateur, son parcours et sa spécialité. À personnaliser.',
    colors: ['#CBB48E', '#8C9A82'],
  },
  {
    nom: 'Prénom NOM',
    specialite: 'Bijoux & accessoires',
    bio: 'Description courte du créateur, son parcours et sa spécialité. À personnaliser.',
    colors: ['#8C9A82', '#2B3B4A'],
  },
  {
    nom: 'Prénom NOM',
    specialite: 'Déco de montagne',
    bio: 'Description courte du créateur, son parcours et sa spécialité. À personnaliser.',
    colors: ['#2B3B4A', '#EDE4D3'],
  },
  {
    nom: 'Prénom NOM',
    specialite: 'Affiches & illustrations',
    bio: 'Description courte du créateur, son parcours et sa spécialité. À personnaliser.',
    colors: ['#EDE4D3', '#7C746A'],
  },
  {
    nom: 'Prénom NOM',
    specialite: 'Doudous & enfants',
    bio: 'Description courte du créateur, son parcours et sa spécialité. À personnaliser.',
    colors: ['#8C9A82', '#A23A2E'],
  },
]

function CreateurCard({ createur, index }: { createur: typeof CREATEURS[0]; index: number }) {
  return (
    <SectionReveal delay={index * 0.08}>
      <article className="flex flex-col items-center text-center gap-4">
        {/* Photo ronde placeholder */}
        {/* Photo finale : /public/images/createur-{nom-slug}.webp — format carré, fond neutre */}
        <div
          className="rounded-full overflow-hidden border-2 border-argile shrink-0"
          style={{ width: 120, height: 120 }}
          aria-label={`Portrait de ${createur.nom}`}
        >
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(145deg, ${createur.colors[0]} 0%, ${createur.colors[1]} 100%)` }}
            aria-hidden="true"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(46,42,36,0.25)" strokeWidth="1.2" strokeLinecap="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="font-fraunces font-bold text-encre text-[16px] leading-snug mb-0.5" style={{ letterSpacing: '-0.01em' }}>
            {createur.nom}
          </h3>
          <p className="font-mulish text-[12px] text-terracotta font-semibold uppercase tracking-wide mb-2">
            {createur.specialite}
          </p>
          <p className="font-mulish text-[13px] text-pierre leading-relaxed max-w-[220px]">
            {createur.bio}
          </p>
        </div>
      </article>
    </SectionReveal>
  )
}

export default function CreateursPage() {
  useMeta(
    'Les créateurs — La Poterie du Vieil Annecy',
    'Découvrez les artisans et créateurs qui exposent à La Poterie du Vieil Annecy : potiers, bijoutiers, illustrateurs et artisans savoyards.',
  )

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
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.03em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            Les créateurs
          </motion.h1>
          <motion.p
            className="font-mulish text-[16px] text-pierre leading-relaxed max-w-[520px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Derrière chaque pièce, un visage, un atelier, une histoire. Voici les artisans de notre collectif.
          </motion.p>
        </div>
      </div>

      {/* Storytelling */}
      <section className="bg-sable" aria-label="Notre collectif">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-14 md:py-16">
          <SectionReveal>
            <p className="font-mulish text-[15.5px] text-pierre leading-relaxed mb-5">
              Notre boutique ne vend pas des objets génériques. Elle donne une vitrine à des femmes
              et des hommes qui ont choisi de vivre de leur art, au cœur des Alpes. Chacun travaille
              dans son atelier, avec ses matières premières, ses outils, ses gestes à lui.
            </p>
            <p className="font-mulish text-[15.5px] text-pierre leading-relaxed">
              Certains sont potiers depuis vingt ans, d'autres ont tout quitté pour apprendre le tour.
              Certains illustrent Annecy depuis leur fenêtre, d'autres fabriquent des bijoux avec les
              pierres des torrents. Tous partagent une même conviction : la beauté du fait main mérite
              d'être transmise.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Grille créateurs */}
      <section className="bg-argile" aria-label="Nos créateurs">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-16 md:py-20">
          <SectionReveal>
            <div className="flex items-center gap-4 mb-12">
              <hr className="flex-1 border-pierre/15" />
              <h2 className="font-fraunces font-bold text-encre text-[20px] md:text-[24px] whitespace-nowrap" style={{ letterSpacing: '-0.02em' }}>
                Notre collectif
              </h2>
              <hr className="flex-1 border-pierre/15" />
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
            {CREATEURS.map((createur, i) => (
              <CreateurCard key={`${createur.nom}-${i}`} createur={createur} index={i} />
            ))}
          </div>

          <SectionReveal delay={0.3}>
            <p className="text-center mt-14 font-mulish text-[13px] text-pierre/60 italic">
              * Les noms et photos des créateurs sont des placeholders. À remplacer avec les vrais artisans.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Rejoindre */}
      <section className="bg-sable border-t border-pierre/10" aria-label="Rejoindre le collectif">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-16 text-center">
          <SectionReveal>
            <h2 className="font-fraunces font-bold text-encre text-[20px] md:text-[24px] mb-3" style={{ letterSpacing: '-0.02em' }}>
              Vous êtes créateur ?
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="font-mulish text-[14.5px] text-pierre leading-relaxed max-w-[480px] mx-auto mb-6">
              Notre collectif accueille régulièrement de nouveaux artisans. Si vous partagez notre
              amour du beau geste, venez nous parler lors de votre prochaine visite.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.18}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[14px] hover:bg-terracotta/85 transition-colors duration-200"
            >
              Nous contacter
            </Link>
          </SectionReveal>
        </div>
      </section>
    </motion.div>
  )
}
