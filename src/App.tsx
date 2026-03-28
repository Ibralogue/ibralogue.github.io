import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import SyntaxShowcase from './components/SyntaxShowcase'
import Installation from './components/Installation'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:bg-teal-500 focus:text-white focus:rounded focus:text-sm">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Features />
        <SyntaxShowcase />
        <Installation />
      </main>
      <Footer />
    </div>
  )
}

export default App
