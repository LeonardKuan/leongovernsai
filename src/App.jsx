import { ReactLenis } from 'lenis/react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'

export default function App() {
  return (
    <ReactLenis root>
      <Nav />
      <Hero />
    </ReactLenis>
  )
}
