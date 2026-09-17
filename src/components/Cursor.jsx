import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Cursor.css'

export default function Cursor() {
  const dot = useRef(null)

  useEffect(() => {
    // Touch / pointer-coarse devices: leave native cursor alone
    if (window.matchMedia('(hover: none)').matches) return

    const el = dot.current
    document.body.classList.add('has-custom-cursor')
    gsap.set(el, { opacity: 0 })

    const onMove = (e) => {
      gsap.to(el, {
        x: e.clientX - 3,
        y: e.clientY - 3,
        duration: 0.38,
        ease: 'power2.out',
        overwrite: 'auto',
      })
      gsap.to(el, { opacity: 1, duration: 0.25, overwrite: false })
    }

    // Scale up on any interactive element
    const onOver = (e) => {
      if (e.target.closest('a, button')) {
        gsap.to(el, { scale: 2.4, duration: 0.22, ease: 'power2.out' })
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button')) {
        gsap.to(el, { scale: 1, duration: 0.22, ease: 'power2.out' })
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  return <div ref={dot} className="cursor-dot" aria-hidden="true" />
}
