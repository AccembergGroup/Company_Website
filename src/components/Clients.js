'use client'

import { useEffect, useRef } from 'react'

// Placeholder client names — styled as corporate name pills
const ROW_ONE = [
  'Vertex Systems', 'NovaTech Labs', 'Orion Dynamics', 'Stratos HQ',
  'DataBridge Inc.', 'CoreLogic Co.', 'Nexus Digital', 'Forefront AI',
]
const ROW_TWO = [
  'Quantum Works', 'BluePeak Corp.', 'Meridian SaaS', 'Axon Platforms',
  'Helix Solutions', 'PolarEdge Ltd.', 'Catalyst IO', 'Summit Cloud',
]

function useReveal(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 },
    )
    el.querySelectorAll('.reveal').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
}

export default function Clients() {
  const ref = useRef(null)
  useReveal(ref)

  // Triple-duplicate for seamless CSS loop
  const r1 = [...ROW_ONE, ...ROW_ONE, ...ROW_ONE]
  const r2 = [...ROW_TWO, ...ROW_TWO, ...ROW_TWO]

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(60px,8vw,100px) 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Edge fade masks */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--bg-surface) 0%, transparent 12%, transparent 88%, var(--bg-surface) 100%)',
      }} />

      <div className="container" style={{ marginBottom: 'clamp(32px,4vw,52px)' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>Trusted By</div>
          <h2 className="text-h2 reveal" style={{ marginBottom: 12 }}>
            Clients Who <span style={{ color: 'var(--accent)' }}>Scale With Us</span>
          </h2>
          <p className="text-body-lg reveal" style={{ maxWidth: 480, margin: '0 auto' }}>
            From early-stage SaaS companies to established enterprises — we deliver at every level.
          </p>
        </div>
      </div>

      {/* Row 1 — left direction */}
      <div style={{ overflow: 'hidden', marginBottom: 16 }}>
        <div className="marquee-track">
          {r1.map((name, i) => (
            <ClientPill key={i} name={name} />
          ))}
        </div>
      </div>

      {/* Row 2 — right direction */}
      <div style={{ overflow: 'hidden' }}>
        <div className="marquee-track-reverse">
          {r2.map((name, i) => (
            <ClientPill key={i} name={name} dimmed />
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientPill({ name, dimmed = false }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 24px',
        marginRight: 12,
        background: dimmed ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 3,
        whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
    >
      {/* Dot accent */}
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: dimmed ? 'var(--text-muted)' : 'var(--accent)',
        opacity: dimmed ? 0.4 : 0.6,
        flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 13,
        fontWeight: 500,
        color: dimmed ? 'var(--text-muted)' : 'var(--text-secondary)',
        letterSpacing: '0.02em',
      }}>
        {name}
      </span>
    </div>
  )
}
