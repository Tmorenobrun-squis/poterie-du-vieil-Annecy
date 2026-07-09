import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SectionReveal } from '../../components/ui/SectionReveal'

function useMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

interface FormState {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
  company: string
}

interface FormErrors {
  name?: boolean
  email?: boolean
  phone?: boolean
  consent?: boolean
}

function inp(invalid?: boolean) {
  return {
    className: [
      'w-full border rounded-xl px-4 py-3.5 bg-white font-mulish text-[15px] text-encre placeholder:text-pierre/50',
      'focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/60 transition-colors duration-200',
      invalid ? 'border-terracotta' : 'border-argile',
    ].join(' '),
  }
}

const REASSURANCES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    title: 'Réponse sous 24 h',
    desc: 'Isabelle vous rappelle personnellement.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Zéro paiement en ligne',
    desc: 'Règlement uniquement en boutique, en main propre.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    title: 'Pièces uniques',
    desc: 'Chaque objet est fait main, jamais deux identiques.',
  },
]

export default function CommanderPage() {
  useMeta(
    'Faire une demande — La Poterie du Vieil Annecy',
    'Contactez-nous pour vous renseigner sur nos créations artisanales. Réponse sous 24 h, règlement en boutique.',
  )

  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', message: '', consent: false, company: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function setField<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function validate(): FormErrors {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = true
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 9) e.phone = true
    if (!form.consent) e.consent = true
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.company) { setSubmitted(true); return } // honeypot
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      const first = (['name', 'email', 'phone'] as const).find(k => errs[k])
      if (first) document.getElementById(`f-${first}`)?.focus()
      return
    }
    // TODO(dev): POST to /api/order serverless endpoint (Resend / Web3Forms)
    setErrors({})
    setSubmitted(true)
    window.scrollTo(0, 0)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        className="pt-[100px] md:pt-[120px]"
      >
        <section className="max-w-[640px] mx-auto px-6 py-24 text-center">
          <div
            className="w-[72px] h-[72px] rounded-full flex items-center justify-center mx-auto mb-7"
            style={{ background: 'linear-gradient(135deg, #8C9A82 0%, #6a7d60 100%)' }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FAF6EF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className="font-caveat text-terracotta text-[22px] block mb-2">merci !</span>
          <h1 className="font-fraunces font-semibold text-encre leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}>
            Votre demande est bien envoyée.
          </h1>
          <p className="font-mulish text-[16.5px] text-pierre leading-relaxed mb-3 max-w-[420px] mx-auto">
            Isabelle vous recontacte sous <strong className="text-encre">24 heures</strong> pour vous donner tous les détails sur la pièce.
          </p>
          <p className="font-mulish text-[14px] text-pierre/70 mb-10">
            Une question urgente ?{' '}
            <a href="tel:+33450519134" className="text-terracotta font-semibold hover:underline">04 50 51 91 34</a>
          </p>
          <Link
            to="/univers"
            className="inline-flex items-center gap-2 bg-terracotta text-sable px-8 py-4 rounded-full font-mulish font-semibold text-[15px] hover:bg-terracotta/85 transition-colors duration-200 shadow-[0_8px_24px_-8px_rgba(162,58,46,0.5)]"
          >
            Continuer à parcourir
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </section>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Hero */}
      <div
        className="pt-[100px] md:pt-[120px] pb-14 md:pb-16 px-5 md:px-8 text-center"
        style={{ background: 'linear-gradient(160deg, #EDE4D3 0%, #FAF6EF 100%)' }}
      >
        <div className="max-w-[640px] mx-auto">
          <motion.span
            className="font-caveat text-terracotta text-[22px] block mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            une pièce vous a tapé dans l'œil ?
          </motion.span>
          <motion.h1
            className="font-fraunces font-semibold text-encre leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '0.04em' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06 }}
          >
            Écrivez-nous,<br />on s'occupe du reste.
          </motion.h1>
          <motion.p
            className="font-mulish text-[16px] text-pierre leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
          >
            Décrivez ce qui vous attire, posez vos questions — Isabelle vous rappelle personnellement sous 24 h.
          </motion.p>
        </div>
      </div>

      {/* Rassurances */}
      <div className="bg-sable border-b border-argile">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {REASSURANCES.map((r) => (
              <div key={r.title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0">
                  {r.icon}
                </div>
                <div>
                  <p className="font-mulish font-bold text-encre text-[13.5px] leading-snug">{r.title}</p>
                  <p className="font-mulish text-pierre text-[12.5px] leading-snug mt-0.5">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-sable">
        <section className="max-w-[760px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

            {/* Honeypot */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label>
                Ne pas remplir
                <input type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={e => setField('company', e.target.value)} />
              </label>
            </div>

            {/* Coordonnées */}
            <SectionReveal>
              <div className="bg-white rounded-2xl border border-argile p-6 md:p-8 flex flex-col gap-5">
                <h2 className="font-fraunces font-semibold text-encre text-[19px]">Vos coordonnées</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="f-name" className="font-mulish font-semibold text-[13.5px] text-encre">
                      Prénom et nom <span className="text-terracotta">*</span>
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      value={form.name}
                      onChange={e => setField('name', e.target.value)}
                      placeholder="Marie Dupont"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'e-name' : undefined}
                      {...inp(errors.name)}
                    />
                    {errors.name && <span id="e-name" role="alert" className="text-terracotta text-[12px] font-mulish">Merci d'indiquer votre nom.</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="f-phone" className="font-mulish font-semibold text-[13.5px] text-encre">
                      Téléphone <span className="text-terracotta">*</span>
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      value={form.phone}
                      onChange={e => setField('phone', e.target.value)}
                      placeholder="06 12 34 56 78"
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'e-phone' : undefined}
                      {...inp(errors.phone)}
                    />
                    {errors.phone && <span id="e-phone" role="alert" className="text-terracotta text-[12px] font-mulish">Numéro invalide.</span>}
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="f-email" className="font-mulish font-semibold text-[13.5px] text-encre">
                      Email <span className="text-terracotta">*</span>
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      value={form.email}
                      onChange={e => setField('email', e.target.value)}
                      placeholder="marie@exemple.fr"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'e-email' : undefined}
                      {...inp(errors.email)}
                    />
                    {errors.email && <span id="e-email" role="alert" className="text-terracotta text-[12px] font-mulish">Adresse email invalide.</span>}
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Message */}
            <SectionReveal delay={0.06}>
              <div className="bg-white rounded-2xl border border-argile p-6 md:p-8 flex flex-col gap-4">
                <div>
                  <h2 className="font-fraunces font-semibold text-encre text-[19px] mb-1">Votre demande</h2>
                  <p className="font-mulish text-pierre text-[13px]">Décrivez la pièce qui vous intéresse, ou posez simplement vos questions.</p>
                </div>
                <textarea
                  id="f-msg"
                  rows={5}
                  value={form.message}
                  onChange={e => setField('message', e.target.value)}
                  placeholder="Ex : j'ai vu un bol bleu sur votre page Univers, est-il encore disponible ? Je cherche aussi un cadeau pour un anniversaire…"
                  className="w-full border border-argile rounded-xl px-4 py-3.5 bg-sable font-mulish text-[15px] text-encre placeholder:text-pierre/50 focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/60 transition-colors duration-200 resize-y"
                />
                <p className="font-mulish text-[12px] text-pierre/60 -mt-1">
                  Pas d'idée précise ? Dites-nous juste votre budget ou l'occasion — on vous guidera.
                </p>
              </div>
            </SectionReveal>

            {/* Consentement + Submit */}
            <SectionReveal delay={0.1}>
              <div className="flex flex-col gap-5">
                <label className="flex gap-3 items-start font-mulish text-[13.5px] text-pierre cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={e => setField('consent', e.target.checked)}
                    aria-required="true"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'e-consent' : undefined}
                    className="mt-0.5 w-[17px] h-[17px] accent-terracotta shrink-0"
                  />
                  <span>
                    J'accepte que mes coordonnées soient utilisées uniquement pour traiter ma demande.{' '}
                    <Link to="/confidentialite" className="text-terracotta underline hover:opacity-75">Politique de confidentialité</Link>.{' '}
                    <span className="text-terracotta">*</span>
                  </span>
                </label>
                {errors.consent && <span id="e-consent" role="alert" className="text-terracotta text-[12px] font-mulish -mt-3">Merci d'accepter pour envoyer votre demande.</span>}

                {Object.keys(errors).length > 0 && (
                  <p role="alert" className="bg-terracotta/8 border border-terracotta text-terracotta rounded-xl px-4 py-3 font-mulish text-[13.5px]">
                    Merci de corriger les champs surlignés avant d'envoyer.
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-terracotta text-sable border-none py-4 rounded-full font-mulish font-bold text-[16px] cursor-pointer hover:bg-terracotta/85 active:scale-[0.99] transition-all duration-200 shadow-[0_12px_32px_-10px_rgba(162,58,46,0.55)]"
                >
                  Envoyer ma demande →
                </button>
                <p className="text-center text-pierre/60 font-mulish text-[12px] -mt-3">
                  Réponse personnelle d'Isabelle sous 24 h · Zéro paiement en ligne
                </p>
              </div>
            </SectionReveal>

          </form>
        </section>
      </div>

      {/* Bandeau bas */}
      <div className="bg-argile border-t border-or/20">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="font-fraunces font-semibold text-encre text-[16px] mb-0.5">Préférez-vous passer en boutique ?</p>
            <p className="font-mulish text-[13.5px] text-pierre">15 rue Sainte-Claire · Lun–Sam 10h–18h · Entrée libre</p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-encre/20 text-encre font-mulish font-semibold text-[14px] hover:bg-sable transition-colors duration-200"
          >
            Voir le plan
          </Link>
        </div>
      </div>

    </motion.div>
  )
}
