'use client'

import { useEffect, useRef } from 'react'

const PROJECTS = [
  {
    id: 'erp-platform',
    industry: 'Enterprise Software',
    type: 'Full-Stack Development',
    title: 'Multi-Tenant ERP Integration Platform',
    desc: 'Architected and delivered a modular ERP system connecting finance, HR, and logistics verticals for a mid-market manufacturing client — cutting operational overhead by 34%.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    outcome: '34% operational cost reduction',
    duration: '6 months',
    large: true,
  },
  {
    id: 'saas-analytics',
    industry: 'SaaS',
    type: 'Product Development',
    title: 'Real-Time Analytics SaaS',
    desc: 'Launched a niche analytics tool from MVP to 500+ paying users within 10 weeks using our Rapid SaaS Factory model.',
    tech: ['Next.js', 'Python', 'ClickHouse'],
    outcome: '500+ users in 10 weeks',
    duration: '10 weeks',
    large: false,
  },
  {
    id: 'ai-workflow',
    industry: 'AI / Automation',
    type: 'AI Integration',
    title: 'LLM-Powered Workflow Automation',
    desc: 'Integrated a custom LLM pipeline into an existing enterprise workflow tool — reducing document processing time from 4 hours to under 8 minutes.',
    tech: ['Python', 'LangChain', 'FastAPI', 'GCP'],
    outcome: '97% reduction in processing time',
    duration: '3 months',
    large: false,
  },
  {
    id: 'cloud-migration',
    industry: 'Infrastructure',
    type: 'Cloud & DevOps',
    title: 'Legacy-to-Cloud Migration',
    desc: 'Migrated a decade-old monolithic system to a cloud-native microservices architecture with zero downtime and full data integrity.',
    tech: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    outcome: 'Zero-downtime migration',
    duration: '5 months',
    large: true,
  },
]

function useReveal(ref) {
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
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach((t) =>
      observer.observe(t),
    )
    return () => observer.disconnect()
  }, [])
}

export default function Projects() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="projects" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Glow right */}
      <div style={{
        position: 'absolute', right: -100, bottom: '20%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(26,143,255,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', flexWrap: 'wrap', gap: 24,
          marginBottom: 'clamp(48px,6vw,80px)',
        }}>
          <div style={{ maxWidth: 520 }}>
            <div className="section-label reveal">Track Record</div>
            <h2 className="text-h2 reveal" style={{ marginBottom: 16 }}>
              Selected <span style={{ color: 'var(--accent)' }}>Projects</span>
            </h2>
            <p className="text-body-lg reveal">
              A cross-section of our delivered work — spanning enterprise software, SaaS launches, AI integration, and cloud infrastructure.
            </p>
          </div>
          <a href="#contact" className="btn btn-outline btn-sm reveal">
            Discuss Your Project →
          </a>
        </div>

        {/* Asymmetric masonry grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridAutoRows: 'auto',
          gap: 3,
        }} className="projects-grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} stagger-${(i % 3) + 1}`}
              style={{
                // Offset alternating cards for asymmetry
                marginTop: i === 1 ? 40 : i === 2 ? -20 : 0,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-grid > div {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <div
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 4,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 300ms, box-shadow 300ms, transform 300ms var(--ease-out-quart)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(26,143,255,0.25)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5), 0 -1px 0 rgba(26,143,255,0.2) inset'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)'
        e.currentTarget.style.boxShadow = 'none'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 2,
        background: 'linear-gradient(to right, var(--accent), transparent)',
        opacity: 0.5,
      }} />

      <div style={{ padding: 'clamp(24px, 3vw, 36px)', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Industry + type */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span className="tag">{project.industry}</span>
          <span className="tag tag-muted">{project.type}</span>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
          fontSize: 18,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.3,
          letterSpacing: '-0.015em',
        }}>
          {project.title}
        </h3>

        {/* Desc */}
        <p className="text-body" style={{ flex: 1 }}>{project.desc}</p>

        {/* Outcome highlight */}
        <div style={{
          padding: '12px 16px',
          background: 'rgba(26,143,255,0.06)',
          border: '1px solid rgba(26,143,255,0.14)',
          borderRadius: 3,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}>
          <span style={{ color: 'var(--accent)', fontSize: 14 }}>✓</span>
          <span style={{
            fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--text-accent)',
          }}>
            {project.outcome}
          </span>
        </div>

        {/* Footer row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 8,
          borderTop: '1px solid var(--border-subtle)',
        }}>
          {/* Tech stack */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {project.tech.map((t) => (
              <span key={t} className="tag tag-muted" style={{ fontSize: 10 }}>{t}</span>
            ))}
          </div>
          {/* Duration */}
          <span className="text-label" style={{ whiteSpace: 'nowrap', marginLeft: 12 }}>
            {project.duration}
          </span>
        </div>
      </div>
    </div>
  )
}
