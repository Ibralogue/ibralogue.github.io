import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import SyntaxShowcase from './components/SyntaxShowcase'
import Installation from './components/Installation'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <SyntaxShowcase />
      <Installation />
      <Footer />
    </div>
  )
}

export default App
