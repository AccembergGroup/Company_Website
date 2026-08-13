'use client'

import { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import FastScroll from './FastScroll'
import { SpotlightProvider, SpotlightCard } from './Spotlight'
import ScrambleText from './ScrambleText'
import { useTheme } from '@/components/ThemeProvider'

const SERVICES = [
  {
    num: '01',
    title: 'Full-Stack Software Development',
    desc: 'End-to-end product engineering from architecture to deployment — scalable, maintainable, and built for growth.',
    icon: 'fluent:window-dev-tools-24-filled',
    iconColor: '#4FC3F7',
    tags: ['React', 'Node.js', 'Databases', 'APIs'],
  },
  {
    num: '02',
    title: 'System Architecture & Integration',
    desc: 'Robust technical foundations and seamless third-party integrations that eliminate bottlenecks at scale.',
    icon: 'fluent:organization-horizontal-24-filled',
    iconColor: '#81D4FA',
    tags: ['Microservices', 'APIs', 'Legacy Migration'],
  },
  {
    num: '03',
    title: 'Cloud Infrastructure & DevOps',
    desc: 'Cloud-native infrastructure design with CI/CD pipelines, container orchestration, and 99.9% uptime targets.',
    icon: 'fluent:cloud-flow-24-filled',
    iconColor: '#4FC3F7',
    tags: ['AWS', 'GCP', 'Kubernetes', 'CI/CD'],
  },
  {
    num: '04',
    title: 'AI & ML Integration',
    desc: 'Intelligent automation, predictive analytics, and LLM-powered features built directly into your product stack.',
    icon: 'fluent:brain-circuit-24-filled',
    iconColor: '#CE93D8',
    tags: ['LLMs', 'ML Pipelines', 'NLP', 'GenAI'],
  },
  {
    num: '05',
    title: 'Technical Consulting & Strategy',
    desc: 'Senior engineering advisory for product decisions, technical debt reduction, and scalability roadmaps.',
    icon: 'fluent:whiteboard-24-filled',
    iconColor: '#80CBC4',
    tags: ['Roadmapping', 'Audits', 'Advisory'],
  },
  {
    num: '06',
    title: 'QA, Testing & Maintenance',
    desc: 'Multi-stage quality assurance with automated testing pipelines and dedicated support — ensuring reliability.',
    icon: 'fluent:shield-checkmark-24-filled',
    iconColor: '#A5D6A7',
    tags: ['Automated QA', 'Performance', 'SLAs'],
  },
]

export default function Services() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const [data, setData] = useState(SERVICES)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/services`
      : 'http://localhost:5000/api/services'

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success && resJson.data && resJson.data.length > 0) {
          const mapped = resJson.data.map((s, idx) => {
            let tags = ['Engineering']
            if (s.title.includes('Full-Stack')) tags = ['React', 'Node.js', 'APIs']
            else if (s.title.includes('Architecture')) tags = ['Microservices', 'Integrations']
            else if (s.title.includes('SaaS')) tags = ['MVP', 'SaaS', 'Fast Launch']
            else if (s.title.includes('Consulting')) tags = ['Audits', 'Roadmapping']
            else if (s.title.includes('QA') || s.title.includes('DevOps')) tags = ['CI/CD', 'AWS', 'Testing']
            else if (s.title.includes('Maintenance')) tags = ['SLAs', 'Support', '24/7']

            return {
              num: String(idx + 1).padStart(2, '0'),
              title: s.title,
              desc: s.description,
              icon: getIcon(s.icon),
              tags: tags,
            }
          })
          setData(mapped)
        } else {
          setData(SERVICES)
        }
      })
      .catch(() => {
        setData(SERVICES)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || data.length === 0) return
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
  }, [loading, data])



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
    <section id="services" className="section" ref={ref}
      style={{ ...overrideVars, position: 'relative', overflow: 'hidden', transition: 'background-color 400ms, color 400ms' }}
    >
      {/* Glow bottom-center */}
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: theme === 'dark'
          ? 'radial-gradient(ellipse, rgba(21,101,192,0.12) 0%, transparent 65%)'
          : 'radial-gradient(ellipse, rgba(21,101,192,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', maxWidth: 600 }}>
          <div className="section-label reveal">
            <ScrambleText text="What We Deliver" speed={35} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 16 }}>
            <FastScroll><span style={{ display: 'inline-block' }}>Full-Spectrum</span></FastScroll>
            <br />
            <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Engineering Services</span></FastScroll>
          </h2>
          <p className="text-body-lg reveal" style={{ color: 'var(--text-secondary)' }}>
            From initial architecture to production-grade deployment — we bring a studio-grade approach to every dimension of software engineering.
          </p>
        </div>

        {/* 3×2 grid with middle row offset */}
        <SpotlightProvider className="services-grid">
          {data.map((svc, i) => (
            <div
              key={svc.num}
              className="services-card-wrap"
            >
              <div className={`reveal-scale stagger-${(i % 3) + 1}`} style={{ height: '100%' }}>
                <ServiceCard svc={svc} />
              </div>
            </div>
          ))}
        </SpotlightProvider>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .svc-card-top {
          margin-bottom: 8px;
        }
        .svc-card-title {
          margin-top: 4px !important;
        }
        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 580px) {
          .services-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .svc-card-top {
            margin-bottom: 10px;
          }
          .svc-card-title {
            margin-top: 6px !important;
          }
        }
      `}</style>
    </section>
  )
}

function ServiceCard({ svc }) {
  const { theme } = useTheme()
  return (
    <SpotlightCard
      style={{
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: 'clamp(24px, 3vw, 36px)',
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
      {/* Top row: icon + number */}
      <div className="svc-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
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
            ? `linear-gradient(145deg, ${svc.iconColor}26 0%, ${svc.iconColor}10 60%, ${svc.iconColor}04 100%)`
            : `linear-gradient(145deg, ${svc.iconColor}30 0%, ${svc.iconColor}14 60%, ${svc.iconColor}06 100%)`,
          border: `1px solid ${svc.iconColor}44`,
          boxShadow: [
            `0 0 0 1px ${svc.iconColor}18`,
            `0 4px 16px -4px ${svc.iconColor}55`,
            `0 1px 0 0 ${svc.iconColor}33 inset`,
            `inset 0 0 12px 0 ${svc.iconColor}11`,
          ].join(', '),
        }}>
          {/* Inner shine highlight */}
          <div style={{
            position: 'absolute',
            top: 2,
            left: 6,
            right: 6,
            height: '40%',
            background: `linear-gradient(180deg, ${svc.iconColor}22 0%, transparent 100%)`,
            borderRadius: '8px 8px 50% 50%',
            pointerEvents: 'none',
          }} />
          <Icon
            icon={svc.icon}
            width={28}
            height={28}
            style={{
              color: svc.iconColor,
              filter: `drop-shadow(0 0 6px ${svc.iconColor}88) drop-shadow(0 2px 4px ${svc.iconColor}44)`,
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
          {svc.num}
        </span>
      </div>

      {/* Title */}
      <h3 className="svc-card-title" style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
        marginBottom: 10,
      }}>
        {svc.title}
      </h3>

      {/* Desc */}
      <p className="text-body" style={{ flex: 1, marginBottom: 16 }}>{svc.desc}</p>

      {/* Tags */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
        {svc.tags.map((tag) => (
          <span key={tag} className="tag tag-muted" style={{ fontSize: 10, borderRadius: 100 }}>{tag}</span>
        ))}
      </div>
    </SpotlightCard>
  )
}
