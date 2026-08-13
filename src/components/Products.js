'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Trophy, Zap, Monitor } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import FastScroll from './FastScroll'
import { SpotlightProvider, SpotlightCard } from './Spotlight'
import ScrambleText from './ScrambleText'
import { gsap } from 'gsap'

const getProductIcon = (name) => {
  if (name.includes('Agnishakti')) return Trophy;
  if (name.includes('FormForge')) return Zap;
  return Monitor;
}

const PRODUCTS = [
  {
    id: 'flagship',
    label: 'Enterprise Platforms',
    title: 'Mission-Critical Architecture',
    desc: 'Deep, long-lifecycle products engineered for high security, performance, and durability. We build platforms that become the reliable backbone of our clients\' critical operations — architected for 10-year horizons.',
    tags: ['Enterprise', 'Architecture', 'Scale'],
    accent: 'var(--accent)',
    status: 'Core Expertise',
    highlight: true,
    metric: { label: 'Quality Standard', val: 'Zero Downtime' },
    icon: Trophy,
  },
  {
    id: 'agnishakti',
    label: 'High-Velocity SaaS',
    title: 'Rapid Product Validation',
    desc: 'Rapid zero-to-one product development. We validate, build, and deploy market-ready software solutions with uncompromising quality at startup speeds.',
    tags: ['SaaS', 'Fast Launch'],
    accent: 'var(--accent)',
    status: 'Active Track',
    metric: { label: 'Dev Cycle', val: '< 8 weeks' },
    icon: Zap,
  },
  {
    id: 'client-services',
    label: 'Dedicated Engineering',
    title: 'Direct Team Integration',
    desc: 'Seamlessly integrate our senior architects and full-stack developers into your organisation to accelerate your product roadmap and tackle complex technical debt.',
    tags: ['Custom', 'Full-Stack', 'Consulting'],
    accent: 'var(--accent)',
    status: 'Open to Engagements',
    metric: { label: 'Project Start', val: '< 2 weeks' },
    icon: Monitor,
  },
]

export default function Products() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const [data, setData] = useState(PRODUCTS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/products`
      : 'http://localhost:5000/api/products'

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success && resJson.data && resJson.data.length > 0) {
          const mapped = resJson.data.map((p) => {
            const isAgnishakti = p.name === 'Agnishakti'
            const isFormForge = p.name === 'FormForge'

            return {
              id: p.id,
              name: p.name,
              label: isAgnishakti ? 'Enterprise Platforms' : (isFormForge ? 'Rapid Forms Tool' : 'Uptime Monitoring'),
              title: p.name,
              desc: p.description,
              tags: p.features || [],
              accent: 'var(--accent)',
              status: p.badge || 'Active Track',
              metric: isAgnishakti
                ? { label: 'Quality Standard', val: 'Zero Downtime' }
                : (isFormForge ? { label: 'Validation Cycle', val: '< 2 mins' } : { label: 'Alerting Latency', val: '< 5 secs' }),
              icon: getProductIcon(p.name),
            }
          })
          setData(mapped)
        } else {
          setData(PRODUCTS)
        }
      })
      .catch(() => {
        setData(PRODUCTS)
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
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [loading, data])



  const [flagship, ...rest] = data

  return (
    <section id="products" className="section" ref={ref} style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)', transition: 'background-color 400ms' }}>
      {/* Glow left */}
      <div style={{
        position: 'absolute', left: -100, top: '30%',
        width: 500, height: 500,
        background: 'radial-gradient(ellipse, rgba(21, 101, 192, 0.05) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ maxWidth: 520 }}>
            <div className="section-label reveal">
              <ScrambleText text="Our Core Capabilities" speed={40} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 16 }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Engineering</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>That Scales</span></FastScroll>
            </h2>
            <p className="text-body-lg reveal">
              Whether we are building proprietary SaaS platforms or custom enterprise solutions, the same relentless standard of quality applies.
            </p>
          </div>
          <a href="#contact" className="btn btn-outline btn-sm reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Start a Project 
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Bento grid */}
        <SpotlightProvider style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gridTemplateRows: 'auto',
          gap: 20,
        }} className="products-bento">
          {/* Large flagship card */}
          <div
            className="reveal-left"
            style={{ gridRow: '1 / 3' }}
          >
            <ProductCard product={flagship} large />
          </div>

          {/* Two stacked cards */}
          <div className="reveal-right stagger-1">
            <ProductCard product={rest[0]} />
          </div>
          <div className="reveal-right stagger-2">
            <ProductCard product={rest[1]} />
          </div>
        </SpotlightProvider>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .products-bento {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .products-bento > div:first-child {
            grid-row: auto !important;
          }
        }
        @media (max-width: 600px) {
          .product-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

function VisaCardGraphic() {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      el.style.setProperty('--x', `${x}px`)
      el.style.setProperty('--y', `${y}px`)
    }
    el.addEventListener('mousemove', onMouseMove)
    return () => el.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        width: 150,
        height: 94,
        borderRadius: 10,
        background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 55%, #1565C0 100%)',
        padding: 12,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        '--x': '50%',
        '--y': '50%',
        transition: 'transform 300ms var(--ease-out-quart)',
      }}
      className="visa-card-mock hover:scale-105"
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at var(--x) var(--y), rgba(255,255,255,0.3) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: 18, height: 13, background: '#E2E8F0', borderRadius: 3, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', right: '30%', borderLeft: '1px solid #94A3B8', borderRight: '1px solid #94A3B8' }} />
        </div>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.8 }}>
          <path d="M12 2A10 10 0 0 0 2 12M12 6A6 6 0 0 0 6 12M12 10A2 2 0 0 0 10 12" />
        </svg>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div style={{ fontSize: 8, fontFamily: 'monospace', letterSpacing: 1.5, opacity: 0.9 }}>
          •••• 4921
        </div>
        <span style={{ fontSize: 10, fontWeight: 'bold', fontStyle: 'italic', letterSpacing: 0.5 }}>
          VISA
        </span>
      </div>
    </div>
  )
}

function SystemNodesGraphic() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const nodes = Array.from({ length: 9 }).map(() => ({
      x: Math.random() * 100 + 25,
      y: Math.random() * 60 + 15,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1.2,
    }))

    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, 150, 94)
      
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 6 || node.x > 144) node.vx *= -1
        if (node.y < 6 || node.y > 88) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(79, 195, 247, 0.85)'
        ctx.fill()
      })

      ctx.beginPath()
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 45) {
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
          }
        }
      }
      ctx.strokeStyle = 'rgba(79, 195, 247, 0.12)'
      ctx.lineWidth = 0.8
      ctx.stroke()

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={150}
      height={94}
      style={{
        width: 150,
        height: 94,
        border: '1px solid var(--border)',
        borderRadius: 10,
        background: 'rgba(7, 11, 25, 0.25)',
      }}
    />
  )
}

function ProductCard({ product, large = false }) {
  const { theme } = useTheme()
  const cardRef = useRef(null)
  const contentRef = useRef(null)
  const Icon = product.icon

  // Live Terminal Logs (only for the large flagship card)
  const [logs, setLogs] = useState([
    { id: 1, api: 'POST /v1/systems.deploy', status: '202 Accepted', time: '82ms' },
    { id: 2, api: 'GET /v1/nodes/active', status: '200 OK', time: '6ms' },
    { id: 3, api: 'POST /v1/networks/sync', status: '200 OK', time: '11ms' }
  ])

  useEffect(() => {
    if (!large) return
    const timer = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev]
        next.shift()
        const apis = [
          'POST /v1/systems.deploy',
          'GET /v1/nodes/active',
          'POST /v1/networks/sync',
          'GET /v1/database/health',
          'POST /v1/deployments',
          'GET /v1/metrics/load',
          'POST /v1/auth/verify'
        ]
        const statuses = ['200 OK', '201 Created', '202 Accepted']
        const randomApi = apis[Math.floor(Math.random() * apis.length)]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        const randomTime = Math.floor(Math.random() * 40 + 5) + 'ms'
        
        next.push({
          id: Date.now(),
          api: randomApi,
          status: randomStatus,
          time: randomTime
        })
        return next
      })
    }, 2800)
    return () => clearInterval(timer)
  }, [large])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const onMouseMove = (e) => {
      const bounds = card.getBoundingClientRect()
      const x = e.clientX - bounds.left
      const y = e.clientY - bounds.top
      
      const xc = bounds.width / 2
      const yc = bounds.height / 2
      
      // Calculate tilt offset
      const tiltX = (x - xc) / 20
      const tiltY = (y - yc) / 20

      // GSAP tilt card container
      gsap.to(card, {
        x: tiltX * 0.8,
        y: tiltY * 0.8,
        rotationY: tiltX * 0.35,
        rotationX: -tiltY * 0.35,
        transformPerspective: 1000,
        ease: 'power3.out',
        duration: 0.4,
        overwrite: 'auto'
      })

      // Parallax inner content in opposite direction
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: -tiltX * 0.25,
          y: -tiltY * 0.25,
          ease: 'power3.out',
          duration: 0.4,
          overwrite: 'auto'
        })
      }
    }

    const onMouseLeave = () => {
      // Elastic spring back to home
      gsap.to(card, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        ease: 'elastic.out(1, 0.65)',
        duration: 0.85,
        overwrite: 'auto'
      })

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: 0,
          y: 0,
          ease: 'elastic.out(1, 0.65)',
          duration: 0.85,
          overwrite: 'auto'
        })
      }
    }

    card.addEventListener('mousemove', onMouseMove)
    card.addEventListener('mouseleave', onMouseLeave)

    return () => {
      card.removeEventListener('mousemove', onMouseMove)
      card.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <div ref={cardRef} style={{ height: '100%', transformStyle: 'preserve-3d' }}>
      <SpotlightCard
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 20,
          padding: large ? 'clamp(24px, 3vw, 40px)' : 'clamp(24px, 3vw, 36px)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.03)',
          transition: 'border-color 300ms, box-shadow 300ms',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-strong)'
          e.currentTarget.style.boxShadow = theme === 'dark'
            ? '0 20px 40px -15px rgba(21,101,192,0.22), 0 -1px 0 var(--accent-dim) inset'
            : '0 20px 40px -15px rgba(21,101,192,0.1), 0 -1px 0 var(--accent-dim) inset';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.03)'
        }}
      >
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 24, transformStyle: 'preserve-3d' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: large ? '1.25fr 0.75fr' : '1fr',
            gap: 24,
            alignItems: 'center',
            height: '100%',
          }} className="product-card-grid">
            
            {/* Left side info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Top: icon + status badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="icon-box" style={{ background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)' }}>
                  <Icon size={18} strokeWidth={2.2} className="text-accent" />
                </div>
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: 100,
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    border: '1px solid var(--border)',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {product.status}
                </span>
              </div>

              {/* Label */}
              <div>
                <span className="text-label" style={{ color: 'var(--accent)', fontWeight: 600 }}>{product.label}</span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                  fontSize: large ? 'clamp(20px, 2.5vw, 28px)' : 17,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.015em',
                }}
              >
                {product.title}
              </h3>

              {/* Desc */}
              <p className="text-body" style={{ flex: 1, lineHeight: 1.75, fontSize: 14 }}>{product.desc}</p>

              {/* Metric */}
              <div
                style={{
                  padding: '14px 18px',
                  background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="text-label" style={{ fontSize: 10 }}>{product.metric.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--accent)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {product.metric.val}
                </span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {product.tags.map((tag) => (
                  <span key={tag} className="tag tag-muted" style={{ fontSize: 10, borderRadius: 100 }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Right side live interactive dashboard console (Only for large flagship card) */}
            {large && (
              <div style={{
                background: theme === 'dark' ? '#070B19' : '#F0F4FF',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: 16,
                fontFamily: 'monospace',
                fontSize: 10,
                color: theme === 'dark' ? '#9CA3AF' : '#475467',
                boxShadow: theme === 'dark'
                  ? 'inset 0 1px 3px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.2)'
                  : 'inset 0 1px 3px rgba(0,0,0,0.05), 0 10px 20px rgba(21,101,192,0.05)',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                overflow: 'hidden',
                position: 'relative',
              }} className="terminal-mock">
                
                {/* Mock Window Controls */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 4, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                </div>
                
                {/* Status Ticker Line */}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent)', fontSize: 9, fontWeight: 600 }}>
                  <span>SYSTEM: ACTIVE</span>
                  <span style={{ animation: 'hero-glow-pulse 1.5s infinite', color: '#10B981' }}>● LIVE FEED</span>
                </div>

                {/* Live Console Output */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        opacity: 0.9,
                        animation: 'fadeIn 0.4s ease-out forwards',
                      }}
                    >
                      <div style={{ color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
                        <span>{log.api}</span>
                        <span style={{ color: 'var(--accent)', fontSize: 9 }}>{log.time}</span>
                      </div>
                      <div style={{ color: '#10B981', fontSize: 9 }}>
                        {log.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
          
        </div>
      </SpotlightCard>
    </div>
  )
}
