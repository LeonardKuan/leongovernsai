import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Positioning.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Data ────────────────────────────────────────────────────────────────── */

const POV =
  "Most of the effort in AI goes into making models more capable. I'm more interested in the other half — whether the capable thing can be trusted with a real decision. I came at it from the quantitative side: four years validating financial data and building ML systems where a wrong output has a cost attached. That discipline — test it, monitor it, make it explain itself — is exactly what responsible AI needs, and it's mostly missing. That's the gap I want to work in."

const WORK_ITEMS = [
  {
    heading: 'ML systems in production',
    body: 'Anomaly-detection pipelines and an ML dispute-scoring model at OKX: the unglamorous work of making a model reliable enough to trust with a live decision.',
  },
  {
    heading: 'LLM-powered tooling',
    body: 'Language models pointed at real problems — automated root-cause analysis, retrieval systems, and the monitoring around them.',
  },
  {
    heading: 'Evaluation & drift monitoring',
    body: 'Population stability, model drift, and slice-level performance: the checks that tell you a model is still doing its job long after launch.',
  },
  {
    heading: 'Responsible AI in high-stakes domains',
    body: "Moving into consumer-finance AI at MoneyLion, where a model's decision carries real consequences and oversight isn't optional. This is where I'm focused next.",
    accent: true,
  },
]

/* ── Component ───────────────────────────────────────────────────────────── */

export default function Positioning() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      // One restrained reveal — the whole section, no per-element stagger
      gsap.set(sectionRef.current, { autoAlpha: 0 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter() {
          gsap.to(sectionRef.current, {
            autoAlpha: 1,
            duration: 0.75,
            ease: 'power2.out',
          })
        },
      })
    },
    { scope: sectionRef }
  )

  return (
    <section id="focus" className="positioning" ref={sectionRef}>
      <div className="positioning-inner">

        {/* POV statement — the focal moment */}
        <p className="positioning-pov">{POV}</p>

        {/* What I work on */}
        <div className="positioning-work">
          <p className="work-label">What I work on</p>
          <div className="work-grid">
            {WORK_ITEMS.map(({ heading, body, accent }) => (
              <div key={heading} className="work-item">
                <h3 className={`work-heading${accent ? ' work-heading--accent' : ''}`}>
                  {heading}
                </h3>
                <p className="work-body">{body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
