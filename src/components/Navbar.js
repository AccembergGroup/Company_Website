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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const menuRef = useRef(null)

  // Scroll awareness
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    setActiveLink(href)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="#" aria-label="Accemberg Home" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{
              position: 'relative',
              width: 38,
              height: 38,
              borderRadius: 4,
              overflow: 'hidden',
              background: 'rgba(26,143,255,0.08)',
              border: '1px solid rgba(26,143,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image
                src="/logo-transparent.png"
                alt="Accemberg Logo"
                width={34}
                height={34}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <span style={{
              fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--text-primary)',
            }}>
              ACCEMBERG
            </span>
          </a>

          {/* Desktop nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 36,
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link${activeLink === link.href ? ' active' : ''}`}
                onClick={() => handleNavClick(link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
            <a href="#contact" className="btn btn-outline btn-sm" onClick={() => handleNavClick('#contact')}>
              Get in Touch
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        className={`mobile-menu${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-inner">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-primary"
            style={{ marginTop: 16, transitionDelay: menuOpen ? '300ms' : '0ms' }}
            onClick={() => handleNavClick('#contact')}
          >
            Get in Touch
          </a>
        </div>
      </div>

      <style>{`
        .desktop-nav {
          display: flex;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 8px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .ham-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: var(--text-secondary);
          border-radius: 2px;
          transition: transform 300ms var(--ease-out-expo), opacity 200ms;
        }

        .ham-line.open:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .ham-line.open:nth-child(2) { opacity: 0; }
        .ham-line.open:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-menu {
          position: fixed;
          top: 68px;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99;
          background: rgba(7, 11, 16, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          pointer-events: none;
          opacity: 0;
          transition: opacity 300ms var(--ease-out-expo);
        }

        .mobile-menu.is-open {
          pointer-events: auto;
          opacity: 1;
        }

        .mobile-menu-inner {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 40px var(--container-x);
          gap: 4px;
        }

        .mobile-nav-link {
          font-family: var(--font-space-grotesk, "Space Grotesk", sans-serif);
          font-size: 28px;
          font-weight: 600;
          color: var(--text-secondary);
          line-height: 1;
          padding: 14px 0;
          opacity: 0;
          transform: translateX(-16px);
          transition: color 200ms, opacity 400ms var(--ease-out-expo), transform 400ms var(--ease-out-expo);
          border-bottom: 1px solid var(--border-subtle);
          width: 100%;
        }

        .mobile-menu.is-open .mobile-nav-link {
          opacity: 1;
          transform: translateX(0);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex; }
        }
      `}</style>
    </>
  )
}
