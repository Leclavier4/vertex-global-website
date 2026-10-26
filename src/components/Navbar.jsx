import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { VertexWordmark } from './VertexMark'
import SectionLink from './ui/SectionLink'
import Button from './ui/Button'
import LanguageSwitcher from './LanguageSwitcher'
import { duration, ease } from '../lib/motion'
import { useLanguage } from '../i18n/LanguageContext'

const SECTION_IDS = ['about', 'services', 'projects', 'contact']

/* Tracks which section sits under the upper third of the viewport. */
function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)
  const toggleRef = useRef(null)
  const firstMobileLinkRef = useRef(null)

  const items = [
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'projects', label: t.nav.projects, live: true },
    { id: 'contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll lock + Escape to close + focus management for the mobile menu.
  useEffect(() => {
    if (!menuOpen) return undefined
    const root = document.documentElement
    root.style.overflow = 'hidden'
    firstMobileLinkRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      root.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  // Unlock scrolling synchronously before the smooth scroll starts.
  const closeMenu = useCallback(() => {
    document.documentElement.style.overflow = ''
    setMenuOpen(false)
  }, [])

  return (
    <header className="theme-dark fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={`mx-auto flex items-center justify-between gap-4 border transition-[max-width,height,padding,background-color,border-color,box-shadow] duration-500 ease-out-expo ${
          scrolled
            ? 'glass-surface specular-edge h-14 max-w-[1040px] rounded-ds-pill border-white/10 bg-navy/90 pl-4 pr-2 shadow-[0_16px_40px_-18px_rgba(8,20,38,0.7)]'
            : 'h-16 max-w-content rounded-ds-pill border-transparent bg-transparent px-2 sm:px-4'
        }`}
      >
        <SectionLink to="top" aria-label={t.nav.home} className="flex min-h-[44px] items-center rounded-ds-sm">
          <VertexWordmark theme="light" markSize={scrolled ? 30 : 34} />
        </SectionLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label={t.nav.ariaMain}>
          {items.map((item) => {
            const isActive = active === item.id
            return (
              <SectionLink
                key={item.id}
                to={item.id}
                aria-current={isActive ? 'true' : undefined}
                className={`relative inline-flex min-h-[44px] items-center gap-2 rounded-ds-pill px-4 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-y-2 inset-x-1 -z-10 rounded-ds-pill bg-white/10"
                    transition={{ duration: duration.base, ease: ease.out }}
                  />
                )}
                {item.label}
                {item.live && (
                  <span className="live-dot" role="img" aria-label={t.nav.liveLabel} title={t.nav.liveLabel} />
                )}
              </SectionLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button to="contact" size="sm" className="hidden md:inline-flex">
            {t.nav.cta}
          </Button>

          <button
            ref={toggleRef}
            type="button"
            className="spring-press inline-flex h-11 w-11 items-center justify-center rounded-ds-pill text-white active:scale-[0.94] md:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="glass-surface fixed inset-0 -z-10 flex flex-col bg-midnight/95 px-6 pb-10 pt-28 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.base, ease: ease.out }}
          >
            <nav aria-label={t.nav.ariaMobile} className="flex flex-col">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: duration.slow, ease: ease.out, delay: 0.05 + i * 0.06 }}
                >
                  <SectionLink
                    ref={i === 0 ? firstMobileLinkRef : undefined}
                    to={item.id}
                    onNavigate={closeMenu}
                    className="flex min-h-[56px] items-center justify-between border-b border-white/10 font-serif text-[1.75rem] font-semibold tracking-[-0.02em] text-white"
                  >
                    {item.label}
                    {item.live && <span className="live-dot" aria-hidden="true" />}
                  </SectionLink>
                </motion.div>
              ))}
            </nav>
            <motion.div
              className="mt-auto flex flex-col gap-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.slow, ease: ease.out, delay: 0.3 }}
            >
              <LanguageSwitcher floating={false} />
              <Button to="contact" size="lg" onNavigate={closeMenu} className="w-full">
                {t.nav.cta}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
