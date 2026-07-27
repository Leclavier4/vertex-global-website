import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
]

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div
      className="fixed bottom-6 left-6 z-30 flex items-center gap-1 rounded-full border border-white/15 bg-vertex-navy/90 p-1 shadow-lg shadow-black/20 backdrop-blur-md md:bottom-8 md:left-8"
      role="group"
      aria-label="FR / EN"
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-label={code === 'fr' ? t.languageSwitcher.toFrench : t.languageSwitcher.toEnglish}
          aria-pressed={lang === code}
          className={`relative z-10 rounded-full px-3.5 py-2 text-xs font-bold transition-colors duration-200 ${
            lang === code ? 'text-vertex-navy' : 'text-white/70 hover:text-white'
          }`}
        >
          {lang === code && (
            <motion.span
              layoutId="lang-switch-pill"
              className="absolute inset-0 -z-10 rounded-full bg-vertex-gold"
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            />
          )}
          {label}
        </button>
      ))}
    </div>
  )
}
