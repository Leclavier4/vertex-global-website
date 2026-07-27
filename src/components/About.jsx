import { motion } from 'framer-motion'
import { Search, Layers, TrendingUp } from 'lucide-react'

const PROCESS_CARDS = [
  {
    step: '01 / Identifier',
    icon: Search,
    text: 'Nous partons d’un problème réel, observable, documenté sur le terrain. Jamais d’une idée technologique.',
  },
  {
    step: '02 / Construire',
    icon: Layers,
    text: 'Une solution numérique adaptée aux réalités locales, développée après validation de la demande.',
  },
  {
    step: '03 / Scaler',
    icon: TrendingUp,
    text: 'Du Bénin à l’Afrique de l’Ouest. De l’Afrique de l’Ouest au monde.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

export default function About() {
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
              À propos
            </span>
            <h2 className="mt-4 font-serif text-[28px] font-bold leading-tight tracking-tight text-vertex-navy md:text-[42px]">
              Nous ne construisons pas des applications.
            </h2>
            <div className="my-7 h-0.5 w-20 rounded bg-gradient-to-r from-vertex-gold to-vertex-gold-light" />

            <div className="space-y-5 text-[16px] leading-[1.7] text-vertex-text-mid">
              <p>
                Nous construisons des systèmes. Là où une startup classique mise tout sur un seul
                produit, Vertex Global bâtit un portefeuille de ventures numériques capables de
                résoudre des problèmes réels à l&apos;échelle africaine.
              </p>
              <p>
                Notre avantage compétitif n&apos;est pas la technologie. C&apos;est notre
                compréhension intime des défis locaux et notre capacité à y répondre avec méthode
                et discipline.
              </p>
              <p>
                Ce modèle n&apos;est pas une mode, c&apos;est une nécessité de timing. L&apos;Afrique
                de l&apos;Ouest connaît aujourd&apos;hui la convergence rare d&apos;une adoption
                massive du mobile money, d&apos;une jeunesse ultra-connectée et d&apos;infrastructures
                encore à construire — ce qui laisse un espace immense pour des solutions pensées
                depuis le terrain plutôt qu&apos;importées d&apos;ailleurs. Cotonou est notre point de
                départ précisément parce que le Bénin concentre ces conditions à échelle humaine,
                assez petite pour valider vite, assez connectée à la sous-région pour scaler
                naturellement.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right column — process cards */}
        <div className="flex flex-col gap-5">
          {PROCESS_CARDS.map(({ step, icon: Icon, text }, i) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
