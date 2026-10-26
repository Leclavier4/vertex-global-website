import { useEffect, useRef } from 'react'
import { createOilSlickRenderer } from '../lib/oilSlick/renderer'

function isLowPowerDevice() {
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const cores = navigator.hardwareConcurrency || 4
  const memory = navigator.deviceMemory || 4
  return coarse || cores <= 4 || memory <= 4
}

function prefersStatic() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = Boolean(navigator.connection?.saveData)
  return reduceMotion || saveData
}

/* The signature Oil Slick surface. Decorative: hidden from assistive tech.
   The wrapper's CSS gradient (.oil-slick-fallback) shows whenever WebGL is
   unavailable, before the first frame, or after a lost context. */
export default function OilSlick({ className = '' }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return undefined

    // Created imperatively so each mount (including StrictMode's dev
    // re-mount) gets a fresh canvas and never inherits a released context.
    const canvas = document.createElement('canvas')
    canvas.className = 'absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000'
    wrap.appendChild(canvas)

    const renderer = createOilSlickRenderer(canvas, {
      quality: isLowPowerDevice() ? 'low' : 'high',
      onContextLost: () => {
        canvas.style.opacity = '0'
      },
    })

    if (!renderer) {
      canvas.remove()
      return undefined
    }

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = true
    let pageVisible = !document.hidden

    const update = () => {
      if (prefersStatic()) {
        renderer.stop()
        renderer.renderStatic()
      } else if (inView && pageVisible) {
        renderer.start()
      } else {
        renderer.stop()
      }
    }

    renderer.resize()
    renderer.renderStatic()
    requestAnimationFrame(() => {
      canvas.style.opacity = '1'
    })

    const resizeObserver = new ResizeObserver(() => {
      renderer.resize()
      if (!renderer.isRunning()) renderer.renderStatic()
    })
    resizeObserver.observe(wrap)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting
        update()
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(wrap)

    const onVisibility = () => {
      pageVisible = !document.hidden
      update()
    }
    document.addEventListener('visibilitychange', onVisibility)
    reduceMotionQuery.addEventListener('change', update)

    // Cursor interaction only for precise pointers (mouse, trackpad, pen).
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const onPointerMove = (event) => {
      const rect = wrap.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = 1 - (event.clientY - rect.top) / rect.height
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1
      renderer.setPointer(Math.min(Math.max(x, 0), 1), Math.min(Math.max(y, 0), 1), inside)
    }
    const onPointerLeave = () => renderer.setPointer(0.72, 0.6, false)
    if (finePointer) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
    }

    update()

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      reduceMotionQuery.removeEventListener('change', update)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
      renderer.destroy()
      canvas.remove()
    }
  }, [])

  return <div ref={wrapRef} aria-hidden="true" className={`oil-slick-fallback overflow-hidden ${className}`} />
}
