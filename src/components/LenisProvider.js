'use client'

import { ReactLenis } from 'lenis/react'

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}
