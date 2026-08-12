'use client'

import { useState, useRef, useEffect } from 'react'
import { Mail, Globe, Clock, Check, Send, AlertTriangle, Calendar } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Magnetic from './Magnetic'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const { theme } = useTheme()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      // Reveal left column elements
      gsap.fromTo(el.querySelectorAll('.reveal-gsap-left'), 
        {
          opacity: 0,
          y: 35
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )

      // Reveal right card panel
      gsap.fromTo(el.querySelectorAll('.reveal-gsap-right'), 
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
            trigger: el.querySelector('.contact-grid') || el,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, ref)

    return () => {
      ctx.revert()
    }
  }, [])

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', preferredDate: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errMessage, setErrMessage] = useState('')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email) {
      setStatus('error')
      setErrMessage('Name and email are required.')
      return
    }

    setStatus('submitting')

    const url = process.env.NEXT_PUBLIC_API_URL
      ? `${process.env.NEXT_PUBLIC_API_URL}/book-a-call`
      : 'http://localhost:5000/api/book-a-call'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          company: form.company || null,
          preferredDate: form.preferredDate ? new Date(form.preferredDate).toISOString().split('T')[0] : null,
          message: form.message || null
        })
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setStatus('success')
      } else {
        setStatus('error')
        setErrMessage(result.message || 'Failed to submit booking request.')
      }
    } catch (err) {
      setStatus('error')
      setErrMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="contact" className="section" ref={ref}
      style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)', transition: 'background-color 400ms' }}
    >
      {/* Glow bottom-left */}
      <div style={{
        position: 'absolute', left: '-5%', bottom: '-10%',
        width: 700, height: 700,
        background: 'radial-gradient(ellipse, rgba(21,101,192,0.06) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: 'clamp(48px,6vw,96px)',
          alignItems: 'flex-start',
        }} className="contact-grid">

          {/* Left — Info panel */}
          <div style={{ paddingTop: 8 }} className="reveal-gsap-left">
            <div className="section-label">
              <ScrambleText text="Get In Touch" speed={30} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 20 }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Let's Build</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Something Great</span></FastScroll>
            </h2>
            <p className="text-body-lg reveal-gsap-left" style={{ marginBottom: 40 }}>
              Whether you're an enterprise looking for a delivery partner, or a visionary
              founder with a high-impact product idea — we want to collaborate with you.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="reveal-gsap-left">
              <ContactDetail
                icon={<Mail size={16} />}
                label="Support & Enquiries"
                value="office@accemberg.com"
                href="mailto:office@accemberg.com"
              />
              <ContactDetail
                icon={<Globe size={16} />}
                label="Headquarters"
                value="India · Available Globally"
              />
              <ContactDetail
                icon={<Clock size={16} />}
                label="Response Time"
                value="Within 24 business hours"
              />
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border)', margin: '36px 0' }} className="reveal-gsap-left" />

            {/* Trust signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="reveal-gsap-left">
              {[
                '98% client retention across all engagements',
                'Transparent, flexible engagement models tailored to your roadmap',
                'Led by senior engineers — we never compromise on technical leadership',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontSize: 14, lineHeight: 1.6, flexShrink: 0 }}>✓</span>
                  <span className="text-body" style={{ fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="reveal-gsap-right">
            <div className="card-glass" style={{
              padding: 'clamp(28px,4vw,48px)',
              boxShadow: theme === 'dark'
                ? '0 20px 40px -15px rgba(21,101,192,0.22)'
                : '0 20px 40px -15px rgba(21,101,192,0.08)',
            }}>
              {status === 'success' ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    
                    {/* Error display */}
                    {status === 'error' && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '12px 16px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        borderRadius: 12,
                        color: theme === 'dark' ? '#FCA5A5' : '#DC2626',
                        fontSize: 13.5
                      }}>
                        <AlertTriangle size={16} style={{ flexShrink: 0 }} />
                        <span>{errMessage}</span>
                      </div>
                    )}

                    {/* Row: name + company */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="name">Full Name *</label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          className="form-input"
                          placeholder="Jane Smith"
                          value={form.name}
                          onChange={handleChange}
                          required
                          autoComplete="name"
                          style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)' }}
                          suppressHydrationWarning
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="company">Company</label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          className="form-input"
                          placeholder="Acme Corp."
                          value={form.company}
                          onChange={handleChange}
                          autoComplete="organization"
                          style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)' }}
                          suppressHydrationWarning
                        />
                      </div>
                    </div>

                    {/* Row: email + phone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-row">
                      <div className="form-field">
                        <label className="form-label" htmlFor="email">Email Address *</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          className="form-input"
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          autoComplete="email"
                          style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)' }}
                          suppressHydrationWarning
                        />
                      </div>
                      <div className="form-field">
                        <label className="form-label" htmlFor="phone">Phone (optional)</label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          className="form-input"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={handleChange}
                          autoComplete="tel"
                          style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)' }}
                          suppressHydrationWarning
                        />
                      </div>
                    </div>

                    {/* Meeting Preferred Date */}
                    <div className="form-field">
                      <label className="form-label" htmlFor="preferredDate" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Calendar size={12} />
                        <span>Preferred Call Date (optional)</span>
                      </label>
                      <input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        className="form-input"
                        value={form.preferredDate}
                        onChange={handleChange}
                        style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)', colorScheme: theme }}
                        suppressHydrationWarning
                      />
                    </div>

                    {/* Message */}
                    <div className="form-field">
                      <label className="form-label" htmlFor="message">Message (optional)</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        placeholder="Tell us about your project, timeline, and any relevant context..."
                        value={form.message}
                        onChange={handleChange}
                        style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.8)' }}
                        suppressHydrationWarning
                      />
                    </div>

                    {/* Submit */}
                    <Magnetic style={{ width: '100%' }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={status === 'submitting'}
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          opacity: status === 'submitting' ? 0.7 : 1,
                          cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                          padding: '16px 28px',
                          boxShadow: theme === 'dark'
                            ? '0 10px 30px -10px rgba(79,195,247,0.3)'
                            : '0 10px 30px -10px rgba(21,101,192,0.3)',
                        }}
                        suppressHydrationWarning
                      >
                        {status === 'submitting' ? (
                          <>
                            <SpinnerIcon />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            Book Discovery Call
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </Magnetic>

                    <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
                      We typically respond within 24 business hours. No spam, ever.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 580px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function ContactDetail({ icon, label, value, href }) {
  const { theme } = useTheme()
  const Wrap = href ? 'a' : 'div'
  return (
    <Wrap
      href={href}
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        textDecoration: 'none',
        ...(href ? { cursor: 'pointer' } : {}),
      }}
    >
      <div className="icon-box" style={{ marginTop: 1, flexShrink: 0, width: 36, height: 36, background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)' }}>
        {icon}
      </div>
      <div>
        <div className="text-label" style={{ marginBottom: 4 }}>{label}</div>
        <div style={{
          fontSize: 14,
          fontWeight: 500,
          color: href ? 'var(--accent-light)' : 'var(--text-primary)',
          transition: href ? 'color 200ms' : undefined,
        }}>
          {value}
        </div>
      </div>
    </Wrap>
  )
}

function SuccessState() {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: 'rgba(21, 101, 192, 0.1)',
        border: '1px solid rgba(21, 101, 192, 0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
      }}>
        <Check size={24} strokeWidth={2.5} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 22, fontWeight: 600, color: 'var(--text-primary)',
      }}>
        Call Request Received
      </h3>
      <p className="text-body" style={{ maxWidth: 320, fontSize: 14 }}>
        Thank you for booking a call. A confirmation email and calendar invitation have been sent to your inbox.
      </p>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite', marginRight: 4 }}>
      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  )
}
