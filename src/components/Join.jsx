import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2, Mail as MailIcon, MessageCircle } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const WHATSAPP_NUMBER = '22901473316'
const CONTACT_EMAIL = 'vertexglos@gmail.com'

const initialValues = { name: '', email: '', type: '', message: '', channel: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getErrors(values, errorMessages) {
  return {
    name: values.name.trim() === '' ? errorMessages.name : '',
    email: !EMAIL_RE.test(values.email.trim()) ? errorMessages.email : '',
    type: values.type === '' ? errorMessages.type : '',
    message: values.message.trim() === '' ? errorMessages.message : '',
    channel: values.channel === '' ? errorMessages.channel : '',
  }
}

function buildMailtoUrl({ name, email, type, message }, formT) {
  const subject = `${formT.mailSubjectPrefix} — ${type}`
  const { name: nameLabel, email: emailLabel, type: typeLabel, message: messageLabel } = formT.mailFieldLabels
  const body = `${nameLabel}: ${name}\n${emailLabel}: ${email}\n${typeLabel}: ${type}\n${messageLabel}: ${message}`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function buildWhatsappUrl({ name, email, type, message }, formT) {
  const { name: nameLabel, email: emailLabel, type: typeLabel, message: messageLabel } = formT.waFieldLabels
  const text = `${formT.waGreeting}\n\n${nameLabel}: ${name}\n${emailLabel}: ${email}\n${typeLabel}: ${type}\n\n${messageLabel}: ${message}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

function ContactForm() {
  const { t } = useLanguage()
  const formT = t.join.form

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bannerMessage, setBannerMessage] = useState('')

  const errors = getErrors(values, formT.errors)
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
        window.open(buildWhatsappUrl(values, formT), '_blank', 'noopener,noreferrer')
        setBannerMessage(formT.successWhatsapp)
      } else {
        window.location.href = buildMailtoUrl(values, formT)
        setBannerMessage(formT.successEmail)
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

  const submitLabel = values.channel === 'whatsapp' ? formT.submitWhatsapp : formT.submitEmail

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto mt-20 max-w-2xl rounded-2xl bg-vertex-blue-deep p-8 sm:p-11"
      id="contact"
    >
      <h3 className="font-serif text-2xl font-bold text-white">{formT.title}</h3>
      <p className="mt-2 text-[15px] text-[#B8C4D4]">{formT.subtitle}</p>

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
            {formT.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formT.namePlaceholder}
            className={fieldClass('name')}
          />
          {showError('name') && <p className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            {formT.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formT.emailPlaceholder}
            className={fieldClass('email')}
          />
          {showError('email') && <p className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="type" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            {formT.typeLabel}
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
              {formT.typePlaceholder}
            </option>
            {formT.types.map((type) => (
              <option key={type} value={type} className="bg-vertex-navy text-white">
                {type}
              </option>
            ))}
          </select>
          {showError('type') && <p className="mt-1.5 text-xs text-red-300">{errors.type}</p>}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            {formT.messageLabel}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formT.messagePlaceholder}
            className={`${fieldClass('message')} resize-y`}
          />
          {showError('message') && <p className="mt-1.5 text-xs text-red-300">{errors.message}</p>}
        </div>

        <fieldset>
          <legend className="mb-2.5 text-xs font-bold uppercase tracking-wide text-[#D4D4D4]">
            {formT.channelLabel}
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
              {formT.channelEmail}
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
              {formT.channelWhatsapp}
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
          {loading ? formT.submitLoading : submitLabel}
        </button>
      </form>
    </motion.div>
  )
}

export default function Join() {
  const { t } = useLanguage()

  return (
    <section id="join" className="bg-vertex-navy py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-serif text-[28px] font-bold text-white md:text-[42px]">{t.join.title}</h2>
          <p className="mt-4 text-[17px] text-[#B8C4D4]">{t.join.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {/* Group Partner */}
          <motion.article
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col rounded-2xl border-t-[3px] border-vertex-gold bg-vertex-blue-deep p-9 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span className="w-fit rounded-full bg-vertex-gold px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-vertex-navy">
              {t.join.groupCard.badge}
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-[26px]">
              {t.join.groupCard.title}
            </h3>
            <p className="mt-3 text-[15px] text-white/80">{t.join.groupCard.desc}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {t.join.groupCard.points.map((point) => (
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
              {t.join.groupCard.cta}
            </a>
          </motion.article>

          {/* Project Partner */}
          <motion.article
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col rounded-2xl border-t-[3px] border-white bg-vertex-blue p-9 transition-transform duration-300 hover:-translate-y-1.5"
          >
            <span className="w-fit rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wide text-vertex-blue">
              {t.join.projectCard.badge}
            </span>
            <h3 className="mt-5 font-serif text-2xl font-bold text-white sm:text-[26px]">
              {t.join.projectCard.title}
            </h3>
            <p className="mt-3 text-[15px] text-white/85">{t.join.projectCard.desc}</p>

            <ul className="mt-6 flex-1 space-y-3">
              {t.join.projectCard.points.map((point) => (
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
              {t.join.projectCard.cta}
            </a>
          </motion.article>
        </div>

        <ContactForm />
      </div>
    </section>
  )
}
