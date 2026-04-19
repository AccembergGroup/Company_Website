'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Preloader() {
  const [phase, setPhase] = useState('visible') // 'visible' | 'fading' | 'gone'
  const videoRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const triggerExit = () => {
      if (phase !== 'visible') return
      setPhase('fading')
      timerRef.current = setTimeout(() => setPhase('gone'), 900)
    }

    // Exit when video ends OR after max 4.5 s
    const video = videoRef.current
    if (video) {
      video.addEventListener('ended', triggerExit)
    }

    const maxTimer = setTimeout(triggerExit, 4500)

    return () => {
      if (video) video.removeEventListener('ended', triggerExit)
      clearTimeout(maxTimer)
      clearTimeout(timerRef.current)
    }
  }, [phase])

  if (phase === 'gone') return null

  return (
    <div
      className={`preloader${phase === 'fading' ? ' fade-out' : ''}`}
      aria-hidden="true"
    >
      {/* Dot grid texture */}
      <div className="dot-grid" />

      {/* Glow spot */}
      <div
        className="glow-spot"
        style={{ width: 500, height: 500, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
      />

      {/* Video */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div
          style={{
            width: 'clamp(240px, 30vw, 380px)',
            aspectRatio: '16/9',
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(26,143,255,0.15)',
            boxShadow: '0 0 60px rgba(26,143,255,0.12)',
          }}
        >
          <video
            ref={videoRef}
            src="/Accemberg_inro.mp4"
            autoPlay
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Brand label below video */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span
            style={{
              fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
              fontSize: 'clamp(18px, 2vw, 22px)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
            }}
          >
            ACCEMBERG
          </span>
          <span
            style={{
              fontFamily: 'var(--font-inter, "Inter", sans-serif)',
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}
          >
            Products &amp; Services
          </span>
        </div>

        {/* Loading dots */}
        <div
          style={{
            display: 'flex',
            gap: 6,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--accent)',
                opacity: 0.5,
                animation: `preloader-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes preloader-dot {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50%       { opacity: 1;   transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
