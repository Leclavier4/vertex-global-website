import { Link as RouterLink } from 'react-router-dom'
import { ArrowUpRight, Lock, Mail, MapPin, Phone } from 'lucide-react'
import { VertexWordmark } from './VertexMark'
import SectionLink from './ui/SectionLink'
import { useLanguage } from '../i18n/LanguageContext'

const CONTACT_EMAIL = 'vertexglos@gmail.com'
const PHONE_DISPLAY = '+229 01 47 33 36 16'
const PHONE_HREF = 'tel:+2290147333616'
const FASTGARAGE_URL = 'https://www.fastgarage-vg.com/'

const socialIconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-[18px] w-[18px]',
  'aria-hidden': true,
}

function LinkedInIcon() {
  return (
    <svg {...socialIconProps}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8" cy="8.2" r="0.6" fill="currentColor" stroke="none" />
      <path d="M8 11v6M13 17v-3.5c0-1.4 1-2.5 2.2-2.5s2 1 2 2.4V17" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg {...socialIconProps}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M14 8.5h-1.4c-.9 0-1.6.7-1.6 1.6V12h3l-.4 3h-2.6v6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg {...socialIconProps}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 8l8 8M16 8l-8 8" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg {...socialIconProps}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <line x1="13" y1="7" x2="13" y2="15" />
      <circle cx="10.6" cy="15.2" r="2.1" />
      <path d="M13 7c.4 1.8 2 3 3.8 3.1" />
    </svg>
  )
}

const SOCIALS = [
  { label: 'LinkedIn', Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/vertex-global1/' },
  { label: 'Facebook', Icon: FacebookIcon, href: 'https://www.facebook.com/share/1LF7Gryjkn/?mibextid=wwXIfr' },
  { label: 'X (Twitter)', Icon: XIcon, href: 'https://x.com/vertexglobal021?s=11' },
  { label: 'TikTok', Icon: TikTokIcon, href: 'https://www.tiktok.com/@vertexg5?_r=1&_t=ZS-98Ng32lAu07' },
]

const linkClass =
  'inline-flex min-h-[36px] items-center text-[0.9375rem] text-white/65 transition-colors duration-200 hover:text-white'

function ColumnTitle({ children }) {
  return <h2 className="ds-label mb-4 text-white">{children}</h2>
}

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="theme-dark mt-4 rounded-t-ds-xl bg-midnight pt-20 lg:rounded-t-ds-2xl">
      <div className="ds-container">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <VertexWordmark theme="light" markSize={38} />
            <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-white/65">{t.footer.tagline}</p>
            <ul className="mt-6 space-y-3">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className={`${linkClass} gap-2.5`}>
                  <Mail className="h-4 w-4 shrink-0 text-vertex-gold-light" aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={PHONE_HREF} className={`${linkClass} gap-2.5`}>
                  <Phone className="h-4 w-4 shrink-0 text-vertex-gold-light" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-[0.9375rem] text-white/65">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-vertex-gold-light" aria-hidden="true" />
                {t.contact.panel.address}
              </li>
            </ul>
          </div>

          <nav aria-label={t.footer.projectsTitle} className="lg:col-span-2">
            <ColumnTitle>{t.footer.projectsTitle}</ColumnTitle>
            <ul className="space-y-2">
              <li>
                <a href={FASTGARAGE_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                  FastGarage
                  <span className="live-dot" aria-hidden="true" />
                  <span className="sr-only">({t.footer.live})</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
              <li className="inline-flex min-h-[36px] items-center gap-2 text-[0.9375rem] text-white/65">
                SGMP
                <span className="ds-label inline-flex items-center gap-1 whitespace-nowrap rounded-ds-pill border border-white/15 px-2 py-0.5 text-white/60">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  {t.footer.privateB2B}
                </span>
              </li>
            </ul>
          </nav>

          <nav aria-label={t.footer.servicesTitle} className="lg:col-span-3">
            <ColumnTitle>{t.footer.servicesTitle}</ColumnTitle>
            <ul className="space-y-1">
              {t.services.items.map((service) => (
                <li key={service.title}>
                  <SectionLink to="services" className={linkClass}>
                    {service.title}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <ColumnTitle>{t.footer.socialTitle}</ColumnTitle>
            <ul className="flex flex-wrap gap-3">
              {SOCIALS.map(({ label, Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t.footer.socialAria} ${label}`}
                    className="glass-surface specular-edge spring-press flex h-11 w-11 items-center justify-center rounded-ds-pill border border-white/15 bg-white/[0.04] text-white/75 hover:-translate-y-0.5 hover:border-vertex-gold-light hover:text-vertex-gold-light active:scale-[0.94]"
                  >
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
            <SectionLink to="contact" className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-vertex-gold-light hover:text-white">
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </SectionLink>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 text-center">
          <p className="ds-data text-[0.6875rem] leading-relaxed text-white/50">
            VERTEX GLOBAL SARL · RCCM&nbsp;: RB/ABC/26 B 12287 · IFU&nbsp;: 3202687473834 · Abomey-Calavi, Bénin
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-[0.6875rem] leading-relaxed text-white/50">
            {
              "Activités : Développement de solutions numériques et technologiques, services informatiques, conseil, formation, intermédiation et mise en relation, coopération internationale, et toutes opérations s'y rattachant."
            }
          </p>
          <RouterLink
            to="/legal"
            className="mt-4 inline-flex min-h-[44px] items-center text-xs text-white/65 underline decoration-white/25 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white"
          >
            {t.footer.legalLink}
          </RouterLink>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-[0.8125rem] text-white/50">
            © {year} Vertex Global SARL. {t.footer.rights}
          </p>
          <p className="font-serif text-[0.9375rem] font-semibold italic text-vertex-gold-light">{t.footer.motto}</p>
        </div>
      </div>
    </footer>
  )
}
