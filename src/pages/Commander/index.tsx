import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../../contexts/CartContext'

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
  pickup: 'boutique' | 'rappel'
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
      'w-full border rounded-lg px-3 py-3 bg-sable font-mulish text-[15px] text-encre placeholder:text-pierre/60',
      'focus:outline-none focus:ring-2 focus:ring-terracotta/40',
      invalid ? 'border-terracotta' : 'border-or',
    ].join(' '),
  }
}

export default function CommanderPage() {
  useMeta(
    'Commander — La Poterie du Vieil Annecy',
    'Faites une demande de réservation. Aucun paiement en ligne, règlement en boutique au retrait.',
  )

  const { cart, updateLine, removeLine, addLine } = useCart()
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', pickup: 'boutique', message: '', consent: false, company: '',
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
        <section className="max-w-[680px] mx-auto px-6 py-20 text-center">
          <div className="w-18 h-18 rounded-full bg-sauge flex items-center justify-center mx-auto mb-6" style={{ width: 72, height: 72 }}>
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#FAF6EF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-fraunces font-semibold text-encre leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            Merci, votre demande est envoyée.
          </h1>
          <p className="font-mulish text-[17px] text-encre mb-3 leading-relaxed">
            La boutique vous recontacte rapidement pour confirmer la <strong>disponibilité</strong> et le <strong>prix</strong> de vos pièces.
          </p>
          <p className="font-mulish text-[15px] text-pierre mb-8">
            Une question d'ici là ? Appelez-nous au{' '}
            <a href="tel:+33450519134" className="text-terracotta font-semibold hover:underline">04 50 51 91 34</a>.
          </p>
          <Link
            to="/univers"
            className="inline-block bg-terracotta text-sable px-7 py-3.5 rounded-full font-mulish font-semibold text-[15px] hover:bg-terracotta/85 transition-colors duration-200"
          >
            Continuer à parcourir
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
      className="pt-[100px] md:pt-[120px]"
    >
      {/* En-tête */}
      <section className="max-w-[760px] mx-auto px-6 pb-6 text-center">
        <span className="font-caveat text-terracotta text-[24px] block mb-1">réservation · sans paiement en ligne</span>
        <h1
          className="font-fraunces font-semibold text-encre leading-tight mb-4"
          style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)' }}
        >
          Ma demande de commande
        </h1>
      </section>

      {/* Note info */}
      <section className="max-w-[760px] mx-auto px-6 mb-6">
        <div className="bg-argile border border-or rounded-2xl px-5 py-4 flex gap-3 items-start">
          <span className="text-terracotta text-[18px] leading-[1.4] shrink-0" aria-hidden="true">✻</span>
          <p className="font-mulish text-[14.5px] text-encre m-0">
            Ceci est une <strong>demande de commande</strong>. Le règlement se fait{' '}
            <strong>en boutique, au retrait</strong> — aucun paiement ni donnée bancaire n'est demandé ici.
          </p>
        </div>
      </section>

      {/* Formulaire */}
      <section className="max-w-[760px] mx-auto px-6 pb-20">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">

          {/* Honeypot */}
          <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
            <label>
              Ne pas remplir
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={e => setField('company', e.target.value)}
              />
            </label>
          </div>

          {/* 1 · Vos pièces */}
          <fieldset className="border border-argile rounded-2xl p-6 m-0 bg-white/40">
            <legend className="font-fraunces font-semibold text-encre text-[20px] px-2">1 · Vos pièces</legend>
            {cart.length === 0 && (
              <p className="font-mulish text-[14.5px] text-pierre mt-2 mb-4">
                Aucune pièce pour l'instant. Ajoutez-en depuis{' '}
                <Link to="/univers" className="text-terracotta font-semibold hover:underline">Nos univers</Link>,
                ou ajoutez une ligne manuellement.
              </p>
            )}
            <div className="flex flex-col gap-3 mt-2">
              {cart.map(line => (
                <div
                  key={line.id}
                  className="grid gap-2 items-center bg-sable border border-argile rounded-xl p-3"
                  style={{ gridTemplateColumns: '1fr 72px 1.1fr 38px' }}
                >
                  <input
                    type="text"
                    value={line.name}
                    onChange={e => updateLine(line.id, { name: e.target.value })}
                    aria-label="Nom du produit"
                    placeholder="Produit"
                    className="border border-or rounded-lg px-3 py-2 bg-white font-mulish text-[14px] text-encre placeholder:text-pierre/60 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                  />
                  <input
                    type="number"
                    min={1}
                    value={line.qty}
                    onChange={e => updateLine(line.id, { qty: Math.max(1, parseInt(e.target.value, 10) || 1) })}
                    aria-label="Quantité"
                    className="border border-or rounded-lg px-3 py-2 bg-white font-mulish text-[14px] text-encre focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                  />
                  <button
                    type="button"
                    onClick={() => removeLine(line.id)}
                    aria-label="Retirer cette ligne"
                    className="w-[38px] h-[38px] border border-or bg-white rounded-lg cursor-pointer text-terracotta text-[18px] flex items-center justify-center hover:bg-argile transition-colors duration-150"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addLine}
              className="mt-4 w-full border border-dashed border-or text-encre font-mulish font-semibold text-[13.5px] px-4 py-3 rounded-xl cursor-pointer bg-transparent hover:bg-argile/50 transition-colors duration-150"
            >
              + Ajouter une ligne
            </button>
          </fieldset>

          {/* 2 · Vos coordonnées */}
          <fieldset className="border border-argile rounded-2xl p-6 m-0 bg-white/40">
            <legend className="font-fraunces font-semibold text-encre text-[20px] px-2">2 · Vos coordonnées</legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-3">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-name" className="font-mulish font-semibold text-[14px] text-encre">
                  Nom <span className="text-terracotta">*</span>
                </label>
                <input
                  id="f-name"
                  type="text"
                  value={form.name}
                  onChange={e => setField('name', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'e-name' : undefined}
                  {...inp(errors.name)}
                />
                {errors.name && (
                  <span id="e-name" role="alert" className="text-terracotta text-[12.5px] font-mulish">
                    Merci d'indiquer votre nom.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="f-phone" className="font-mulish font-semibold text-[14px] text-encre">
                  Téléphone <span className="text-terracotta">*</span>
                </label>
                <input
                  id="f-phone"
                  type="tel"
                  value={form.phone}
                  onChange={e => setField('phone', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'e-phone' : undefined}
                  placeholder="06 12 34 56 78"
                  {...inp(errors.phone)}
                />
                {errors.phone && (
                  <span id="e-phone" role="alert" className="text-terracotta text-[12.5px] font-mulish">
                    Numéro de téléphone invalide.
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="f-email" className="font-mulish font-semibold text-[14px] text-encre">
                  Email <span className="text-terracotta">*</span>
                </label>
                <input
                  id="f-email"
                  type="email"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'e-email' : undefined}
                  placeholder="vous@exemple.fr"
                  {...inp(errors.email)}
                />
                {errors.email && (
                  <span id="e-email" role="alert" className="text-terracotta text-[12.5px] font-mulish">
                    Adresse email invalide.
                  </span>
                )}
              </div>
            </div>
          </fieldset>

          {/* 3 · Précisions */}
          <fieldset className="border border-argile rounded-2xl p-6 m-0 bg-white/40">
            <legend className="font-fraunces font-semibold text-encre text-[20px] px-2">3 · Précisions</legend>
            <div className="mt-3 mb-5">
              <span className="font-mulish font-semibold text-[14px] text-encre block mb-2">Mode de retrait</span>
              <div className="flex gap-3 flex-wrap">
                {([
                  { value: 'boutique', label: 'Retrait en boutique' },
                  { value: 'rappel', label: 'Me recontacter' },
                ] as const).map(opt => (
                  <label
                    key={opt.value}
                    className={[
                      'flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-pointer font-mulish text-[14px] font-semibold border-[1.5px] transition-colors duration-150',
                      form.pickup === opt.value
                        ? 'border-terracotta bg-terracotta/8 text-encre'
                        : 'border-or bg-sable text-encre hover:bg-argile',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name="pickup"
                      value={opt.value}
                      checked={form.pickup === opt.value}
                      onChange={() => setField('pickup', opt.value)}
                      className="accent-terracotta"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="f-msg" className="font-mulish font-semibold text-[14px] text-encre">
                Message libre
              </label>
              <textarea
                id="f-msg"
                rows={4}
                value={form.message}
                onChange={e => setField('message', e.target.value)}
                placeholder="Une couleur préférée, une date de passage, une question…"
                className="w-full border border-or rounded-xl px-3 py-3 bg-sable font-mulish text-[15px] text-encre placeholder:text-pierre/60 focus:outline-none focus:ring-2 focus:ring-terracotta/40 resize-y"
              />
            </div>
          </fieldset>

          {/* Consentement */}
          <div className="flex flex-col gap-2">
            <label className="flex gap-3 items-start font-mulish text-[14px] text-encre cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={e => setField('consent', e.target.checked)}
                aria-required="true"
                aria-invalid={!!errors.consent}
                aria-describedby={errors.consent ? 'e-consent' : undefined}
                className="mt-0.5 w-[18px] h-[18px] accent-terracotta shrink-0"
              />
              <span>
                J'accepte que mes coordonnées soient utilisées uniquement pour traiter ma demande.{' '}
                <Link to="/confidentialite" className="text-terracotta font-semibold underline">
                  Politique de confidentialité
                </Link>.{' '}
                <span className="text-terracotta">*</span>
              </span>
            </label>
            {errors.consent && (
              <span id="e-consent" role="alert" className="text-terracotta text-[12.5px] font-mulish">
                Merci d'accepter pour envoyer votre demande.
              </span>
            )}
          </div>

          {/* Résumé erreurs */}
          {Object.keys(errors).length > 0 && (
            <p
              role="alert"
              className="m-0 bg-terracotta/8 border border-terracotta text-terracotta rounded-xl px-4 py-3 font-mulish text-[14px]"
            >
              Merci de corriger les champs surlignés avant d'envoyer.
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-terracotta text-sable border-none py-4 rounded-full font-mulish font-bold text-[16px] cursor-pointer hover:bg-terracotta/85 transition-colors duration-200 shadow-[0_12px_28px_-12px_rgba(162,58,46,0.6)]"
          >
            Envoyer ma demande
          </button>
          <p className="text-center text-pierre font-mulish text-[12.5px] -mt-4">
            Demande de réservation — aucun paiement en ligne. Confirmation et règlement en boutique au retrait.
          </p>
        </form>
      </section>
    </motion.div>
  )
}
