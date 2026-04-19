'use client'

import { useEffect, useRef } from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Scoping',
    desc: 'We immerse ourselves in your requirements, technical landscape, and business goals to produce a precise, deliverable-bound project scope.',
    icon: <DiscoveryIcon />,
  },
  {
    num: '02',
    title: 'Architecture & Strategy',
    desc: 'Our senior engineers design the technical foundation — selecting the right stack, system boundaries, and scalability approach before a single line is written.',
    icon: <ArchIcon />,
  },
  {
    num: '03',
    title: 'Iterative Development',
    desc: 'Modular, documentation-first engineering with QA gates at every sprint. You see progress early and often — no black-box delivery.',
    icon: <DevIcon />,
  },
  {
    num: '04',
    title: 'Deployment & Scale',
    desc: 'Structured handoff, production deployment, monitoring setup, and optional long-term maintenance — built for systems that need to keep running.',
    icon: <DeployIcon />,
  },
]

export default function Process() {
  const ref = useRef(null)

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
      { threshold: 0.1 },
    )
    el.querySelectorAll('.reveal, .reveal-scale').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="process" className="section" ref={ref}
      style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="dot-grid" style={{ opacity: 0.4 }} />

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(52px,7vw,88px)', maxWidth: 600, margin: '0 auto clamp(52px,7vw,88px)' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>Our Process</div>
          <h2 className="text-h2 reveal" style={{ marginBottom: 16 }}>
            How We <span style={{ color: 'var(--accent)' }}>Deliver</span>
          </h2>
          <p className="text-body-lg reveal">
            A structured, repeatable system that eliminates ambiguity and delivers quality — at every stage.
          </p>
        </div>

        {/* Steps grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          position: 'relative',
          gap: 0,
        }} className="process-grid">
          {/* Connector line */}
          <div style={{
            position: 'absolute',
            top: 34,
            left: '12.5%',
            right: '12.5%',
            height: 1,
            background: 'linear-gradient(to right, var(--border-subtle), var(--accent), var(--border-subtle))',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 0,
          }} className="process-line" />

          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal-scale stagger-${i + 1}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 20px',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Step circle */}
              <div style={{
                width: 68,
                height: 68,
                borderRadius: '50%',
                background: i === 0 || i === 3 ? 'var(--accent-dim)' : 'var(--bg-elevated)',
                border: `1px solid ${i === 0 ? 'rgba(26,143,255,0.4)' : 'var(--border-default)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)',
                flexShrink: 0,
                position: 'relative',
                boxShadow: i === 0 ? '0 0 24px var(--accent-glow)' : 'none',
              }}>
                {step.icon}
                {/* Step number badge */}
                <span style={{
                  position: 'absolute',
                  bottom: -4, right: -4,
                  width: 20, height: 20,
                  borderRadius: '50%',
                  background: 'var(--bg-base)',
                  border: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 8,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  letterSpacing: '0.04em',
                }}>
                  {i + 1}
                </span>
              </div>

              <span className="process-num" style={{ marginBottom: 8 }}>{step.num}</span>
              <h3 style={{
                fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 12,
                lineHeight: 1.3,
              }}>
                {step.title}
              </h3>
              <p className="text-body" style={{ fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 40px 0 !important; }
          .process-line  { display: none !important; }
        }
        @media (max-width: 520px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function DiscoveryIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M15.5 15.5L20 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function ArchIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="13" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="7.5" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M5.5 9v2a3 3 0 003 3h5a3 3 0 003-3V9" stroke="currentColor" strokeWidth="1.4"/>
  </svg>
}
function DevIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M6 7L2 11l4 4M16 7l4 4-4 4M13 4l-4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function DeployIcon() {
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 3v12M7 11l4-5 4 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 19h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    <circle cx="11" cy="17" r="1.2" fill="currentColor"/>
  </svg>
}
