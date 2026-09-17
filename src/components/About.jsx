import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './About.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const TRAJECTORY = [
  {
    period: 'Incoming',
    role: 'AI Product Manager',
    org: 'MoneyLion (Gen Digital)',
    current: true,
  },
  {
    period: '2025–26',
    role: 'Specialist, Analytics & Intelligence',
    org: 'OKX, Kuala Lumpur',
  },
  {
    period: '2022–25',
    role: 'Senior Data Analyst',
    org: 'Bloomberg, London',
  },
  {
    period: 'Education',
    role: 'BSc Mathematics & Physics',
    org: 'University of Bristol',
  },
]

export default function About() {
  const container = useRef(null)

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      if (prefersReduced) return

      // Initial state for trajectory rows
      gsap.set('.traj-row', { autoAlpha: 0 })

      // Staggered fade-in as rows enter viewport — once only
      ScrollTrigger.batch('.traj-row', {
        onEnter: (elements) => {
          gsap.to(elements, {
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.09,
            ease: 'power2.out',
          })
        },
        start: 'top 90%',
        once: true,
      })
    },
    { scope: container }
  )

  return (
    <section id="about" ref={container} className="about">
      <div className="about-inner">
        <p className="about-framing">
          Four years building the systems under financial data. Now focused on
          making the AI inside them trustworthy.
        </p>

        <div className="about-body">
          <p>
            My background is quantitative — a maths and physics degree from
            Bristol, where my final-year dissertation used neural networks to
            encode quantum states, back before that was fashionable. Since then
            I've built the analytics and machine-learning systems that sit under
            financial data: anomaly-detection pipelines, an ML dispute-scoring
            model, and LLM-powered tooling at OKX, and trade-and-quote
            validation for latency-sensitive clients at Bloomberg in London.
          </p>
          <p>
            In October I join MoneyLion (Gen Digital) as an AI Product Manager
            on Instacash, where AI decisioning carries real consumer-finance
            stakes and oversight isn't optional. Alongside the day job I build
            and write in public — model evaluation, fairness and drift
            monitoring, and the governance layer most teams treat as an
            afterthought.
          </p>
        </div>

        <div className="trajectory" role="list" aria-label="Career trajectory">
          {TRAJECTORY.map(({ period, role, org, current }) => (
            <div
              key={period}
              className={`traj-row${current ? ' traj-row--current' : ''}`}
              role="listitem"
            >
              <span className="traj-period">{period}</span>
              <span className="traj-role">{role}</span>
              <span className="traj-org">{org}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
