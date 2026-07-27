import { motion } from 'framer-motion'
import { Search, Layers, TrendingUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const ICONS = [Search, Layers, TrendingUp]

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="relative overflow-hidden bg-vertex-off-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 md:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-16">
        {/* Left column */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span
            className="pointer-events-none absolute -top-12 -left-2 select-none font-serif text-[140px] font-bold leading-none text-vertex-navy/5 sm:text-[180px]"
            aria-hidden="true"
          >
            01
          </span>

          <div className="relative">
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-vertex-gold">
              {t.about.label}
            </span>
            <h2 className="mt-4 font-serif text-[28px] font-bold leading-tight tracking-tight text-vertex-navy md:text-[42px]">
              {t.about.title}
            </h2>
            <div className="my-7 h-0.5 w-20 rounded bg-gradient-to-r from-vertex-gold to-vertex-gold-light" />

            <div className="space-y-5 text-[16px] leading-[1.7] text-vertex-text-mid">
              {t.about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column: process cards */}
        <div className="flex flex-col gap-5">
          {t.about.cards.map(({ step, text }, i) => {
            const Icon = ICONS[i]
            return (
              <motion.div
                key={step}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="rounded-2xl border-t-[3px] border-vertex-gold bg-vertex-navy p-8 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <Icon className="mb-4 h-8 w-8 text-vertex-gold-light" strokeWidth={1.7} />
                <h3 className="mb-2 font-serif text-xl font-bold text-white">{step}</h3>
                <p className="text-[15px] leading-[1.6] text-[#C7CFDA]">{text}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
