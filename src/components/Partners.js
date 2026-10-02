'use client'

import { useState, useRef, useEffect } from 'react'
import { useTheme } from '@/components/ThemeProvider'
import { Star } from 'lucide-react'
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
    tag: 'Academic Hub',
    desc: 'Collaborative enterprise engineering, academic research pathways, and system prototyping validation.',
    logo: (
      <img
        src="/partners/iiitk.png"
        alt="IIIT Kottayam Logo"
        width="60"
        height="40"
        style={{ objectFit: 'contain', borderRadius: '4px' }}
      />
    )
  },
  {
    name: 'SRM DEI',
    role: 'Innovation & Entrepreneurship Partner',
    featured: true,
    tag: 'Innovation Hub',
    desc: 'Driving student entrepreneurship, joint technology initiatives, and startup incubation programs.',
    logo: (
      <img
        src="/partners/srm.png"
        alt="SRM DEI Logo"
        width="60"
        height="40"
        style={{ objectFit: 'contain', borderRadius: '4px', background: '#fff', padding: '2px' }}
      />
    )
  }
]

export default function Partners() {
  const { theme } = useTheme()
  const sectionRef = useRef(null)
  const [data, setData] = useState(PARTNERS)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // const url = process.env.NEXT_PUBLIC_API_URL
    //   ? `${process.env.NEXT_PUBLIC_API_URL}/partners`
    //   : 'http://localhost:5000/api/partners'
    //
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((resJson) => {
    //     if (resJson.success && resJson.data && resJson.data.length > 0) {
    //       const mapped = resJson.data.map((p) => {
    //         const isFeatured = p.name === 'IIIT Kottayam' || p.name === 'SRM DEI'
    //         const staticPartner = PARTNERS.find(sp => sp.name.toLowerCase() === p.name.toLowerCase())
    //         return {
    //           id: p.id,
    //           name: p.name,
    //           website: p.website,
    //           logoUrl: p.logoUrl,
    //           featured: isFeatured,
    //           role: isFeatured ? 'Research & Incubation Partner' : 'System Alliance Partner',
    //           desc: isFeatured ? 'Collaborative enterprise engineering, academic research pathways, and system prototyping validation.' : 'Enterprise-grade system integration and technological collaboration.',
    //           logo: staticPartner ? staticPartner.logo : null
    //         }
    //       })
    //       setData(mapped)
    //     }
    //   })
    //   .catch(() => { })
  }, [])

  useEffect(() => {
    if (loading || data.length === 0) return
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      
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
        
        <div style={{ marginBottom: 48, maxWidth: 600 }} className="reveal-gsap-header">
          <div className="section-label">
            <ScrambleText text="Strategic Alliances" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 12 }}>
            <span style={{ display: 'inline-block' }}>Trusted Ecosystem</span>
            <br />
            <span style={{ display: 'inline-block', color: 'var(--accent)' }}>Partners</span>
          </h2>
          <p className="text-body-lg">
            We collaborate with academic institutions to deliver validated, high-integrity solutions.
          </p>
        </div>

        
        <div className="partners-grid" style={{ display: 'grid', gridTemplateColumns: data.length === 1 ? '1fr' : (data.length === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'), gap: 20, maxWidth: data.length === 1 ? 480 : (data.length === 2 ? 960 : 'none'), margin: '0 auto' }}>
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
                gridColumn: (data.length <= 2) ? 'span 1' : (partner.featured ? 'span 2' : 'span 1'),
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
                      <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-accent)' }}>{partner.tag || 'Academic Hub'}</span>
                    </div>
                  )}
                </div>

                
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
                    height: 52,
                    width: 'auto',
                    minWidth: 52,
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
