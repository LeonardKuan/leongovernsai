import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import './Hero.css'

gsap.registerPlugin(useGSAP)

export default function Hero() {
  const container = useRef(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReduced) {
        // Resolve all elements to their final visible state immediately
        gsap.set('.hero-line', { clipPath: 'inset(0 0 0% 0)', y: 0 })
        gsap.set(['.hero-meta', '.hero-cta'], { autoAlpha: 1, y: 0 })
        return
      }

      // Initial hidden state
      gsap.set('.hero-line', { clipPath: 'inset(0 0 100% 0)', y: 8 })
      gsap.set(['.hero-meta', '.hero-cta'], { autoAlpha: 0, y: 12 })

      // Signature moment: lines stamp into place, then meta and cta follow
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .to('.hero-line', {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.0,
          stagger: 0.14,
        })
        .to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.75 }, '-=0.55')
        .to('.hero-cta',  { autoAlpha: 1, y: 0, duration: 0.6  }, '-=0.5')
    },
    { scope: container }
  )

  return (
    <section ref={container} className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <h1 className="hero-heading">
          <span className="hero-line">I build AI</span>
          <span className="hero-line hero-line--italic">
            that can be trusted.
          </span>
        </h1>
        <p className="hero-meta">
          AI engineer and governance practitioner. Work spans fintech,
          LLM evaluation, and responsible deployment.
        </p>
        <a href="#work" className="hero-cta">
          View work
        </a>
      </div>
    </section>
  )
}
