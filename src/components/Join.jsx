import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Mail as MailIcon, MessageCircle } from 'lucide-react'

const GROUP_POINTS = [
  'Accès à l’ensemble du portefeuille',
  'Enveloppe interne de 60% des revenus',
  'Participation aux décisions stratégiques',
]

const PROJECT_POINTS = [
  'Investisseur financier ou contributeur',
  'Enveloppe projet de 40% des revenus',
  'Part progressive selon ancienneté',
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const COLLABORATION_TYPES = [
  'Partenaire Interne',
  'Investisseur Financier',
  'Contributeur Opérationnel',
  'Autre',
]

const WHATSAPP_NUMBER = '22901473316'
const CONTACT_EMAIL = 'vertexglos@gmail.com'

const EMAIL_SUCCESS_MSG = 'Votre email a été préparé. Envoyez-le depuis votre messagerie pour finaliser.'
const WHATSAPP_SUCCESS_MSG = 'WhatsApp ouvert. Envoyez le message pour finaliser votre demande.'

const initialValues = { name: '', email: '', type: '', message: '', channel: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getErrors(values) {
  return {
    name: values.name.trim() === '' ? 'Merci de renseigner votre nom.' : '',
    email: !EMAIL_RE.test(values.email.trim()) ? 'Merci de renseigner une adresse email valide.' : '',
    type: values.type === '' ? 'Merci de sélectionner un type de collaboration.' : '',
    message: values.message.trim() === '' ? 'Merci de rédiger un message.' : '',
    channel: values.channel === '' ? 'Merci de choisir un canal de contact.' : '',
  }
}

function buildMailtoUrl({ name, email, type, message }) {
  const subject = `Collaboration Vertex Global — ${type}`
  const body = `Nom: ${name}\nEmail: ${email}\nType: ${type}\nMessage: ${message}`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function buildWhatsappUrl({ name, email, type, message }) {
  const text = `Bonjour Vertex Global 👋\n\nNom: ${name}\nEmail: ${email}\nType de collaboration: ${type}\n\nMessage: ${message}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

function ContactForm() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bannerMessage, setBannerMessage] = useState('')

  const errors = getErrors(values)
  const isValid = Object.values(errors).every((msg) => msg === '')
  const showError = (field) => (touched[field] || submitAttempted) && errors[field]

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitAttempted(true)
    if (!isValid || loading) return

    setLoading(true)

    window.setTimeout(() => {
      if (values.channel === 'whatsapp') {
        window.open(buildWhatsappUrl(values), '_blank', 'noopener,noreferrer')
        setBannerMessage(WHATSAPP_SUCCESS_MSG)
      } else {
        window.location.href = buildMailtoUrl(values)
        setBannerMessage(EMAIL_SUCCESS_MSG)
      }

      setLoading(false)
      setValues(initialValues)
      setTouched({})
      setSubmitAttempted(false)

      window.setTimeout(() => setBannerMessage(''), 5000)
    }, 600)
  }

  const fieldClass = (field) =>
    `w-full rounded-lg border-2 bg-white/[0.06] px-4 py-3 text-white placeholder-white/40 transition-colors duration-200 focus:outline-none ${
      showError(field)
        ? 'border-red-400 focus:border-red-400'
        : 'border-white/15 focus:border-vertex-gold-light'
    }`

  const submitLabel = values.channel === 'whatsapp' ? 'Envoyer via WhatsApp' : 'Envoyer via Email'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-20 max-w-2xl rounded-2xl bg-vertex-blue-deep p-8 sm:p-11"
      id="contact"
    >
      <h3 className="font-serif text-2xl font-bold text-white">Une question&nbsp;? Écrivez-nous.</h3>
      <p className="mt-2 text-[15px] text-[#B8C4D4]">
        Décrivez votre projet ou votre intérêt, nous revenons vers vous rapidement.
      </p>

      <div className="mt-5" aria-live="polite">
        <AnimatePresence>
          {bannerMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              role="status"
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2.5 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white">
                <Check className="h-4 w-4 shrink-0" />
                {bannerMessage}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            Nom complet
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Votre nom complet"
            className={fieldClass('name')}
          />
          {showError('name') && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="vous@exemple.com"
            className={fieldClass('email')}
          />
          {showError('email') && <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            Type de collaboration
          </label>
          <select
            id="type"
            name="type"
            value={values.type}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldClass('type')}
          >
            <option value="" disabled className="text-vertex-text-muted">
              Choisissez une option
            </option>
            {COLLABORATION_TYPES.map((type) => (
              <option key={type} value={type} className="bg-vertex-navy text-white">
                {type}
              </option>
            ))}
          </select>
          {showError('type') && <p className="mt-1.5 text-xs text-red-300">{errors.type}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Parlez-nous de votre projet..."
            className={`${fieldClass('message')} resize-y`}
          />
          {showError('message') && <p className="mt-1.5 text-xs text-red-300">{errors.message}</p>}
        </div>

        <fieldset>
          <legend className="mb-2.5 text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            Canal de contact préféré
          </legend>
          <div className="flex flex-wrap gap-5">
            <label className="flex cursor-pointer items-center gap-2.5 text-[14.5px] text-white/90">
              <input
                type="radio"
                name="channel"
                value="email"
                checked={values.channel === 'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-4 w-4 accent-vertex-gold"
              />
              <MailIcon className="h-4 w-4 text-vertex-gold-light" />
              Email
            </label>
            <label className="flex cursor-pointer items-center gap-2.5 text-[14.5px] text-white/90">
              <input
                type="radio"
                name="channel"
                value="whatsapp"
                checked={values.channel === 'whatsapp'}
                onChange={handleChange}
                onBlur={handleBlur}
                className="h-4 w-4 accent-vertex-gold"
              />
              <MessageCircle className="h-4 w-4 text-vertex-gold-light" />
              WhatsApp
            </label>
          </div>
          {showError('channel') && <p className="mt-1.5 text-xs text-red-300">{errors.channel}</p>}
        </fieldset>

        <button
          type="submit"
          disabled={!isValid || loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-vertex-gold py-4 font-semibold text-vertex-navy transition-all duration-200 hover:scale-[1.01] hover:bg-vertex-gold-light disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? 'Préparation…' : submitLabel}
        </button>
      </form>
    </motion.div>
  )
}

export default function Join() {
  return (
    <section id="join" className="bg-vertex-navy py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-serif text-[28px] font-bold text-white md:text-[42px]">
            Rejoindre Vertex Global
          </h2>
          <p className="mt-4 text-[17px] text-[#B8C4D4]">
            Nous cherchons des personnes qui partagent une vision long terme.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {/* Partenaire Interne */}
          <motion.article
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col rounded-2xl border-t-[3px] border-vertex-gold bg-vertex-blue-deep p-9 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span className="w-fit rounded-full bg-vertex-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-vertex-navy">
              Niveau 1
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-[26px]">
              Partenaire du Groupe
            </h3>
            <p className="mt-3 text-[15px] text-white/80">
              Vous rejoignez le groupe dans sa globalité — vision stratégique, gouvernance et accès à
              l&apos;ensemble du portefeuille de ventures.
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {GROUP_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[14.5px] text-white/90">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-vertex-gold-light" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-8 w-fit text-sm font-semibold text-vertex-gold-light underline decoration-transparent underline-offset-4 transition-all duration-200 hover:decoration-vertex-gold-light"
            >
              En savoir plus →
            </a>
          </motion.article>

          {/* Partenaire de Projet */}
          <motion.article
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col rounded-2xl border-t-[3px] border-white bg-vertex-blue p-9 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span className="w-fit rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-vertex-blue">
              Niveau 2
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-[26px]">
              Partenaire de Projet
            </h3>
            <p className="mt-3 text-[15px] text-white/85">
              Vous rejoignez une venture spécifique, en tant qu&apos;investisseur financier ou
              contributeur opérationnel, avec un retour aligné sur sa performance.
            </p>

            <ul className="mt-6 flex-1 space-y-3">
              {PROJECT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[14.5px] text-white/95">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-white" />
                  {point}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="mt-8 w-fit text-sm font-semibold text-white underline decoration-transparent underline-offset-4 transition-all duration-200 hover:decoration-white"
            >
              En savoir plus →
            </a>
          </motion.article>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
