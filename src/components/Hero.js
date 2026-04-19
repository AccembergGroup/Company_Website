'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const TICKER_ITEMS = [
  'Full-Stack Development',
  'System Architecture',
  'SaaS Products',
  'Cloud Infrastructure',
  'AI/ML Integration',
  'Technical Consulting',
  'QA & Deployment',
  'Enterprise Software',
]

export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // Tag reveal
    tl.from('.hero-tag', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      ease: 'power3.out',
    })

    // Headline lines reveal
    tl.from('.hero-line', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    }, '-=0.3')

    // Sub & CTAs
    tl.from('.hero-sub', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')

    tl.from('.hero-cta-group', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')

    tl.from('.hero-meta', {
      opacity: 0,
      y: 16,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.2')

  }, { scope: containerRef })

  // Duplicate ticker items for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 100,
        paddingBottom: 80,
        overflow: 'hidden',
      }}
    >
      {/* Dot grid bg */}
      <div className="dot-grid" />

      {/* Radial glow — bottom-left */}
      <div
        className="glow-spot"
        style={{
          width: 700,
          height: 700,
          left: '-10%',
          bottom: '-10%',
          background: 'radial-gradient(ellipse, rgba(26,143,255,0.10) 0%, transparent 65%)',
          filter: 'none',
        }}
      />

      {/* Radial glow — top-right */}
      <div
        className="glow-spot"
        style={{
          width: 500,
          height: 500,
          right: '5%',
          top: '10%',
          background: 'radial-gradient(ellipse, rgba(26,143,255,0.06) 0%, transparent 65%)',
          filter: 'none',
        }}
      />

      {/* Main content */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: 900 }}>

          {/* Tag chip */}
          <div className="hero-tag" style={{ marginBottom: 28 }}>
            <span className="tag">
              <span style={{ fontSize: 12 }}>⭐</span>
              Empowering Innovation for Enterprise IT
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-hero"
            style={{ marginBottom: 28, overflow: 'visible' }}
          >
            <span
              className="hero-line"
              style={{ display: 'block' }}
            >
              We Engineer Systems
            </span>
            <span
              className="hero-line"
              style={{
                display: 'block',
                color: 'var(--accent)',
              }}
            >
              Built to Scale.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-body-lg hero-sub"
            style={{
              maxWidth: 560,
              marginBottom: 44,
              color: 'var(--text-secondary)',
            }}
          >
            Accemberg is a hybrid venture studio — delivering enterprise-grade software,
            launching high-velocity SaaS products, and building the infrastructure
            for continuous, compounding innovation.
          </p>

          {/* CTAs */}
          <div
            className="hero-cta-group"
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 72 }}
          >
            <a href="#contact" className="btn btn-primary">
              Start a Project
              <ArrowRight />
            </a>
            <a href="#projects" className="btn btn-outline">
              Explore Our Work
            </a>
          </div>

          {/* Meta row */}
          <div
            className="hero-meta"
            style={{
              display: 'flex',
              gap: 40,
              flexWrap: 'wrap',
            }}
          >
            {[
              { num: '50+',  label: 'Clients Served' },
              { num: '120+', label: 'Projects Delivered' },
              { num: '98%',  label: 'Client Retention' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: 26,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {item.num}
                </span>
                <span className="text-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker strip */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: '1px solid var(--border-subtle)',
          height: 48,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(7,11,16,0.6)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div className="marquee-track">
          {tickerItems.map((item, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 20,
                paddingRight: 40,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
              <span style={{ color: 'var(--accent)', opacity: 0.5 }}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
