/* Motion tokens. Every Framer Motion animation in the site draws its timing
   from here, so the whole interface moves with one consistent rhythm.
   Reduced motion is handled globally by <MotionConfig reducedMotion="user">
   in App.jsx (transforms are skipped, opacity fades remain). */

export const duration = {
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
  slower: 0.9,
}

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  spring: [0.34, 1.56, 0.64, 1],
}

export const distance = {
  sm: 8,
  md: 20,
  lg: 36,
}

export const stagger = 0.08

/* Scroll-triggered entrance, shared by every section. `custom` is the
   item's index (or an explicit delay step) for staggered groups. */
export const revealVariants = {
  hidden: { opacity: 0, y: distance.md },
  visible: (step = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out, delay: step * stagger },
  }),
}

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' }
