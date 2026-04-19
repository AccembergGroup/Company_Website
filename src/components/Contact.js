'use client'

import { useState, useRef, useEffect } from 'react'

const PROJECT_TYPES = [
  'Full-Stack Development',
  'System Architecture',
  'Cloud Infrastructure',
  'AI / ML Integration',
  'SaaS Product Build',
  'Technical Consulting',
  'QA & Testing',
  'Other',
]

function useReveal(ref) {
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
      { threshold: 0.1 },
    )
    el.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])
}

export default function Contact() {
  const ref = useRef(null)
  useReveal(ref)

  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', projectType: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    // Placeholder — real submission logic to be wired later
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <section id="contact" className="section" ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Glow bottom-left */}
      <div style={{
        position: 'absolute', left: '-5%', bottom: '-10%',
        width: 700, height: 700,
        background: 'radial-gradient(ellipse, rgba(26,143,255,0.08) 0%, transparent 65%)',
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
          <div style={{ paddingTop: 8 }}>
            <div className="section-label reveal">Get In Touch</div>
            <h2 className="text-h2 reveal" style={{ marginBottom: 20 }}>
              Let's Build<br />
              <span style={{ color: 'var(--accent)' }}>Something Great</span>
            </h2>
            <p className="text-body-lg reveal" style={{ marginBottom: 40 }}>
              Whether you're an enterprise looking for a delivery partner, or a visionary
              founder with a high-impact product idea — we want to collaborate with you.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="reveal">
              <ContactDetail
                icon={<EmailIcon />}
                label="Support & Enquiries"
                value="support@accemberg.com"
                href="mailto:support@accemberg.com"
              />
              <ContactDetail
                icon={<GlobalIcon />}
                label="Headquarters"
                value="India · Available Globally"
              />
              <ContactDetail
                icon={<ClockIcon />}
                label="Response Time"
                value="Within 24 business hours"
              />
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'var(--border-subtle)', margin: '36px 0' }} className="reveal" />

            {/* Trust signals */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} className="reveal">
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
          <div className="reveal-right">
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 4,
              padding: 'clamp(28px,4vw,48px)',
            }}>
              {status === 'success' ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
                        />
                      </div>
                    </div>

                    {/* Project type */}
                    <div className="form-field">
                      <label className="form-label" htmlFor="projectType">Project Type</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          id="projectType"
                          name="projectType"
                          className="form-select"
                          value={form.projectType}
                          onChange={handleChange}
                        >
                          <option value="">Select a service area...</option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <div style={{
                          position: 'absolute', right: 14, top: '50%',
                          transform: 'translateY(-50%)',
                          pointerEvents: 'none',
                          color: 'var(--text-muted)',
                        }}>
                          <ChevronIcon />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-field">
                      <label className="form-label" htmlFor="message">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        placeholder="Tell us about your project, timeline, and any relevant context..."
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={status === 'submitting'}
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        opacity: status === 'submitting' ? 0.7 : 1,
                        cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <SpinnerIcon />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowIcon />
                        </>
                      )}
                    </button>

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
      <div className="icon-box" style={{ marginTop: 1, flexShrink: 0 }}>{icon}</div>
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
        background: 'rgba(26,143,255,0.1)',
        border: '1px solid rgba(26,143,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h3 style={{
        fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
        fontSize: 22, fontWeight: 600, color: 'var(--text-primary)',
      }}>
        Message Received
      </h3>
      <p className="text-body" style={{ maxWidth: 320 }}>
        Thank you for reaching out. A member of our team will respond within 24 business hours.
      </p>
    </div>
  )
}

/* ── Icons ───────────────────────────────────────────────── */
function EmailIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 6.5l7 4.5 7-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
}
function GlobalIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M2 9h14M9 2c-2 2-3 4.5-3 7s1 5 3 7M9 2c2 2 3 4.5 3 7s-1 5-3 7" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
}
function ClockIcon() {
  return <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M9 5v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function ChevronIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function ArrowIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
function SpinnerIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  )
}
