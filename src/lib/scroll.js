/* In-page navigation. Links are real <a href="#id"> anchors (keyboard
   accessible, work without JS); this helper only adds the smooth scroll,
   honours prefers-reduced-motion and keeps the URL hash in sync.
   scroll-padding-top on <html> keeps targets clear of the fixed navbar. */

export function scrollToSection(id) {
  const target = id === 'top' ? document.documentElement : document.getElementById(id)
  if (!target) return false

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior = reduceMotion ? 'auto' : 'smooth'

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior })
  } else {
    target.scrollIntoView({ behavior, block: 'start' })
  }

  const url = id === 'top' ? window.location.pathname + window.location.search : `#${id}`
  window.history.replaceState(null, '', url)
  return true
}

/* onClick handler for anchors pointing at an in-page section. Falls back to
   the browser's default navigation if the target isn't on this page. */
export function handleSectionLink(event, id, before) {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return
  if (!document.getElementById(id) && id !== 'top') return
  event.preventDefault()
  if (before) before()
  scrollToSection(id)
}
