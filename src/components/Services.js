'use client'

import { useEffect, useRef } from 'react'

const SERVICES = [
  {
    num: '01',
    title: 'Full-Stack Software Development',
    desc: 'End-to-end product engineering from architecture to deployment — scalable, maintainable, and built for growth.',
    icon: <CodeIcon />,
    tags: ['React', 'Node.js', 'Databases', 'APIs'],
  },
  {
    num: '02',
    title: 'System Architecture & Integration',
    desc: 'Robust technical foundations and seamless third-party integrations that eliminate bottlenecks at scale.',
    icon: <ArchIcon />,
    tags: ['Microservices', 'APIs', 'Legacy Migration'],
  },
  {
    num: '03',
    title: 'Cloud Infrastructure & DevOps',
    desc: 'Cloud-native infrastructure design with CI/CD pipelines, container orchestration, and 99.9% uptime targets.',
    icon: <CloudIcon />,
    tags: ['AWS', 'GCP', 'Kubernetes', 'CI/CD'],
  },
  {
    num: '04',
    title: 'AI & ML Integration',
    desc: 'Intelligent automation, predictive analytics, and LLM-powered features built directly into your product stack.',
    icon: <BrainIcon />,
    tags: ['LLMs', 'ML Pipelines', 'NLP', 'GenAI'],
  },
  {
    num: '05',
    title: 'Technical Consulting & Strategy',
    desc: 'Senior engineering advisory for product decisions, technical debt reduction, and scalability roadmaps.',
    icon: <StratIcon />,
    tags: ['Roadmapping', 'Audits', 'Advisory'],
  },
  {
    num: '06',
    title: 'QA, Testing & Maintenance',
    desc: 'Multi-stage quality assurance with automated testing pipelines and dedicated support — ensuring reliability.',
    icon: <QAIcon />,
    tags: ['Automated QA', 'Performance', 'SLAs'],
  },
]

export default function Services() {
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
    <section id="services" className="section" ref={ref}
      style={{ background: 'var(--bg-surface)', position: 'relative', overflow: 'hidden' }}
    >
      <div className="dot-grid" style={{ opacity: 0.5 }} />

      {/* Glow bottom-center */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: 'radial-gradient(ellipse, rgba(26,143,255,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', maxWidth: 600 }}>
          <div className="section-label reveal">What We Deliver</div>
          <h2 className="text-h2 reveal" style={{ marginBottom: 16 }}>
            Full-Spectrum<br />
            <span style={{ color: 'var(--accent)' }}>Engineering Services</span>
          </h2>
          <p className="text-body-lg reveal" style={{ color: 'var(--text-secondary)' }}>
            From initial architecture to production-grade deployment — we cover every dimension of modern software engineering.
          </p>
        </div>

        {/* 3×2 grid with middle row offset */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 2,
        }} className="services-grid">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.num}
              className={`reveal-scale stagger-${(i % 3) + 1}`}
              style={{
                // Middle row (indices 3,4,5) shifts up slightly for asymmetry
                marginTop: i >= 3 ? -20 : 0,
                position: 'relative',
                zIndex: i >= 3 ? 2 : 1,
              }}
            >
              <ServiceCard svc={svc} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .services-grid > div { margin-top: 0 !important; }
        }
        @media (max-width: 580px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ServiceCard({ svc }) {
  return (
    <div
      style={{
        background: 'rgba(13,19,24,0.75)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 4,
        padding: 'clamp(24px, 3vw, 36px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'border-color 300ms, box-shadow 300ms, transform 300ms var(--ease-out-quart)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(26,143,255,0.25)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 -1px 0 rgba(26,143,255,0.25) inset'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top row: icon + number */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="icon-box">{svc.icon}</div>
        <span style={{
          fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
        }}>
          {svc.num}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
      }}>
        {svc.title}
      </h3>

      {/* Desc */}
      <p className="text-body" style={{ flex: 1 }}>{svc.desc}</p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
        {svc.tags.map((tag) => (
          <span key={tag} className="tag tag-muted" style={{ fontSize: 10 }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

/* ── Icons ─────────────────────────────────────────────── */
function CodeIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M5 5.5L1.5 9 5 12.5M13 5.5L16.5 9 13 12.5M10 3L8 15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function ArchIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="11" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="6" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M4 7v2a2 2 0 002 2h4a2 2 0 002-2V7" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
}
function CloudIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M13 12a3.5 3.5 0 000-7 3.5 3.5 0 00-6.8-1.3A3 3 0 103 10h10z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M9 12v4M7 14l2 2 2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function BrainIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.22 4.22l1.41 1.41M12.37 12.37l1.41 1.41M4.22 13.78l1.41-1.41M12.37 5.63l1.41-1.41" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
}
function StratIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 13l4-4 3 3 5-6 2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="4" r="2" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
}
function QAIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M7 9.5l2 2 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 2H6a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V7l-4-5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M10 2v5h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
}
