import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Projects from '../components/Projects'
import Institution from '../components/Institution'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import LanguageSwitcher from '../components/LanguageSwitcher'
import ErrorBoundary from '../components/ErrorBoundary'

/* Narrative order: who we are (Hero, About), what we do (Services),
   what we've built (Projects), why trust us (Institution), how to reach us
   (Contact). Each section is isolated so one failure never blanks the page. */
export default function HomePage() {
  return (
    <>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <main id="main" tabIndex={-1} className="outline-none">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Services />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary>
          <Institution />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <ScrollToTop />
      <LanguageSwitcher />
    </>
  )
}
