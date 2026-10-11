/**
 * SectionDivider: a soft wave seam dropped at the bottom of a section, so the
 * hard navy/off-white cut reads as a gentle curve instead of a straight line.
 *
 * `color` is the background color of the section that follows — the wave is
 * filled with it so it blends seamlessly into what comes next.
 *
 * The path's fill always touches the bottom edge of its box across the full
 * width (its curve stays well inside 0–80, never reaching either extreme),
 * and stays fully transparent at the top edge. Placed at the bottom of a
 * section, that bottom edge IS the real seam with the next section, so the
 * fill must stay unrotated — flipping it would swap which edge is flush,
 * leaving the true seam transparent and the wave floating uselessly inside
 * the section instead of blending into what follows.
 */
export default function SectionDivider({ color }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
      {/* subtle glow at the seam for a touch of depth */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent via-vertex-blue/5 to-transparent" />

      <div className="overflow-hidden leading-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-10 w-full md:h-14">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill={color} />
        </svg>
      </div>
    </div>
  )
}
