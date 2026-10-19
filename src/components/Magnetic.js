'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function Magnetic({ children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    let cleanupListeners = null
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReduced) return

    const ctx = gsap.context(() => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" })
      const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" })
      const scaleTo = gsap.quickTo(el, "scale", { duration: 0.4, ease: "power2.out" })

      const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = el.getBoundingClientRect()
        
        const x = clientX - (left + width / 2)
        const y = clientY - (top + height / 2)
        
        xTo(x * 0.35)
        yTo(y * 0.35)
        scaleTo(1.06)
      }

      const handleMouseLeave = () => {
        xTo(0)
        yTo(0)
        scaleTo(1.0)
      }

      el.addEventListener('mousemove', handleMouseMove)
      el.addEventListener('mouseleave', handleMouseLeave)

      cleanupListeners = () => {
        el.removeEventListener('mousemove', handleMouseMove)
        el.removeEventListener('mouseleave', handleMouseLeave)
      }
    }, ref)

    return () => {
      ctx.revert()
      if (cleanupListeners) cleanupListeners()
    }
  }, [])

  return (
    <div ref={ref} style={{ display: 'inline-block', position: 'relative', ...props.style }} {...props}>
      {children}
    </div>
  )
}
