'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useTheme } from '@/components/ThemeProvider'
import { Icon } from '@iconify/react'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const ENGINES = [
  {
    num: '01',
    title: 'Bespoke Engineering',
    role: 'Precision Development',
    desc: 'Tailor-made software solutions architected from the ground up to solve complex enterprise challenges with elegant, maintainable code.',
    color: '#00E5FF',
    icon: 'fluent:wrench-screwdriver-24-filled',
    iconColor: '#00E5FF',
  },
  {
    num: '02',
    title: 'Product-First Mindset',
    role: 'User-Centric Design',
    desc: 'We approach every engagement through the lens of product ownership — prioritising intuitive user experiences, performance, and scalable architecture.',
    color: '#38BDF8',
    icon: 'fluent:target-arrow-24-filled',
    iconColor: '#38BDF8',
  },
  {
    num: '03',
    title: 'Uncompromising Quality',
    role: 'Rigorous Delivery',
    desc: 'Multi-stage QA, automated testing pipelines, and comprehensive code reviews ensure our deployments are rock-solid, secure, and ready to scale.',
    color: '#34D399',
    icon: 'fluent:ribbon-star-24-filled',
    iconColor: '#34D399',
  },
]

const getTechGraphic = (num) => {
  if (num === '01') {
    return (
      <svg className="card-tech-bg" width="90" height="90" viewBox="0 0 90 90" fill="none">
        <path d="M10 0v90M30 0v90M50 0v90M70 0v90M0 10h90M0 30h90M0 50h90M0 70h90" stroke="var(--accent)" strokeWidth="0.5" strokeOpacity="0.15" />
        <circle cx="30" cy="30" r="3.5" fill="var(--accent)" fillOpacity="0.4" />
        <circle cx="50" cy="50" r="2.5" fill="var(--accent)" fillOpacity="0.4" />
        <circle cx="70" cy="30" r="3" fill="var(--accent)" fillOpacity="0.4" />
        <path d="M30 30h20v20h20V30" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 2" />
      </svg>
    )
  }
  if (num === '02') {
    return (
      <svg className="card-tech-bg" width="90" height="90" viewBox="0 0 90 90" fill="none">
        <rect x="10" y="15" width="70" height="50" rx="3" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="10" y1="28" x2="80" y2="28" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.25" />
        <rect x="18" y="34" width="22" height="24" rx="1.5" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.2" />
        <rect x="46" y="34" width="26" height="6" rx="1" fill="var(--accent)" fillOpacity="0.15" />
        <rect x="46" y="44" width="26" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
        <rect x="46" y="52" width="16" height="4" rx="1" fill="var(--accent)" fillOpacity="0.1" />
      </svg>
    )
  }
  if (num === '03') {
    return (
      <svg className="card-tech-bg" width="90" height="90" viewBox="0 0 90 90" fill="none">
        <path d="M15 45h60" stroke="var(--accent)" strokeWidth="0.8" strokeOpacity="0.3" />
        <circle cx="20" cy="45" r="4" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="0.8" />
        <path d="M17 45l2 2l3-4" stroke="#FFF" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="45" cy="45" r="4" fill="var(--accent)" fillOpacity="0.3" stroke="var(--accent)" strokeWidth="0.8" />
        <path d="M42 45l2 2l3-4" stroke="#FFF" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="70" cy="45" r="4.5" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 2" />
        <path d="M45 45v-15h20" stroke="var(--accent)" strokeWidth="0.6" strokeOpacity="0.2" strokeDasharray="2 1" />
        <circle cx="65" cy="30" r="2" fill="var(--accent)" fillOpacity="0.4" />
      </svg>
    )
  }
  return null
}

function useReveal(ref, options = {}) {
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
      { threshold: 0.15, ...options },
    )
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
}

export default function About() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const ref = useRef(null)
  useReveal(ref)

  // ── GSAP ScrollTrigger animations for philosophy sequence ──
  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    const ctx = gsap.context(() => {
      // 1. Draw connecting progress line
      gsap.fromTo('.connecting-line-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.principles-section-wrapper',
            start: 'top 85%',
            once: true,
          }
        }
      )

      // 2. Stagger nodes and card reveals
      const cards = el.querySelectorAll('.engine-card')
      cards.forEach((card, i) => {
        const node = el.querySelector(`.step-node-${i + 1}`)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          }
        })

        if (node) {
          tl.to(node, {
            backgroundColor: 'var(--accent)',
            borderColor: 'var(--accent)',
            scale: 1.3,
            duration: 0.3,
            ease: 'back.out(1.7)'
          })
        }

        tl.fromTo(card,
          { opacity: 0.7, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.15'
        )
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Subtle glow top-right */}
      <div
        style={{
          position: 'absolute',
          top: '-80px',
          right: '-120px',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(26,143,255,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container">
        {/* Top asymmetric row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(40px, 6vw, 100px)',
            alignItems: 'flex-start',
            marginBottom: 'clamp(60px, 8vw, 100px)',
          }}
          className="about-grid"
        >
          {/* Left — Text */}
          <div>
            <div className="section-label reveal">
              <ScrambleText text="Our Philosophy" speed={40} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 24, transform: 'translateZ(0)' }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Engineering Excellence.</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Uncompromising Quality.</span></FastScroll>
            </h2>
            <p className="text-body-lg reveal" style={{ marginBottom: 32 }}>
              Most firms accept tradeoffs between velocity and quality. At Accemberg, we architect software that eliminates compromise. Every platform we build is engineered with extreme attention to detail, robust system architecture, and an obsessive focus on user experience.
            </p>
            <p className="text-body reveal" style={{ marginBottom: 36 }}>
              Our philosophy is rooted in engineering discipline. From complex enterprise migrations to rapid zero-to-one SaaS deployments, our team of passionate engineers treats every codebase as a craft. We don't just write code; we build durable digital assets that compound in value over time.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }} className="reveal">
              <a href="#services" className="btn btn-primary btn-sm">
                Our Services
              </a>
              <a href="#contact" className="btn btn-outline btn-sm">
                Partner With Us
              </a>
            </div>
          </div>

          {/* Right — 3D Orbital Diagram */}
          <div
            className="reveal-right"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 480,
            }}
          >
            <OrbitalDiagram />
          </div>
        </div>

        {/* Principles section container */}
        <div style={{ position: 'relative', marginTop: '48px' }} className="principles-section-wrapper">
          {/* Subtle horizontal connecting line & step nodes (Desktop only) */}
          <div className="connecting-line-container">
            {/* Animated progress line */}
            <div className="connecting-line-progress" />

            {/* Nodes */}
            <div className="step-node step-node-1" style={{ left: '16.67%' }} />
            <div className="step-node step-node-2" style={{ left: '50%' }} />
            <div className="step-node step-node-3" style={{ left: '83.33%' }} />
          </div>

          {/* Engine cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
              position: 'relative',
              zIndex: 5,
            }}
            className="engines-grid"
          >
            {ENGINES.map((engine, i) => (
              <div
                key={engine.num}
                className={`engine-card card ${isDark ? 'dark' : 'light'}`}
                onMouseMove={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  card.style.setProperty('--mouse-x', `${x}px`)
                  card.style.setProperty('--mouse-y', `${y}px`)
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget
                  card.style.setProperty('--mouse-x', `-999px`)
                  card.style.setProperty('--mouse-y', `-999px`)
                }}
              >
                {/* Top edge accent glow line */}
                <div className="card-top-glow" />

                {/* Spotlight Layer */}
                <div className="card-spotlight" />

                {/* Unique Technical Graphic */}
                {getTechGraphic(engine.num)}

                {/* Top Row: Icon Box + Monospace Number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, position: 'relative', zIndex: 5 }}>
                  {/* Realistic 3D icon box */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background: isDark
                      ? `linear-gradient(145deg, ${engine.iconColor}36 0%, ${engine.iconColor}18 60%, ${engine.iconColor}08 100%)`
                      : `linear-gradient(145deg, ${engine.iconColor}40 0%, ${engine.iconColor}20 60%, ${engine.iconColor}0A 100%)`,
                    border: `1px solid ${engine.iconColor}66`,
                    boxShadow: [
                      `0 0 0 1px ${engine.iconColor}33`,
                      `0 6px 22px -2px ${engine.iconColor}77`,
                      `0 1px 0 0 ${engine.iconColor}55 inset`,
                      `inset 0 0 14px 0 ${engine.iconColor}22`,
                    ].join(', '),
                  }}>
                    {/* Inner shine highlight */}
                    <div style={{
                      position: 'absolute',
                      top: 2,
                      left: 6,
                      right: 6,
                      height: '40%',
                      background: `linear-gradient(180deg, ${engine.iconColor}33 0%, transparent 100%)`,
                      borderRadius: '8px 8px 50% 50%',
                      pointerEvents: 'none',
                    }} />
                    <Icon
                      icon={engine.icon}
                      width={28}
                      height={28}
                      style={{
                        color: engine.iconColor,
                        filter: `drop-shadow(0 0 8px ${engine.iconColor}aa) drop-shadow(0 2px 4px ${engine.iconColor}66)`,
                        position: 'relative',
                        zIndex: 1,
                      }}
                    />
                  </div>
                  <span className="engine-num-label">
                    {engine.num}
                  </span>
                </div>

                {/* Role/Eyebrow */}
                <div style={{ marginBottom: 6, position: 'relative', zIndex: 5 }}>
                  <span className="text-label" style={{ color: engine.color }}>
                    {engine.role}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-h3" style={{ marginBottom: 12, fontSize: 18, position: 'relative', zIndex: 5, color: isDark ? '#FFF' : '#101828' }}>
                  {engine.title}
                </h3>

                {/* Description */}
                <p className="text-body" style={{ position: 'relative', zIndex: 5, margin: 0, color: isDark ? 'rgba(255,255,255,0.7)' : '#475467' }}>
                  {engine.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .about-grid > div:last-child { order: 2; max-height: 320px; min-height: 200px !important; }
          .about-grid > div:first-child { order: 1; }
          .about-orbital-stage { max-width: 280px; }
        }
        @media (max-width: 768px) {
          .engines-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }

        /* ── Connected principles sequence ── */
        .principles-section-wrapper {
          position: relative;
          margin-top: 48px;
        }
        .connecting-line-container {
          position: absolute;
          top: 18px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border);
          pointer-events: none;
          z-index: 10;
        }
        .connecting-line-progress {
          height: 100%;
          background: var(--accent);
          transform-origin: left;
          width: 100%;
        }
        .step-node {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--bg-card);
          border: 1.5px solid var(--border);
          z-index: 12;
          transition: background-color 0.4s, border-color 0.4s, transform 0.4s;
        }
        .engine-card {
          position: relative;
          border-radius: 20px;
          padding: 32px 32px;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.35s, box-shadow 0.35s;
          cursor: default;
          opacity: 1;
          overflow: hidden;
        }
        .engine-card.dark {
          background: linear-gradient(145deg, rgba(12, 24, 60, 0.65) 0%, rgba(6, 12, 28, 0.85) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border-strong);
          box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5), inset 0 0 24px 0 rgba(21, 101, 192, 0.12), inset 0 1px 0 0 rgba(79, 195, 247, 0.18);
        }
        .engine-card.light {
          background: linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(245,247,255,0.92) 100%);
          border: 1px solid rgba(21, 101, 192, 0.24);
          box-shadow: 0 8px 24px -6px rgba(21, 101, 192, 0.08);
        }
        .engine-card.dark:hover {
          transform: translateY(-5px) scale(1.01);
          border-color: var(--accent);
          box-shadow: 0 20px 45px -12px rgba(79, 195, 247, 0.4), 0 -1px 0 var(--accent) inset;
        }
        .engine-card.light:hover {
          transform: translateY(-5px) scale(1.01) !important;
          border-color: rgba(21, 101, 192, 0.4) !important;
          box-shadow: 0 16px 36px -12px rgba(21, 101, 192, 0.16) !important;
        }
        @media (max-width: 768px) {
          .connecting-line-container { display: none; }
        }
        .card-top-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: 0.85;
          pointer-events: none;
          z-index: 5;
        }
        .engine-card:hover .card-top-glow {
          opacity: 1;
        }
        .card-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(79,195,247,0.07), transparent 80%);
          z-index: 1;
          transition: opacity 0.35s;
        }
        .engine-card.light .card-spotlight {
          background: radial-gradient(circle 120px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(21,101,192,0.06), transparent 80%);
        }
        .card-tech-bg {
          position: absolute;
          top: 12px;
          right: 12px;
          pointer-events: none;
          opacity: 0.06;
          transition: opacity 0.35s, transform 0.35s;
          z-index: 0;
        }
        .engine-card:hover .card-tech-bg {
          opacity: 0.12;
          transform: scale(1.05);
        }
        .engine-num-label {
          font-family: monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--text-muted);
          opacity: 0.25;
          transition: opacity 0.35s, color 0.35s;
        }
        .engine-card:hover .engine-num-label {
          opacity: 0.65;
          color: var(--accent);
        }
        .engine-icon-box {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(26,143,255,0.06);
          border: 1px solid rgba(21, 101, 192, 0.18);
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: transform 0.35s, border-color 0.35s, box-shadow 0.35s;
          z-index: 2;
        }
        .engine-card.light .engine-icon-box {
          background: rgba(21,101,192,0.04);
          border-color: rgba(21,101,192,0.12);
        }
        .engine-card:hover .engine-icon-box {
          transform: translateY(-2px);
          border-color: var(--accent);
          box-shadow: 0 0 12px rgba(21,101,192,0.22);
        }

        /* ── 3-D Orbital (About) ── */
        .about-orbital-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          max-width: 420px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }
        .about-orbital-inner {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          animation: about-tiltDrift 9s ease-in-out infinite;
        }
        @keyframes about-tiltDrift {
          0%, 100% { transform: rotateX(58deg) rotateZ(0deg); }
          50%       { transform: rotateX(52deg) rotateZ(6deg); }
        }
        .about-orbital-glow {
          position: absolute;
          inset: 6%;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(21,101,192,0.22) 0%, transparent 70%);
          filter: blur(6px);
          transform: translateZ(-40px);
        }
        .about-orbit-ring {
          position: absolute;
          border: 1px solid #2A3660;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
        }
        .about-ring-1 { width: 62%;  height: 62%;  margin: -31% 0 0 -31%; --atz: 30px;  animation: about-orb-spin 18s linear infinite; }
        .about-ring-2 { width: 82%;  height: 82%;  margin: -41% 0 0 -41%; --atz: 0px;   animation: about-orb-spin 28s linear infinite reverse; }
        .about-ring-3 { width: 100%; height: 100%; margin: -50% 0 0 -50%; --atz: -30px; animation: about-orb-spin 40s linear infinite; }
        @keyframes about-orb-spin {
          to { transform: translateZ(var(--atz, 0)) rotate(360deg); }
        }
        /* Nodes are positioned by JS via left/top — static face-screen transform only */
        .about-orbit-node {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotateX(-58deg);
          width: 100px;
          height: 68px;
          border-radius: 13px;
          background: var(--bg-card);
          border: 1px solid var(--border-strong);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 0 20px rgba(21,101,192,0.1), 0 4px 12px rgba(0,0,0,0.05);
          pointer-events: none;
          will-change: left, top;
        }
        .about-node-icon {
          font-family: monospace;
          font-size: 18px;
          color: var(--accent);
          line-height: 1;
        }
        .about-node-label {
          font-family: monospace;
          font-size: 8.5px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .about-orbital-core {
          position: relative;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: linear-gradient(160deg, #1565C0, #0D1B4B);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          color: #fff;
          text-align: center;
          white-space: nowrap;
          box-shadow: 0 0 50px rgba(21,101,192,0.22), 0 10px 30px rgba(0,0,0,0.3), inset 0 2px 8px rgba(255,255,255,0.15);
          z-index: 2;
          transform: rotateX(-58deg) translateZ(50px);
          animation: about-coreFloat 4.5s ease-in-out infinite;
        }
        @keyframes about-coreFloat {
          0%, 100% { transform: rotateX(-58deg) translateZ(50px) translateY(0); }
          50%       { transform: rotateX(-58deg) translateZ(50px) translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-orbital-inner, .about-ring-1, .about-ring-2, .about-ring-3,
          .about-orbit-node, .about-orbital-core { animation: none; }
        }
      `}</style>
    </section>
  )
}

/* ── 3-D Orbital Diagram ────────────────────────────────── */
function OrbitalDiagram() {
  const innerRef = useRef(null)
  const n0 = useRef(null)
  const n1 = useRef(null)
  const n2 = useRef(null)

  useEffect(() => {
    // Each ring: radiusFrac = half its CSS width percentage (ring-1=62%→31%, etc.)
    const RINGS = [
      { ref: n0, radiusFrac: 0.31, period: 18000, dir: 1 },
      { ref: n1, radiusFrac: 0.41, period: 28000, dir: -1 },
      { ref: n2, radiusFrac: 0.50, period: 40000, dir: 1 },
    ]
    let raf
    const start = performance.now()

    function tick(now) {
      const el = innerRef.current
      if (!el) { raf = requestAnimationFrame(tick); return }
      const size = el.offsetWidth
      const elapsed = now - start

      RINGS.forEach(({ ref, radiusFrac, period, dir }) => {
        if (!ref.current) return
        const angle = dir * (elapsed / period) * Math.PI * 2
        const r = size * radiusFrac
        // Move in the tilted orbital plane via left/top (not transform)
        ref.current.style.left = `calc(50% + ${(Math.sin(angle) * r).toFixed(2)}px)`
        ref.current.style.top = `calc(50% + ${(-Math.cos(angle) * r).toFixed(2)}px)`
      })

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="about-orbital-stage">
      <div className="about-orbital-inner" ref={innerRef}>
        <div className="about-orbital-glow" />

        {/* Rings — decorative spinning circles only, no nodes inside */}
        <div className="about-orbit-ring about-ring-3" />
        <div className="about-orbit-ring about-ring-2" />
        <div className="about-orbit-ring about-ring-1" />

        {/* Nodes — siblings of rings, positioned by rAF, always face screen */}
        <div ref={n0} className="about-orbit-node">
          <span className="about-node-icon">&lt;/&gt;</span>
          <span className="about-node-label">QUALITY</span>
        </div>
        <div ref={n1} className="about-orbit-node">
          <span className="about-node-icon">◆</span>
          <span className="about-node-label">ENGINEERING</span>
        </div>
        <div ref={n2} className="about-orbit-node">
          <span className="about-node-icon">☁</span>
          <span className="about-node-label">ARCHITECTURE</span>
        </div>

        <div className="about-orbital-core">
          <span style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: '0.14em', color: '#4FC3F7', textShadow: '0 0 10px rgba(79,195,247,0.9), 0 0 24px rgba(79,195,247,0.5)' }}>ACCEMBERG</span>
          <span style={{ display: 'block', fontSize: 7.5, fontWeight: 600, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.55)', marginTop: 4, textShadow: '0 0 8px rgba(79,195,247,0.3)' }}>ECOSYSTEM</span>
        </div>
      </div>
    </div>
  )
}

