import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'
import CookieBanner from './components/CookieBanner'
import { useLanguage } from './i18n/LanguageContext'

function SkipLink() {
  const { t } = useLanguage()
  return (
    <a
      href="#main"
      className="skip-link rounded-ds-md bg-primary px-4 py-3 text-sm font-semibold text-white shadow-ds-md"
    >
      {t.skipLink}
    </a>
  )
}

function App() {
  return (
    // reducedMotion="user": under prefers-reduced-motion, Framer skips
    // transform/layout animations site-wide (opacity fades remain).
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <SkipLink />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/legal" element={<LegalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
        <Analytics />
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
