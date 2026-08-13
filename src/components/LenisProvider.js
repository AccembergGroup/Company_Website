'use client'

import { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Sync Lenis updates directly with GSAP's ticker to match frame rates
    const update = (time) => {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    
    gsap.ticker.add(update)

    // Notify ScrollTrigger when Lenis scrolls
    const scrollUpdate = () => {
      ScrollTrigger.update()
    }
    
    lenisRef.current?.lenis?.on('scroll', scrollUpdate)

    return () => {
      gsap.ticker.remove(update)
      lenisRef.current?.lenis?.off('scroll', scrollUpdate)
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      autoRaf={false}
      options={{
        lerp: 0.045,
        duration: 1.8,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
