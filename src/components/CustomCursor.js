'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isFine = window.matchMedia('(pointer: fine)').matches
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (isFine && !prefersReduced) {
        setIsDesktop(true)
      }
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const cursor = cursorRef.current
    if (!cursor) return

    // Offset strictly via GSAP to prevent transform collisions
    gsap.set(cursor, { xPercent: -50, yPercent: -50 })

    let xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out", force3D: true })
    let yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out", force3D: true })

    const onMouseMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .magnetic, .interactive')
      if (target) {
        gsap.to(cursor, { scale: 2.8, background: 'rgba(26,143,255,0.1)', border: '1px solid var(--accent)', duration: 0.3 })
      } else {
        gsap.to(cursor, { scale: 1, background: 'var(--accent)', border: 'none', duration: 0.3 })
      }
    }

    // Hide if mouse leaves window
    const onMouseLeave = () => gsap.to(cursor, { opacity: 0, duration: 0.2 })
    const onMouseEnter = () => gsap.to(cursor, { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    // Optional: Hide default cursor globally
    document.body.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.body.style.cursor = 'auto'
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      <style>{`
        /* Safety fallback: explicitly force none cursor on hoverable items to prevent flashing */
        @media (pointer: fine) {
          a, button, .magnetic { cursor: none !important; }
        }
      `}</style>
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          background: 'rgba(26,143,255,0.8)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          // Replaced expensive mix-blend-mode with a cheap hardware shadow
          boxShadow: '0 0 10px rgba(26,143,255,0.4)',
        }}
      />
    </>
  )
}
