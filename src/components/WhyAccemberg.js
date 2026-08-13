'use client'

import { useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useTheme } from '@/components/ThemeProvider'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'

const PILLARS = [
  {
    icon: 'fluent:hat-graduation-24-filled',  // senior / expertise
    iconColor: '#FFD54F',
    title: 'Senior Engineering Guarantee',
    desc: 'Every line of code is written by senior systems architects and senior full-stack engineers. We never compromise on technical leadership.'
  },
  {
    icon: 'fluent:open-folder-24-filled',      // open / transparent access
    iconColor: '#4FC3F7',
    title: 'Absolute Transparency',
    desc: 'Get direct access to our Slack channels, GitHub repository commits, and active Jira sprint boards. We work as a unified extension of your team.'
  },
  {
    icon: 'fluent:resize-24-filled',           // scale up/down
    iconColor: '#80CBC4',
    title: 'Flexible Scale Models',
    desc: 'Scale your active engineering squad up or down based on product velocity requirements. Pay only for the resources you need.'
  },
  {
    icon: 'fluent:lock-closed-24-filled',      // lock = security
    iconColor: '#CE93D8',
    title: 'Enterprise-Grade Security',
    desc: 'Built-in security audits, encrypted pipelines, and compliance checks (HIPAA/SOC2 frameworks) baked directly into initial builds.'
  }
]

export default function WhyAccemberg() {
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
      { threshold: 0.1 }
    )
    el.querySelectorAll('.reveal, .reveal-scale').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  const overrideVars = theme === 'dark' ? {
    background: 'linear-gradient(180deg, #0A0F1E 0%, #08173B 50%, #0A0F1E 100%)',
    color: '#E8EDF8',
    '--bg-base': '#08173B',
    '--text-primary': '#E8EDF8',
    '--text-secondary': '#A0AED0',
    '--text-muted': '#6C7CA0',
    '--border': 'rgba(79, 195, 247, 0.1)',
    '--border-strong': 'rgba(79, 195, 247, 0.25)',
    '--bg-card': 'rgba(9, 21, 56, 0.7)',
    '--accent': '#4FC3F7',
    '--accent-light': '#80D8FF',
    '--accent-dim': 'rgba(79, 195, 247, 0.12)',
    '--bg-elevated': '#0D1B4B',
  } : {
    background: 'linear-gradient(180deg, #F5F7FF 0%, #FFFFFF 50%, #F5F7FF 100%)',
    color: '#101828',
    '--bg-base': '#F5F7FF',
    '--text-primary': '#101828',
    '--text-secondary': '#475467',
    '--text-muted': '#667085',
    '--border': 'rgba(21, 101, 192, 0.12)',
    '--border-strong': 'rgba(21, 101, 192, 0.28)',
    '--bg-card': '#FFFFFF',
    '--accent': '#1565C0',
    '--accent-light': '#1E88E5',
    '--accent-dim': 'rgba(21, 101, 192, 0.08)',
    '--bg-elevated': '#EFF1FA',
  }

  return (
    <section id="why-accemberg" className="section" ref={ref}
      style={{ ...overrideVars, position: 'relative', overflow: 'hidden', borderTop: 'none', paddingTop: '50px', paddingBottom: '160px', transition: 'background-color 400ms, color 400ms' }}
    >
      {/* Light/Dark theme-aware backdrop glow */}
      <div style={{
        position: 'absolute', bottom: '-10%', left: '-5%',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(21, 101, 192, 0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }} className="why-grid">

          {/* Left Panel */}
          <div style={{ maxWidth: 440 }}>
            <div className="section-label reveal">
              <ScrambleText text="The Accemberg Quality" speed={30} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 20 }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Why Leading Teams</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Choose Accemberg</span></FastScroll>
            </h2>
            <p className="text-body-lg reveal" style={{ marginBottom: 30 }}>
              We bypass junior bloat and slow agency layers to deliver high-velocity, clean architectures that scale.
            </p>
            <div className="reveal">
              <a href="#contact" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                Partner With Us
              </a>
            </div>
          </div>

          {/* Right pillars list */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="pillars-grid">
            {PILLARS.map((pillar, i) => {
              return (
                <div
                  key={pillar.title}
                  className={`reveal-scale stagger-${(i % 3) + 1}`}
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 14,
                    transition: 'all 300ms var(--ease-out-quart)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-strong)'
                    e.currentTarget.style.boxShadow = theme === 'dark'
                      ? '0 15px 30px -10px rgba(21,101,192,0.22)'
                      : '0 15px 30px -10px rgba(21,101,192,0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Realistic 3D icon box */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    flexShrink: 0,
                    background: theme === 'dark'
                      ? `linear-gradient(145deg, ${pillar.iconColor}26 0%, ${pillar.iconColor}10 60%, ${pillar.iconColor}04 100%)`
                      : `linear-gradient(145deg, ${pillar.iconColor}30 0%, ${pillar.iconColor}14 60%, ${pillar.iconColor}06 100%)`,
                    border: `1px solid ${pillar.iconColor}44`,
                    boxShadow: [
                      `0 0 0 1px ${pillar.iconColor}18`,
                      `0 4px 16px -4px ${pillar.iconColor}55`,
                      `0 1px 0 0 ${pillar.iconColor}33 inset`,
                      `inset 0 0 12px 0 ${pillar.iconColor}11`,
                    ].join(', '),
                  }}>
                    {/* Inner shine */}
                    <div style={{
                      position: 'absolute',
                      top: 2, left: 6, right: 6,
                      height: '40%',
                      background: `linear-gradient(180deg, ${pillar.iconColor}22 0%, transparent 100%)`,
                      borderRadius: '8px 8px 50% 50%',
                      pointerEvents: 'none',
                    }} />
                    <Icon
                      icon={pillar.icon}
                      width={28}
                      height={28}
                      style={{
                        color: pillar.iconColor,
                        filter: `drop-shadow(0 0 6px ${pillar.iconColor}88) drop-shadow(0 2px 4px ${pillar.iconColor}44)`,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: 16,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}>
                    {pillar.title}
                  </h3>
                  <p className="text-body" style={{ fontSize: 13.5, lineHeight: 1.6 }}>
                    {pillar.desc}
                  </p>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .why-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .why-grid > div:first-child {
            max-width: 100% !important;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
        @media (max-width: 580px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
