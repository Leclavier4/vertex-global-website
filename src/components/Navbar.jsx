import { useEffect, useState, useCallback } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { VertexWordmark } from './VertexMark'

const NAV_ITEMS = [
  { label: 'Accueil', to: 'hero' },
  { label: 'À propos', to: 'about' },
  { label: 'Pôles', to: 'poles' },
  { label: 'Ventures', to: 'ventures' },
  { label: 'Rejoindre', to: 'join' },
  { label: 'Contact', to: 'contact' },
]

const SECTION_IDS = ['hero', 'about', 'poles', 'ventures', 'join']

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

const mobileMenuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  exit: { opacity: 0 },
}

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-vertex-navy/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8 lg:px-16">
        <ScrollLink to="hero" smooth duration={500} offset={-80} className="cursor-pointer">
          <VertexWordmark theme="light" markSize={40} />
        </ScrollLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <ScrollLink
              key={item.to}
              to={item.to}
              smooth
              duration={500}
              offset={-80}
              className={`relative cursor-pointer pb-1 font-sans text-[13px] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-vertex-gold-light after:transition-all after:duration-200 ${
                active === item.to
                  ? 'text-vertex-gold-light after:w-full'
                  : 'text-vertex-text-muted after:w-0 hover:text-vertex-gold-light hover:after:w-full'
              }`}
            >
              {item.label}
            </ScrollLink>
          ))}

          <ScrollLink
            to="join"
            smooth
            duration={500}
            offset={-80}
            className="cursor-pointer rounded-lg border border-vertex-gold px-5 py-2.5 font-sans text-[13px] font-semibold text-vertex-gold-light transition-all duration-200 hover:bg-vertex-gold hover:text-vertex-navy"
          >
            Rejoindre l&apos;aventure
          </ScrollLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="z-50 text-white md:hidden"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-vertex-navy md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {NAV_ITEMS.map((item) => (
              <motion.div key={item.to} variants={mobileLinkVariants}>
                <ScrollLink
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-80}
                  onClick={closeMenu}
                  className={`cursor-pointer font-serif text-2xl transition-colors duration-200 ${
                    active === item.to ? 'text-vertex-gold-light' : 'text-white hover:text-vertex-gold-light'
                  }`}
                >
                  {item.label}
                </ScrollLink>
              </motion.div>
            ))}
            <motion.div variants={mobileLinkVariants}>
              <ScrollLink
                to="join"
                smooth
                duration={500}
                offset={-80}
                onClick={closeMenu}
                className="cursor-pointer rounded-lg border border-vertex-gold px-6 py-3 font-sans text-sm font-semibold text-vertex-gold-light"
              >
                Rejoindre l&apos;aventure
              </ScrollLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
