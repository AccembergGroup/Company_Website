'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// ── Premium word pairs — flip UP then DOWN alternately ───
// Sentence reads: "[Word1] becomes [Word2]."
const WORD_PAIRS = [
  ['Strategy',  'Software'],
  ['Vision',    'Product'],
  ['Ambition',  'Platform'],
]

// ── Social proof items — cycle highlight synced with flip words ─
const PROOF_ITEMS = [
  '50+ Clients',
  '120+ Projects',
  '3 Growth Engines',
  '6 Service Verticals',
]

export default function Hero() {
  const containerRef = useRef(null)

  // ── Single tick drives BOTH flip words + proof highlight ─
  const [tick,       setTick]       = useState(0)
  const [word1State, setWord1State] = useState('idle') // idle | exit | enter
  const [word2State, setWord2State] = useState('idle')

  const pairIdx  = tick % WORD_PAIRS.length
  const proofIdx = tick % PROOF_ITEMS.length

  // ── GSAP entrance animation ─────────────────────────────
  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.15 })
    tl.from('.hero-proof-row',   { opacity: 0, y: 14, duration: 0.55, ease: 'power3.out' })
      .from('.hero-h1-line',     { opacity: 0, y: 36, duration: 0.75, stagger: 0.09, ease: 'power3.out' }, '-=0.25')
      .from('.hero-subtitle',    { opacity: 0, y: 22, duration: 0.55, ease: 'power3.out' }, '-=0.3')
      .from('.hero-cta-row',     { opacity: 0, y: 18, duration: 0.5,  ease: 'power3.out' }, '-=0.25')
      .from('.hero-card-preview',{ opacity: 0, y: 30, scale: 0.97, duration: 0.7, ease: 'power3.out' }, '-=0.3')
  }, { scope: containerRef })

  // ── 3-second master cycle — flip words + proof pill ─────
  useEffect(() => {
    const interval = setInterval(() => {
      // Exit both flip words simultaneously
      setWord1State('exit')
      setWord2State('exit')

      setTimeout(() => {
        // Advance tick → updates pairIdx AND proofIdx atomically
        setTick((t) => t + 1)
        setWord1State('enter')
        setWord2State('enter')
      }, 380)

      setTimeout(() => {
        setWord1State('idle')
        setWord2State('idle')
      }, 800)
    }, 3000)
    return () => clearInterval(interval)
  }, []) // no deps — tick is read via setTick callback

  const [w1, w2] = WORD_PAIRS[pairIdx]

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(80px, 12vw, 120px)',
        paddingBottom: 0,
        textAlign: 'center',
      }}
    >
      {/* ── Cinematic BG image ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.7,
        }}
      />

      {/* ── Gradient overlays for readability ───────────── */}
      {/* Top fade — so navbar area is darker */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(7,11,16,0.80) 0%, rgba(7,11,16,0.30) 35%, rgba(7,11,16,0.10) 55%, rgba(7,11,16,0.65) 80%, rgba(7,11,16,1) 100%)',
      }} />

      {/* Blue atmospheric glow center */}
      <div style={{
        position: 'absolute',
        top: '40%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70vw', height: '50vh',
        background: 'radial-gradient(ellipse, rgba(26,143,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(40px)',
      }} />

      {/* ── Content ─────────────────────────────────────── */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Social proof pill row — active item cycles with flip words */}
        <div
          className="hero-proof-row"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '5px 6px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 100,
            backdropFilter: 'blur(12px)',
            marginBottom: 40,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {PROOF_ITEMS.map((item, i) => {
            const isActive = i === proofIdx
            return (
              <span
                key={item}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '5px 14px',
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.03em',
                  color: isActive ? 'var(--accent-light)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(26,143,255,0.12)' : 'transparent',
                  border: isActive
                    ? '1px solid rgba(26,143,255,0.22)'
                    : '1px solid transparent',
                  boxShadow: isActive ? '0 0 12px rgba(26,143,255,0.15)' : 'none',
                  transition: 'color 400ms, background 400ms, border-color 400ms, box-shadow 400ms, font-weight 200ms',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
            )
          })}
        </div>

        {/* ── Headline with flip animation ───────────────── */}
        <h1
          style={{
            marginBottom: 28,
            lineHeight: 1.06,
            letterSpacing: '-0.035em',
            overflow: 'visible',
          }}
        >
          {/* Line 1: static */}
          <div
            className="hero-h1-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(46px, 7vw, 94px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'block',
              marginBottom: 4,
            }}
          >
            From concept
          </div>

          {/* Line 2: two flip words + static connector */}
          <div
            className="hero-h1-line hero-flip-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(12px, 2vw, 24px)',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(46px, 7vw, 94px)',
              fontWeight: 700,
              perspective: 600,
              perspectiveOrigin: 'center',
            }}
          >
            {/* Flip word 1 — exits UP, enters from top */}
            <FlipWord
              word={w1}
              state={word1State}
              direction="up"
              color="var(--text-primary)"
            />

            <span style={{ color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.7em', opacity: 0.55 }}>
              to
            </span>

            {/* Flip word 2 — exits DOWN, enters from bottom */}
            <FlipWord
              word={w2}
              state={word2State}
              direction="down"
              color="var(--accent)"
            />
          </div>

          {/* Line 3: static suffix */}
          <div
            className="hero-h1-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(46px, 7vw, 94px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              display: 'block',
              marginTop: 4,
            }}
          >
            — with precision.
          </div>
        </h1>

        {/* Subtitle */}
        <p
          className="hero-subtitle"
          style={{
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            lineHeight: 1.75,
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto 44px',
          }}
        >
          Accemberg is a hybrid venture studio — where client-grade engineering discipline
          meets product-company ambition. We build software that compounds.
        </p>

        {/* CTAs */}
        <div
          className="hero-cta-row"
          style={{
            display: 'flex',
            gap: 14,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 72,
          }}
        >
          <a href="#contact" className="btn btn-primary">
            Start a Project
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
              <path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#projects" className="btn btn-outline">
            Explore Our Work
          </a>
        </div>

        {/* ── Floating preview card ─────────────────────── */}
        <div
          className="hero-card-preview"
          style={{
            position: 'relative',
            maxWidth: 780,
            margin: '0 auto',
            borderRadius: '12px 12px 0 0',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            borderBottom: 'none',
            boxShadow: '0 -20px 80px rgba(26,143,255,0.08), 0 -4px 20px rgba(0,0,0,0.6)',
          }}
        >
          {/* Card chrome header */}
          <div
            style={{
              background: 'rgba(13,19,24,0.9)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {/* Traffic light dots */}
            <div style={{ display: 'flex', gap: 6 }}>
              {['#FF5F56', '#FFBD2E', '#27C93F'].map((c) => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.7 }} />
              ))}
            </div>
            <div style={{
              flex: 1,
              height: 22,
              background: 'rgba(255,255,255,0.04)',
              borderRadius: 4,
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                accemberg.com/dashboard
              </span>
            </div>
          </div>

          {/* Faux dashboard UI */}
          <div style={{
            background: 'rgba(7,11,16,0.96)',
            backdropFilter: 'blur(20px)',
            padding: '24px',
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: 16,
            minHeight: 200,
          }} className="preview-grid">
            {/* Sidebar */}
            <div style={{ borderRight: '1px solid rgba(255,255,255,0.05)', paddingRight: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['System Overview', 'Active Projects', 'Deployments', 'Team Velocity', 'Analytics'].map((item, i) => (
                  <div key={item} style={{
                    padding: '8px 10px',
                    borderRadius: 4,
                    fontSize: 12,
                    color: i === 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: i === 0 ? 'rgba(26,143,255,0.10)' : 'transparent',
                    border: i === 0 ? '1px solid rgba(26,143,255,0.15)' : '1px solid transparent',
                    textAlign: 'left',
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { label: 'Projects Live',   value: '24',   delta: '+3 this month' },
                { label: 'System Uptime',   value: '99.9%', delta: '30-day avg' },
                { label: 'Team Velocity',   value: '94pt',  delta: 'Sprint avg' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 6,
                  padding: '14px 14px',
                }}>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>{stat.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent)', letterSpacing: '-0.02em' }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{stat.delta}</div>
                </div>
              ))}
              {/* Sparkline placeholder */}
              <div style={{
                gridColumn: '1 / -1',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 6,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <svg width="100%" height="40" viewBox="0 0 400 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1A8FFF" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#1A8FFF" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,35 C40,30 60,20 100,18 S160,8 200,10 S280,22 320,15 S380,5 400,8" stroke="#1A8FFF" strokeWidth="1.5" fill="none" opacity="0.8"/>
                  <path d="M0,35 C40,30 60,20 100,18 S160,8 200,10 S280,22 320,15 S380,5 400,8 L400,40 L0,40Z" fill="url(#sparkGrad)"/>
                </svg>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Delivery velocity · Last 12 months</span>
              </div>
            </div>
          </div>

          {/* Bottom gradient fade — suggests more content below */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
            background: 'linear-gradient(to top, rgba(7,11,16,1) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Flip animation styles */}
      <style>{`
        .flip-word-inner {
          display: inline-block;
          transform-origin: center;
        }
        /* Word 1: exits UP (rotateX positive), enters from top (negative) */
        .flip-up-exit  { animation: flipUpExit  0.38s cubic-bezier(0.4,0,1,1) forwards; }
        .flip-up-enter { animation: flipUpEnter 0.38s cubic-bezier(0,0,0.6,1) forwards; }
        /* Word 2: exits DOWN (rotateX negative), enters from bottom */
        .flip-dn-exit  { animation: flipDnExit  0.38s cubic-bezier(0.4,0,1,1) forwards; }
        .flip-dn-enter { animation: flipDnEnter 0.38s cubic-bezier(0,0,0.6,1) forwards; }

        @keyframes flipUpExit  { to   { transform: perspective(500px) rotateX(80deg);  opacity: 0; } }
        @keyframes flipUpEnter { from { transform: perspective(500px) rotateX(-80deg); opacity: 0; } to { transform: rotateX(0deg); opacity: 1; } }
        @keyframes flipDnExit  { to   { transform: perspective(500px) rotateX(-80deg); opacity: 0; } }
        @keyframes flipDnEnter { from { transform: perspective(500px) rotateX(80deg);  opacity: 0; } to { transform: rotateX(0deg); opacity: 1; } }

        /* ── Mobile: override headline font so flip-word row fits ── */
        @media (max-width: 640px) {
          .hero-h1-line   { font-size: clamp(26px, 7.5vw, 46px) !important; }
          .hero-flip-row  { gap: 8px !important; }
          .hero-proof-row { margin-bottom: 28px !important; }
        }
        @media (max-width: 400px) {
          .hero-h1-line   { font-size: clamp(22px, 6.8vw, 28px) !important; }
        }
        /* Dashboard preview */
        @media (max-width: 720px) {
          .preview-grid { grid-template-columns: 1fr !important; }
          .preview-grid > div:first-child { display: none; }
        }
        @media (max-width: 560px) {
          .hero-card-preview { display: none; }
        }
      `}</style>
    </section>
  )
}

/* ── Flip Word component ──────────────────────────────────── */
function FlipWord({ word, state, direction, color }) {
  const exitClass  = direction === 'up' ? 'flip-up-exit'  : 'flip-dn-exit'
  const enterClass = direction === 'up' ? 'flip-up-enter' : 'flip-dn-enter'

  const animClass =
    state === 'exit'  ? exitClass  :
    state === 'enter' ? enterClass : ''

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <span
        key={word}
        className={`flip-word-inner ${animClass}`}
        style={{
          color,
          display: 'inline-block',
        }}
      >
        {word}
      </span>
    </span>
  )
}
