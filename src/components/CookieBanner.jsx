import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const CONSENT_KEY = 'vg_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage unavailable (private browsing, blocked storage, etc.) —
      // fail silently rather than blocking the page on a banner that can't persist anyway.
    }
  }, [])

  function choose(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value)
    } catch {
      // ignore — the banner still closes for this visit even if we can't persist the choice
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          role="dialog"
          aria-live="polite"
          aria-label="Consentement aux cookies"
          className="fixed inset-x-0 bottom-0 z-[70] bg-vertex-navy px-5 py-5 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.45)] sm:px-8"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-[13.5px] leading-relaxed text-white/85 sm:text-left">
              {"Nous utilisons des cookies essentiels au bon fonctionnement du site. Aucune donnée personnelle n'est revendue ni partagée avec des tiers."}{' '}
              <Link
                to="/legal"
                className="text-vertex-gold-light underline decoration-transparent underline-offset-2 transition-colors duration-200 hover:decoration-vertex-gold-light"
              >
                En savoir plus
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose('refused')}
                className="rounded-lg bg-gray-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-gray-400"
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={() => choose('accepted')}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-500"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
