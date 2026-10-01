import About from './components/about/About'
import Contact from './components/contact/Contact'
import Experience from './components/experience/Experience'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Homelab from './components/homelab/Homelab'
import Nav from './components/nav/Nav'
import Now from './components/now/Now'
import Portfolio from './components/portfolio/Portfolio'
import Process from './components/process/Process'
import ScrollProgress from './components/ScrollProgress'

const App = () => {
  return (
    <>
      <ScrollProgress />
      <Header />
      <Nav />
      <Now />
      <About />
      <Experience />
      <Portfolio />
      <Process />
      <Homelab />
      <Contact />
      <Footer />
    </>
  )
}

export default App
