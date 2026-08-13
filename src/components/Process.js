'use client'

import { useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'
import { SpotlightProvider, SpotlightCard } from './Spotlight'
import { useTheme } from '@/components/ThemeProvider'

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Scoping',
    desc: 'We immerse ourselves in your requirements, technical landscape, and business goals to produce a precise, deliverable-bound project scope.',
    icon: 'fluent:search-24-filled',
    iconColor: '#4FC3F7',
  },
  {
    num: '02',
    title: 'Architecture & Strategy',
    desc: 'Our senior engineers design the technical foundation — selecting the right stack, system boundaries, and scalability approach before a single line is written.',
    icon: 'fluent:branch-fork-24-filled',
    iconColor: '#90CAF9',
  },
  {
    num: '03',
    title: 'Iterative Development',
    desc: 'Modular, documentation-first engineering with QA gates at every sprint. You see progress early and often — no black-box delivery.',
    icon: 'fluent:code-block-24-filled',
    iconColor: '#80CBC4',
  },
  {
    num: '04',
    title: 'Deployment & Scale',
    desc: 'Structured handoff, production deployment, monitoring setup, and optional long-term maintenance — built for systems that need to keep running.',
    icon: 'fluent:cloud-arrow-up-24-filled',
    iconColor: '#A5D6A7',
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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(52px,7vw,88px)', maxWidth: 600, margin: '0 auto clamp(52px,7vw,88px)' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>
            <ScrambleText text="Our Process" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 16 }}>
            <FastScroll><span style={{ display: 'inline-block' }}>How We <span style={{ color: 'var(--accent)' }}>Deliver</span></span></FastScroll>
          </h2>
          <p className="text-body-lg reveal">
            A structured, repeatable system that eliminates ambiguity and delivers quality — at every stage.
          </p>
        </div>

        {/* Steps grid */}
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


function StepCard({ step }) {
  const { theme } = useTheme()
  // Derive a hex color with alpha for glow
  const iconHex = step.iconColor || '#4FC3F7'
  return (
    <SpotlightCard
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '28px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
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
      {/* Top row: Icon + Step number */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        {/* Realistic 3D icon box */}
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          background: theme === 'dark'
            ? `linear-gradient(145deg, ${iconHex}26 0%, ${iconHex}10 60%, ${iconHex}04 100%)`
            : `linear-gradient(145deg, ${iconHex}30 0%, ${iconHex}14 60%, ${iconHex}06 100%)`,
          border: `1px solid ${iconHex}44`,
          boxShadow: [
            `0 0 0 1px ${iconHex}18`,
            `0 4px 16px -4px ${iconHex}55`,
            `0 1px 0 0 ${iconHex}33 inset`,
            `inset 0 0 12px 0 ${iconHex}11`,
          ].join(', '),
        }}>
          {/* Inner shine highlight */}
          <div style={{
            position: 'absolute',
            top: 2,
            left: 6,
            right: 6,
            height: '40%',
            background: `linear-gradient(180deg, ${iconHex}22 0%, transparent 100%)`,
            borderRadius: '8px 8px 50% 50%',
            pointerEvents: 'none',
          }} />
          <Icon
            icon={step.icon}
            width={28}
            height={28}
            style={{
              color: iconHex,
              filter: `drop-shadow(0 0 6px ${iconHex}88) drop-shadow(0 2px 4px ${iconHex}44)`,
              position: 'relative',
              zIndex: 1,
            }}
          />
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

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
        marginBottom: 10,
      }}>
        {step.title}
      </h3>

      {/* Desc */}
      <p className="text-body" style={{ flex: 1 }}>{step.desc}</p>
    </SpotlightCard>
  )
}
