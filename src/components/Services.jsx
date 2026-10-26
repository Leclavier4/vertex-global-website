import { Code2, Compass, GraduationCap, Landmark, Languages, ShieldCheck } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { useLanguage } from '../i18n/LanguageContext'

// Same order as t.services.items.
const ICONS = [Code2, ShieldCheck, Languages, Compass, GraduationCap, Landmark]

export default function Services() {
  const { t } = useLanguage()
  const { services } = t

  return (
    <section id="services" aria-labelledby="services-title" className="ds-section bg-surface">
      <div className="ds-container">
        <SectionHeader id="services-title" eyebrow={services.eyebrow} title={services.title} lede={services.lede} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal as="li" step={i % 3} key={service.title} className="flex">
                <article className="group relative flex w-full flex-col overflow-hidden rounded-ds-lg border border-border bg-white p-7 shadow-ds-sm transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-primary/25 hover:shadow-ds-lg">
                  {/* Decorative iridescent hairline, revealed on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-primary-hover to-iridescent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-ds-md bg-surface text-primary ring-1 ring-border transition-colors duration-300 group-hover:bg-primary group-hover:text-white group-hover:ring-primary">
                      <Icon className="h-[22px] w-[22px]" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <span className="ds-data text-xs text-text-secondary" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="ds-h3 mt-6 text-text-primary">{service.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-text-secondary">{service.description}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={service.title}>
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="ds-label rounded-ds-pill border border-border bg-surface px-2.5 py-1 text-text-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
