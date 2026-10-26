import { motion } from 'framer-motion'
import { ArrowRight, BadgeCheck, ChevronDown } from 'lucide-react'
import OilSlick from './OilSlick'
import Button from './ui/Button'
import SectionLink from './ui/SectionLink'
import { duration, ease } from '../lib/motion'
import { useLanguage } from '../i18n/LanguageContext'

/* The headline is the brand tagline and stays in English in both
   languages, by brand design. */
const HEADLINE = "Building Africa's next innovation layer."

const intro = (step) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: duration.slower, ease: ease.out, delay: 0.25 + step * 0.12 },
})

function GlassBadge({ icon, label, value, floatDelay = 0 }) {
  return (
    <motion.div
      className="glass-surface specular-edge flex items-center gap-3 rounded-ds-lg border border-white/15 bg-midnight/55 py-3 pl-3 pr-5 shadow-[0_20px_48px_-24px_rgba(8,20,38,0.9)]"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-ds-md bg-white/10">{icon}</span>
      <span className="flex flex-col">
        <span className="ds-label text-white/60">{label}</span>
        <span className="ds-data text-sm font-medium text-white">{value}</span>
      </span>
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useLanguage()

  const badges = (
    <>
      <GlassBadge
        icon={<BadgeCheck className="h-[18px] w-[18px] text-vertex-gold-light" aria-hidden="true" />}
        label={t.hero.badgeLegalLabel}
        value={t.hero.badgeLegalValue}
      />
      <GlassBadge
        icon={<span className="live-dot" aria-hidden="true" />}
        label={t.hero.badgeLiveLabel}
        value={t.hero.badgeLiveValue}
        floatDelay={1.6}
      />
    </>
  )

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="theme-dark relative isolate overflow-hidden rounded-b-ds-xl bg-midnight lg:rounded-b-ds-2xl"
    >
      <OilSlick className="absolute inset-0 -z-20" />

      {/* Readability scrims: guarantee headline contrast whatever the surface does. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,20,38,0.45)_0%,rgba(8,20,38,0.72)_55%,rgba(8,20,38,0.9)_100%)] lg:bg-[linear-gradient(90deg,rgba(8,20,38,0.9)_0%,rgba(8,20,38,0.62)_40%,rgba(8,20,38,0.08)_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-midnight/85 to-transparent"
      />

      <div className="ds-container relative flex min-h-[100svh] flex-col justify-center pb-20 pt-32 lg:min-h-[min(100svh,980px)] lg:pb-28">
        <div className="max-w-[46rem]">
          <motion.p {...intro(0)} className="ds-eyebrow inline-flex items-center gap-2.5 text-vertex-gold-light">
            <span className="h-px w-8 bg-vertex-gold-light/70" aria-hidden="true" />
            {t.hero.eyebrow}
          </motion.p>

          <h1 id="hero-title" className="ds-display mt-6 text-balance text-white">
            {HEADLINE.split(' ').map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                className="mr-[0.24em] inline-block last:mr-0"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: duration.slower, ease: ease.out, delay: 0.35 + i * 0.07 }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p {...intro(4)} className="ds-lede mt-7 text-white/75">
            {t.hero.subheadline}
          </motion.p>

          <motion.div {...intro(5)} className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="projects" size="lg">
              {t.hero.ctaPrimary}
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
            <Button to="contact" variant="ghost" size="lg">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>

          <motion.dl
            {...intro(6)}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-white/[0.12] pt-7"
          >
            {t.hero.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col justify-start gap-2">
                {/* dt precedes dd in the DOM (valid <dl>); order puts the value on top. */}
                <dt className="ds-label order-2 leading-snug text-white/60">{fact.label}</dt>
                <dd className="order-1 font-serif text-[1.75rem] font-bold leading-none tracking-[-0.02em] text-white sm:text-[2rem]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Institutional badges sit inline on smaller screens. */}
          <motion.div {...intro(7)} className="mt-10 flex flex-wrap gap-3 lg:hidden">
            {badges}
          </motion.div>
        </div>

        <motion.div
          {...intro(7)}
          className="absolute bottom-28 right-8 hidden flex-col items-end gap-3 lg:flex xl:right-12"
        >
          {badges}
        </motion.div>
      </div>

      <SectionLink
        to="about"
        aria-label={t.hero.scrollAria}
        className="absolute bottom-6 left-1/2 hidden h-11 w-11 -translate-x-1/2 items-center justify-center rounded-ds-pill text-white/60 transition-colors duration-200 hover:text-white lg:flex"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="flex"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </SectionLink>
    </section>
  )
}
