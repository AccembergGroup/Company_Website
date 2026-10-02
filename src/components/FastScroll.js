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
    
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const container = containerRef.current
    if (!container) return

    
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
            x: 60, 
            y: -10, 
            filter: 'blur(12px)', 
            ease: 'none',
            force3D: true, 
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
