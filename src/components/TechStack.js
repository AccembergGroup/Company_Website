'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { Layout, Server, Database, Cloud, Terminal, CheckCircle2 } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'

const STACKS = [
  {
    category: 'Frontend & Client Systems',
    icon: Layout,
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Redux Toolkit']
  },
  {
    category: 'Backend & Service Logic',
    icon: Server,
    techs: ['Node.js', 'Express', 'NestJS', 'Go (Golang)', 'Python (FastAPI)', 'GraphQL', 'gRPC']
  },
  {
    category: 'Database & Data Ingestion',
    icon: Database,
    techs: ['PostgreSQL', 'Supabase', 'Prisma ORM', 'Redis', 'MongoDB', 'Elasticsearch', 'DynamoDB']
  },
  {
    category: 'Cloud Infrastructure & DevOps',
    icon: Cloud,
    techs: ['Amazon Web Services (AWS)', 'Google Cloud (GCP)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD Pipelines', 'GitHub Actions']
  }
]

export default function TechStack() {
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

  // Local theme overrides to differentiate TechStack as a space-blue section
  const overrideVars = theme === 'dark' ? {
    background: 'linear-gradient(180deg, #0A0F1E 0%, #08173B 50%, #0A0F1E 100%)',
    '--bg-card': 'rgba(9, 21, 56, 0.7)',
    '--border': 'rgba(79, 195, 247, 0.1)',
  } : {
    background: '#F0F4FC',
    '--bg-card': '#FFFFFF',
    '--border': 'rgba(21, 101, 192, 0.08)',
  }

  return (
    <section id="tech-stack" className="section" ref={ref}
      style={{
        ...overrideVars,
        position: 'relative',
        overflow: 'visible',
        paddingTop: '140px',
        paddingBottom: '60px',
        transition: 'background-color 400ms, color 400ms'
      }}
    >



      {/* Floating Background Cloud Image - Spans across the boundary and blends into both sections */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: 0,
        right: 0,
        height: '300px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        <Image
          src="/divider-cloud.png"
          alt=""
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: theme === 'dark' ? 0.45 : 0.25,
            mixBlendMode: theme === 'dark' ? 'screen' : 'multiply',
            filter: 'saturate(0.75) contrast(1.1) blur(4px)',
            maskImage: 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.15) 50%, transparent 65%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.65) 25%, rgba(0,0,0,0.15) 50%, transparent 65%)',
          }}
          sizes="100vw"
        />
      </div>

      {/* Ambient glow clipping container */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}>
        {/* Blue glow accent top-right */}
        <div style={{
          position: 'absolute', top: '-10%', right: '-5%',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(21, 101, 192, 0.04) 0%, transparent 65%)',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', maxWidth: 640 }} className="reveal">
          <div className="section-label">
            <ScrambleText text="Our Technology Stack" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 16 }}>
            <FastScroll><span style={{ display: 'inline-block' }}>Powering High-Performance</span></FastScroll>
            <br />
            <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Modern Applications</span></FastScroll>
          </h2>
          <p className="text-body-lg">
            We curate our stack for reliability, speed, and clean code principles.
          </p>
        </div>

        {/* Stack grid */}
        <div className="stack-grid">
          {STACKS.map((stack, i) => {
            const Icon = stack.icon
            return (
              <div
                key={stack.category}
                className={`reveal-scale stagger-${(i % 2) + 1}`}
                style={{
                  background: 'var(--bg-card)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid var(--border)',
                  borderRadius: 20,
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
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
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="icon-box" style={{ background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)' }}>
                    <Icon size={18} strokeWidth={2.2} />
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.015em',
                  }}>
                    {stack.category}
                  </h3>
                </div>

                {/* Tech pills wrapper */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {stack.techs.map((tech) => (
                    <div
                      key={tech}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '6px 14px',
                        background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                        border: '1px solid var(--border)',
                        borderRadius: 100,
                        fontSize: 12,
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      <CheckCircle2 size={11} className="text-accent" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>

              </div>
            )
          })}
        </div>

      </div>

      <style>{`
        .stack-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 860px) {
          .stack-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
