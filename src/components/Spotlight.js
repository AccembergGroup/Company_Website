'use client'

import React, { useRef, useState, useEffect } from 'react'

export function SpotlightProvider({ children, className = '', style = {} }) {
  return (
    <div className={className} style={{ ...style }}>
      {children}
    </div>
  )
}

export function SpotlightCard({ children, className = '', style = {} }) {
  const cardRef = useRef(null)
  const rectRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true)
    }
  }, [])

  const handleMouseEnter = () => {
    if (!cardRef.current) return
    rectRef.current = cardRef.current.getBoundingClientRect()
  }

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    if (!rectRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect()
    }
    const x = e.clientX - rectRef.current.left
    const y = e.clientY - rectRef.current.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
    cardRef.current.style.setProperty('--glow-opacity', '1')
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.setProperty('--glow-opacity', '0')
    rectRef.current = null
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`spotlight-card ${className}`}
      style={{
        ...style,
        position: 'relative',
        overflow: 'hidden',
        '--glow-opacity': '0',
        '--mouse-x': '-1000px',
        '--mouse-y': '-1000px',
      }}
    >
      {isDesktop && (
        <>
          {/* Card face glow matching brand tokens */}
          <div
            className="spotlight-glow"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              borderRadius: 'inherit',
              background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), var(--accent-glow) 0%, transparent 65%)',
              opacity: 'var(--glow-opacity)',
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }}
          />
          {/* Card border glow matching brand primary/tertiary colors */}
          <div 
            className="spotlight-border-glow"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              borderRadius: 'inherit',
              padding: '1px',
              background: 'radial-gradient(280px circle at var(--mouse-x) var(--mouse-y), var(--accent) 0%, transparent 70%)',
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
