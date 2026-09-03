import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const VENTURES_META = [
  {
    accentBorder: 'border-l-vertex-gold',
    statusDot: 'bg-green-500',
    statusText: 'text-green-700',
    tags: ['#EnergyTech', '#MobileMoney', '#Bénin'],
  },
  {
    accentBorder: 'border-l-vertex-orange',
    statusDot: 'bg-vertex-success',
    statusText: 'text-green-700',
    tags: ['#MobilityTech', '#Automotive', '#Bénin', '#En production'],
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function Ventures() {
  const { t } = useLanguage()
  const [hoveredTooltip, setHoveredTooltip] = useState(null)

  return (
    <section id="ventures" className="bg-vertex-off-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-vertex-gold">
            {t.ventures.label}
          </span>
          <h2 className="mt-4 font-serif text-[28px] font-bold text-vertex-navy md:text-[42px]">
            {t.ventures.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {t.ventures.items.map((venture, i) => {
            const meta = VENTURES_META[i]
            return (
              <motion.article
                key={venture.name}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                onMouseEnter={() => venture.tooltip && setHoveredTooltip(venture.name)}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`relative rounded-2xl border-l-4 bg-white p-9 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-10px_rgba(183,134,44,0.35)] ${meta.accentBorder}`}
              >
                <AnimatePresence>
                  {venture.tooltip && hoveredTooltip === venture.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18 }}
                      className="pointer-events-none absolute -top-3 left-9 z-20 -translate-y-full whitespace-nowrap rounded-lg bg-vertex-navy px-3.5 py-2 text-xs font-medium text-white shadow-lg"
                    >
                      {venture.tooltip}
                      <span className="absolute left-6 top-full h-0 w-0 border-4 border-transparent border-t-vertex-navy" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                    <span className={`h-2 w-2 rounded-full ${meta.statusDot}`} />
                    <span className={meta.statusText}>{venture.status}</span>
                  </span>
                  <span className="rounded-full bg-vertex-blue/10 px-3 py-1 text-xs font-bold text-vertex-blue">
                    {venture.pole}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-[28px] font-bold text-vertex-navy">{venture.name}</h3>

                {venture.description && (
                  <p className="mt-3 text-[15px] leading-[1.65] text-vertex-text-mid">{venture.description}</p>
                )}

                <p className="mt-5 rounded-r-lg border-l-2 border-vertex-gold bg-vertex-gold/[0.06] px-5 py-3 text-[14.5px] italic text-vertex-text-mid">
                  {t.ventures.quoteOpen}
                  {venture.problem}
                  {t.ventures.quoteClose}
                </p>

                <p className="mt-5 text-[15.5px] leading-[1.7] text-vertex-text-mid">{venture.solution}</p>

                {venture.cta && (
                  <motion.a
                    href={venture.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-vertex-orange bg-transparent px-6 py-2.5 text-sm font-semibold text-vertex-orange transition-colors duration-200 hover:bg-vertex-orange hover:text-white"
                  >
                    {venture.cta.label}
                  </motion.a>
                )}

                <div className="mt-6 flex flex-wrap gap-2">
                  {meta.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-vertex-blue/[0.08] px-3 py-1.5 text-xs font-semibold text-vertex-blue"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mt-8 overflow-hidden rounded-2xl border border-dashed border-gray-300"
        >
          <p className="select-none px-10 py-16 text-center text-[15.5px] blur-[3px] text-vertex-text-mid">
            {t.ventures.teaserText}
          </p>
          <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
            <ScrollLink
              to="join"
              smooth
              duration={500}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-vertex-gold px-6 py-3 text-sm font-semibold text-vertex-gold transition-all duration-200 hover:scale-[1.02] hover:bg-vertex-gold hover:text-white"
            >
              {t.ventures.teaserCta}
              <ArrowRight className="h-4 w-4" />
            </ScrollLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
