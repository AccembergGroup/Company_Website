'use client'

import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'

export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only mount on devices with a fine pointer (mouse)
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true)
    }
  }, [])

  useEffect(() => {
    if (!isDesktop) return
    const el = ref.current
    if (!el) return

    // Quick setters using GSAP elasticity for a natural physical "spring" effect
    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const onMouseMove = (e) => {
      const { clientX, clientY } = e
      const { height, width, left, top } = el.getBoundingClientRect()
      
      // Calculate cursor position relative to the element's actual center
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      
      // Pull element towards mouse based on strength multiplier
      xTo(x * strength)
      yTo(y * strength)
    }

    const onMouseLeave = () => {
      // Snap back to origin
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", onMouseMove)
    el.addEventListener("mouseleave", onMouseLeave)

    return () => {
      el.removeEventListener("mousemove", onMouseMove)
      el.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [isDesktop, strength])

  return (
    <div ref={ref} className="magnetic interactive" style={{ display: 'inline-block' }}>
      {children}
    </div>
  )
}
