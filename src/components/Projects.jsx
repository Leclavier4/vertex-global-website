import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Lock, MapPin, Navigation, Wallet } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import Button from './ui/Button'
import { useLanguage } from '../i18n/LanguageContext'

const FASTGARAGE_URL = 'https://www.fastgarage-vg.com/'

/* Illustrative interface: generic labels only, no invented garages,
   ratings, distances or response times. Decorative, hidden from AT. */
function FastGarageMockup({ mock }) {
  return (
    <motion.div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[18.5rem]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="glass-surface specular-edge rounded-[2.25rem] border border-white/15 bg-white/[0.05] p-2.5 shadow-[0_40px_80px_-32px_rgba(0,0,0,0.8)]">
        <div className="overflow-hidden rounded-[1.75rem] bg-midnight">
          <div className="flex items-center justify-between px-5 pb-3 pt-5">
            <span className="font-serif text-sm font-bold text-white">FastGarage</span>
            <span className="live-dot" />
          </div>

          <div className="relative mx-3 h-36 overflow-hidden rounded-ds-lg bg-navy-deep">
            <svg className="absolute inset-0 h-full w-full text-white/[0.06]" viewBox="0 0 200 140" preserveAspectRatio="none">
              <path d="M0 30h200M0 70h200M0 110h200M40 0v140M100 0v140M160 0v140" stroke="currentColor" strokeWidth="1" />
              <path d="M18 120 C 60 100, 70 60, 112 58 S 170 30, 186 18" fill="none" stroke="#22D3EE" strokeOpacity="0.7" strokeWidth="2" strokeDasharray="4 5" />
            </svg>
            <span className="absolute left-[52%] top-[36%] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/20 ring-4 ring-accent/10">
              <MapPin className="h-4 w-4 text-accent" />
            </span>
            <span className="ds-label absolute bottom-2.5 left-3 rounded-ds-pill bg-midnight/70 px-2 py-0.5 text-white/70">
              {mock.location}
            </span>
          </div>

          <div className="space-y-2.5 p-3">
            <div className="rounded-ds-md border border-white/10 bg-white/[0.04] p-3">
              <p className="ds-label text-white/50">{mock.request}</p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 whitespace-nowrap text-xs font-medium text-white">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/40">
                    <Navigation className="h-3 w-3 text-white" />
                  </span>
                  {mock.mechanic}
                </span>
                <span className="ds-label shrink-0 whitespace-nowrap rounded-ds-pill bg-emerald-400/15 px-2 py-0.5 text-emerald-300">
                  {mock.status}
                </span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-accent to-primary-hover" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-ds-md bg-vertex-gold-light py-2.5 text-xs font-semibold text-navy">
              <Wallet className="h-3.5 w-3.5" />
              {mock.pay}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const { projects } = t
  const fg = projects.fastgarage
  const sgmp = projects.sgmp

  return (
    <section id="projects" aria-labelledby="projects-title" className="ds-section bg-background">
      <div className="ds-container">
        <SectionHeader id="projects-title" eyebrow={projects.eyebrow} title={projects.title} lede={projects.lede} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {/* FastGarage: flagship, spans two columns. */}
          <Reveal as="article" aria-labelledby="fastgarage-title" className="lg:col-span-2">
            <div className="theme-dark relative h-full overflow-hidden rounded-ds-xl bg-navy p-7 shadow-ds-lg sm:p-10">
              <div aria-hidden="true" className="iridescent-halo pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-ds-xl ring-1 ring-inset ring-white/10" />

              <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="ds-label inline-flex items-center gap-2 rounded-ds-pill border border-white/15 bg-white/[0.06] px-3 py-1.5 text-white/80">
                    <span className="live-dot" aria-hidden="true" />
                    {fg.status}
                  </p>
                  <h3 id="fastgarage-title" className="ds-h2 mt-6 text-white">
                    {fg.name}
                  </h3>
                  <p className="mt-2 font-serif text-lg font-semibold text-vertex-gold-light">{fg.tagline}</p>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/70">{fg.description}</p>

                  <ul className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                    {fg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-white/85">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                          <Check className="h-3 w-3 text-accent" aria-hidden="true" strokeWidth={2.5} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button href={FASTGARAGE_URL} aria-label={fg.ctaAria} className="mt-9">
                    {fg.cta}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Button>
                </div>

                <FastGarageMockup mock={fg.mock} />
              </div>
            </div>
          </Reveal>

          {/* SGMP: finished private B2B tool, presented discreetly, no external link. */}
          <Reveal as="article" step={1} aria-labelledby="sgmp-title">
            <div className="flex h-full flex-col rounded-ds-xl border border-border bg-surface p-7 sm:p-9">
              <p className="ds-label inline-flex w-fit items-center gap-2 rounded-ds-pill border border-border bg-white px-3 py-1.5 text-text-secondary">
                <Lock className="h-3 w-3" aria-hidden="true" />
                {sgmp.status}
              </p>
              <h3 id="sgmp-title" className="ds-h2 mt-6 text-text-primary">
                {sgmp.name}
              </h3>
              <p className="mt-2 font-serif text-lg font-semibold text-text-primary/80">{sgmp.fullName}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-secondary">{sgmp.description}</p>

              <ul className="mt-6 flex flex-wrap gap-2" aria-label={sgmp.name}>
                {sgmp.tags.map((tag) => (
                  <li key={tag} className="ds-label rounded-ds-pill border border-border bg-white px-2.5 py-1 text-text-secondary">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-9">
                <p className="text-sm text-text-secondary">{sgmp.note}</p>
                <Button to="contact" variant="secondary" className="mt-4 w-full sm:w-auto lg:w-full">
                  {sgmp.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
