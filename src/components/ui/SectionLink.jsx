import { forwardRef } from 'react'
import { handleSectionLink } from '../../lib/scroll'

/* An accessible in-page link: a real <a href="#id"> that scrolls smoothly
   (or instantly under reduced motion). `onNavigate` runs before scrolling,
   e.g. to close the mobile menu. */
const SectionLink = forwardRef(function SectionLink({ to, onNavigate, onClick, children, ...rest }, ref) {
  return (
    <a
      ref={ref}
      href={to === 'top' ? '#' : `#${to}`}
      onClick={(event) => {
        onClick?.(event)
        handleSectionLink(event, to, onNavigate)
      }}
      {...rest}
    >
      {children}
    </a>
  )
})

export default SectionLink
