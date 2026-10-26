import { ArrowUpRight } from 'lucide-react'
import { Link as RouterLink } from 'react-router-dom'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { useLanguage } from '../i18n/LanguageContext'

// Identifiers read best in the data face (tabular figures).
const DATA_LABELS = new Set(['RCCM', 'IFU', 'IFU (tax ID)', 'Création', 'Founded'])

export default function Institution() {
  const { t } = useLanguage()
  const { institution } = t

  return (
    <section id="institution" aria-labelledby="institution-title" className="ds-section bg-surface">
      <div className="ds-container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader
            id="institution-title"
            eyebrow={institution.eyebrow}
            title={institution.title}
            lede={institution.lede}
          />
          <Reveal step={1} className="mt-8">
            <RouterLink
              to="/legal"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-ds-sm text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors duration-200 hover:decoration-primary"
            >
              {institution.legalLink}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </RouterLink>
          </Reveal>
        </div>

        <Reveal step={1} className="lg:col-span-8">
          <dl className="grid gap-px overflow-hidden rounded-ds-lg border border-border bg-border sm:grid-cols-2">
            {institution.items.map((item) => (
              <div key={item.label} className="flex flex-col gap-2 bg-white p-6 sm:p-7">
                <dt className="ds-label text-text-secondary">{item.label}</dt>
                <dd
                  className={`text-[0.9375rem] font-medium leading-snug text-text-primary ${
                    DATA_LABELS.has(item.label) ? 'ds-data text-base' : ''
                  }`}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
