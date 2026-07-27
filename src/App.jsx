import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Poles from './components/Poles'
import Ventures from './components/Ventures'
import Join from './components/Join'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
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
          <Join />
        </ErrorBoundary>
      </main>
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      <ScrollToTop />
    </>
  )
}

export default App
