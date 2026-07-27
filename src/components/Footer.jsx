import { Link as ScrollLink } from 'react-scroll'
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
    { label: t.nav.join, to: 'join' },
    { label: t.nav.contact, to: 'contact' },
  ]

  return (
    <footer className="bg-vertex-navy pt-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 pb-14 md:grid-cols-3">
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
                href="https://wa.me/22901473316"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[14.5px] text-[#9CA9BA] transition-colors duration-200 hover:text-vertex-gold-light"
              >
                <Phone className="h-4 w-4 shrink-0 text-vertex-gold" />
                +229 01 47 33 36 16
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-white">{t.footer.navTitle}</h4>
            <nav className="mt-5 flex flex-col gap-3" aria-label={t.nav.ariaFooter}>
              {navItems.map((item) => (
                <ScrollLink
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-80}
                  className="w-fit cursor-pointer text-[14.5px] text-[#B8C4D4] transition-colors duration-200 hover:text-vertex-gold-light"
                >
                  {item.label}
                </ScrollLink>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.08em] text-white">{t.footer.socialTitle}</h4>
            <div className="mt-5 flex gap-3.5">
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

        <hr className="border-t border-vertex-gold/30" />

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
