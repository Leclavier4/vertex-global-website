import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

/* ---------------------------------------------------------------------
   Custom inline SVG icons, one per pole, drawn in the brand's minimal
   geometric line-art style (24x24, currentColor stroke).
   --------------------------------------------------------------------- */
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function IconBolt(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  )
}

function IconHeartPulse(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 20.3c-4.2-2.6-8-6.3-8-10.2C4 7.1 6 5 8.5 5c1.6 0 3 .9 3.5 2.2C12.5 5.9 13.9 5 15.5 5 18 5 20 7.1 20 10.1c0 3.9-3.8 7.6-8 10.2z" />
      <path d="M6 11h2.3l1.4-2.8L11.6 14l1.7-4 1 1H18" />
    </svg>
  )
}

function IconShieldCheck(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M12 2 20 5v6c0 5-3.5 8.7-8 10-4.5-1.3-8-5-8-10V5l8-3z" />
      <path d="M8.5 12 11 14.5 15.5 9.5" />
    </svg>
  )
}

function IconCircuit(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  )
}

function IconGlobePin(props) {
  return (
    <svg {...iconProps} {...props}>
      <circle cx="9" cy="9" r="6" />
      <ellipse cx="9" cy="9" rx="2.3" ry="6" />
      <path d="M3 9h12" />
      <path d="M17 12c-2.2 0-4 1.9-4 4.2 0 3 4 7.6 4 7.6s4-4.6 4-7.6c0-2.3-1.8-4.2-4-4.2z" />
      <circle cx="17" cy="16.1" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconTelescope(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="2" y="10.5" width="13" height="5" rx="2" transform="rotate(-22 8.5 13)" />
      <circle cx="18.5" cy="7.5" r="2.8" />
      <path d="M6 18.5 4 21.5M9.5 19 10.5 21.5" />
      <circle cx="20" cy="3" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="2.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

const ICONS = [IconBolt, IconHeartPulse, IconShieldCheck, IconCircuit, IconGlobePin, IconTelescope]

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Poles() {
  const { t } = useLanguage()

  return (
    <section id="poles" className="bg-vertex-navy py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-vertex-gold">
            {t.poles.label}
          </span>
          <h2 className="mt-4 font-serif text-[28px] font-bold text-white md:text-[48px]">
            {t.poles.titleWhite} <span className="text-vertex-gold">{t.poles.titleGold}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.poles.items.map(({ name, description }, i) => {
            const Icon = ICONS[i]
            return (
              <motion.article
                key={name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-vertex-blue-deep p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-vertex-blue-light/20"
              >
                <Icon className="h-10 w-10 text-vertex-gold-light" />
                <h3 className="mt-6 font-serif text-xl font-bold text-white">{name}</h3>
                <p className="mt-2.5 text-sm leading-[1.6] text-gray-400">{description}</p>

                <ArrowUpRight
                  className="absolute bottom-6 right-6 h-5 w-5 text-vertex-gold-light opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-vertex-gold transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
