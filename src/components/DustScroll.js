'use client'

import { useRef, useEffect, useId } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DustScroll({ children }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const id = useId()
  // Ensure a valid DOM ID string
  const filterId = `dust-${id.replace(/[^a-zA-Z0-9-_]/g, '')}`

  useEffect(() => {
    // Only run this highly intensive effect on desktop devices
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const container = containerRef.current
    const map = mapRef.current
    if (!container || !map) return

    // Animate the displacement map scale (this causes the pixel shredding)
    const stScale = ScrollTrigger.create({
      trigger: container,
      start: 'top 15%', // Begins much closer to the top edge
      end: 'bottom -5%',
      scrub: 1.5,
      animation: gsap.to(map, {
        attr: { scale: 80 }, // Tweaked slightly for stability
        ease: 'power2.in',
      }),
    })

    // Simultaneously fade opacity and drift horizontally like wind blowing dust
    const stAlpha = ScrollTrigger.create({
      trigger: container,
      start: 'top 12%',
      end: 'bottom -10%',
      scrub: 1.5,
      animation: gsap.to(container, {
        opacity: 0,
        x: 60,  // Move horizontally
        y: -10, // Slight upward lift
        ease: 'power1.in',
      }),
    })

    return () => {
      stScale.kill()
      stAlpha.kill()
    }
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <svg
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.15" // Higher frequency = fine grains instead of large waves
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            ref={mapRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <div
        ref={containerRef}
        style={{
          filter: `url(#${filterId})`,
          transform: 'translateZ(0)',
          willChange: 'filter, opacity, transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
