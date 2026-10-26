import { forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import SectionLink from './SectionLink'

/* One button system for the whole site.
   - `to`    → in-page section (accessible anchor + smooth scroll)
   - `route` → client-side route (react-router)
   - `href`  → external or mailto/tel link (external ones open in a new tab)
   - none    → native <button>
   States: hover, focus-visible (global ring), active (spring squash),
   disabled / aria-disabled, and `loading` (aria-busy). */

const BASE =
  'spring-press group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold tracking-[-0.005em] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'

const VARIANTS = {
  primary:
    'border border-white/10 bg-primary text-white specular-edge shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_28px_-14px_rgba(29,95,168,0.85)] hover:bg-primary-hover hover:shadow-ds-glow',
  secondary:
    'border border-border bg-white text-text-primary shadow-ds-sm hover:border-primary/40 hover:text-primary',
  ghost:
    'glass-surface border border-white/20 bg-white/[0.06] text-white specular-edge hover:border-white/45 hover:bg-white/[0.12]',
}

const SIZES = {
  sm: 'min-h-[44px] rounded-ds-md px-4 text-sm',
  md: 'min-h-[48px] rounded-ds-md px-5 text-[0.9375rem]',
  lg: 'min-h-[52px] rounded-ds-md px-6 text-base',
}

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, route, href, loading = false, className = '', children, ...rest },
  ref,
) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (to) {
    return (
      <SectionLink ref={ref} to={to} className={classes} {...rest}>
        {children}
      </SectionLink>
    )
  }

  if (route) {
    return (
      <RouterLink ref={ref} to={route} className={classes} {...rest}>
        {children}
      </RouterLink>
    )
  }

  if (href) {
    const external = /^https?:\/\//.test(href)
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={classes} aria-busy={loading || undefined} {...rest}>
      {children}
    </button>
  )
})

export default Button
