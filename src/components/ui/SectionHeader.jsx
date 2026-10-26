import Reveal from './Reveal'

/* Eyebrow + heading + optional lede, shared by every section so heading
   hierarchy and spacing stay identical across the page. */
export default function SectionHeader({ id, eyebrow, title, lede, tone = 'light', align = 'left', className = '' }) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <p className={`ds-eyebrow ${dark ? 'text-vertex-gold-light' : 'text-primary'}`}>{eyebrow}</p>
      <h2 id={id} className={`ds-h2 mt-4 text-balance ${dark ? 'text-white' : 'text-text-primary'}`}>
        {title}
      </h2>
      {lede && (
        <p className={`ds-lede mt-5 ${centered ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-text-secondary'}`}>
          {lede}
        </p>
      )}
    </Reveal>
  )
}
