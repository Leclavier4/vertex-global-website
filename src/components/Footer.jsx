import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { VertexWordmark } from './VertexMark'
import { useLanguage } from '../i18n/LanguageContext'

const socialIconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'h-[18px] w-[18px]',
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

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  const navItems = [
    { label: t.nav.accueil, to: 'hero' },
    { label: t.nav.about, to: 'about' },
    { label: t.nav.poles, to: 'poles' },
    { label: t.nav.ventures, to: 'ventures' },
    { label: t.nav.fastgarage, to: 'fastgarage' },
    { label: t.nav.join, to: 'join' },
    { label: t.nav.contact, to: 'contact' },
  ]

  return (
    <footer className="bg-vertex-navy pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.85fr_1fr_1fr]">
          <div>
            <VertexWordmark theme="light" markSize={40} />
            <p className="mt-5 max-w-xs text-[14.5px] text-[#9CA9BA]">{t.footer.tagline}</p>
            <p className="mt-2 text-[14.5px] text-[#9CA9BA]">
              {t.footer.location} · {year}
            </p>

            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href="mailto:vertexglos@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[14.5px] text-[#9CA9BA] transition-colors duration-200 hover:text-vertex-gold-light"
              >
                <Mail className="h-4 w-4 shrink-0 text-vertex-gold" />
                vertexglos@gmail.com
              </a>
              <a
                href="https://wa.me/22901473336116"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[14.5px] text-[#9CA9BA] transition-colors duration-200 hover:text-vertex-gold-light"
              >
                <Phone className="h-4 w-4 shrink-0 text-vertex-gold" />
                +229 01 47 33 36 116
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">{t.footer.navTitle}</h4>
            <nav className="flex flex-col gap-1" aria-label={t.nav.ariaFooter}>
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-80}
                  className="block w-fit cursor-pointer border-l-2 border-transparent py-1 pl-0 text-[14.5px] text-[#B8C4D4] transition-all duration-200 hover:border-vertex-gold hover:pl-3 hover:text-vertex-gold-light"
                >
                  {item.label}
                </ScrollLink>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">{t.footer.venturesTitle}</h4>
            <div className="flex flex-col gap-5">
              {t.ventures.items.map((venture) => {
                const isFastGarage = venture.name === 'FastGarage'
                return isFastGarage ? (
                  <div key={venture.name} className="group flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14.5px] font-medium text-white">{venture.name}</span>
                      <span className="animate-pulse rounded-full bg-vertex-orange px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        Live
                      </span>
                    </div>
                    <a
                      href="https://fast-garage.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-fit items-center gap-1 text-xs text-[#8493A6] transition-colors duration-200 hover:text-vertex-gold-light"
                    >
                      fast-garage.vercel.app
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                ) : (
                  <span key={venture.name} className="w-fit text-[14.5px] text-[#B8C4D4]">
                    {venture.name} <span className="text-[#8493A6]">— {venture.status}</span>
                  </span>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-white">{t.footer.socialTitle}</h4>
            <div className="flex gap-3.5">
              {SOCIALS.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t.footer.socialAria} ${label}`}
                  className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-white/20 text-[#B8C4D4] transition-all duration-200 hover:-translate-y-1 hover:border-vertex-gold-light hover:text-vertex-gold-light"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 mt-12 border-t border-vertex-gold/30" />

        <div className="flex flex-col items-center gap-2 pb-4 text-center">
          <p className="text-[10.5px] leading-relaxed text-[#4B5563]">
            VERTEX GLOBAL SARL — RCCM : RB/ABC/26 B 12287 — IFU : 3202687473834 — Abomey-Calavi, Bénin
          </p>

          <p className="max-w-2xl text-[10.5px] leading-relaxed text-[#4B5563]">
            {
              "Activités : Développement de solutions numériques et technologiques, services informatiques, conseil, formation, intermédiation et mise en relation, coopération internationale, et toutes opérations s'y rattachant."
            }
          </p>

          <RouterLink
            to="/legal"
            className="mt-1 text-[11px] text-[#6B7280] underline underline-offset-2 transition-colors duration-200 hover:text-vertex-gold-light"
          >
            Mentions légales &amp; Politique de confidentialité
          </RouterLink>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
          <p className="text-[13.5px] text-[#8493A6]">
            © {year} Vertex Global SARL. {t.footer.rights}
          </p>
          <p className="font-serif text-[15px] italic text-vertex-gold">{t.footer.motto}</p>
        </div>
      </div>
    </footer>
  )
}
