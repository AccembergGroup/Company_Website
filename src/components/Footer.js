'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Why Accemberg', href: '#why-accemberg' },
      { label: 'Careers & Culture', href: '#careers' },
      { label: 'Book a Call', href: '#contact' },
    ],
  },
  {
    heading: 'Services & Solutions',
    links: [
      { label: 'Engineering Services', href: '#services' },
      { label: 'FinTech Platforms', href: '#solutions' },
      { label: 'Multi-Tenant SaaS', href: '#solutions' },
      { label: 'Logistics Systems', href: '#solutions' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Case Studies', href: '#projects' },
      { label: 'FAQs Accordion', href: '#faq' },
      { label: 'Support & Enquiries', href: 'mailto:office@accemberg.com' },
    ],
  },
]

export default function Footer() {
  const { theme } = useTheme()

  const SOCIAL_LINKS = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/accemberg-technologies',
      icon: <LinkedInIcon />,
    },
    {
      label: 'X / Twitter',
      href: 'https://x.com/accemberg',
      icon: <XIcon />,
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: <GitHubIcon />,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/accemberg/',
      icon: <InstagramIcon />,
    },
  ]

  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        transition: 'background-color 400ms, border-color 400ms',
      }}
    >
      {/* Main footer body */}
      <div className="container" style={{ paddingTop: 'clamp(60px,8vw,96px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1fr 1fr 1fr',
          gap: 'clamp(32px,4vw,60px)',
        }} className="footer-grid">

          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Logo */}
            <a href="#" aria-label="Accemberg" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, width: 'fit-content' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21, 101, 192, 0.08)',
                border: theme === 'dark' ? '1px solid rgba(79,195,247,0.15)' : '1px solid rgba(21, 101, 192, 0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <Image
                  src="/logo-transparent-new.png"
                  alt="Accemberg Logo"
                  width={30}
                  height={30}
                  style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--text-primary)',
              }}>
                ACCEMBERG
              </span>
            </a>

            {/* Tagline */}
            <p style={{
              fontSize: 13.5,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 280,
              margin: 0
            }}>
              A hybrid venture studio engineering scalable software products and delivering world-class services simultaneously.
            </p>

            <a
              href="mailto:office@accemberg.com"
              style={{
                fontSize: 13.5,
                color: 'var(--accent)',
                fontWeight: 600,
                transition: 'color 200ms',
                width: 'fit-content',
              }}
            >
              office@accemberg.com
            </a>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    transition: 'all 200ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.borderColor = 'var(--border-strong)'
                    e.currentTarget.style.background = 'var(--accent-dim)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <div key={col.heading}>
              <h4 style={{
                fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 20,
              }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: 13.5,
                        color: 'var(--text-secondary)',
                        transition: 'color 200ms',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{
          paddingTop: 20,
          paddingBottom: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Accemberg Products &amp; Services. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24 }}>
            <a
              href="/privacy-policy"
              style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 200ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.muted }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 200ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.muted }}
            >
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

/* ── Inline SVG Social Icons ────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}
