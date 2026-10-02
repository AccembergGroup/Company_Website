'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, ArrowLeft, ArrowRight, User } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ScrambleText from './ScrambleText'
import Magnetic from './Magnetic'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Testimonials() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    
    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/testimonials`
      : 'http://localhost:5000/api/testimonials'

    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success && resJson.data && resJson.data.length > 0) {
          setData(resJson.data)
        } else {
          setData([])
        }
      })
      .catch(() => {
        setData([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || data.length === 0) return
    const el = ref.current
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

      
      gsap.from(el.querySelectorAll('.reveal-gsap-card'), {
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [loading, data])

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % data.length)
  }

  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + data.length) % data.length)
  }

  const current = data[activeIdx]

  if (loading || !current) {
    return null
  }

  const overrideVars = theme === 'dark' ? {
    background: 'linear-gradient(180deg, #0A0F1E 0%, #08173B 50%, #0A0F1E 100%)',
    color: '#E8EDF8',
    '--bg-base': '#08173B',
    '--text-primary': '#E8EDF8',
    '--text-secondary': '#A0AED0',
    '--text-muted': '#6C7CA0',
    '--border': 'rgba(79, 195, 247, 0.1)',
    '--border-strong': 'rgba(79, 195, 247, 0.25)',
    '--bg-card': 'rgba(9, 21, 56, 0.7)',
    '--accent': '#4FC3F7',
    '--accent-light': '#80D8FF',
    '--accent-dim': 'rgba(79, 195, 247, 0.12)',
    '--bg-elevated': '#0D1B4B',
  } : {
    background: 'linear-gradient(180deg, #F5F7FF 0%, #E8F1FF 50%, #F5F7FF 100%)',
    color: '#101828',
    '--bg-base': '#F5F7FF',
    '--text-primary': '#101828',
    '--text-secondary': '#475467',
    '--text-muted': '#667085',
    '--border': 'rgba(21, 101, 192, 0.12)',
    '--border-strong': 'rgba(21, 101, 192, 0.28)',
    '--bg-card': '#FFFFFF',
    '--accent': '#1565C0',
    '--accent-light': '#1E88E5',
    '--accent-dim': 'rgba(21, 101, 192, 0.08)',
    '--bg-elevated': '#EFF1FA',
  }

  return (
    <section id="testimonials" className="section" ref={ref}
      style={{ ...overrideVars, position: 'relative', overflow: 'hidden', borderTop: 'none', transition: 'background-color 400ms, color 400ms' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'center',
        }} className="testimonials-grid">

          
          <div className="reveal-gsap-header">
            <div className="section-label">
              <ScrambleText text="Client Reviews" speed={30} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 16 }}>
              <span style={{ display: 'inline-block' }}>What Partners say</span>
              <br />
              <span style={{ display: 'inline-block', color: 'var(--accent)' }}>About Accemberg</span>
            </h2>
            <p className="text-body-lg" style={{ marginBottom: 32 }}>
              Hear from startup founders, engineering VPs, and corporate tech leaders who partnered with us to launch systems.
            </p>

            
            <div className="testimonials-slider-buttons" style={{ display: 'flex', gap: 10 }}>
              <Magnetic>
                <button
                  onClick={prevSlide}
                  aria-label="Previous review"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    transition: 'all 200ms',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  suppressHydrationWarning
                >
                  <ArrowLeft size={16} />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={nextSlide}
                  aria-label="Next review"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    transition: 'all 200ms',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  suppressHydrationWarning
                >
                  <ArrowRight size={16} />
                </button>
              </Magnetic>
            </div>
          </div>

          
          <div className="reveal-gsap-card">
            <div
              className="testimonials-slider-card"
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--border)',
                borderRadius: 20,
                padding: 'clamp(28px, 4vw, 48px)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                boxShadow: theme === 'dark'
                  ? '0 20px 40px -15px rgba(21,101,192,0.22)'
                  : '0 20px 40px -15px rgba(21,101,192,0.08)',
                minHeight: 280,
                justifyContent: 'center',
                transition: 'transform 300ms, border-color 300ms, box-shadow 300ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = 'var(--border-strong)'
                e.currentTarget.style.boxShadow = theme === 'dark'
                  ? '0 25px 50px -12px rgba(21,101,192,0.3)'
                  : '0 25px 50px -12px rgba(21,101,192,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.boxShadow = theme === 'dark'
                  ? '0 20px 40px -15px rgba(21,101,192,0.22)'
                  : '0 20px 40px -15px rgba(21,101,192,0.08)'
              }}
            >
              
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < current.rating ? 'var(--accent)' : 'none'}
                    stroke={i < current.rating ? 'var(--accent)' : 'var(--text-muted)'}
                  />
                ))}
              </div>

              
              <blockquote
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(16px, 1.3vw, 20px)',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                  lineHeight: 1.6,
                  letterSpacing: '-0.01em',
                  margin: 0,
                }}
              >
                &quot;{current.review}&quot;
              </blockquote>

              
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                
                <div style={{ position: 'relative', width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                  {current.avatar ? (
                    <img
                      src={current.avatar}
                      alt={current.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                      <User size={18} />
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{current.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {current.role} at <strong style={{ color: 'var(--accent)' }}>{current.company}</strong>
                  </div>
                </div>
              </div>

            </div>

            
            <div className="mobile-testimonials-list">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="testimonial-mobile-card"
                  style={{
                    background: 'var(--bg-card)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    boxShadow: theme === 'dark'
                      ? '0 10px 30px -10px rgba(21,101,192,0.15)'
                      : '0 10px 30px -10px rgba(21,101,192,0.05)',
                    transition: 'transform 300ms, border-color 300ms, box-shadow 300ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)'
                    e.currentTarget.style.borderColor = 'var(--border-strong)'
                    e.currentTarget.style.boxShadow = theme === 'dark'
                      ? '0 20px 40px -15px rgba(21,101,192,0.25)'
                      : '0 20px 40px -15px rgba(21,101,192,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = theme === 'dark'
                      ? '0 10px 30px -10px rgba(21,101,192,0.15)'
                      : '0 10px 30px -10px rgba(21,101,192,0.05)'
                  }}
                >
                  
                  <div style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < item.rating ? 'var(--accent)' : 'none'}
                        stroke={i < item.rating ? 'var(--accent)' : 'var(--text-muted)'}
                      />
                    ))}
                  </div>

                  
                  <blockquote
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '15px',
                      fontWeight: 400,
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    &quot;{item.review}&quot;
                  </blockquote>

                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                    <div style={{ position: 'relative', width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
                          <User size={14} />
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                        {item.role} at <strong style={{ color: 'var(--accent)' }}>{item.company}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      <style>{`
        .mobile-testimonials-list {
          display: none;
        }

        @media (max-width: 900px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        /* Mobile: same slider as desktop, stacked 1 column */
        @media (max-width: 600px) {
          .testimonials-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          /* Keep slider card + buttons — same as desktop */
          .testimonials-slider-card {
            min-height: 220px !important;
          }
          /* Hide the expanded list — use slider only */
          .mobile-testimonials-list {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
