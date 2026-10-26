import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import { duration, ease } from '../lib/motion'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

/* `floating`: fixed bottom-left pill, desktop only (on phones it would
   cover content, so the mobile menu renders an inline instance instead). */
export default function LanguageSwitcher({ floating = true }) {
  const { lang, setLang, t } = useLanguage()
  const pillId = floating ? 'lang-switch-pill' : 'lang-switch-pill-inline'

  return (
    <div
      className={`theme-dark glass-surface specular-edge items-center gap-0.5 rounded-ds-pill border border-white/15 bg-navy/80 p-1 ${
        floating
          ? 'fixed bottom-8 left-8 z-40 hidden shadow-[0_12px_32px_-16px_rgba(8,20,38,0.8)] md:flex'
          : 'inline-flex self-start'
      }`}
      role="group"
      aria-label={t.languageSwitcher.group}
    >
      {LANGS.map(({ code, label }) => {
        const selected = lang === code
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => setLang(code)}
            aria-label={code === 'fr' ? t.languageSwitcher.toFrench : t.languageSwitcher.toEnglish}
            aria-pressed={selected}
            className={`spring-press relative z-10 inline-flex h-11 min-w-[44px] items-center justify-center rounded-ds-pill px-3 font-label text-xs font-bold tracking-[0.08em] active:scale-[0.94] ${
              selected ? 'text-navy' : 'text-white/70 hover:text-white'
            }`}
          >
            {selected && (
              <motion.span
                layoutId={pillId}
                className="absolute inset-0 -z-10 rounded-ds-pill bg-vertex-gold-light"
                transition={{ duration: duration.base, ease: ease.spring }}
              />
            )}
            {label}
          </button>
        )
      })}
    </div>
  )
}
