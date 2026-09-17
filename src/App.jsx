import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'

gsap.registerPlugin(ScrollTrigger)

// Keep Lenis smooth scroll and GSAP ScrollTrigger in sync
function LenisBridge() {
  useLenis(() => ScrollTrigger.update())
  return null
}

export default function App() {
  return (
    <ReactLenis root>
      <LenisBridge />
      <Nav />
      <Hero />
      <About />
    </ReactLenis>
  )
}
