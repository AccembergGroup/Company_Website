'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ScrambleText from './ScrambleText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const FALLBACK_FAQS = [
  {
    id: 'fallback-faq-1',
    question: 'What is Accemberg?',
    answer: 'Accemberg is a premium enterprise software firm specializing in studio-grade web systems and rapid SaaS builds.',
    order: 1,
    isActive: true
  },
  {
    id: 'fallback-faq-2',
    question: 'How do you ensure 60 FPS performance?',
    answer: 'We utilize hardware-accelerated layouts, custom cursor physical elasticity maps, and bypass global React rendering contexts.',
    order: 2,
    isActive: true
  },
  {
    id: 'fallback-faq-3',
    question: 'Do you offer custom SLA agreements?',
    answer: 'Yes, we provide 24/7 dedicated support and custom SLAs for premium enterprise clients.',
    order: 3,
    isActive: true
  },
  {
    id: 'fallback-faq-4',
    question: 'What is your typical project timeline?',
    answer: 'For rapid SaaS builds, we usually deliver a production-ready MVP in 4 to 6 weeks. Larger enterprise platforms and database migrations typically range from 3 to 6 months, depending on scope and regulatory compliance.',
    order: 4,
    isActive: true
  },
  {
    id: 'fallback-faq-5',
    question: 'How do you handle post-launch maintenance?',
    answer: 'We offer flexible post-launch support agreements (SLAs) ranging from routine security updates and database maintenance to 24/7 active infrastructure monitoring and hot-fix support.',
    order: 5,
    isActive: true
  },
  {
    id: 'fallback-faq-6',
    question: 'Which engagement models do you support?',
    answer: 'We support both Time & Materials (sprint-based engineering pods) and Fixed-Scope contracts. Most clients begin with a brief Discovery phase to align on specifications before selecting an engagement model.',
    order: 6,
    isActive: true
  }
]

export default function Faqs() {
  const { theme } = useTheme()
  const ref = useRef(null)
  const [faqs, setFaqs] = useState(FALLBACK_FAQS)
  const [loading, setLoading] = useState(false)
  const [openIdx, setOpenIdx] = useState(null)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_API_URL) return

    const url = `${process.env.NEXT_PUBLIC_API_URL}/faqs`
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success && resJson.data && resJson.data.length > 0) {
          setFaqs(resJson.data)
        } else {
          setFaqs(FALLBACK_FAQS)
        }
      })
      .catch(() => {
        setFaqs(FALLBACK_FAQS)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || faqs.length === 0) return
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      const headers = el.querySelectorAll('.reveal-gsap-header')
      if (headers.length > 0) {
        gsap.fromTo(headers, 
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
      }

      
      const rows = el.querySelectorAll('.faq-row')
      if (rows.length > 0) {
        gsap.from(rows, {
          scrollTrigger: {
            trigger: el.querySelector('.faq-rows-container') || el,
            start: 'top 75%',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        })
      }
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [loading, faqs])

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

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
    background: '#F8FAFC',
    color: '#0F172A',
    '--bg-base': '#F8FAFC',
    '--text-primary': '#0F172A',
    '--text-secondary': '#475569',
    '--text-muted': '#64748B',
    '--border': 'rgba(21, 101, 192, 0.08)',
    '--border-strong': 'rgba(21, 101, 192, 0.2)',
    '--bg-card': '#FFFFFF',
    '--accent': '#1565C0',
    '--accent-light': '#1E88E5',
    '--accent-dim': 'rgba(21, 101, 192, 0.05)',
    '--bg-elevated': '#FFFFFF',
  }

  return (
    <section id="faq" className="section" ref={ref}
      style={{ ...overrideVars, position: 'relative', overflow: 'hidden', borderTop: 'none', paddingTop: '90px', transition: 'background-color 400ms, color 400ms' }}
    >
      
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(21, 101, 192, 0.04) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ maxWidth: 840 }}>
        
        <div style={{ marginBottom: 'clamp(48px,6vw,80px)', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            <ScrambleText text="Frequently Asked Questions" speed={30} />
          </div>
          <h2 className="text-h2" style={{ marginBottom: 14 }}>
            <span style={{ display: 'inline-block' }}>Got Questions?</span><br />
            <span style={{ display: 'inline-block', color: 'var(--accent)' }}>We have answers.</span>
          </h2>
          <p className="text-body-lg" style={{ maxWidth: 540, margin: '0 auto' }}>
            Everything you need to know about our workflow models, technology alignment, and partnership SLA agreements.
          </p>
        </div>

        
        <div className="faq-rows-container" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={faq.id}
                className="faq-row"
                style={{
                  background: 'var(--bg-card)',
                  border: isOpen ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                  borderRadius: 20,
                  transition: 'transform 300ms, border-color 300ms, box-shadow 300ms',
                  overflow: 'hidden',
                  boxShadow: isOpen
                    ? (theme === 'dark' ? '0 15px 30px -10px rgba(21,101,192,0.15)' : '0 15px 30px -10px rgba(21,101,192,0.05)')
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.borderColor = 'var(--border-strong)'
                  e.currentTarget.style.boxShadow = theme === 'dark'
                    ? '0 15px 30px -10px rgba(79,195,247,0.2)'
                    : '0 15px 30px -10px rgba(21,101,192,0.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.borderColor = isOpen ? 'var(--border-strong)' : 'var(--border)'
                  e.currentTarget.style.boxShadow = isOpen
                    ? (theme === 'dark' ? '0 15px 30px -10px rgba(21,101,192,0.15)' : '0 15px 30px -10px rgba(21,101,192,0.05)')
                    : 'none'
                }}
              >
                
                <button
                  onClick={() => toggleFaq(i)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 16,
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                  }}
                  suppressHydrationWarning
                >
                  <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <HelpCircle size={16} className="text-accent" style={{ flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                      fontSize: 16,
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 300ms var(--ease-out-quart)',
                      flexShrink: 0,
                    }}
                  />
                </button>

                
                <div
                  style={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                    transition: 'all 300ms var(--ease-out-quart)',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{
                    padding: '0 28px 28px 58px',
                    fontSize: 14.5,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)'
                  }}>
                    {faq.answer}
                  </div>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
