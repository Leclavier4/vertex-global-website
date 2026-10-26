import { Home } from 'lucide-react'
import { VertexMark } from '../components/VertexMark'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <main id="main" className="theme-dark relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-midnight px-5 py-20 text-center">
      <div aria-hidden="true" className="oil-slick-fallback absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden="true" className="iridescent-halo absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full" />

      <VertexMark size={56} />
      <p className="mt-10 font-serif text-[clamp(6rem,4rem+10vw,10rem)] font-extrabold leading-none tracking-[-0.04em] text-vertex-gold">
        404
      </p>
      <h1 className="ds-h2 mt-6 text-white">{"Cette page n'existe pas."}</h1>
      <p className="ds-lede mt-3 text-white/70">Mais nos ventures, elles, existent bien.</p>
      <Button route="/" size="lg" className="mt-10">
        <Home className="h-4 w-4" aria-hidden="true" />
        {"Retour à l'accueil"}
      </Button>
    </main>
  )
}
