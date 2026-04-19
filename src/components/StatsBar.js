'use client'

import { useEffect, useRef, useState } from 'react'

const STATS = [
  { end: 50,  suffix: '+', label: 'Enterprise Clients',   sub: 'Across 8 industries' },
  { end: 120, suffix: '+', label: 'Projects Delivered',   sub: 'On time, every time' },
  { end: 6,   suffix: '',  label: 'Service Verticals',    sub: 'End-to-end coverage' },
  { end: 98,  suffix: '%', label: 'Client Retention Rate', sub: 'Built on trust' },
]

function useCountUp(end, duration = 1800, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])

  return count
}

function StatItem({ end, suffix, label, sub, started }) {
  const count = useCountUp(end, 1600, started)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: '32px 0',
        flex: 1,
      }}
    >
      <span className="stat-number">
        {count}{suffix}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
      <span className="text-label" style={{ color: 'var(--text-muted)' }}>
        {sub}
      </span>
    </div>
  )
}

export default function StatsBar() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        borderTop:    '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle blue glow behind */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 100%, rgba(26,143,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                position: 'relative',
                paddingLeft: i > 0 ? 40 : 0,
                paddingRight: i < STATS.length - 1 ? 40 : 0,
              }}
            >
              {/* Divider */}
              {i > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: 1,
                    background: 'var(--border-subtle)',
                  }}
                />
              )}
              <StatItem {...stat} started={started} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
