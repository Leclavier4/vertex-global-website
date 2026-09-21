import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import NotFound from './pages/NotFound'
import CookieBanner from './components/CookieBanner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/legal" element={<LegalPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieBanner />
      <Analytics />
    </BrowserRouter>
  )
}

export default App
