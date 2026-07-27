import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Link as ScrollLink } from 'react-scroll'
import { ChevronDown } from 'lucide-react'
import { VertexMark } from './VertexMark'
import { useLanguage } from '../i18n/LanguageContext'

/* The tagline is intentionally bilingual by brand design: it stays in
   English regardless of the selected site language. */
const HEADLINE = "Building Africa's next innovation layer."

/**
 * Slow-drifting triangular grid, drawn on canvas at very low opacity.
 * Pure decoration, subtle depth behind the hero content.
 */
function TriangleGridCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const tileW = 130
    const tileH = 112
    let width = 0
    let height = 0
    let animationId

    function resize() {
      const parent = canvas.parentElement
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function render(offsetX, offsetY) {
      ctx.clearRect(0, 0, width, height)
      const ox = ((offsetX % tileW) + tileW) % tileW
      const oy = ((offsetY % tileH) + tileH) % tileH
      ctx.strokeStyle = 'rgba(183, 134, 44, 0.07)'
      ctx.lineWidth = 1
      const cols = Math.ceil(width / tileW) + 2
      const rows = Math.ceil(height / tileH) + 2

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * tileW - ox
          const y = row * tileH - oy
          ctx.beginPath()
          ctx.moveTo(x + tileW / 2, y + 6)
          ctx.lineTo(x + tileW - 8, y + tileH - 8)
          ctx.lineTo(x + 8, y + tileH - 8)
          ctx.closePath()
          ctx.stroke()
        }
      }
    }

    resize()
    render(0, 0)

    const handleResize = () => {
      resize()
      render(0, 0)
    }
    window.addEventListener('resize', handleResize)

    if (!prefersReducedMotion) {
      let offsetX = 0
      let offsetY = 0
      let lastTime = performance.now()

      const loop = (time) => {
        const delta = time - lastTime
        lastTime = time
        offsetX += delta * 0.004
        offsetY += delta * 0.002
        render(offsetX, offsetY)
        animationId = requestAnimationFrame(loop)
      }
      animationId = requestAnimationFrame(loop)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}

/** Counts up from 0 to `target` once it scrolls into view. */
function StatCounter({ target, label, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.5,
      ease: 'easeOut',
      delay,
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, delay])

  return (
    <div ref={ref} className="min-w-[104px] flex-1 px-4 text-center sm:min-w-[150px] sm:px-8">
      <div className="font-serif text-3xl font-bold text-vertex-gold-light sm:text-4xl">{count}</div>
      <div className="mt-2.5 text-[10.5px] uppercase leading-snug tracking-[0.06em] text-white/70 sm:text-[11px] sm:tracking-[0.1em]">
        {label}
      </div>
    </div>
  )
}

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-vertex-navy pt-20 text-center"
    >
      <TriangleGridCanvas />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="mb-9"
        >
          <div className="animate-logo-glow">
            <VertexMark size={140} />
          </div>
        </motion.div>

        <motion.h1
          variants={headlineContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-3 font-serif text-[36px] font-bold leading-[1.08] tracking-tight text-white md:text-[64px]"
        >
          {HEADLINE.split(' ').map((word, i) => (
            <motion.span key={i} variants={wordVariant} className="inline-block">
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="mt-6 max-w-[640px] text-[18px] text-[#D4D4D4]"
        >
          {t.hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1, ease: 'easeOut' }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <ScrollLink
            to="about"
            smooth
            duration={500}
            offset={-80}
            className="cursor-pointer rounded-lg bg-vertex-blue px-8 py-4 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-vertex-blue-light"
          >
            {t.hero.ctaPrimary}
          </ScrollLink>
          <ScrollLink
            to="join"
            smooth
            duration={500}
            offset={-80}
            className="cursor-pointer rounded-lg border border-vertex-gold px-8 py-4 font-medium text-vertex-gold-light transition-all duration-200 hover:scale-[1.02] hover:bg-vertex-gold hover:text-vertex-navy"
          >
            {t.hero.ctaSecondary}
          </ScrollLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: 'easeOut' }}
          className="mt-14 flex w-full max-w-2xl items-stretch justify-center border-t border-white/10 pt-8"
        >
          {t.hero.stats.map((stat, i) => (
            <div key={stat.label} className="flex items-stretch">
              {i > 0 && (
                <span
                  className="mx-3 hidden w-px shrink-0 self-stretch bg-gradient-to-b from-transparent via-vertex-gold/40 to-transparent sm:mx-5 sm:block"
                  aria-hidden="true"
                />
              )}
              <StatCounter target={stat.target} label={stat.label} delay={i * 0.15} />
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollLink
        to="about"
        smooth
        duration={500}
        offset={-80}
        aria-label={t.hero.scrollAria}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-vertex-gold-light"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={26} />
        </motion.div>
      </ScrollLink>
    </section>
  )
}
