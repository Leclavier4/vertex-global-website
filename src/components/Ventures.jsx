import { motion } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { ArrowRight } from 'lucide-react'

const VENTURES = [
  {
    name: 'RechargRapid',
    pole: 'EnergyTech',
    accentBorder: 'border-l-vertex-gold',
    status: 'En développement',
    statusDot: 'bg-green-500',
    statusText: 'text-green-700',
    problem: 'Vous êtes dans le noir à 22h. Votre compteur SBEE est tombé à zéro. Le bureau est fermé.',
    solution:
      "Recharge de compteurs SBEE par Mobile Money — disponible 24h/24, depuis n'importe quel téléphone.",
    tags: ['#EnergyTech', '#MobileMoney', '#Bénin'],
  },
  {
    name: 'FastGarage',
    pole: 'MobilityTech',
    accentBorder: 'border-l-[#F59E0B]',
    status: 'En développement',
    statusDot: 'bg-[#F59E0B]',
    statusText: 'text-amber-700',
    problem: 'Vous êtes en panne sur la route. Vous ne savez pas qui appeler ni où aller.',
    solution: 'Mise en relation immédiate avec des garages et dépanneurs certifiés au Bénin.',
    tags: ['#MobilityTech', '#Automotive', '#Bénin'],
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
  return (
    <section id="ventures" className="bg-vertex-off-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <div className="mb-14 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-vertex-gold">
            En construction, en production
          </span>
          <h2 className="mt-4 font-serif text-[28px] font-bold text-vertex-navy md:text-[42px]">
            Nos ventures
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {VENTURES.map((venture, i) => (
            <motion.article
              key={venture.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className={`rounded-2xl border-l-4 bg-white p-9 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_44px_-10px_rgba(183,134,44,0.35)] ${venture.accentBorder}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide">
                  <span className={`h-2 w-2 rounded-full ${venture.statusDot}`} />
                  <span className={venture.statusText}>{venture.status}</span>
                </span>
                <span className="rounded-full bg-vertex-blue/10 px-3 py-1 text-xs font-bold text-vertex-blue">
                  {venture.pole}
                </span>
              </div>

              <h3 className="mt-5 font-serif text-[28px] font-bold text-vertex-navy">{venture.name}</h3>

              <p className="mt-5 rounded-r-lg border-l-2 border-vertex-gold bg-vertex-gold/[0.06] px-5 py-3 text-[14.5px] italic text-vertex-text-mid">
                « {venture.problem} »
              </p>

              <p className="mt-5 text-[15.5px] leading-[1.7] text-vertex-text-mid">{venture.solution}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {venture.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-vertex-blue/[0.08] px-3 py-1.5 text-xs font-semibold text-vertex-blue"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative mt-8 overflow-hidden rounded-2xl border border-dashed border-gray-300"
        >
          <p className="select-none px-10 py-16 text-center text-[15.5px] blur-[3px] text-vertex-text-mid">
            3+ ventures en conception, réparties entre HealthTech, Cybersécurité et Intelligence
            Artificielle, actuellement en phase de validation terrain avant premier déploiement.
          </p>
          <div className="absolute inset-0 flex items-center justify-center bg-white/55 backdrop-blur-[2px]">
            <ScrollLink
              to="join"
              smooth
              duration={500}
              offset={-80}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-vertex-gold px-6 py-3 text-sm font-semibold text-vertex-gold transition-all duration-200 hover:scale-[1.02] hover:bg-vertex-gold hover:text-white"
            >
              Rejoignez-nous pour découvrir la suite
              <ArrowRight className="h-4 w-4" />
            </ScrollLink>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
