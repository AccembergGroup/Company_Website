'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/components/ThemeProvider'
import { ArrowRight, Maximize2, Minimize2, Check, ExternalLink, ShieldCheck } from 'lucide-react'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'

// 1. AI/ML swirl particle vortex
function VortexGraphic() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, 180, 180)
      t += 0.015
      const cx = 90
      const cy = 90
      
      // Draw outer swirl particles
      for (let i = 0; i < 240; i++) {
        const angle = i * 0.18 + t
        const r = (i * 0.28) + 16
        const x = cx + Math.cos(angle) * r
        const y = cy + Math.sin(angle) * r
        
        ctx.beginPath()
        ctx.arc(x, y, 1.1, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236, 72, 153, ${Math.max(0, 0.9 - r / 75)})` // neon pink fading
        ctx.fill()
      }
      
      animId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas ref={canvasRef} width={180} height={180} />
      {/* Central Card Icon */}
      <div style={{
        position: 'absolute',
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: '#EC4899',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
        zIndex: 2,
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/>
          <circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      </div>
    </div>
  )
}

// 2. Web browser mockup graphics
function BrowserGraphic() {
  const { theme } = themeHookSafe()
  const isDark = theme === 'dark'

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: 1000,
    }}>
      {/* Desktop mockup */}
      <div style={{
        width: 160,
        height: 100,
        background: isDark ? '#070B19' : '#FFFFFF',
        border: isDark ? '1px solid rgba(79, 195, 247, 0.25)' : '1px solid rgba(21, 101, 192, 0.16)',
        borderRadius: 8,
        boxShadow: isDark ? '0 12px 30px rgba(21,101,192,0.25)' : '0 12px 30px rgba(21,101,192,0.08)',
        transform: 'rotateY(-18deg) rotateX(8deg) translateZ(10px)',
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        transition: 'background-color 400ms, border-color 400ms, box-shadow 400ms',
      }}>
        <div style={{ display: 'flex', gap: 4, borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.05)', paddingBottom: 4 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#EF4444' }} />
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#F59E0B' }} />
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981' }} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ width: '50%', height: 5, background: isDark ? '#4FC3F7' : '#1565C0', borderRadius: 2 }} />
          <div style={{ width: '80%', height: 3, background: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)', borderRadius: 2 }} />
          <div style={{ width: '35%', height: 3, background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', borderRadius: 2 }} />
          <div style={{ flex: 1, display: 'flex', gap: 4, marginTop: 4 }}>
            <div style={{ flex: 1, background: isDark ? 'rgba(21,101,192,0.12)' : 'rgba(21,101,192,0.08)', borderRadius: 2 }} />
            <div style={{ flex: 1, background: isDark ? 'rgba(21,101,192,0.06)' : 'rgba(21,101,192,0.03)', borderRadius: 2 }} />
          </div>
        </div>
      </div>

      {/* Mobile overlapping mockup */}
      <div style={{
        position: 'absolute',
        right: '15%',
        bottom: '15%',
        width: 46,
        height: 84,
        background: isDark ? '#040814' : '#F5F7FF',
        border: isDark ? '1px solid rgba(79, 195, 247, 0.35)' : '1px solid rgba(21, 101, 192, 0.2)',
        borderRadius: 6,
        boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5)' : '0 8px 20px rgba(0,0,0,0.06)',
        transform: 'rotateY(-12deg) translateZ(30px)',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        transition: 'background-color 400ms, border-color 400ms, box-shadow 400ms',
      }}>
        <div style={{ width: 10, height: 2, background: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.15)', borderRadius: 10, alignSelf: 'center', marginBottom: 2 }} />
        <div style={{ width: '70%', height: 5, background: isDark ? '#4FC3F7' : '#1565C0', borderRadius: 1 }} />
        <div style={{ flex: 1, background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)', borderRadius: 1 }} />
      </div>
    </div>
  )
}

// 3. Cloud wireframe particle globe
function GlobeGraphic() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0
    
    const numPoints = 70
    const points = []
    for (let i = 0; i < numPoints; i++) {
      const theta = Math.acos(Math.random() * 2 - 1)
      const phi = Math.random() * Math.PI * 2
      points.push({
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta)
      })
    }

    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, 180, 180)
      t += 0.01
      const cx = 90
      const cy = 90
      const r = 45

      const projected = points.map(p => {
        // Rotate around Y axis
        const x1 = p.x * Math.cos(t) - p.z * Math.sin(t)
        const z1 = p.x * Math.sin(t) + p.z * Math.cos(t)
        
        // Rotate around X axis slightly
        const y2 = p.y * Math.cos(0.25) - z1 * Math.sin(0.25)
        const z2 = p.y * Math.sin(0.25) + z1 * Math.cos(0.25)
        
        return {
          sx: cx + x1 * r,
          sy: cy + y2 * r,
          sz: z2
        }
      })

      // Draw orbit rings
      ctx.beginPath()
      ctx.ellipse(cx, cy, r * 1.3, r * 0.28, -0.2, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(79, 195, 247, 0.35)'
      ctx.lineWidth = 1.0
      ctx.stroke()

      // Draw points
      projected.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.sx, p.sy, p.sz > 0 ? 1.8 : 1.1, 0, Math.PI * 2)
        const alpha = (p.sz + 1.2) / 2.2
        ctx.fillStyle = `rgba(79, 195, 247, ${alpha * 0.8})`
        ctx.fill()
      })

      animId = requestAnimationFrame(render)
    }
    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <div style={{ position: 'relative', width: 180, height: 180 }}>
      <canvas ref={canvasRef} width={180} height={180} />
    </div>
  )
}

const PROJECTS = [
  {
    id: 'flowfix',
    category: 'AI / ML',
    title: 'FlowFix – Gig Workers Protection Platform',
    desc: 'Parametric insurance platform for gig workers using real-time data and AI to trigger automatic payouts.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Python'],
    client: 'Accemberg Technologies',
    timeline: 'Apr 2024 - May 2024',
    impact: '+60% Engagement',
    overview: 'Deploying custom real-time transaction processing networks enabled gig-economy workers to access fast protection validation models with automated payout structures.',
    features: [
      'Real-time automated transaction validation',
      'Advanced machine learning risk profiling model',
      'Instant payout API triggers and secure banking integrations',
      'High-throughput parametric database nodes'
    ],
    graphic: <VortexGraphic />
  },
  {
    id: 'corporate',
    category: 'Web Development',
    title: 'Accemberg Corporate Website',
    desc: 'A modern, high-performance corporate website built with Next.js and Tailwind CSS, showcasing our services, solutions, and impact.',
    tech: ['Next.js', 'TS', 'Tailwind', 'Framer Motion'],
    client: 'Accemberg Group',
    timeline: 'Apr 2024 - May 2024',
    impact: '100% PageSpeed Core Metrics',
    overview: 'The new Accemberg website delivers a premium experience with faster performance, improved UI/UX, and a scalable architecture to support future growth.',
    features: [
      'Modern UI with smooth animations',
      'Fully responsive across all devices',
      'Optimized performance & SEO metrics',
      'CMS integration for easy content management'
    ],
    graphic: <BrowserGraphic />
  },
  {
    id: 'cloud',
    category: 'Cloud',
    title: 'Cloud Infrastructure Modernization',
    desc: 'Migrated legacy infrastructure to AWS with automation, scalability, and enhanced security.',
    tech: ['AWS', 'Kubernetes', 'Terraform', 'Docker'],
    client: 'Stark Enterprises',
    timeline: 'Jan 2024 - Mar 2024',
    impact: '-40% Cloud Cost reduction',
    overview: 'Migrated monolithic database workloads to microservice architectures running auto-scaled Kubernetes pods across multi-zone availability environments.',
    features: [
      'Multi-zone high availability cluster setups',
      'Infrastructure as Code (IaC) deployment pipelines',
      'Automated vertical pod scaling metrics',
      'Secured container registries and network policies'
    ],
    graphic: <GlobeGraphic />
  }
]

export default function Projects() {
  const { theme } = themeHookSafe()
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [activeProjectId, setActiveProjectId] = useState(null) // Opened project in modal

  // Filter matching logic
  const filteredProjects = PROJECTS.filter(proj => {
    if (activeFilter === 'All Projects') return true
    return proj.category === activeFilter
  })

  const selectedProject = PROJECTS.find(p => p.id === activeProjectId)

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden', padding: '90px 0', transition: 'background-color 400ms' }}>
      
      {/* Background Mesh Blobs */}
      <div style={{
        position: 'absolute', right: -120, top: '10%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(21, 101, 192, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 48 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            marginBottom: 8
          }}>
            Our Work
          </span>
          <h2 className="text-h2" style={{ marginBottom: 14 }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Projects that</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>drive impact</span></FastScroll>
            </h2>
          <p className="text-body-lg" style={{ maxWidth: 580 }}>
            We build scalable, AI-powered digital solutions that help our clients innovate, automate, and grow.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          {['All Projects', 'AI / ML', 'Web Development', 'Cloud', 'Mobile', 'DevOps'].map(filter => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 600,
                  border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 200ms',
                }}
                suppressHydrationWarning
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Short Version: Consistent 3-column Grid */}
        <div className="projects-grid-desktop" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          width: '100%'
        }}>
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              onClick={() => setActiveProjectId(proj.id)}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                minHeight: 480,
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
              {/* Top Row: Category & Expand Icon */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 100,
                  background: 'var(--accent-dim)',
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  textTransform: 'uppercase',
                }}>
                  {proj.category}
                </span>
                <button
                  onClick={() => setActiveProjectId(proj.id)}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                  }}
                  suppressHydrationWarning
                >
                  <Maximize2 size={13} />
                </button>
              </div>

              {/* Graphic Asset (Motion Visual) */}
              <div style={{ display: 'flex', justifyContent: 'center', margin: '14px 0', minHeight: 180, alignItems: 'center' }}>
                {proj.graphic}
              </div>

              {/* Content Panel */}
              <div style={{ marginTop: 'auto' }}>
                <h3 style={{
                  fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                  fontSize: 17,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.015em',
                  marginBottom: 8,
                }}>
                  {proj.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 16 }}>
                  {proj.desc}
                </p>

                {/* Tech tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {proj.tech.slice(0, 3).map(t => (
                    <span key={t} className="tag tag-muted" style={{ fontSize: 9, borderRadius: 100 }}>{t}</span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Mobile stacking Accordion list */}
        <div className="projects-grid-mobile" style={{ display: 'none', flexDirection: 'column', gap: 16 }}>
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 20,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => setActiveProjectId(proj.id)}>
                <div>
                  <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 4 }}>
                    {proj.category}
                  </span>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {proj.title}
                  </h3>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Details Modal Overlay */}
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
                zIndex: 9999,
                padding: 20,
              }}
            >
              <motion.div
                initial={{ y: 40, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 40, scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  width: '100%',
                  maxWidth: 660,
                  padding: 32,
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                  maxHeight: '85vh',
                  overflowY: 'auto',
                }}
              >
                {/* Modal Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: 100,
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(79, 195, 247, 0.2)',
                    fontSize: 10,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}>
                    {selectedProject.category}
                  </span>
                  <button
                    onClick={() => setActiveProjectId(null)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: 6,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 200ms',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--accent-dim)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    suppressHydrationWarning
                  >
                    <Minimize2 size={16} />
                  </button>
                </div>

                {/* Info & Graphic layout */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: 24,
                  alignItems: 'center',
                  marginBottom: 20
                }} className="project-expanded-top">
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                      fontSize: 22,
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                      letterSpacing: '-0.02em',
                      marginBottom: 8,
                    }}>
                      {selectedProject.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 0 }}>
                      {selectedProject.desc}
                    </p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {selectedProject.graphic}
                  </div>
                </div>

                {/* Metadata Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                  borderTop: '1px solid var(--border)',
                  borderBottom: '1px solid var(--border)',
                  padding: '16px 0',
                  marginBottom: 20
                }} className="project-metadata-grid">
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Client</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProject.client}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Timeline</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedProject.timeline}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Technologies</div>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {selectedProject.tech.slice(0, 3).map(t => (
                        <span key={t} className="tag tag-muted" style={{ fontSize: 9, borderRadius: 4, padding: '2px 6px' }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 4 }}>Impact</div>
                    <div style={{ fontSize: 11, fontWeight: 750, color: 'var(--accent)' }}>{selectedProject.impact}</div>
                  </div>
                </div>

                {/* Overview & Features section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 6 }}>Overview</div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {selectedProject.overview}
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-primary)', marginBottom: 8 }}>Key Features</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {selectedProject.features.map((feat, index) => (
                        <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 14, height: 14, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', marginTop: 2, flexShrink: 0 }}>
                            <Check size={9} stroke="#10B981" strokeWidth={3} />
                          </div>
                          <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Action Buttons */}
                <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
                  <a href="#contact" onClick={() => setActiveProjectId(null)} className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Discuss System Integration
                    <ArrowRight size={13} />
                  </a>
                  <a href="#contact" onClick={() => setActiveProjectId(null)} className="btn btn-outline btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    Live Preview
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-grid-desktop {
            display: none !important;
          }
          .projects-grid-mobile {
            display: flex !important;
          }
        }
        @media (max-width: 768px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
          }
          .project-expanded-top {
            grid-template-columns: 1fr !important;
          }
          .project-metadata-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  )
}



// Fallback theme hook helper
function themeHookSafe() {
  try {
    return useTheme()
  } catch (e) {
    return { theme: 'dark' }
  }
}
