import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cookie } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { duration, ease } from '../lib/motion'

const CONSENT_KEY = 'vg_cookie_consent'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(CONSENT_KEY)) setVisible(true)
    } catch {
      // Storage unavailable (private mode, blocked): never block the page on
      // a banner whose choice couldn't be persisted anyway.
    }
  }, [])

  function choose(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // The banner still closes for this visit.
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: duration.slow, ease: ease.out }}
          role="region"
          aria-label={t.cookie.aria}
          className="theme-dark fixed inset-x-3 bottom-3 z-[70] sm:inset-x-0 sm:bottom-6 sm:mx-auto sm:w-[min(40rem,calc(100%-3rem))]"
        >
          <div className="glass-surface specular-edge flex flex-col gap-5 rounded-ds-xl border border-white/15 bg-navy/90 p-5 shadow-[0_24px_60px_-24px_rgba(8,20,38,0.9)] sm:flex-row sm:items-center sm:p-6">
            <div className="flex gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-vertex-gold-light" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-white/80">
                {t.cookie.text}{' '}
                <Link
                  to="/legal"
                  className="font-medium text-vertex-gold-light underline decoration-vertex-gold-light/40 underline-offset-2 hover:decoration-vertex-gold-light"
                >
                  {t.cookie.more}
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-2.5">
              <button
                type="button"
                onClick={() => choose('refused')}
                className="spring-press min-h-[44px] flex-1 rounded-ds-md border border-white/20 bg-white/[0.06] px-5 text-sm font-semibold text-white hover:bg-white/[0.12] active:scale-[0.96] sm:flex-none"
              >
                {t.cookie.refuse}
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="spring-press min-h-[44px] flex-1 rounded-ds-md bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 active:scale-[0.96] sm:flex-none"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
