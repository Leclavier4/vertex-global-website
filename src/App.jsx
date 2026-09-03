import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Poles from './components/Poles'
import Ventures from './components/Ventures'
import FastGarageSection from './components/FastGarageSection'
import Join from './components/Join'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LanguageSwitcher from './components/LanguageSwitcher'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <>
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <main>
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Poles />
        </ErrorBoundary>
        <ErrorBoundary>
          <Ventures />
        </ErrorBoundary>
        <ErrorBoundary>
          <FastGarageSection />
        </ErrorBoundary>
        <ErrorBoundary>
          <Join />
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

export default App
