import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP)

// Match the CSS --ease token exactly so JS and CSS easing feel identical
CustomEase.create('brand', '0.22, 1, 0.36, 1')

export default function Hero() {
  const container = useRef(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReduced) {
        gsap.set('.hero-line', { clipPath: 'inset(0 0 0% 0)', y: 0 })
        gsap.set(['.hero-meta', '.hero-cta'], { autoAlpha: 1, y: 0 })
        return
      }

      // ── Signature clip-reveal (tightened easing to match --ease token) ──
      gsap.set('.hero-line', { clipPath: 'inset(0 0 100% 0)', y: 8 })
      gsap.set(['.hero-meta', '.hero-cta'], { autoAlpha: 0, y: 12 })

      gsap
        .timeline({ defaults: { ease: 'brand' } })
        .to('.hero-line', {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.05,
          stagger: 0.15,
        })
        .to('.hero-meta', { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.6')
        .to('.hero-cta',  { autoAlpha: 1, y: 0, duration: 0.65 }, '-=0.5')

      // ── Subtle parallax: bg warm glow drifts slower than scroll ──────────
      gsap.fromTo(
        '.hero-bg-parallax',
        { yPercent: 0 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      )
    },
    { scope: container }
  )

  return (
    <section ref={container} className="hero" aria-label="Introduction">
      {/* Parallax warm ambient — real element so GSAP can target it */}
      <div className="hero-bg-parallax" aria-hidden="true" />

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
