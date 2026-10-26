import { motion } from 'framer-motion'
import { revealVariants, viewportOnce } from '../../lib/motion'

/* Scroll-triggered entrance (IntersectionObserver under the hood), driven
   by the shared motion tokens. `step` staggers items within a group. */
export default function Reveal({ as = 'div', step = 0, className = '', children, ...rest }) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={revealVariants}
      custom={step}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  )
}
