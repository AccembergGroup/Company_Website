'use client'

import { useState, useEffect, useRef } from 'react'
import { SpotlightProvider, SpotlightCard } from './Spotlight'
import ScrambleText from './ScrambleText'
import { useTheme } from '@/components/ThemeProvider'

const getIconSvg = (iconName) => {
  switch (iconName) {
    case 'code-2': return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" strokeOpacity="0.4" />
      </svg>
    )
    case 'network': return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="5" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="5" cy="19" r="2" fill="currentColor" fillOpacity="0.3" />
        <circle cx="19" cy="19" r="2" fill="currentColor" fillOpacity="0.3" />
        <line x1="12" y1="7" x2="5" y2="17" />
        <line x1="12" y1="7" x2="19" y2="17" />
        <line x1="7" y1="19" x2="17" y2="19" />
      </svg>
    )
    case 'rocket': return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C12 2 7 6 7 13H17C17 6 12 2 12 2Z" fill="currentColor" fillOpacity="0.15" />
        <path d="M7 13L5 17H19L17 13" />
        <line x1="12" y1="13" x2="12" y2="20" />
        <line x1="9" y1="20" x2="15" y2="20" />
      </svg>
    )
    case 'lightbulb': return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 21h6" />
        <path d="M10 17h4" />
        <path d="M12 3a6 6 0 0 1 6 6c0 2.5-1.5 4.5-3 6H9C7.5 13.5 6 11.5 6 9a6 6 0 0 1 6-6z" fill="currentColor" fillOpacity="0.12" />
        <line x1="12" y1="7" x2="12" y2="11" strokeOpacity="0.5" />
      </svg>
    )
    case 'shield-check': return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L4 6V12C4 16.42 7.58 21 12 22C16.42 21 20 16.42 20 12V6L12 2Z" fill="currentColor" fillOpacity="0.12" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    )
    default: return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" strokeOpacity="0.5" />
      </svg>
    )
  }
}

const SERVICES = [
  {
    num: '01',
    title: 'Full-Stack Software Development',
    desc: 'Complete product engineering from first commit to live deployment. Scalable, maintainable, and built to grow with your business.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    tags: ['React', 'Node.js', 'Databases', 'APIs'],
  },
  {
    num: '02',
    title: 'System Architecture & Integration',
    desc: 'Resilient technical foundations and smooth third-party integrations that eliminate bottlenecks at scale.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933261.png',
    tags: ['Microservices', 'APIs', 'Legacy Migration'],
  },
  {
    num: '03',
    title: 'Cloud Infrastructure & DevOps',
    desc: 'Cloud-native infrastructure design with CI/CD pipelines, container orchestration, and 99.9% uptime targets.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933230.png',
    tags: ['AWS', 'GCP', 'Kubernetes', 'CI/CD'],
  },
  {
    num: '04',
    title: 'AI & ML Integration',
    desc: 'Intelligent automation, predictive analytics, and LLM-powered features built directly into your product stack.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/4117/4117106.png',
    tags: ['LLMs', 'ML Pipelines', 'NLP', 'GenAI'],
  },
  {
    num: '05',
    title: 'Technical Consulting & Strategy',
    desc: 'Senior engineering advisory for product decisions, technical debt reduction, and scalability roadmaps.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/2933/2933215.png',
    tags: ['Roadmapping', 'Audits', 'Advisory'],
  },
  {
    num: '06',
    title: 'QA, Testing & Maintenance',
    desc: 'Automated testing pipelines, multi-stage QA, and dedicated support. We ship code that holds up under real-world pressure.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135695.png',
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
              icon: getIconSvg(s.icon),
              imageUrl: SERVICES[idx]?.imageUrl,
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
      
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400,
        background: theme === 'dark'
          ? 'radial-gradient(ellipse, rgba(21,101,192,0.12) 0%, transparent 65%)'
          : 'radial-gradient(ellipse, rgba(21,101,192,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', maxWidth: 600 }}>
          <div className="section-label reveal">
            <ScrambleText text="What We Deliver" speed={35} />
          </div>
          <h2 className="text-h2 reveal" style={{ marginBottom: 16 }}>
            <span style={{ display: 'inline-block' }}>Full-Spectrum</span>
            <br />
            <span style={{ display: 'inline-block', color: 'var(--accent)' }}>Engineering Services</span>
          </h2>
          <p className="text-body-lg reveal" style={{ color: 'var(--text-secondary)' }}>
            Six core disciplines. One unified engineering team. Built to handle every layer of your product with precision.
          </p>
        </div>

        
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
        gap: 16,
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
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
        <span style={{
          fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: 'var(--text-muted)',
          opacity: 0.6,
        }}>
          {svc.num}
        </span>
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
      </div>

      
      <p className="text-body" style={{ flex: 1 }}>{svc.desc}</p>

      
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
        {svc.tags.map((tag) => (
          <span key={tag} className="tag tag-muted" style={{ fontSize: 10, borderRadius: 100 }}>{tag}</span>
        ))}
      </div>
    </SpotlightCard>
  )
}
