import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { VertexWordmark } from '../components/VertexMark'

const SECTIONS = [
  {
    heading: 'Éditeur du site',
    body: [
      'Le site vertex-global-website.vercel.app est édité par Vertex Global SARL, société de droit béninois.',
      'Forme juridique : Société à Responsabilité Limitée (SARL)',
      'RCCM : RB/ABC/26 B 12287',
      'IFU : 3202687473834',
      'Siège social : Îlot 104, Quartier Zopah, Abomey-Calavi, République du Bénin',
      'Année de création : 2026',
      'Contact : vertexglos@gmail.com · +229 01 47 33 36 16',
    ],
  },
  {
    heading: 'Objet social',
    body: [
      "Conformément aux statuts et à l'extrait RCCM n° RB/ABC/26 B 12287, l'objet social de Vertex Global SARL comprend : le développement, la conception et l'exploitation de solutions numériques et technologiques ; la prestation de services informatiques, de conseil, d'accompagnement et de formation ; l'intermédiation, la mise en relation et l'assistance aux particuliers, entrepreneurs et entreprises dans le cadre d'opportunités d'affaires, d'études, d'investissement et de coopération internationale, notamment entre le Bénin et tout autre pays ; les prestations de traduction, d'interprétation et d'assistance administrative ; et plus généralement, toutes opérations commerciales, industrielles, financières, mobilières ou immobilières se rattachant directement ou indirectement à l'objet social ou susceptibles d'en favoriser le développement.",
    ],
  },
  {
    heading: 'Données collectées',
    body: [
      'Le formulaire de contact du site collecte les données suivantes : nom complet, adresse email, et le contenu du message envoyé par le visiteur.',
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
      'Pour exercer ces droits, contactez-nous à l’adresse : vertexglos@gmail.com',
    ],
  },
  {
    heading: 'Hébergement',
    body: ['Ce site est hébergé par Vercel Inc., 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis.'],
  },
  {
    heading: 'Contact : Délégué à la protection des données',
    body: ['Pour toute question relative à vos données personnelles, écrivez-nous à : vertexglos@gmail.com'],
  },
]

export default function LegalPage() {
  const year = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-surface">
      <header className="theme-dark relative isolate overflow-hidden rounded-b-ds-xl bg-midnight">
        <div aria-hidden="true" className="oil-slick-fallback absolute inset-0 -z-10 opacity-70" />
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <Link to="/" className="flex min-h-[44px] items-center rounded-ds-sm" aria-label="Vertex Global, retour à l'accueil">
            <VertexWordmark theme="light" markSize={34} />
          </Link>
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-ds-sm text-sm font-medium text-vertex-gold-light transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{"Retour à l'accueil"}</span>
            <span className="sm:hidden">Accueil</span>
          </Link>
        </div>
        <div className="mx-auto max-w-3xl px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
          <p className="ds-eyebrow text-vertex-gold-light">Informations légales</p>
          <h1 className="ds-h2 mt-4 text-balance text-white">Mentions légales &amp; Politique de confidentialité</h1>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="space-y-5">
          {SECTIONS.map((section) => (
            <section
              key={section.heading}
              className="rounded-ds-lg border border-border bg-white p-6 shadow-ds-sm sm:p-8"
            >
              <h2 className="ds-h3 text-text-primary">{section.heading}</h2>
              <div className="mt-3 space-y-2">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="ds-body text-[0.9375rem] text-text-secondary">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center">
        <p className="ds-data text-xs text-text-secondary">
          © {year} Vertex Global SARL · RCCM&nbsp;: RB/ABC/26 B 12287 · IFU&nbsp;: 3202687473834
        </p>
      </footer>
    </div>
  )
}
