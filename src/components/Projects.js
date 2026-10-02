'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'
import { ArrowRight, Maximize2, Check } from 'lucide-react'

const PROJECTS = [
  {
    id: 'erp',
    categoryPrimary: 'Enterprise',
    categorySecondary: 'System Architecture',
    title: 'Multi-Tenant ERP Integration Platform',
    desc: 'Architected and delivered a modular ERP system connecting finance, HR, and logistics verticals for a mid-market manufacturing client, cutting operational overhead by 34%.',
    metric: '34% operational cost reduction',
    tech: ['Node.js', 'PostgreSQL', 'React', 'Redis'],
    duration: '8 MONTHS',
  },
  {
    id: 'saas',
    categoryPrimary: 'SaaS',
    categorySecondary: 'Web Development',
    title: 'Real-Time Analytics SaaS',
    desc: 'Launched a niche analytics tool from MVP to 500+ paying users within 10 weeks using our high-velocity engineering frameworks.',
    metric: '500+ paying users in 10 weeks',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'AWS'],
    duration: '10 WEEKS',
  },
  {
    id: 'ai',
    categoryPrimary: 'AI / ML',
    categorySecondary: 'Automation',
    title: 'LLM-Powered Workflow Automation',
    desc: 'Integrated a custom LLM pipeline into an existing enterprise workflow tool, reducing document processing time from 4 hours to under 8 minutes.',
    metric: 'Processing time reduced by 96%',
    tech: ['Python', 'OpenAI API', 'FastAPI', 'React'],
    duration: '3 MONTHS',
  },
  {
    id: 'cloud',
    categoryPrimary: 'Cloud',
    categorySecondary: 'DevOps',
    title: 'Legacy-to-Cloud Migration',
    desc: 'Migrated a decade-old monolithic system to a cloud-native microservices architecture with zero downtime and full data integrity.',
    metric: 'Zero downtime migration',
    tech: ['Kubernetes', 'Docker', 'Terraform', 'AWS'],
    duration: '6 MONTHS',
  }
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
      { threshold: 0.15 },
    )
    el.querySelectorAll('.reveal').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
    
  }, [])
}

export default function Projects() {
  const { theme } = useTheme()
  const [activeProjectId, setActiveProjectId] = useState(null)
  const sectionRef = useRef(null)
  useReveal(sectionRef)

  const selectedProject = PROJECTS.find(p => p.id === activeProjectId)

  return (
    <section ref={sectionRef} id="projects" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden', padding: '90px 0', transition: 'background-color 400ms' }}>
      
      
      <div style={{
        position: 'absolute', right: -120, top: '10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(21, 101, 192, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="reveal" style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              marginBottom: 8,
              display: 'block'
            }}>
              PROVEN EXPERTISE
            </span>
            <h2 className="text-h2 reveal" style={{ margin: 0 }}>
                <span style={{ display: 'inline-block', color: 'var(--text-primary)' }}>Impact Driven</span>{' '}
                <span style={{ display: 'inline-block', color: 'var(--accent)' }}>Engineering</span>
            </h2>
            <p className="text-body-lg reveal" style={{ maxWidth: 580, marginTop: 14, marginBottom: 0 }}>
              Discover how we help ambitious businesses scale fast, automate complex workflows, and dominate their markets with reliable, production-ready software.
            </p>
          </div>
          <a href="#contact" className="btn btn-outline reveal" style={{ padding: '12px 24px', fontSize: 14 }}>
            Discuss Your Project <ArrowRight size={16} />
          </a>
        </div>

        
        <div className="projects-grid-desktop" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 24,
          width: '100%'
        }}>
          {PROJECTS.map(proj => (
            <div
              key={proj.id}
              className="reveal"
              onClick={() => setActiveProjectId(proj.id)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                minHeight: 420,
                cursor: 'pointer',
                boxShadow: '0 8px 24px -10px rgba(0,0,0,0.02)',
                transition: 'border-color 300ms, box-shadow 300ms, transform 300ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-strong)'
                e.currentTarget.style.boxShadow = theme === 'dark'
                  ? '0 15px 30px -10px rgba(21,101,192,0.22)'
                  : '0 15px 30px -10px rgba(21,101,192,0.08)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = '0 8px 24px -10px rgba(0,0,0,0.02)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: 100,
                    background: 'var(--accent-dim)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {proj.categoryPrimary}
                  </span>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: 100,
                    border: '1px solid var(--border)',
                    fontSize: 10,
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {proj.categorySecondary}
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveProjectId(proj.id); }}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: 'all 200ms'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  suppressHydrationWarning
                >
                  <Maximize2 size={14} />
                </button>
              </div>

              
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                  fontSize: 22,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  marginBottom: 16,
                  lineHeight: 1.3
                }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
                  {proj.desc}
                </p>

                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  background: 'var(--accent-dim)',
                  marginBottom: 24,
                  width: 'fit-content'
                }}>
                  <div style={{ color: 'var(--accent)' }}>
                    <Check size={16} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent)' }}>
                    {proj.metric}
                  </span>
                </div>
              </div>

              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {proj.tech.map(t => (
                    <span key={t} style={{ 
                      fontSize: 10, 
                      fontWeight: 600, 
                      color: 'var(--text-secondary)',
                      background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                      padding: '4px 10px',
                      borderRadius: 100
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  {proj.duration}
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="projects-grid-mobile reveal" style={{ display: 'none', flexDirection: 'column', gap: 16 }}>
          {PROJECTS.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveProjectId(proj.id)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 24,
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 6 }}>
                    {proj.categoryPrimary}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                    {proj.title}
                  </h3>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  <Maximize2 size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <AnimatePresence>
          {activeProjectId && selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProjectId(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(5, 8, 16, 0.78)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
                padding: 24
              }}
            >
              <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 20, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  width: '100%',
                  maxWidth: 700,
                  maxHeight: '85vh',
                  overflowY: 'auto',
                  position: 'relative',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.4)',
                }}
              >
                
                <div style={{ padding: '32px 32px 24px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    <span style={{ padding: '4px 10px', borderRadius: 100, background: 'var(--accent-dim)', fontSize: 10, fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase' }}>
                      {selectedProject.categoryPrimary}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12, lineHeight: 1.2 }}>
                    {selectedProject.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {selectedProject.desc}
                  </p>
                </div>

                
                <div style={{ padding: 32 }}>
                  <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                    Key Metric
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, background: 'var(--accent-dim)', borderRadius: 12, marginBottom: 32, border: '1px solid var(--border)' }}>
                    <Check size={20} color="var(--accent)" strokeWidth={3} />
                    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)' }}>
                      {selectedProject.metric}
                    </span>
                  </div>

                  <h4 style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                    Tech Stack
                  </h4>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
                    {selectedProject.tech.map(t => (
                      <span key={t} style={{ padding: '6px 14px', borderRadius: 100, background: 'rgba(21,101,192,0.06)', border: '1px solid var(--border)', fontSize: 12, fontWeight: 500, color: 'var(--text-secondary)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '16px', display: 'flex', justifyContent: 'center' }}
                    onClick={() => setActiveProjectId(null)}
                  >
                    Close Details
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid-desktop {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .projects-grid-desktop {
            display: none !important;
          }
          .projects-grid-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  )
}
