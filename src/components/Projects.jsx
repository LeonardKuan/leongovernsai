import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ── Data ────────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 'janus',
    title: 'Janus',
    description:
      'A crypto intelligence platform modeled on a Bloomberg terminal: screener, correlation view, arbitrage scanner, and terminal layout — fronted by a cinematic animated landing.',
    tags: ['React', 'Framer Motion', 'Vercel'],
    phonePosition: 'right',
    // Resting tilt: browser leans slightly right, phone counter-leans left
    browserTilt: { rx: -1.5, ry: 5 },
    phoneTilt: { rx: 2, ry: -10 },
    web: {
      mp4: '/media/clips/janus-web.mp4',
      webm: '/media/clips/janus-web.webm',
      poster: '/media/posters/janus-web.webp',
      url: 'janus.app',
    },
    phone: {
      mp4: '/media/clips/janus-phone.mp4',
      webm: '/media/clips/janus-phone.webm',
      poster: '/media/posters/janus-phone.webp',
    },
  },
  {
    id: 'valstats',
    title: 'VALSTATS',
    description:
      'An installable Valorant stats PWA: rank and RR, match history, agent-by-agent breakdowns, and a shareable canvas-rendered player card.',
    tags: ['Vanilla JS', 'PWA', 'Service Worker', 'Cloudflare Pages'],
    phonePosition: 'left',
    // Mirror the tilt for variety — browser leans left, phone right
    browserTilt: { rx: -1.5, ry: -5 },
    phoneTilt: { rx: 2, ry: 9 },
    web: {
      mp4: '/media/clips/valstats-web.mp4',
      webm: '/media/clips/valstats-web.webm',
      poster: '/media/posters/valstats-web.webp',
      url: 'valstats.app',
    },
    phone: {
      mp4: '/media/clips/valstats-phone.mp4',
      webm: '/media/clips/valstats-phone.webm',
      poster: '/media/posters/valstats-phone.webp',
    },
  },
]

/* ── VideoPlayer ─────────────────────────────────────────────────────────── */

function VideoPlayer({ mp4, webm, poster, label }) {
  const ref = useRef(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const obs = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.2 }
    )
    obs.observe(video)
    return () => obs.disconnect()
  }, [])

  return (
    <video
      ref={ref}
      className="project-video"
      muted
      loop
      playsInline
      poster={poster}
      aria-label={label}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  )
}

/* ── ProjectRow ──────────────────────────────────────────────────────────── */

function ProjectRow({ project }) {
  const { id, title, description, tags, phonePosition, browserTilt, phoneTilt, web, phone } =
    project

  const rowRef = useRef(null)
  const browserRef = useRef(null)
  const phoneRef = useRef(null)
  const revealedRef = useRef(false)

  /* Scroll reveal + resting tilt */
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const touch = window.matchMedia('(hover: none)').matches
      const br = browserRef.current
      const pr = phoneRef.current

      // Mobile / reduced-motion: flat, visible immediately
      if (reduced || touch) {
        gsap.set([br, pr], { autoAlpha: 1 })
        return
      }

      // Set per-element perspective (GSAP transformPerspective)
      gsap.set(br, { transformPerspective: 1100 })
      gsap.set(pr, { transformPerspective: 900 })

      // Initial: hidden, over-tilted, slightly lifted
      const sign = phonePosition === 'right' ? 1 : -1
      gsap.set(br, {
        autoAlpha: 0,
        rotateX: browserTilt.rx - 3,
        rotateY: browserTilt.ry + sign * 9,
        y: 28,
      })
      gsap.set(pr, {
        autoAlpha: 0,
        rotateX: phoneTilt.rx + 4,
        rotateY: phoneTilt.ry - sign * 10,
        y: 40,
      })

      ScrollTrigger.create({
        trigger: rowRef.current,
        start: 'top 78%',
        once: true,
        onEnter() {
          revealedRef.current = true
          gsap.to(br, {
            autoAlpha: 1,
            rotateX: browserTilt.rx,
            rotateY: browserTilt.ry,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
          })
          gsap.to(pr, {
            autoAlpha: 1,
            rotateX: phoneTilt.rx,
            rotateY: phoneTilt.ry,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.13,
          })
        },
      })
    },
    { scope: rowRef, dependencies: [] }
  )

  /* Mouse-move parallax */
  useEffect(() => {
    const row = rowRef.current
    const br = browserRef.current
    const pr = phoneRef.current
    if (!row || !br || !pr) return

    const touch = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (touch || reduced) return

    function onMove(e) {
      if (!revealedRef.current) return
      const rect = row.getBoundingClientRect()
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

      gsap.to(br, {
        rotateX: browserTilt.rx - dy * 2.5,
        rotateY: browserTilt.ry + dx * 4.5,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(pr, {
        rotateX: phoneTilt.rx - dy * 3.5,
        rotateY: phoneTilt.ry + dx * 5.5,
        duration: 0.55,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    function onLeave() {
      gsap.to(br, {
        rotateX: browserTilt.rx,
        rotateY: browserTilt.ry,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      })
      gsap.to(pr, {
        rotateX: phoneTilt.rx,
        rotateY: phoneTilt.ry,
        duration: 0.9,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }

    row.addEventListener('mousemove', onMove)
    row.addEventListener('mouseleave', onLeave)
    return () => {
      row.removeEventListener('mousemove', onMove)
      row.removeEventListener('mouseleave', onLeave)
    }
  }, []) // stable refs from module-level constant — deps won't change

  return (
    <div className={`project-row project-row--${id}`} ref={rowRef}>
      {/* Meta */}
      <div className="project-meta">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <span className="project-tag project-tag--type">Personal project</span>
        </div>
        <div className="project-subheader">
          <p className="project-desc">{description}</p>
          <ul className="project-stack" aria-label="Tech stack">
            {tags.map((tag) => (
              <li key={tag} className="project-tag project-tag--tech">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Cinematic showcase */}
      <div className={`project-showcase project-showcase--${phonePosition}`}>
        {/* Screen glow — behind both devices */}
        <div className={`device-glow device-glow--${id}`} aria-hidden="true" />

        {/* Browser */}
        <div className="browser-wrapper" ref={browserRef}>
          <div className="browser-frame">
            <div className="browser-chrome" aria-hidden="true">
              <div className="browser-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="browser-url">{web.url}</div>
              <div className="browser-dots-spacer" />
            </div>
            <div className="browser-viewport">
              <VideoPlayer
                mp4={web.mp4}
                webm={web.webm}
                poster={web.poster}
                label={`${title} web demo`}
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="phone-wrapper" ref={phoneRef}>
          <div className="phone-frame">
            <div className="phone-island" aria-hidden="true" />
            <div className="phone-viewport">
              <VideoPlayer
                mp4={phone.mp4}
                webm={phone.webm}
                poster={phone.poster}
                label={`${title} mobile demo`}
              />
            </div>
            {/* Glass sheen reflection */}
            <div className="phone-sheen" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Projects ────────────────────────────────────────────────────────────── */

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-inner">
        <p className="projects-framing">
          Side projects I build with AI — data products and tooling.
        </p>
        <div className="projects-list">
          {PROJECTS.map((project) => (
            <ProjectRow key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
