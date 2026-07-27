import { useId } from 'react'

/**
 * VertexMark: the Vertex Global logo mark.
 * A rounded square (navy → blue gradient) containing a white-stroked
 * equilateral triangle, a gold vertical axis from apex to base, a gold
 * filled circle at the apex, and two soft white circles at the base corners.
 */
export function VertexMark({ size = 40, className = '' }) {
  const uid = useId()
  const gradientId = `vertex-navy-gradient-${uid}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Vertex Global"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A3A5C" />
          <stop offset="100%" stopColor="#0D1F35" />
        </linearGradient>
      </defs>

      <rect x="2" y="2" width="96" height="96" rx="22" fill={`url(#${gradientId})`} />

      <path
        d="M50 26 L74 68 L26 68 Z"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      <line x1="50" y1="26" x2="50" y2="68" stroke="#B7862C" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="50" cy="26" r="4.4" fill="#D4A84B" />

      <circle cx="26" cy="68" r="3.2" fill="#FFFFFF" fillOpacity="0.35" />
      <circle cx="74" cy="68" r="3.2" fill="#FFFFFF" fillOpacity="0.35" />
    </svg>
  )
}

/**
 * VertexWordmark: mark + "VERTEX | GLOBAL" lockup.
 * theme="light" (default) renders VERTEX in white for dark backgrounds.
 * theme="dark" renders VERTEX in navy for light backgrounds.
 */
export function VertexWordmark({ theme = 'light', markSize = 40, className = '' }) {
  const vertexColor = theme === 'light' ? 'text-white' : 'text-vertex-navy'
  const separatorColor = theme === 'light' ? 'bg-white/30' : 'bg-vertex-navy/30'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <VertexMark size={markSize} />
      <div className="flex items-center gap-3">
        <span className={`font-serif font-bold text-lg tracking-tight ${vertexColor}`}>
          VERTEX
        </span>
        <span className={`h-4 w-px ${separatorColor}`} aria-hidden="true" />
        <span className="font-sans text-[11px] font-semibold tracking-[0.3em] text-vertex-blue-light">
          GLOBAL
        </span>
      </div>
    </div>
  )
}

export default VertexMark
