'use client'

import { useEffect, useRef } from 'react'
import ScrambleText from './ScrambleText'
import { SpotlightProvider, SpotlightCard } from './Spotlight'
import { useTheme } from '@/components/ThemeProvider'

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Scoping',
    desc: 'We dig deep into your requirements, technical landscape, and business goals. The output is a precise, deliverable-bound scope with zero ambiguity.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933190.png',
  },
  {
    num: '02',
    title: 'Architecture & Strategy',
    desc: 'Senior engineers design the full technical foundation before a single line is written. Right stack, right boundaries, right scalability model.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933250.png',
  },
  {
    num: '03',
    title: 'Iterative Development',
    desc: 'Modular, documentation-first sprints with QA gates built in. You see real progress early and often. No black-box delivery, ever.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  },
  {
    num: '04',
    title: 'Deployment & Scale',
    desc: 'Clean handoff, production deployment, monitoring setup, and optional long-term maintenance. Built for systems that cannot afford to go down.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135673.png',
  },
]

export default function Process() {
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
      { threshold: 0.1 },
    )
    el.querySelectorAll('.reveal, .reveal-scale').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const overrideVars = theme === 'dark' ? {
    background: 'linear-gradient(180deg, #0A0F1E 0%, #08173B 50%, #0A0F1E 100%)',
    color: '#E8EDF8',
    '--bg-base': '#08173B',
    '--text-primary': '#E8EDF8',
    '--text-secondary': '#B4C3E6',
    '--text-muted': '#7A8CAE',
    '--border': 'rgba(79, 195, 247, 0.22)',
    '--border-strong': 'rgba(79, 195, 247, 0.45)',
    '--bg-card': '#0E1F55',
    '--accent': '#4FC3F7',
    '--accent-light': '#80D8FF',
    '--accent-dim': 'rgba(79, 195, 247, 0.12)',
    '--bg-elevated': '#122566',
  } : {
    background: '#F8FAFC',
    color: '#0F172A',
    '--bg-base': '#F8FAFC',
    '--text-primary': '#0F172A',
    '--text-secondary': '#475569',
    '--text-muted': '#64748B',
    '--border': 'rgba(21, 101, 192, 0.08)',
    '--border-strong': 'rgba(21, 101, 192, 0.2)',
    '--bg-card': '#FFFFFF',
    '--accent': '#1565C0',
    '--accent-light': '#1E88E5',
    '--accent-dim': 'rgba(21, 101, 192, 0.05)',
    '--bg-elevated': '#FFFFFF',
  }

  return (
    <section id="process" className="section" ref={ref}
      style={{ ...overrideVars, position: 'relative', overflow: 'hidden', transition: 'background-color 400ms, color 400ms' }}
    >
      <div className="dot-grid" style={{ opacity: 0.4 }} />

      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: 'clamp(52px,7vw,88px)', maxWidth: 600, margin: '0 auto clamp(52px,7vw,88px)' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            <ScrambleText text="Our Process" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 16 }}>
            <span style={{ display: 'inline-block' }}>How We <span style={{ color: 'var(--accent)' }}>Deliver</span></span>
          </h2>
          <p className="text-body-lg reveal">
            No guesswork. No bottlenecks. Just disciplined execution from first brief to final deployment.
          </p>
        </div>

        
        <SpotlightProvider style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 20,
        }} className="process-grid">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`reveal-scale stagger-${i + 1}`}
              style={{
                height: '100%',
              }}
            >
              <StepCard step={step} />
            </div>
          ))}
        </SpotlightProvider>
      </div>

      <style>{`
        .process-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
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

function StepCard({ step }) {
  const { theme } = useTheme()
  return (
    <SpotlightCard
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '36px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        transition: 'border-color 300ms, box-shadow 300ms, transform 300ms var(--ease-out-quart)',
        cursor: 'default',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.03)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-strong)'
        e.currentTarget.style.boxShadow = theme === 'dark'
          ? '0 20px 40px -15px rgba(21,101,192,0.22), 0 -1px 0 var(--accent-dim) inset'
          : '0 20px 40px -15px rgba(21,101,192,0.1), 0 -1px 0 var(--accent-dim) inset';
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.03)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div className="icon-box" style={{ background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {step.imageUrl ? (
            <img src={step.imageUrl} alt="Icon" width={22} height={22} style={{ objectFit: 'contain' }} />
          ) : (
            step.icon
          )}
        </div>
        <span style={{
          fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          color: 'var(--text-muted)',
        }}>
          {step.num}
        </span>
      </div>

      
      <h3 style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
      }}>
        {step.title}
      </h3>

      
      <p className="text-body" style={{ flex: 1 }}>{step.desc}</p>
    </SpotlightCard>
  )
}
