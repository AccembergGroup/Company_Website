'use client'

import { useEffect, useRef } from 'react'

const ENGINES = [
  {
    num: '01',
    title: 'Client Services Engine',
    role: 'Revenue Anchor',
    desc: 'Immediate cash flow from world-class custom software delivery — funding everything we build.',
    color: 'var(--accent)',
    icon: <BuildIcon />,
  },
  {
    num: '02',
    title: 'Rapid SaaS Factory',
    role: 'Validation Engine',
    desc: 'Fast-cycle niche tools that test markets, generate early MRR, and feed learnings into our flagship work.',
    color: '#4DAAFF',
    icon: <RocketIcon />,
  },
  {
    num: '03',
    title: 'Flagship Product Lab',
    role: 'Value Engine',
    desc: 'Deep, enterprise-grade SaaS platforms with high retention and long-term compounding valuation.',
    color: '#8CC8FF',
    icon: <LayersIcon />,
  },
]

function useReveal(ref, options = {}) {
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
      { threshold: 0.15, ...options },
    )
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
}

export default function About() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="about" className="section" ref={ref}>
      {/* Subtle glow top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-120px',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,143,255,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Top asymmetric row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'flex-start',
            marginBottom: 'clamp(60px, 8vw, 100px)',
          }}
          className="about-grid"
        >
          {/* Left — Text */}
          <div>
            <div className="section-label reveal">Our Model</div>
            <h2 className="text-h2 reveal" style={{ marginBottom: 24 }}>
              One Studio.<br />
              <span style={{ color: 'var(--accent)' }}>Three Engines.</span><br />
              Infinite Scale.
            </h2>
            <p className="text-body-lg reveal" style={{ marginBottom: 32 }}>
              Most firms choose between building scalable products and generating stable revenue.
              Accemberg was architected to eliminate that trade-off — permanently.
            </p>
            <p className="text-body reveal" style={{ marginBottom: 36 }}>
              Our three-engine system creates a self-reinforcing flywheel: client services fund
              product development, rapid SaaS products validate markets, and flagship platforms
              drive long-term enterprise valuation. Each engine strengthens the others —
              compounding with every engagement.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }} className="reveal">
              <a href="#services" className="btn btn-primary btn-sm">
                Our Services
              </a>
              <a href="#contact" className="btn btn-outline btn-sm">
                Partner With Us
              </a>
            </div>
          </div>

          {/* Right — Flywheel Diagram */}
          <div
            className="reveal-right"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 340,
            }}
          >
            <FlywheelDiagram />
          </div>
        </div>

        {/* Engine cards — offset row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
          className="engines-grid"
        >
          {ENGINES.map((engine, i) => (
            <div
              key={engine.num}
              className={`card card-glass reveal stagger-${i + 1}`}
              style={{
                borderRadius: i === 0 ? '4px 0 0 4px' : i === 2 ? '0 4px 4px 0' : '0',
                paddingTop: i === 1 ? 40 : 32, // middle card raised
                marginTop: i === 1 ? -16 : 0,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div
                  className="icon-box"
                  style={{
                    background: `rgba(26,143,255,0.10)`,
                    borderColor: `rgba(26,143,255,0.20)`,
                    color: engine.color,
                  }}
                >
                  {engine.icon}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: 'var(--text-muted)',
                  }}
                >
                  {engine.num}
                </span>
              </div>
              <div style={{ marginBottom: 6 }}>
                <span className="text-label" style={{ color: engine.color }}>
                  {engine.role}
                </span>
              </div>
              <h3 className="text-h3" style={{ marginBottom: 12, fontSize: 18 }}>
                {engine.title}
              </h3>
              <p className="text-body">{engine.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .engines-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .engines-grid > div { border-radius: 4px !important; margin-top: 0 !important; }
        }
      `}</style>
    </section>
  )
}

/* ── Flywheel SVG Diagram ───────────────────────────────── */
function FlywheelDiagram() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 360 }}>
      <svg viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
        {/* Outer circle */}
        <circle cx="180" cy="180" r="154" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 6" />
        {/* Middle ring */}
        <circle cx="180" cy="180" r="104" stroke="rgba(26,143,255,0.08)" strokeWidth="1" />
        {/* Core */}
        <circle cx="180" cy="180" r="52" fill="rgba(26,143,255,0.06)" stroke="rgba(26,143,255,0.18)" strokeWidth="1" />

        {/* Core text */}
        <text x="180" y="175" textAnchor="middle" fill="rgba(26,143,255,0.9)" fontSize="8" fontFamily="Space Grotesk, sans-serif" fontWeight="700" letterSpacing="0.12em">ACCEMBERG</text>
        <text x="180" y="188" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="Inter, sans-serif" letterSpacing="0.08em">FLYWHEEL</text>

        {/* Engine nodes */}
        {/* Node 1 — top */}
        <circle cx="180" cy="40" r="28" fill="rgba(13,19,24,0.9)" stroke="rgba(26,143,255,0.3)" strokeWidth="1" />
        <text x="180" y="36" textAnchor="middle" fill="#1A8FFF" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.08em">CLIENT</text>
        <text x="180" y="47" textAnchor="middle" fill="#1A8FFF" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.08em">SERVICES</text>

        {/* Node 2 — bottom-right */}
        <circle cx="307" cy="262" r="28" fill="rgba(13,19,24,0.9)" stroke="rgba(26,143,255,0.2)" strokeWidth="1" />
        <text x="307" y="258" textAnchor="middle" fill="#4DAAFF" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.06em">RAPID</text>
        <text x="307" y="269" textAnchor="middle" fill="#4DAAFF" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.06em">SaaS</text>

        {/* Node 3 — bottom-left */}
        <circle cx="53" cy="262" r="28" fill="rgba(13,19,24,0.9)" stroke="rgba(26,143,255,0.15)" strokeWidth="1" />
        <text x="53" y="258" textAnchor="middle" fill="#8CC8FF" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.06em">FLAGSHIP</text>
        <text x="53" y="269" textAnchor="middle" fill="#8CC8FF" fontSize="6" fontFamily="Inter, sans-serif" fontWeight="500" letterSpacing="0.06em">PRODUCT</text>

        {/* Arrows — connecting nodes clockwise */}
        <path d="M 200 62 Q 290 130 290 240" stroke="rgba(26,143,255,0.25)" strokeWidth="1" strokeDasharray="3 5" markerEnd="url(#arr)" />
        <path d="M 285 282 Q 200 330 100 282" stroke="rgba(26,143,255,0.18)" strokeWidth="1" strokeDasharray="3 5" markerEnd="url(#arr)" />
        <path d="M 68 242 Q 80 120 158 62" stroke="rgba(26,143,255,0.18)" strokeWidth="1" strokeDasharray="3 5" markerEnd="url(#arr)" />

        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(26,143,255,0.4)" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}

/* ── SVG Icons ──────────────────────────────────────────── */
function BuildIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="10" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="7" y="6" width="4" height="10" rx="1" stroke="currentColor" strokeWidth="1.3"/>
      <rect x="12" y="2" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  )
}
function RocketIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 14s-3-2-3-6c0-2 1.5-4 3-5 1.5 1 3 3 3 5s-3 6-3 6z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="9" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 12l-2 2M12 12l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}
function LayersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M9 2L16 6.5 9 11 2 6.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M2 11l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}
