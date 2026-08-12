'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { Star } from 'lucide-react'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PARTNERS = [
  {
    name: 'IIIT Kottayam',
    role: 'Research & Incubation Partner',
    featured: true,
    desc: 'Collaborative enterprise engineering, academic research pathways, and system prototyping validation.',
    logo: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Academic temple — pillars + pediment */}
        <rect x="4" y="42" width="40" height="3" rx="1.5" fill="#1A8FFF" fillOpacity="0.35" />
        <rect x="8" y="37" width="32" height="5" rx="1" fill="rgba(26,143,255,0.18)" stroke="#1A8FFF" strokeWidth="1" />
        <rect x="13" y="21" width="5" height="16" rx="1.5" fill="#1A8FFF" fillOpacity="0.7" />
        <rect x="21.5" y="21" width="5" height="16" rx="1.5" fill="#1A8FFF" />
        <rect x="30" y="21" width="5" height="16" rx="1.5" fill="#1A8FFF" fillOpacity="0.7" />
        <path d="M6 21H42L24 7L6 21Z" fill="rgba(26,143,255,0.14)" stroke="#1A8FFF" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="24" cy="14" r="3" fill="#4DAAFF" />
      </svg>
    )
  },
  {
    name: 'Nexus Corp',
    role: 'Cloud Provider',
    featured: false,
    logo: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cloud with three hanging drops */}
        <path d="M34 27H15C11.13 27 8 23.87 8 20C8 16.55 10.47 13.67 13.77 13.07C15.06 9.55 18.36 7 22.25 7C25.79 7 28.85 8.96 30.5 11.87C31.07 11.72 31.67 11.64 32.29 11.64C36.52 11.64 40 15.12 40 19.36C40 24.16 34 27 34 27Z" fill="rgba(99,102,241,0.15)" stroke="#6366F1" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="17" y1="27" x2="17" y2="35" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="27" x2="25" y2="37" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="27" x2="33" y2="35" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="38" r="3" fill="#6366F1" />
        <circle cx="25" cy="40" r="3" fill="#8B5CF6" />
        <circle cx="33" cy="38" r="3" fill="#3B82F6" />
      </svg>
    )
  },
  {
    name: 'Delta Labs',
    role: 'Security Auditor',
    featured: false,
    logo: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shield with padlock */}
        <path d="M24 4L6 12V24C6 33.94 14.06 42.66 24 44C33.94 42.66 42 33.94 42 24V12L24 4Z" fill="url(#deltaShieldGrad)" stroke="#00F0FF" strokeWidth="1" strokeOpacity="0.35" strokeLinejoin="round" />
        <rect x="17" y="23" width="14" height="11" rx="2.5" fill="#00F0FF" fillOpacity="0.9" />
        <path d="M20 23V19C20 16.79 21.79 15 24 15C26.21 15 28 16.79 28 19V23" stroke="#00F0FF" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="24" cy="28.5" r="2" fill="#0D1318" />
        <line x1="24" y1="28.5" x2="24" y2="31" stroke="#0D1318" strokeWidth="1.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="deltaShieldGrad" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="rgba(0,240,255,0.2)" />
            <stop offset="1" stopColor="rgba(0,128,255,0.08)" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: 'Vertex Systems',
    role: 'Integration Partner',
    featured: false,
    logo: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Triangle of connected nodes */}
        <circle cx="24" cy="10" r="5" fill="#F59E0B" />
        <circle cx="10" cy="36" r="5" fill="#F59E0B" fillOpacity="0.65" />
        <circle cx="38" cy="36" r="5" fill="#F59E0B" fillOpacity="0.65" />
        <line x1="24" y1="15" x2="11" y2="31" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round" />
        <line x1="24" y1="15" x2="37" y2="31" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round" />
        <line x1="15" y1="36" x2="33" y2="36" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round" />
      </svg>
    )
  },
  {
    name: 'Nova Research',
    role: 'Data Intelligence',
    featured: false,
    logo: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Rising bar chart with trend line */}
        <rect x="6" y="30" width="8" height="13" rx="2" fill="url(#novaBar1)" />
        <rect x="20" y="20" width="8" height="23" rx="2" fill="url(#novaBar2)" />
        <rect x="34" y="10" width="8" height="33" rx="2" fill="url(#novaBar3)" />
        <path d="M10 28L24 18L38 8" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="28" r="2.5" fill="#8B5CF6" />
        <circle cx="24" cy="18" r="2.5" fill="#A855F7" />
        <circle cx="38" cy="8" r="2.5" fill="#EC4899" />
        <defs>
          <linearGradient id="novaBar1" x1="10" y1="30" x2="10" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8B5CF6" />
            <stop offset="1" stopColor="rgba(139,92,246,0.2)" />
          </linearGradient>
          <linearGradient id="novaBar2" x1="24" y1="20" x2="24" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#A855F7" />
            <stop offset="1" stopColor="rgba(168,85,247,0.2)" />
          </linearGradient>
          <linearGradient id="novaBar3" x1="38" y1="10" x2="38" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EC4899" />
            <stop offset="1" stopColor="rgba(236,72,153,0.2)" />
          </linearGradient>
        </defs>
      </svg>
    )
  },
  {
    name: 'Stark Systems',
    role: 'Hardware & Telemetry',
    featured: false,
    logo: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Circuit chip with pins */}
        <rect x="15" y="15" width="18" height="18" rx="4" fill="rgba(239,68,68,0.12)" stroke="#EF4444" strokeWidth="1.5" />
        <rect x="20" y="20" width="8" height="8" rx="1.5" fill="#EF4444" fillOpacity="0.25" />
        <circle cx="24" cy="24" r="2.5" fill="#EF4444" />
        <line x1="7" y1="20" x2="15" y2="20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="28" x2="15" y2="28" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="20" x2="41" y2="20" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="33" y1="28" x2="41" y2="28" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="7" x2="20" y2="15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="7" x2="28" y2="15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="20" y1="33" x2="20" y2="41" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <line x1="28" y1="33" x2="28" y2="41" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
]

export default function Partners() {
  const { theme } = useTheme()
  const sectionRef = useRef(null)
  const [data, setData] = useState(PARTNERS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/partners`
      : 'http://localhost:5000/api/partners'

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success && resJson.data && resJson.data.length > 0) {
          const mapped = resJson.data.map((p) => {
            const isIIT = p.name === 'IIIT Kottayam'
            const staticPartner = PARTNERS.find(sp => sp.name.toLowerCase() === p.name.toLowerCase())
            return {
              id: p.id,
              name: p.name,
              website: p.website,
              logoUrl: p.logoUrl,
              featured: isIIT,
              role: isIIT ? 'Research & Incubation Partner' : 'System Alliance Partner',
              desc: isIIT ? 'Collaborative enterprise engineering, academic research pathways, and system prototyping validation.' : 'Enterprise-grade system integration and technological collaboration.',
              logo: staticPartner ? staticPartner.logo : null
            }
          })
          setData(mapped)
        }
      })
      .catch(() => { })
  }, [])

  useEffect(() => {
    if (loading || data.length === 0) return
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Reveal the Header
      gsap.fromTo(el.querySelectorAll('.reveal-gsap-header'), 
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Staggered reveal for partner tiles
      gsap.fromTo(el.querySelectorAll('.partner-tile'), 
        {
          opacity: 0,
          y: 40
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: el.querySelector('.partners-grid') || el,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [loading, data])

  const overrideVars = theme === 'dark' ? {
    background: 'linear-gradient(180deg, #0A0F1E 0%, #08173B 50%, #0A0F1E 100%)',
    color: '#E8EDF8',
    '--bg-base': '#08173B',
    '--text-primary': '#E8EDF8',
    '--text-secondary': '#B4C3E6',
    '--text-muted': '#7A8CAE',
    '--border': 'rgba(79, 195, 247, 0.22)',
    '--border-strong': 'rgba(79, 195, 247, 0.45)',
    '--bg-card': '#0E1F55',
    '--accent': '#4FC3F7',
    '--accent-light': '#80D8FF',
    '--accent-dim': 'rgba(79, 195, 247, 0.12)',
    '--bg-elevated': '#122566',
  } : {
    background: 'radial-gradient(circle at 50% 50%, #FFFFFF 30%, #EEF4FF 100%)',
    color: '#0F172A',
    '--bg-base': '#FFFFFF',
    '--text-primary': '#0F172A',
    '--text-secondary': '#475569',
    '--text-muted': '#64748B',
    '--border': 'rgba(21, 101, 192, 0.10)',
    '--border-strong': 'rgba(21, 101, 192, 0.28)',
    '--bg-card': '#FFFFFF',
    '--accent': '#1565C0',
    '--accent-light': '#1E88E5',
    '--accent-dim': 'rgba(21, 101, 192, 0.06)',
    '--bg-elevated': '#FFFFFF',
  }



  return (
    <section
      id="partners"
      ref={sectionRef}
      style={{
        ...overrideVars,
        position: 'relative',
        overflow: 'hidden',
        borderTop: 'none',
        paddingTop: '120px',
        paddingBottom: '80px',
        transition: 'background-color 400ms, color 400ms'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 48, maxWidth: 600 }} className="reveal-gsap-header">
          <div className="section-label">
            <ScrambleText text="Strategic Alliances" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 12 }}>
            <FastScroll><span style={{ display: 'inline-block' }}>Trusted Ecosystem</span></FastScroll>
            <br />
            <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Partners</span></FastScroll>
          </h2>
          <p className="text-body-lg">
            We collaborate with premier academic institutes and enterprise tech providers to deliver validated, high-integrity solutions.
          </p>
        </div>

        {/* Partners Wall Grid */}
        <div className="partners-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {data.map((partner, i) => (
            <div
              key={partner.name}
              className="partner-tile"
              style={{
                background: 'var(--bg-card)',
                border: partner.featured
                  ? '1px solid var(--accent)'
                  : '1px solid var(--border)',
                borderRadius: 20,
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
                gridColumn: partner.featured ? 'span 2' : 'span 1',
                boxShadow: partner.featured
                  ? (theme === 'dark' ? '0 10px 25px -5px rgba(79,195,247,0.15)' : '0 10px 25px -5px rgba(21,101,192,0.08)')
                  : '0 8px 24px -10px rgba(0,0,0,0.02)',
                transition: 'all 300ms var(--ease-out-quart)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-strong)'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = partner.featured
                  ? (theme === 'dark' ? '0 15px 30px -5px rgba(79,195,247,0.3)' : '0 15px 30px -5px rgba(21,101,192,0.15)')
                  : (theme === 'dark' ? '0 15px 30px -10px rgba(21,101,192,0.18)' : '0 15px 30px -10px rgba(21,101,192,0.06)')
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = partner.featured ? 'var(--accent)' : 'var(--border)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = partner.featured
                  ? (theme === 'dark' ? '0 10px 25px -5px rgba(79,195,247,0.15)' : '0 10px 25px -5px rgba(21,101,192,0.08)')
                  : '0 8px 24px -10px rgba(0,0,0,0.02)'
              }}
            >
              <div>
                {/* Top header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: partner.featured ? 'var(--accent)' : 'var(--text-muted)'
                  }}>
                    {partner.role}
                  </span>
                  {partner.featured && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 100, background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)' }}>
                      <Star size={11} fill="var(--accent)" stroke="none" />
                      <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-accent)' }}>Academic Hub</span>
                    </div>
                  )}
                </div>

                {/* Logo and Name row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: partner.featured ? 12 : 4 }}>
                  <div style={{
                    padding: 8,
                    borderRadius: 10,
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'border-color 300ms',
                    width: 52,
                    height: 52,
                  }}>
                    {partner.logoUrl ? (
                      <img src={partner.logoUrl} alt={partner.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : partner.logo}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                    fontSize: partner.featured ? 22 : 17,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    margin: 0
                  }}>
                    {partner.name}
                  </h3>
                </div>

                {partner.featured && (
                  <p className="text-body" style={{ fontSize: 13.5, maxWidth: 440, marginTop: 8 }}>
                    {partner.desc}
                  </p>
                )}
              </div>

              {/* Aesthetic indicator */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', opacity: 0.4, marginTop: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-muted)' }}>Verified System Alliance</span>
              </div>

            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .partners-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .partner-tile {
            grid-column: span 1 !important;
          }
        }
        @media (max-width: 580px) {
          .partners-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .partner-tile {
            grid-column: span 1 !important;
            padding: 18px !important;
          }
          .partner-tile h3 {
            font-size: 15px !important;
          }
        }
      `}</style>
    </section>
  )
}
