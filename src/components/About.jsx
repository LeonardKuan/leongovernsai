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
    logo: 'moneylion',
    current: true,
  },
  {
    period: '2025–26',
    role: 'Specialist, Analytics & Intelligence',
    org: 'OKX, Kuala Lumpur',
    logo: 'okx',
  },
  {
    period: '2022–25',
    role: 'Senior Data Analyst',
    org: 'Bloomberg, London',
    logo: 'bloomberg',
  },
  {
    period: 'Education',
    role: 'BSc Mathematics & Physics',
    org: 'University of Bristol',
    logo: 'bristol',
  },
]

const STATS = [
  {
    number: '4',
    unit: 'yrs',
    label: 'data & ML across fintech — London to Kuala Lumpur',
  },
  {
    number: '98–99',
    unit: '%',
    label: 'accuracy on the ML dispute-liability model at OKX',
  },
  {
    number: '2,000',
    unit: '+',
    label: 'Bloomberg Terminal client queries resolved',
  },
  {
    number: '3',
    unit: null,
    label: 'production analytics dashboards shipped end-to-end',
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

      gsap.set('.traj-row', { autoAlpha: 0 })

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
          making the AI inside them <em>trustworthy</em>.
        </p>

        <div className="about-body">
          <div className="about-bio">
            <p className="about-bio-lead">
              My background is quantitative — a maths and physics degree from
              Bristol, where my final-year dissertation used{' '}
              <span className="about-strong">
                neural networks to encode quantum states
              </span>
              , back before that was fashionable. Since then I've built the
              analytics and machine-learning systems that sit under financial
              data: anomaly-detection pipelines, an ML dispute-scoring model,
              and LLM-powered tooling at OKX, and trade-and-quote validation
              for latency-sensitive clients at Bloomberg in London.
            </p>
            <p>
              In October I join{' '}
              <span className="about-strong">MoneyLion (Gen Digital)</span> as
              an AI Product Manager on Instacash, where AI decisioning carries
              real consumer-finance stakes and oversight isn't optional.
              Alongside the day job I build and write in public — model
              evaluation, fairness and drift monitoring, and the governance
              layer most teams treat as an afterthought.
            </p>
          </div>

          <div className="stat-block">
            {STATS.map(({ number, unit, label }) => (
              <div key={label} className="stat">
                <div className="stat-number">
                  <span className="stat-value">{number}</span>
                  {unit && <span className="stat-unit">{unit}</span>}
                </div>
                <p className="stat-label">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="trajectory" role="list" aria-label="Career trajectory">
          {TRAJECTORY.map(({ period, role, org, logo, current }) => (
            <div
              key={period}
              className={`traj-row${current ? ' traj-row--current' : ''}`}
              role="listitem"
            >
              <span className="traj-period">{period}</span>
              <span className="traj-role">{role}</span>
              <span className="traj-org">
                {logo && (
                  <img
                    className="traj-logo"
                    src={`/logos/${logo}.svg`}
                    alt=""
                    aria-hidden="true"
                  />
                )}
                {org}
              </span>
            </div>
          ))}
        </div>

        <p className="about-credential">
          <span className="credential-dot" aria-hidden="true" />
          GARP Responsible AI (RAI)
        </p>
      </div>
    </section>
  )
}
