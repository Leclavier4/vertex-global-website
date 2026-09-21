import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { VertexMark } from '../components/VertexMark'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-vertex-navy px-4 py-20 text-center">
      <VertexMark size={64} />

      <p className="mt-8 font-serif text-[110px] font-bold leading-none text-vertex-gold md:text-[150px]">
        404
      </p>

      <h1 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">{"Cette page n'existe pas."}</h1>
      <p className="mt-3 max-w-md text-[15.5px] text-white/70">Mais nos ventures, elles, existent bien.</p>

      <Link
        to="/"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-vertex-gold px-8 py-4 font-semibold text-vertex-navy transition-all duration-200 hover:scale-[1.02] hover:bg-vertex-gold-light"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
        {"Retour à l'accueil"}
      </Link>
    </div>
  )
}
