import { useRef, useEffect } from 'react'
import './Projects.css'

/* ── VideoPlayer ─────────────────────────────────────────────────────────── */

function VideoPlayer({ mp4, webm, poster, label }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
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

/* ── BrowserFrame ────────────────────────────────────────────────────────── */

function BrowserFrame({ children, url }) {
  return (
    <div className="browser-frame">
      <div className="browser-chrome">
        <div className="browser-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="browser-url" aria-hidden="true">{url}</div>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  )
}

/* ── PhoneFrame ──────────────────────────────────────────────────────────── */

function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-island" aria-hidden="true" />
      <div className="phone-content">{children}</div>
    </div>
  )
}

/* ── Project data ────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 'janus',
    title: 'Janus',
    description:
      'A crypto intelligence platform modeled on a Bloomberg terminal: a screener, correlation view, arbitrage scanner, and terminal-style layout, fronted by a cinematic animated landing.',
    tags: ['React', 'Framer Motion', 'Vercel'],
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

/* ── ProjectRow ──────────────────────────────────────────────────────────── */

function ProjectRow({ project }) {
  const { id, title, description, tags, web, phone } = project

  return (
    <div className={`project-row project-row--${id}`}>
      <div className="project-meta">
        <div className="project-header">
          <h3 className="project-title">{title}</h3>
          <span className="project-tag project-tag--type">Personal project</span>
        </div>
        <p className="project-desc">{description}</p>
        <ul className="project-stack" aria-label="Tech stack">
          {tags.map((tag) => (
            <li key={tag} className="project-tag project-tag--tech">{tag}</li>
          ))}
        </ul>
      </div>

      <div className="project-media">
        <BrowserFrame url={web.url}>
          <VideoPlayer
            mp4={web.mp4}
            webm={web.webm}
            poster={web.poster}
            label={`${title} web demo`}
          />
        </BrowserFrame>
        <PhoneFrame>
          <VideoPlayer
            mp4={phone.mp4}
            webm={phone.webm}
            poster={phone.poster}
            label={`${title} mobile demo`}
          />
        </PhoneFrame>
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
