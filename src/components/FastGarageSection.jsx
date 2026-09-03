import { motion } from 'framer-motion'
import { MapPin, Clock, ShieldCheck, Star, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const FEATURE_ICONS = [MapPin, Clock, ShieldCheck]

const GARAGES = [
  { name: 'Garage Alpha', distance: '0.8 km', rating: 5 },
  { name: 'Moto Express', distance: '1.2 km', rating: 4 },
  { name: 'AutoPro', distance: '2.1 km', rating: 5 },
]

export default function FastGarageSection() {
  const { t } = useLanguage()
  const fg = t.fastgarage

  return (
    <section
      id="fastgarage"
      className="relative overflow-hidden bg-vertex-off-white py-20 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-vertex-orange/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 md:px-8 lg:grid-cols-2 lg:px-16">
        {/* LEFT — copy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-vertex-orange">
            {fg.label}
          </span>
          <h2 className="mt-4 font-serif text-[36px] font-bold leading-tight text-vertex-navy md:text-[52px]">
            {fg.title}
          </h2>
          <span className="mt-3 block h-0.5 w-20 bg-vertex-gold" aria-hidden="true" />
          <p className="mt-6 text-xl italic text-vertex-text-mid">{fg.tagline}</p>

          {fg.body.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[15.5px] leading-[1.7] text-vertex-text-mid">
              {paragraph}
            </p>
          ))}

          <div className="mt-9 flex flex-col gap-6 sm:flex-row sm:flex-wrap">
            {fg.features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i]
              return (
                <div key={feature.title} className="flex items-start gap-3 sm:max-w-[180px]">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-vertex-orange" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-bold text-vertex-navy">{feature.title}</p>
                    <p className="mt-0.5 text-xs leading-snug text-vertex-text-muted">{feature.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <motion.a
            href="https://fast-garage.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-vertex-orange px-8 py-4 font-semibold text-vertex-navy transition-colors duration-200 hover:bg-vertex-orange-dark"
          >
            {fg.cta}
          </motion.a>
        </motion.div>

        {/* RIGHT — interface mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full max-w-sm rounded-2xl bg-vertex-navy p-5 shadow-2xl transition-shadow duration-300 hover:shadow-[0_0_60px_-8px_rgba(245,158,11,0.45)]"
          >
            {/* top bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.span
                  aria-hidden="true"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="h-2.5 w-2.5 rounded-full bg-vertex-success"
                />
                <span className="text-sm font-bold text-white">FastGarage</span>
              </div>
              <span className="text-xs text-white/40">v1.0</span>
            </div>

            {/* map placeholder */}
            <div className="relative mt-4 flex h-36 flex-col items-center justify-center gap-2 rounded-xl bg-vertex-blue-deep">
              <MapPin className="h-8 w-8 text-vertex-orange" aria-hidden="true" />
              <span className="text-xs text-white/60">{fg.mapLabel}</span>
            </div>

            {/* mini garage cards */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {GARAGES.map((garage) => (
                <div key={garage.name} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
                  <p className="truncate text-[11px] font-semibold text-white">{garage.name}</p>
                  <p className="mt-0.5 text-[10px] text-white/50">{garage.distance}</p>
                  <div className="mt-1 flex gap-0.5" aria-hidden="true">
                    {Array.from({ length: garage.rating }).map((_, idx) => (
                      <Star key={idx} className="h-2.5 w-2.5 fill-vertex-orange text-vertex-orange" />
                    ))}
                  </div>
                  <span className="mt-1.5 inline-block rounded-full bg-vertex-success/20 px-1.5 py-0.5 text-[9px] font-semibold text-vertex-success">
                    {fg.available}
                  </span>
                </div>
              ))}
            </div>

            {/* decorative CTA, part of the mockup */}
            <div
              aria-hidden="true"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-vertex-orange py-3 text-sm font-semibold text-vertex-navy"
            >
              <Phone className="h-4 w-4" />
              {fg.callCta}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
