import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'

/* ─── Formulaire de contact Formspree ─── */
/*
 * Pour activer : créer un compte sur formspree.io, créer un formulaire,
 * puis remplacer "YOUR_FORM_ID" ci-dessous par votre vrai ID (ex: xpwzgkjd).
 */
const FORMSPREE_ID = 'YOUR_FORM_ID'

const SUJETS = [
  'Renseignement général',
  'Commande sur-mesure',
  'Demande de devis',
  'Devenir créateur',
  'Presse / média',
  'Autre',
]

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ nom: '', email: '', sujet: SUJETS[0], message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-sauge/20 border border-sauge/40 rounded-2xl p-8 text-center flex flex-col gap-3 items-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#8C9A82" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <p className="font-fraunces font-bold text-encre text-[18px]">Message envoyé !</p>
        <p className="font-mulish text-[14px] text-pierre">Nous vous répondrons dans les plus brefs délais.</p>
        <button
          onClick={() => { setStatus('idle'); setFormData({ nom: '', email: '', sujet: SUJETS[0], message: '' }) }}
          className="mt-2 font-mulish text-[13px] text-terracotta underline underline-offset-2 cursor-pointer"
        >
          Envoyer un autre message
        </button>
      </div>
    )
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-pierre/20 bg-sable font-mulish text-[14px] text-encre placeholder:text-pierre/50 focus:outline-none focus:ring-2 focus:ring-terracotta/40 transition-shadow duration-200"
  const labelClass = "font-mulish text-[12px] font-semibold text-encre uppercase tracking-wide"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-nom" className={labelClass}>Nom *</label>
          <input
            id="cf-nom" name="nom" type="text" required
            value={formData.nom} onChange={handleChange}
            placeholder="Marie Dupont"
            className={inputClass}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="cf-email" className={labelClass}>Email *</label>
          <input
            id="cf-email" name="email" type="email" required
            value={formData.email} onChange={handleChange}
            placeholder="marie@exemple.fr"
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-sujet" className={labelClass}>Sujet</label>
        <select
          id="cf-sujet" name="sujet"
          value={formData.sujet} onChange={handleChange}
          className={inputClass}
        >
          {SUJETS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="cf-message" className={labelClass}>Message *</label>
        <textarea
          id="cf-message" name="message" required
          value={formData.message} onChange={handleChange}
          placeholder="Décrivez votre demande (modèle, couleurs, délai, quantité…)"
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="font-mulish text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-terracotta text-sable font-mulish font-semibold text-[14px] hover:bg-terracotta/85 transition-colors duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed self-start"
      >
        {status === 'sending' ? (
          <>
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M21 12a9 9 0 11-6.219-8.56" />
            </svg>
            Envoi en cours…
          </>
        ) : (
          <>
            Envoyer le message
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </>
        )}
      </button>

      <p className="font-mulish text-[12px] text-pierre/60">
        * Champs obligatoires. Vos données ne seront jamais revendues ni utilisées à des fins commerciales.
      </p>
    </form>
  )
}

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92l-.08 2z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function DoorIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
      <polyline points="12 8 16 12 12 16" />
      <line x1="2" y1="12" x2="16" y2="12" />
    </svg>
  )
}

const HORAIRES = [
  { jour: 'Lundi', heures: '10h – 18h' },
  { jour: 'Mardi', heures: '10h – 18h' },
  { jour: 'Mercredi', heures: '10h – 18h' },
  { jour: 'Jeudi', heures: '10h – 18h' },
  { jour: 'Vendredi', heures: '10h – 18h' },
  { jour: 'Samedi', heures: '10h – 18h' },
  { jour: 'Dimanche', heures: 'Fermé' },
]

export default function ContactPage() {
  useMeta(
    'Nous trouver — La Poterie du Vieil Annecy',
    '15 rue Sainte-Claire, 74000 Annecy. Tél : 04 50 51 91 34. Ouvert lun–sam 10h–18h. Entrée libre.',
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
            Nous trouver
          </motion.h1>
          <motion.p
            className="font-mulish text-[16px] text-pierre leading-relaxed max-w-[480px]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
          >
            Au cœur du vieil Annecy, sous les arcades médiévales. Venez comme vous êtes.
          </motion.p>
        </div>
      </div>

      {/* Contenu principal : infos + carte */}
      <section className="bg-sable" aria-label="Coordonnées et carte">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Colonne infos */}
            <div className="flex flex-col gap-8">

              <SectionReveal>
                <div className="flex flex-col gap-4">
                  <h2 className="font-fraunces font-bold text-encre text-[20px]" style={{ letterSpacing: '-0.015em' }}>
                    Coordonnées
                  </h2>

                  <ul className="flex flex-col gap-4">
                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-terracotta shrink-0"><MapPinIcon /></span>
                      <div>
                        <p className="font-mulish font-semibold text-encre text-[14px]">Adresse</p>
                        <a
                          href="https://maps.google.com/?q=15+rue+Sainte-Claire+74000+Annecy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mulish text-[14px] text-pierre hover:text-terracotta transition-colors duration-200"
                          aria-label="15 rue Sainte-Claire, 74000 Annecy — ouvrir dans Google Maps"
                        >
                          15 rue Sainte-Claire<br />74000 Annecy
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-terracotta shrink-0"><PhoneIcon /></span>
                      <div>
                        <p className="font-mulish font-semibold text-encre text-[14px]">Téléphone</p>
                        <a
                          href="tel:+33450519134"
                          className="font-mulish text-[14px] text-pierre hover:text-terracotta transition-colors duration-200"
                        >
                          04 50 51 91 34
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-terracotta shrink-0"><InstagramIcon /></span>
                      <div>
                        <p className="font-mulish font-semibold text-encre text-[14px]">Instagram</p>
                        <a
                          href="https://www.instagram.com/la_poterie_du_vieil_annecy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mulish text-[14px] text-pierre hover:text-terracotta transition-colors duration-200"
                          aria-label="@la_poterie_du_vieil_annecy sur Instagram (ouvre un nouvel onglet)"
                        >
                          @la_poterie_du_vieil_annecy
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="mt-0.5 text-terracotta shrink-0"><DoorIcon /></span>
                      <div>
                        <p className="font-mulish font-semibold text-encre text-[14px]">Accès</p>
                        <p className="font-mulish text-[14px] text-terracotta font-semibold">Entrée libre — Pas de réservation nécessaire</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </SectionReveal>

              {/* Horaires */}
              <SectionReveal delay={0.1}>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-terracotta"><ClockIcon /></span>
                    <h2 className="font-fraunces font-bold text-encre text-[20px]" style={{ letterSpacing: '-0.015em' }}>
                      Horaires
                    </h2>
                  </div>
                  <div className="bg-argile rounded-2xl overflow-hidden">
                    {HORAIRES.map((h, i) => (
                      <div
                        key={h.jour}
                        className={[
                          'flex items-center justify-between px-4 py-2.5',
                          i < HORAIRES.length - 1 ? 'border-b border-pierre/10' : '',
                          h.heures === 'Fermé' ? 'opacity-50' : '',
                        ].join(' ')}
                      >
                        <span className="font-mulish text-[13.5px] text-encre font-semibold">{h.jour}</span>
                        <span className={`font-mulish text-[13.5px] ${h.heures === 'Fermé' ? 'text-pierre' : 'text-terracotta font-semibold'}`}>
                          {h.heures}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Colonne carte */}
            <SectionReveal delay={0.12}>
              <div className="flex flex-col gap-4">
                <h2 className="font-fraunces font-bold text-encre text-[20px]" style={{ letterSpacing: '-0.015em' }}>
                  Plan d'accès
                </h2>
                <div
                  className="rounded-2xl overflow-hidden border border-pierre/10"
                  style={{ aspectRatio: '4/3' }}
                >
                  <iframe
                    title="Carte Google Maps — La Poterie du Vieil Annecy, 15 rue Sainte-Claire"
                    src="https://maps.google.com/maps?q=15+rue+Sainte-Claire,+74000+Annecy,+France&output=embed&hl=fr&z=17"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    aria-label="Carte Google Maps montrant l'adresse de la boutique au 15 rue Sainte-Claire, 74000 Annecy"
                  />
                </div>
                <a
                  href="https://maps.google.com/?q=15+rue+Sainte-Claire+74000+Annecy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pierre hover:text-terracotta transition-colors duration-200 font-mulish text-[13px]"
                  aria-label="Ouvrir l'itinéraire dans Google Maps (nouvel onglet)"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Ouvrir dans Google Maps
                </a>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="bg-argile" aria-label="Formulaire de contact">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

            {/* Texte gauche */}
            <div className="flex flex-col gap-5">
              <SectionReveal>
                <span className="font-caveat text-terracotta text-[18px]">Écrivez-nous</span>
              </SectionReveal>
              <SectionReveal delay={0.08}>
                <h2 className="font-fraunces font-bold text-encre leading-tight" style={{ fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)', letterSpacing: '-0.025em' }}>
                  Une commande, une question, une idée ?
                </h2>
              </SectionReveal>
              <SectionReveal delay={0.15}>
                <p className="font-mulish text-[15px] text-pierre leading-relaxed">
                  Commandes sur-mesure, questions sur nos créateurs, pièces personnalisées,
                  partenariats — nous lisons chaque message avec attention et vous répondons
                  rapidement.
                </p>
              </SectionReveal>
              <SectionReveal delay={0.22}>
                <p className="font-mulish text-[14px] text-pierre leading-relaxed">
                  Vous pouvez aussi nous appeler directement au{' '}
                  <a href="tel:+33450519134" className="font-semibold text-terracotta hover:underline">
                    04 50 51 91 34
                  </a>
                  {' '}ou passer en boutique — l'entrée est libre.
                </p>
              </SectionReveal>
            </div>

            {/* Formulaire droite */}
            <SectionReveal delay={0.1}>
              <div className="bg-sable rounded-3xl p-6 md:p-8 shadow-sm border border-pierre/10">
                <ContactForm />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Bandeau comment venir */}
      <section className="bg-sable border-t border-pierre/10" aria-label="Comment venir">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 py-12 md:py-14">
          <SectionReveal>
            <h2 className="font-fraunces font-bold text-encre text-[18px] md:text-[20px] mb-6" style={{ letterSpacing: '-0.015em' }}>
              Comment nous rejoindre
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { mode: 'À pied', detail: 'La rue Sainte-Claire est au cœur de la vieille ville, piétonne. Depuis la gare d\'Annecy : 15 minutes à pied.' },
              { mode: 'En bus', detail: 'Arrêt Vieille Ville (lignes 1, 2, 4). 5 minutes à pied depuis l\'arrêt.' },
              { mode: 'En voiture', detail: 'Parking Courier ou parking de la gare. La rue Sainte-Claire est piétonne : accès à pied depuis le parking.' },
            ].map((item, i) => (
              <SectionReveal key={item.mode} delay={i * 0.08}>
                <div className="flex flex-col gap-2">
                  <h3 className="font-mulish font-bold text-encre text-[14px] tracking-wide uppercase">{item.mode}</h3>
                  <p className="font-mulish text-[13.5px] text-pierre leading-relaxed">{item.detail}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
