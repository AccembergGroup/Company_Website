'use client'

import Image from 'next/image'

const NAV_COLS = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Services', href: '#services' },
      { label: 'Products', href: '#products' },
      { label: 'Process', href: '#process' },
      { label: 'Projects', href: '#projects' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Full-Stack Development', href: '#services' },
      { label: 'System Architecture', href: '#services' },
      { label: 'Cloud & DevOps', href: '#services' },
      { label: 'AI / ML Integration', href: '#services' },
      { label: 'Technical Consulting', href: '#services' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { label: 'X / Twitter', href: 'https://x.com', external: true },
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'Instagram', href: 'https://instagram.com', external: true },
    ],
  },
]

const SOCIAL_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: <LinkedInIcon />,
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com',
    icon: <XIcon />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <GitHubIcon />,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: <InstagramIcon />,
  },
]

export default function Footer() {
  return (
    <footer className="footer-bg">
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
                width: 34, height: 34, borderRadius: 4,
                background: 'rgba(26,143,255,0.08)',
                border: '1px solid rgba(26,143,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <Image
                  src="/logo-transparent.png"
                  alt="Accemberg Logo"
                  width={30}
                  height={30}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span style={{
                fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
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
              fontSize: 14,
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: 260,
            }}>
              ⭐ Empowering Innovation for Enterprise IT
            </p>

            <p className="text-body" style={{ fontSize: 13, maxWidth: 280 }}>
              A hybrid venture studio engineering scalable software products and delivering world-class services simultaneously.
            </p>

            {/* Support email */}
            <a
              href="mailto:support@accemberg.com"
              style={{
                fontSize: 13,
                color: 'var(--accent-light)',
                fontWeight: 500,
                transition: 'color 200ms',
              }}
            >
              support@accemberg.com
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
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    transition: 'color 200ms, border-color 200ms, background 200ms',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--accent-light)'
                    e.currentTarget.style.borderColor = 'rgba(26,143,255,0.25)'
                    e.currentTarget.style.background = 'rgba(26,143,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
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
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      style={{
                        fontSize: 14,
                        color: 'var(--text-muted)',
                        transition: 'color 200ms',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
                    >
                      {link.label}
                      {link.external && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ opacity: 0.4 }}>
                          <path d="M2 8L8 2M4 2h4v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
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
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              style={{ fontSize: 13, color: 'var(--text-muted)', transition: 'color 200ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)' }}
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

/* ── Social Icons ─────────────────────────────────────────── */
function LinkedInIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 5.5h2.5v8H2zM3.25 4.5a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM6 5.5h2.4v1.1h.03c.33-.63 1.15-1.3 2.37-1.3C13 5.3 13.5 7 13.5 9.2v4.3H11V9.6c0-.9-.02-2.06-1.25-2.06-1.26 0-1.45.98-1.45 2v4H6V5.5z" fill="currentColor"/>
  </svg>
}
function XIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M11.9 1h2.3L9.3 6.4 15 14h-4.7L7 9.7 3.2 14H.9l5.2-5.8L0 1h4.8L8.1 5l3.8-4zm-.8 11.7h1.3L4 2.3H2.6l8.5 10.4z" fill="currentColor"/>
  </svg>
}
function GitHubIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1a7 7 0 00-2.21 13.64c.35.06.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.81-.78-1.02-.78-1.02-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.62 1.07 1.63.76 2.03.58.06-.45.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.46 0-.77.27-1.4.72-1.89-.07-.18-.31-.9.07-1.87 0 0 .59-.19 1.93.72A6.7 6.7 0 018 4.86c.6.003 1.2.08 1.77.24 1.34-.91 1.93-.72 1.93-.72.38.97.14 1.69.07 1.87.45.49.72 1.12.72 1.89 0 2.69-1.64 3.28-3.2 3.46.25.22.47.65.47 1.31v1.95c0 .19.13.41.48.34A7.001 7.001 0 008 1z" fill="currentColor"/>
  </svg>
}
function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="11.5" cy="4.5" r="0.8" fill="currentColor"/>
  </svg>
}
