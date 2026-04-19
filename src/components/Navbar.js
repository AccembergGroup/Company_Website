'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
  { label: 'About',    href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Products', href: '#products' },
  { label: 'Process',  href: '#process' },
  { label: 'Projects', href: '#projects' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* ── Floating pill navbar ─────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '6px 6px 6px 14px',
          background: scrolled
            ? 'rgba(10, 16, 24, 0.82)'
            : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(28px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(28px) saturate(1.8)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 100,
          transition: 'background 400ms, box-shadow 400ms',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset'
            : '0 4px 24px rgba(0,0,0,0.2)',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100vw - 48px)',
        }}
      >
        {/* Logo mark */}
        <a
          href="#"
          aria-label="Accemberg"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginRight: 16,
            flexShrink: 0,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(26,143,255,0.12)',
              border: '1px solid rgba(26,143,255,0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo-transparent.png"
              alt="Accemberg"
              width={26}
              height={26}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.07em',
              color: 'var(--text-primary)',
            }}
            className="nav-wordmark"
          >
            ACCEMBERG
          </span>
        </a>

        {/* Desktop nav links */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 2 }}
          className="pill-nav-links"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                padding: '7px 14px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 400,
                color: 'var(--text-secondary)',
                transition: 'color 200ms, background 200ms',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA pill — right side */}
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 18px',
            borderRadius: 100,
            background: 'var(--accent)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: '0.01em',
            marginLeft: 8,
            flexShrink: 0,
            transition: 'background 200ms, box-shadow 200ms, transform 150ms',
            boxShadow: '0 2px 12px rgba(26,143,255,0.35)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--accent-light)'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(26,143,255,0.5)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--accent)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 2px 12px rgba(26,143,255,0.35)'
          }}
          className="pill-nav-links"
        >
          Get in Touch
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: 4,
            padding: '6px 10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginLeft: 4,
          }}
          className="pill-hamburger"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 18,
                height: 1.5,
                background: 'var(--text-secondary)',
                borderRadius: 2,
                transition: 'transform 300ms, opacity 200ms',
                transform:
                  menuOpen
                    ? i === 0 ? 'translateY(5.5px) rotate(45deg)'
                    : i === 2 ? 'translateY(-5.5px) rotate(-45deg)'
                    : 'none'
                    : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile slide-down menu ───────────────────────── */}
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 76,
          left: '50%',
          transform: `translateX(-50%) translateY(${menuOpen ? '0' : '-8px'})`,
          zIndex: 99,
          background: 'rgba(10,16,24,0.92)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 20,
          padding: '16px 8px',
          minWidth: 220,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 250ms, transform 250ms',
        }}
      >
        {[...NAV_LINKS, { label: 'Contact', href: '#contact' }].map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '12px 20px',
              borderRadius: 12,
              fontSize: 15,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              transition: 'color 200ms, background 200ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pill-nav-links { display: none !important; }
          .pill-hamburger { display: flex !important; }
          .nav-wordmark   { display: none; }
        }
      `}</style>
    </>
  )
}
