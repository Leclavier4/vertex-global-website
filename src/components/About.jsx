import { FileCheck2, Layers, Route } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { useLanguage } from '../i18n/LanguageContext'

const PROBLEM_ICONS = [Route, FileCheck2, Layers]

export default function About() {
  const { t } = useLanguage()
  const { about } = t

  return (
    <section id="about" aria-labelledby="about-title" className="ds-section bg-background">
      <div className="ds-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader id="about-title" eyebrow={about.eyebrow} title={about.title} />
          </div>
          <div className="space-y-5 lg:col-span-7 lg:pt-10">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal as="p" step={i} key={paragraph} className="ds-body text-text-secondary">
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal
          as="figure"
          className="relative mt-20 overflow-hidden rounded-ds-xl border border-border bg-surface px-7 py-10 sm:px-12 sm:py-14"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-10 left-0 w-[3px] rounded-r-full bg-gradient-to-b from-vertex-gold-light via-vertex-gold to-transparent sm:inset-y-14"
          />
          <figcaption className="ds-eyebrow text-primary">{about.missionEyebrow}</figcaption>
          <blockquote className="ds-quote mt-5 max-w-4xl text-balance text-text-primary">
            <p>{about.mission}</p>
          </blockquote>
        </Reveal>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal as="h3" className="ds-h3 text-text-primary">
              {about.problemsTitle}
            </Reveal>
            <ul className="mt-8 space-y-4">
              {about.problems.map((problem, i) => {
                const Icon = PROBLEM_ICONS[i]
                return (
                  <Reveal as="li" step={i} key={problem.title}>
                    <div className="flex gap-5 rounded-ds-lg border border-border bg-white p-5 transition-colors duration-300 hover:border-primary/30 sm:p-6">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-ds-md bg-surface text-primary ring-1 ring-border">
                        <Icon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                      </span>
                      <div>
                        <p className="font-serif text-[1.0625rem] font-semibold text-text-primary">{problem.title}</p>
                        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-secondary">{problem.text}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </ul>
          </div>

          <div>
            <Reveal as="h3" className="ds-h3 text-text-primary">
              {about.processTitle}
            </Reveal>
            <ol className="relative mt-8 space-y-8 before:absolute before:bottom-4 before:left-[21px] before:top-4 before:w-px before:bg-gradient-to-b before:from-border before:via-primary/30 before:to-border">
              {about.steps.map((item, i) => (
                <Reveal as="li" step={i} key={item.step} className="relative flex gap-5">
                  <span className="ds-data relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-ds-pill border border-border bg-white text-sm font-medium text-primary shadow-ds-sm">
                    {item.step}
                  </span>
                  <div className="pt-1.5">
                    <p className="font-serif text-[1.0625rem] font-semibold text-text-primary">{item.title}</p>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-secondary">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
