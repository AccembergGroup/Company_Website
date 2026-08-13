'use client'

import { useRef, useEffect } from 'react'
import { Landmark, Sparkles, Truck, HeartPulse, Zap } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'

const SOLUTIONS = [
  {
    id: 'fintech',
    title: 'FinTech Platforms',
    desc: 'High-frequency transaction ledgers, banking API integrations, and strict SOC2 security compliance for enterprise money movement.',
    icon: Landmark,
    colSpan: 'col-span-2',
    accent: '#4FC3F7',
    badge: 'Enterprise Security'
  },
  {
    id: 'saas',
    title: 'Multi-Tenant SaaS',
    desc: 'Scalable multi-tenant databases, Stripe/billing integration, role-based access control, and dynamic reporting dashboards.',
    icon: Sparkles,
    colSpan: 'col-span-1',
    accent: '#1565C0',
    badge: 'Rapid Build'
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    desc: 'Real-time telemetry ingestion pipelines, route optimization systems, and warehouse automation endpoints.',
    icon: Truck,
    colSpan: 'col-span-1',
    accent: '#1565C0',
    badge: 'Real-time Engine'
  },
  {
    id: 'health',
    title: 'HealthTech Systems',
    desc: 'HIPAA-compliant patient portals, telemetry data capture, and audit trails engineered for maximum reliability and privacy.',
    icon: HeartPulse,
    colSpan: 'col-span-2',
    accent: '#4FC3F7',
    badge: 'HIPAA Compliant'
  }
]

export default function Solutions() {
  const { theme } = useTheme()
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
      { threshold: 0.08 }
    )
    el.querySelectorAll('.reveal, .reveal-scale').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="solutions" className="section" ref={ref}
      style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', paddingTop: 'var(--section-y)', paddingBottom: '50px', transition: 'background-color 400ms' }}
    >
      {/* Blending Divider Line */}
      <div style={{
        height: '1px',
        width: '100%',
        background: 'linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent)',
        position: 'absolute',
        top: 0,
        left: 0,
      }} />

      {/* Background glow stops */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(21, 101, 192, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', maxWidth: 620 }} className="reveal">
          <div className="section-label">
            <ScrambleText text="Targeted Expertise" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 16 }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Tailored Solutions for</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Modern Industries</span></FastScroll>
            </h2>
          <p className="text-body-lg">
            We build specialized web systems and data engines designed to solve complex business constraints in high-impact domains.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {SOLUTIONS.map((sol, i) => {
            const Icon = sol.icon
            return (
              <div
                key={sol.id}
                className={`bento-card ${sol.colSpan} reveal-scale stagger-${(i % 2) + 1}`}
                style={{
                  background: theme === 'dark' ? 'rgba(17,24,39,0.65)' : 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  padding: 'clamp(24px, 4vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  cursor: 'default',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.03)',
                  transition: 'all 300ms var(--ease-out-quart)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-strong)'
                  e.currentTarget.style.boxShadow = theme === 'dark'
                    ? '0 20px 40px -15px rgba(21,101,192,0.22), 0 -1px 0 var(--accent-dim) inset'
                    : '0 20px 40px -15px rgba(21,101,192,0.1), 0 -1px 0 var(--accent-dim) inset';
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.03)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Card Top */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="icon-box" style={{ background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)' }}>
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    padding: '4px 10px',
                    borderRadius: 100,
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}>
                    {sol.badge}
                  </span>
                </div>

                {/* Card Title & Desc */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: 20,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.015em',
                  }}>
                    {sol.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: 14.5 }}>
                    {sol.desc}
                  </p>
                </div>

                {/* Aesthetic interactive trigger line */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--accent)',
                  paddingTop: 8,
                }}>
                  <span>Deploy system specs</span>
                  <Zap size={11} fill="currentColor" />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .col-span-2 {
          grid-column: span 2;
        }
        .col-span-1 {
          grid-column: span 1;
        }
        @media (max-width: 900px) {
          .bento-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .col-span-2, .col-span-1 {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
