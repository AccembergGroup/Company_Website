'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'

const SCALE_STATS = [
  { end: 99.999, decimals: 3, suffix: '%', label: 'SLA Uptime', sub: 'Guaranteed system availability' },
  { end: 14,     decimals: 0, prefix: '< ', suffix: 'ms', label: 'Response Latency', sub: 'Avg API execution time' },
  { end: 4.8,    decimals: 1, suffix: 'B+', label: 'Daily Operations', sub: 'Processed across client stacks' },
]

function useCountUp(end, decimals = 0, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      
      const currentVal = eased * end
      setCount(currentVal)
      
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])

  return count.toFixed(decimals)
}

function StatItem({ prefix = '', end, decimals, suffix, label, sub, started }) {
  const countValue = useCountUp(end, decimals, 1800, started)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 6,
        padding: '24px 0',
      }}
    >
      <span className="scale-stat-number" style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 'clamp(36px, 4.5vw, 54px)',
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.02em',
        background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--accent) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {prefix}{countValue}{suffix}
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
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
        {sub}
      </span>
    </div>
  )
}

export default function StatsBar() {
  const { theme } = useTheme()
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Volumetric Ribbon Animation Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    let t = 0

    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      t += 0.014

      const linesCount = 28
      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath()
        const phaseOffset = i * 0.08

        for (let x = 0; x < width; x++) {
          const normX = x / width
          // Envelope shape: starts narrow at sides, swells in middle
          const envelope = Math.sin(normX * Math.PI) * (height * 0.38)
          
          const angle = normX * Math.PI * 1.8 - t * 2.2 + phaseOffset
          const y = height / 2 + Math.sin(angle) * envelope

          // Add minor 3D shift perspective
          const projectedX = x + Math.cos(angle) * 14

          if (x === 0) {
            ctx.moveTo(projectedX, y)
          } else {
            ctx.lineTo(projectedX, y)
          }
        }

        // Stripe volumetric ribbon gradient (peach -> magenta -> violet)
        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, 'rgba(251, 146, 60, 0.04)')  // orange peach
        gradient.addColorStop(0.5, theme === 'dark' ? 'rgba(236, 72, 153, 0.38)' : 'rgba(236, 72, 153, 0.25)') // pink magenta
        gradient.addColorStop(1, 'rgba(124, 58, 237, 0.04)')   // violet

        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.4
        ctx.stroke()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [theme])

  return (
    <section
      ref={sectionRef}
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 0',
        transition: 'background-color 400ms',
      }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ maxWidth: 620, marginBottom: 40, textAlign: 'left' }}>
          <h2
            style={{
              fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              marginBottom: 14,
            }}
          >
            Scale with confidence.
          </h2>
          <p
            style={{
              fontSize: 'clamp(15px, 1.2vw, 17px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
            }}
          >
            Engineered to handle millions of operations per second with microsecond latency and absolute reliability, even during peak traffic surges.
          </p>
        </div>

        {/* Volumetric Ribbon Canvas Container */}
        <div style={{ position: 'relative', width: '100%', height: 160, marginBottom: 40 }}>
          <canvas
            ref={canvasRef}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Eased Metrics */}
        <div
          className="scale-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
            borderTop: '1px solid var(--border)',
            paddingTop: 20,
          }}
        >
          {SCALE_STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} started={started} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .scale-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
