import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactLenis, useLenis } from 'lenis/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Positioning from './components/Positioning.jsx'
import Projects from './components/Projects.jsx'
import Cursor from './components/Cursor.jsx'
import './styles/ambient.css'

gsap.registerPlugin(ScrollTrigger)

// Keep Lenis smooth scroll and GSAP ScrollTrigger in sync
function LenisBridge() {
  useLenis(() => ScrollTrigger.update())
  return null
}

// Very slow warm drift — texture, not feature.
// Opacity so low it reads as atmosphere.
function BgAmbient() {
  return <div className="bg-ambient" aria-hidden="true" />
}

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <LenisBridge />
      <BgAmbient />
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Positioning />
      <Projects />
    </ReactLenis>
  )
}
