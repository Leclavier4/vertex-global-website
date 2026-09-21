import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { VertexWordmark } from '../components/VertexMark'

const SECTIONS = [
  {
    heading: 'Éditeur du site',
    body: [
      'Le site vertexglobal.vercel.app est édité par Vertex Global SARL, société de droit béninois.',
      'RCCM : RB/ABC/26 B 12287',
      'IFU : 3202687473834',
      'Siège social : Îlot 104, Quartier Zopah, Abomey-Calavi, République du Bénin',
    ],
  },
  {
    heading: 'Données collectées',
    body: [
      'Le formulaire de contact du site collecte les données suivantes : nom complet, adresse email, et le contenu du message envoyé par le visiteur.',
    ],
  },
  {
    heading: 'Finalité du traitement',
    body: [
      "Ces données sont utilisées uniquement pour répondre aux demandes de contact adressées via le formulaire du site. Elles ne sont ni vendues, ni cédées, ni utilisées à des fins commerciales tierces.",
    ],
  },
  {
    heading: 'Durée de conservation',
    body: [
      'Les données collectées via le formulaire de contact sont conservées pendant une durée maximale de 12 mois à compter de leur réception, puis supprimées.',
    ],
  },
  {
    heading: 'Vos droits',
    body: [
      "Conformément à la réglementation applicable en matière de protection des données personnelles, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.",
      'Pour exercer ces droits, contactez-nous à l’adresse : vertexglos@gmail.com',
    ],
  },
  {
    heading: 'Hébergement',
    body: ['Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.'],
  },
  {
    heading: 'Contact — Délégué à la protection des données',
    body: ['Pour toute question relative à vos données personnelles, écrivez-nous à : vertexglos@gmail.com'],
  },
]

export default function LegalPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-vertex-off-white">
      <header className="bg-vertex-navy py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 md:px-8">
          <Link to="/" className="cursor-pointer" aria-label="Retour à l'accueil Vertex Global">
            <VertexWordmark theme="light" markSize={36} />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-vertex-gold-light transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {"Retour à l'accueil"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-vertex-gold">
          Informations légales
        </span>
        <h1 className="mt-4 font-serif text-[28px] font-bold text-vertex-navy md:text-[42px]">
          Mentions légales &amp; Politique de confidentialité
        </h1>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-bold text-vertex-navy">{section.heading}</h2>
              <div className="mt-3 space-y-2">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-[15px] leading-[1.7] text-vertex-text-mid">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 py-8 text-center text-[13px] text-vertex-text-muted">
        © {year} Vertex Global SARL — RCCM : RB/ABC/26 B 12287
      </footer>
    </div>
  )
}
