'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FastScroll({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    // Desktop only to match the original constraints, though this is heavily optimized
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const container = containerRef.current
    if (!container) return

    // Hardware Accelerated CPU Bypass
    // Instead of forcing the CPU to calculate fractal noise SVG maps, 
    // we use a native CSS blur and transform pipeline which executes directly on the GPU.
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 15%', 
      end: 'bottom -5%',
      scrub: true,
      animation: gsap.to(container, {
        opacity: 0,
        x: 60, // Simulate horizontal wind drift
        y: -10, // Slight lift
        filter: 'blur(12px)', // Native hardware blur simulates disintegration
        ease: 'none',
        force3D: true, // Forces Chrome/Safari to use a dedicated compositor layer
      }),
    })

    return () => {
      st.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'inline-block',
        // Instruct the browser to prep the GPU layer to entirely bypass the CPU paint stage
        willChange: 'opacity, transform, filter',
        transform: 'translateZ(0)', 
      }}
    >
      {children}
    </div>
  )
}
