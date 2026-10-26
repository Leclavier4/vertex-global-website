import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { scrollToSection } from '../lib/scroll'
import { duration, ease } from '../lib/motion'

export default function ScrollToTop() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToSection('top')}
          aria-label={t.scrollToTop}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          whileTap={{ scale: 0.92, transition: { duration: duration.fast } }}
          transition={{ duration: duration.base, ease: ease.spring }}
          className="theme-dark glass-surface specular-edge fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-ds-pill border border-white/15 bg-navy/80 text-white shadow-[0_12px_32px_-16px_rgba(8,20,38,0.8)] transition-colors duration-200 hover:bg-primary md:bottom-8 md:right-8"
        >
          <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
