'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Magnetic from '@/components/Magnetic'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Process', href: '/process' },
  { label: 'Projects', href: '/projects' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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
      
      <nav
        className="nav-container"
        style={{
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: scrolled ? 'rgba(245, 247, 255, 0.82)' : 'rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(21, 101, 192, 0.12)',
          borderRadius: 100,
          backgroundClip: 'padding-box',
          transition: 'background 400ms, box-shadow 400ms, border-color 400ms',
          boxShadow: scrolled
            ? '0 10px 30px -10px rgba(0,0,0,0.15)'
            : '0 4px 20px -5px rgba(0,0,0,0.05)',
          whiteSpace: 'nowrap',
          maxWidth: 'calc(100vw - 48px)',
        }}
      >
        
        <a
          href="/"
          aria-label="Accemberg"
          className="nav-logo-link"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0,
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(21, 101, 192, 0.08)',
              border: '1px solid rgba(21, 101, 192, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image
              src="/logo-transparent-new.png"
              alt="Accemberg"
              width={26}
              height={26}
              style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
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

        
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 2, marginRight: 8 }}
          className="pill-nav-links"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link-underline"
              style={{
                padding: '7px 14px',
                fontSize: 13,
                fontWeight: 550,
                color: 'var(--text-secondary)',
                transition: 'color 250ms',
                letterSpacing: '0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          
          <Magnetic>
            <a
              href="/contact"
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
                flexShrink: 0,
                transition: 'background 200ms, box-shadow 200ms, transform 150ms',
                boxShadow: '0 4px 14px rgba(21,101,192,0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent-light)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--accent)'
              }}
              className="pill-nav-links"
            >
              Get in Touch
              <ArrowRight size={13} strokeWidth={2} />
            </a>
          </Magnetic>
        </div>

        
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
          suppressHydrationWarning
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

      
      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 76,
          left: '50%',
          transform: `translateX(-50%) translateY(${menuOpen ? '0' : '-8px'})`,
          zIndex: 99,
          background: 'rgba(245,247,255,0.92)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(21,101,192,0.12)',
          borderRadius: 20,
          padding: '16px 8px',
          minWidth: 220,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 250ms, transform 250ms',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.15)',
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
              e.currentTarget.style.background = 'rgba(0,0,0,0.03)'
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
        .nav-container { padding: 6px 12px 6px 16px; gap: 14px; }
        .nav-logo-link { margin-right: 16px; }

        @media (max-width: 768px) {
          .pill-nav-links { display: none !important; }
          .pill-hamburger { display: flex !important; }
          /* Show wordmark on mobile and center the logo */
          .nav-wordmark { display: block !important; }
          
          /* Keep the floating pill on mobile but adjust padding */
          .nav-container {
            padding: 12px 16px !important;
            width: calc(100vw - 32px) !important;
            justify-content: flex-end !important;
          }
          
          .nav-logo-link { 
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
          }
          
          /* Just the hamburger gets a subtle glass button look at top-right */
          .pill-hamburger { 
            margin-left: 0 !important; 
            padding: 10px 12px !important;
            background: rgba(255, 255, 255, 0.05) !important;
            border: 1px solid rgba(255, 255, 255, 0.12) !important;
            border-radius: 8px !important;
            backdrop-filter: blur(12px) !important;
          }
        }
      `}</style>
    </>
  )
}
