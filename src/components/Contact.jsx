import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import SectionLink from './ui/SectionLink'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import { duration, ease } from '../lib/motion'
import { useLanguage } from '../i18n/LanguageContext'

const WHATSAPP_NUMBER = '2290147333616'
const PHONE_DISPLAY = '+229 01 47 33 36 16'
const PHONE_HREF = 'tel:+2290147333616'
const CONTACT_EMAIL = 'vertexglos@gmail.com'

const MESSAGE_MIN_LENGTH = 20

// Anti-spam: max submissions allowed within the rolling time window.
const RATE_LIMIT_KEY = 'vg_form_submissions'
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

// `website` is a honeypot: hidden from real visitors, only bots fill it.
const initialValues = { channel: '', name: '', email: '', type: '', message: '', website: '' }
const FIELD_ORDER = ['channel', 'name', 'email', 'type', 'message']
const FIELD_IDS = {
  channel: 'contact-channel-email',
  name: 'contact-name',
  email: 'contact-email',
  type: 'contact-type',
  message: 'contact-message',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getMessageError(message, errorMessages) {
  const trimmed = message.trim()
  if (trimmed === '') return errorMessages.message
  if (trimmed.length < MESSAGE_MIN_LENGTH) return errorMessages.messageMinLength
  return ''
}

function getErrors(values, errorMessages) {
  return {
    channel: values.channel === '' ? errorMessages.channel : '',
    name: values.name.trim() === '' ? errorMessages.name : '',
    // Email is only required, and only validated, for the Email channel.
    email: values.channel === 'email' && !EMAIL_RE.test(values.email.trim()) ? errorMessages.email : '',
    type: values.type === '' ? errorMessages.type : '',
    message: getMessageError(values.message, errorMessages),
  }
}

function getRecentSubmissions() {
  try {
    const raw = window.localStorage.getItem(RATE_LIMIT_KEY)
    const timestamps = raw ? JSON.parse(raw) : []
    if (!Array.isArray(timestamps)) return []
    return timestamps.filter((ts) => Date.now() - ts < RATE_LIMIT_WINDOW_MS)
  } catch {
    return []
  }
}

function isRateLimited() {
  return getRecentSubmissions().length >= RATE_LIMIT_MAX
}

function recordSubmission() {
  try {
    const recent = getRecentSubmissions()
    recent.push(Date.now())
    window.localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent))
  } catch {
    // localStorage unavailable: rate limiting becomes a no-op for this visitor.
  }
}

function buildMailtoUrl({ name, email, type, message }, formT) {
  const subject = `${formT.mailSubjectPrefix} : ${type}`
  const labels = formT.mailFieldLabels
  const body = `${labels.name}: ${name}\n${labels.email}: ${email}\n${labels.type}: ${type}\n\n${labels.message}: ${message}`
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function buildWhatsappUrl({ name, type, message }, formT) {
  // The WhatsApp flow never includes email: the field is hidden for this channel.
  const labels = formT.waFieldLabels
  const text = `${formT.waGreeting}\n\n${labels.name}: ${name}\n${labels.type}: ${type}\n\n${labels.message}: ${message}`
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const inputBase =
  'w-full rounded-ds-md border bg-white px-4 py-3 text-base text-text-primary shadow-ds-sm transition-colors duration-200 placeholder:text-[#8A919C] focus:border-primary'

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-error">
      <AlertTriangle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

function ContactForm() {
  const { t } = useLanguage()
  const formT = t.contact.form

  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState(null)
  const bannerTimer = useRef(0)

  const errors = getErrors(values, formT.errors)
  const isValid = Object.values(errors).every((msg) => msg === '')
  const showError = (field) => Boolean((touched[field] || submitAttempted) && errors[field])

  function flashBanner(variant, message) {
    window.clearTimeout(bannerTimer.current)
    setBanner({ variant, message })
    // 4s auto-dismiss, as specified for the form feedback.
    bannerTimer.current = window.setTimeout(() => setBanner(null), 4000)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setValues((prev) => {
      // Leaving the Email channel clears the address: the field unmounts and
      // must be neither required nor sent with the WhatsApp message.
      if (name === 'channel' && value !== 'email') return { ...prev, channel: value, email: '' }
      return { ...prev, [name]: value }
    })
    if (name === 'channel' && value !== 'email') setTouched((prev) => ({ ...prev, email: false }))
  }

  function handleBlur(event) {
    setTouched((prev) => ({ ...prev, [event.target.name]: true }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    // Honeypot filled: a bot. Reject silently, no error, no banner.
    if (values.website.trim() !== '') return
    if (loading) return

    setSubmitAttempted(true)
    if (!isValid) {
      const firstInvalid = FIELD_ORDER.find((field) => errors[field])
      document.getElementById(FIELD_IDS[firstInvalid])?.focus()
      return
    }

    if (isRateLimited()) {
      flashBanner('error', formT.rateLimited)
      return
    }

    setLoading(true)
    window.setTimeout(() => {
      // These only prepare the message in the visitor's own app; the success
      // copy says so explicitly rather than claiming it was sent.
      if (values.channel === 'whatsapp') {
        window.open(buildWhatsappUrl(values, formT), '_blank', 'noopener,noreferrer')
        flashBanner('success', formT.successWhatsapp)
      } else {
        window.location.href = buildMailtoUrl(values, formT)
        flashBanner('success', formT.successEmail)
      }
      recordSubmission()
      setLoading(false)
      setValues(initialValues)
      setTouched({})
      setSubmitAttempted(false)
    }, 600)
  }

  const describedBy = (field) => (showError(field) ? `${FIELD_IDS[field]}-error` : undefined)
  const fieldClass = (field) =>
    `${inputBase} ${showError(field) ? 'border-error' : 'border-border hover:border-text-secondary/40'}`

  const submitLabel = values.channel === 'whatsapp' ? formT.submitWhatsapp : formT.submitEmail
  const channels = [
    { value: 'email', label: formT.channelEmail, Icon: Mail },
    { value: 'whatsapp', label: formT.channelWhatsapp, Icon: MessageCircle },
  ]

  return (
    <div id="contact-form" className="rounded-ds-xl border border-border bg-white p-6 shadow-ds-md sm:p-10">
      <h3 className="ds-h3 text-text-primary">{formT.title}</h3>
      <p className="mt-2 text-[0.9375rem] text-text-secondary">{formT.subtitle}</p>
      <p className="ds-label mt-4 text-text-secondary">{formT.requiredHint}</p>

      <div aria-live="polite" className="mt-5">
        <AnimatePresence>
          {banner && (
            <motion.div
              key={banner.message}
              initial={{ opacity: 0, y: -12, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -12, height: 0 }}
              transition={{ duration: duration.base, ease: ease.out }}
              role={banner.variant === 'error' ? 'alert' : 'status'}
              className="overflow-hidden"
            >
              <div
                className={`flex items-start gap-2.5 rounded-ds-md border px-4 py-3 text-sm font-medium ${
                  banner.variant === 'error'
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                {banner.variant === 'error' ? (
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                ) : (
                  <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                {banner.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} noValidate className="relative mt-6 space-y-6">
        {/* Honeypot: invisible to sighted and screen-reader users. */}
        <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="contact-website">Site web</label>
          <input
            type="text"
            id="contact-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={handleChange}
          />
        </div>

        <fieldset aria-describedby={describedBy('channel')}>
          <legend className="ds-label mb-3 text-text-primary">{formT.channelLabel}</legend>
          <div className="grid grid-cols-2 gap-3">
            {channels.map(({ value, label, Icon }) => (
              <label
                key={value}
                className="spring-press flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-ds-md border border-border bg-white px-4 text-[0.9375rem] font-semibold text-text-primary shadow-ds-sm hover:border-primary/40 active:scale-[0.97] has-[:checked]:border-primary has-[:checked]:bg-primary/[0.06] has-[:checked]:text-primary has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:outline-focus"
              >
                <input
                  type="radio"
                  id={value === 'email' ? FIELD_IDS.channel : `contact-channel-${value}`}
                  name="channel"
                  value={value}
                  checked={values.channel === value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="sr-only"
                />
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                {label}
              </label>
            ))}
          </div>
          <FieldError id={`${FIELD_IDS.channel}-error`} message={showError('channel') ? errors.channel : ''} />
          {values.channel && (
            <p className="mt-2.5 text-sm italic text-text-secondary">
              {values.channel === 'whatsapp' ? formT.helperWhatsapp : formT.helperEmail}
            </p>
          )}
        </fieldset>

        <div>
          <label htmlFor={FIELD_IDS.name} className="ds-label mb-2 block text-text-primary">
            {formT.nameLabel}
          </label>
          <input
            id={FIELD_IDS.name}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formT.namePlaceholder}
            aria-invalid={showError('name') || undefined}
            aria-describedby={describedBy('name')}
            className={fieldClass('name')}
          />
          <FieldError id={`${FIELD_IDS.name}-error`} message={showError('name') ? errors.name : ''} />
        </div>

        {values.channel === 'email' && (
          <div>
            <label htmlFor={FIELD_IDS.email} className="ds-label mb-2 block text-text-primary">
              {formT.emailLabel}
            </label>
            <input
              id={FIELD_IDS.email}
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={formT.emailPlaceholder}
              aria-invalid={showError('email') || undefined}
              aria-describedby={describedBy('email')}
              className={fieldClass('email')}
            />
            <FieldError id={`${FIELD_IDS.email}-error`} message={showError('email') ? errors.email : ''} />
          </div>
        )}

        <div>
          <label htmlFor={FIELD_IDS.type} className="ds-label mb-2 block text-text-primary">
            {formT.typeLabel}
          </label>
          <div className="relative">
            <select
              id={FIELD_IDS.type}
              name="type"
              required
              value={values.type}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={showError('type') || undefined}
              aria-describedby={describedBy('type')}
              className={`${fieldClass('type')} appearance-none pr-11 ${values.type === '' ? 'text-[#8A919C]' : ''}`}
            >
              <option value="" disabled>
                {formT.typePlaceholder}
              </option>
              {formT.types.map((type) => (
                <option key={type} value={type} className="text-text-primary">
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
          </div>
          <FieldError id={`${FIELD_IDS.type}-error`} message={showError('type') ? errors.type : ''} />
        </div>

        <div>
          <label htmlFor={FIELD_IDS.message} className="ds-label mb-2 block text-text-primary">
            {formT.messageLabel}
          </label>
          <textarea
            id={FIELD_IDS.message}
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={formT.messagePlaceholder}
            aria-invalid={showError('message') || undefined}
            aria-describedby={describedBy('message')}
            className={`${fieldClass('message')} resize-y`}
          />
          <FieldError id={`${FIELD_IDS.message}-error`} message={showError('message') ? errors.message : ''} />
        </div>

        <Button type="submit" size="lg" disabled={loading} loading={loading} className="w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {loading ? formT.submitLoading : submitLabel}
        </Button>
      </form>
    </div>
  )
}

function ContactPanel({ panel }) {
  const rows = [
    { Icon: Mail, label: panel.emailLabel, value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { Icon: Phone, label: panel.phoneLabel, value: PHONE_DISPLAY, href: PHONE_HREF, whatsapp: true },
    { Icon: MapPin, label: panel.addressLabel, value: panel.address },
  ]

  return (
    <div className="theme-dark relative overflow-hidden rounded-ds-xl bg-navy p-7 shadow-ds-lg sm:p-10 lg:sticky lg:top-28">
      <div aria-hidden="true" className="iridescent-halo pointer-events-none absolute -bottom-28 -left-20 h-80 w-80 rounded-full" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-ds-xl ring-1 ring-inset ring-white/10" />

      <div className="relative">
        <h3 className="ds-h3 text-white">{panel.title}</h3>
        <ul className="mt-8 space-y-6">
          {rows.map(({ Icon, label, value, href, whatsapp }) => (
            <li key={label} className="flex gap-4">
              <span className="glass-surface specular-edge flex h-11 w-11 shrink-0 items-center justify-center rounded-ds-md border border-white/15 bg-white/[0.06]">
                <Icon className="h-[18px] w-[18px] text-vertex-gold-light" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="ds-label text-white/60">{label}</p>
                {href ? (
                  <a
                    href={href}
                    className="mt-1 inline-block break-words text-[0.9375rem] font-medium text-white underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:decoration-white"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="mt-1 text-[0.9375rem] font-medium text-white">{value}</p>
                )}
                {whatsapp && (
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-label mt-1 flex min-h-[32px] w-fit items-center gap-1.5 text-vertex-gold-light hover:text-white"
                  >
                    <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    WhatsApp
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function PartnerCard({ card, step }) {
  const focusForm = () => document.getElementById(FIELD_IDS.name)?.focus({ preventScroll: true })

  return (
    <Reveal as="article" step={step} className="flex">
      <div className="flex w-full flex-col rounded-ds-xl border border-border bg-white p-7 shadow-ds-sm sm:p-8">
        <span className="ds-label w-fit rounded-ds-pill bg-surface px-3 py-1.5 text-primary ring-1 ring-border">
          {card.badge}
        </span>
        <h4 className="ds-h3 mt-5 text-text-primary">{card.title}</h4>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-text-secondary">{card.desc}</p>
        <ul className="mt-6 flex-1 space-y-3">
          {card.points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-[0.9375rem] text-text-primary">
              <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" strokeWidth={2.5} />
              {point}
            </li>
          ))}
        </ul>
        <SectionLink
          to="contact-form"
          onNavigate={focusForm}
          className="mt-7 inline-flex min-h-[44px] w-fit items-center gap-1.5 rounded-ds-sm text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
        >
          {card.cta}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </SectionLink>
      </div>
    </Reveal>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const { contact } = t

  return (
    <section id="contact" aria-labelledby="contact-title" className="ds-section bg-background">
      <div className="ds-container">
        <SectionHeader id="contact-title" eyebrow={contact.eyebrow} title={contact.title} lede={contact.lede} />

        <div className="mt-14">
          <Reveal as="h3" className="ds-h3 text-text-primary">
            {contact.partners.title}
          </Reveal>
          <Reveal as="p" className="mt-2 text-[0.9375rem] text-text-secondary">
            {contact.partners.lede}
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <PartnerCard card={contact.partners.groupCard} step={0} />
            <PartnerCard card={contact.partners.projectCard} step={1} />
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <ContactPanel panel={contact.panel} />
          </Reveal>
          <Reveal step={1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
