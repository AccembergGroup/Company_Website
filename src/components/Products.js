'use client'

import { useEffect, useRef } from 'react'

const PRODUCTS = [
  {
    id: 'flagship',
    label: 'Flagship Product Lab',
    title: 'Enterprise-Grade SaaS Platforms',
    desc: 'Deep, long-lifecycle products engineered for enterprise retention and compounding MRR. Our Flagship Lab builds platforms that become the backbone of our clients\' operations — architected for 10-year horizons.',
    tags: ['Enterprise', 'SaaS', 'Long Lifecycle'],
    accent: 'var(--accent)',
    status: 'In Development',
    highlight: true,
    metric: { label: 'Target MRR Growth', val: '3× YoY' },
    icon: <FlagshipIcon />,
  },
  {
    id: 'agnishakti',
    label: 'Rapid SaaS Factory',
    title: 'Agnishakti Platform',
    desc: 'A high-velocity niche SaaS product built to validate a key market segment — from MVP to monetisation in weeks, not quarters.',
    tags: ['Niche SaaS', 'Fast Launch'],
    accent: '#4DAAFF',
    status: 'Active',
    metric: { label: 'Dev Cycle', val: '< 8 weeks' },
    icon: <RapidIcon />,
  },
  {
    id: 'client-services',
    label: 'Client Services Engine',
    title: 'Custom Software Delivery',
    desc: 'Bespoke solutions for enterprise clients — full ownership, structured delivery, and long-term maintenance partnerships.',
    tags: ['Custom', 'Full-Stack', 'Enterprise'],
    accent: '#8CC8FF',
    status: 'Open to Engagements',
    metric: { label: 'Project Start', val: '< 2 weeks' },
    icon: <ClientIcon />,
  },
]

export default function Products() {
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
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const [flagship, ...rest] = PRODUCTS

  return (
    <section id="products" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Glow left */}
      <div style={{
        position: 'absolute', left: -100, top: '30%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(26,143,255,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 520 }}>
            <div className="section-label reveal">Products & Capabilities</div>
            <h2 className="text-h2 reveal" style={{ marginBottom: 16 }}>
              What We're<br/>
              <span style={{ color: 'var(--accent)' }}>Building</span>
            </h2>
            <p className="text-body-lg reveal">
              Three parallel product tracks — each contributing to the same compounding flywheel of growth.
            </p>
          </div>
          <a href="#contact" className="btn btn-outline btn-sm reveal">
            Start a Project →
          </a>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gridTemplateRows: 'auto',
          gap: 3,
        }} className="products-bento">
          {/* Large flagship card */}
          <div
            className="reveal-left"
            style={{ gridRow: '1 / 3' }}
          >
            <ProductCard product={flagship} large />
          </div>

          {/* Two stacked cards */}
          <div className="reveal-right stagger-1">
            <ProductCard product={rest[0]} />
          </div>
          <div className="reveal-right stagger-2">
            <ProductCard product={rest[1]} />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .products-bento {
            grid-template-columns: 1fr !important;
          }
          .products-bento > div:first-child {
            grid-row: auto !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProductCard({ product, large = false }) {
  return (
    <div
      style={{
        background: product.highlight ? 'rgba(26,143,255,0.05)' : 'var(--bg-surface)',
        border: `1px solid ${product.highlight ? 'rgba(26,143,255,0.18)' : 'var(--border-subtle)'}`,
        borderRadius: 4,
        padding: large ? 'clamp(32px, 4vw, 52px)' : 'clamp(24px, 3vw, 36px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: large ? 24 : 16,
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 300ms, box-shadow 300ms',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `rgba(26,143,255,0.30)`
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = product.highlight ? 'rgba(26,143,255,0.18)' : 'var(--border-subtle)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top: icon + status badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="icon-box" style={{ color: product.accent, borderColor: `${product.accent}22`, background: `${product.accent}11` }}>
          {product.icon}
        </div>
        <span
          style={{
            padding: '4px 10px',
            borderRadius: 3,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--border-subtle)',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {product.status}
        </span>
      </div>

      {/* Label */}
      <div>
        <span className="text-label" style={{ color: product.accent }}>{product.label}</span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
          fontSize: large ? 'clamp(20px, 2.5vw, 28px)' : 17,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
        }}
      >
        {product.title}
      </h3>

      {/* Desc */}
      <p className="text-body" style={{ flex: 1, lineHeight: 1.75 }}>{product.desc}</p>

      {/* Metric */}
      <div
        style={{
          padding: '14px 18px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span className="text-label">{product.metric.label}</span>
        <span
          style={{
            fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
            fontSize: 14,
            fontWeight: 700,
            color: product.accent,
            letterSpacing: '-0.01em',
          }}
        >
          {product.metric.val}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {product.tags.map((tag) => (
          <span key={tag} className="tag" style={{ fontSize: 10 }}>{tag}</span>
        ))}
      </div>

      {/* Decorative corner accent for highlight card */}
      {product.highlight && (
        <div style={{
          position: 'absolute',
          top: -40, right: -40,
          width: 160, height: 160,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,143,255,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
      )}
    </div>
  )
}

function FlagshipIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>
}
function RapidIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 3v6l4 2M10 3a7 7 0 100 14A7 7 0 0010 3z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M16 4l1-1M4 4L3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
}
function ClientIcon() {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="2" y="4" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M6 17h8M10 15v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M6 8h3M6 11h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
}
