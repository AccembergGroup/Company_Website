'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function FastScroll({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Desktop only to match the original constraints, though this is heavily optimized
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const container = containerRef.current
    if (!container) return

    // Hardware Accelerated CPU Bypass via native CSS blur/transform pipeline
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top 15%', 
        end: 'bottom -5%',
        scrub: true,
        animation: gsap.fromTo(container, 
          {
            opacity: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)',
          },
          {
            opacity: 0,
            x: 60, // Simulate horizontal wind drift
            y: -10, // Slight lift
            filter: 'blur(12px)', // Native hardware blur simulates disintegration
            ease: 'none',
            force3D: true, // Forces compositor layer
          }
        ),
      })
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
        willChange: 'opacity, transform, filter',
        transform: 'translateZ(0)',
        opacity: 1,
        filter: 'none',
      }}
    >
      {children}
    </div>
  )
}
