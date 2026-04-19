'use client'

import React, { useRef, useState, useEffect } from 'react'

export function SpotlightProvider({ children, className = '', style = {} }) {
  const containerRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!isDesktop || !containerRef.current) return
    // BYPASS REACT STATE: This is critical for performance. 
    // Firing setState on mousemove causes thousands of micro-re-renders.
    // Instead we directly inject the coordinates mathematically matching into the DOM nodes.
    const cards = containerRef.current.querySelectorAll('.spotlight-card')
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
      card.style.setProperty('--glow-opacity', '1')
    })
  }

  const handleMouseLeave = () => {
    if (!containerRef.current) return
    const cards = containerRef.current.querySelectorAll('.spotlight-card')
    cards.forEach((card) => {
      card.style.setProperty('--glow-opacity', '0')
    })
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ ...style }}
    >
      {children}
    </div>
  )
}

export function SpotlightCard({ children, className = '', style = {} }) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true)
    }
  }, [])

  return (
    <div
      className={`spotlight-card ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        // Fallback variables before mouse enters provider bounds
        '--glow-opacity': '0',
        '--mouse-x': '-1000px',
        '--mouse-y': '-1000px',
      }}
    >
      {isDesktop && (
        <>
          <div
            className="spotlight-glow"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              borderRadius: 'inherit',
              background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(26,143,255,0.06), transparent 40%)',
              opacity: 'var(--glow-opacity)',
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              borderRadius: 'inherit',
              padding: '1px',
              background: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.25), transparent 40%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 'var(--glow-opacity)',
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />
        </>
      )}
      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </div>
    </div>
  )
}
