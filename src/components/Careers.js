'use client'

import { useRef, useEffect } from 'react'
import { Briefcase, ArrowUpRight, Zap, Globe, Heart } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import FastScroll from './FastScroll'
import ScrambleText from './ScrambleText'

const JOBS = [
  {
    title: 'Senior Systems Architect',
    type: 'Full-time',
    location: 'Remote · Global',
    link: '#contact'
  },
  {
    title: 'Senior Full-Stack Engineer',
    type: 'Full-time',
    location: 'Remote · Global',
    link: '#contact'
  },
  {
    title: 'DevOps & Infrastructure Architect',
    type: 'Full-time',
    location: 'Remote · Global',
    link: '#contact'
  }
]

export default function Careers() {
  const { theme } = useTheme()
  const ref = useRef(null)

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
      { threshold: 0.1 }
    )
    el.querySelectorAll('.reveal, .reveal-scale').forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="careers" className="section" ref={ref}
      style={{ background: 'var(--bg-base)', position: 'relative', overflow: 'hidden', borderTop: '1px solid var(--border)', paddingTop: 'var(--section-y)', paddingBottom: '90px', transition: 'background-color 400ms' }}
    >
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }} className="careers-grid">

          {/* Left panel: Culture */}
          <div>
            <div className="section-label">
              <ScrambleText text="Careers" speed={30} />
            </div>
            <h2 className="text-h2" style={{ marginBottom: 20 }}>
              <FastScroll><span style={{ display: 'inline-block' }}>Build the Future of</span></FastScroll>
              <br />
              <FastScroll><span style={{ display: 'inline-block', color: 'var(--accent)' }}>Enterprise Systems</span></FastScroll>
            </h2>
            <p className="text-body-lg" style={{ marginBottom: 30 }}>
              We are a team of passionate, remote-first systems builders. We care about elegant software architectures, clear roadmaps, and continuous craft excellence.
            </p>

            {/* Perks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Work from Anywhere', desc: 'Accemberg is fully remote-first. Choose your workspace anywhere globally.', icon: Globe },
                { label: 'Premium Hardware & Tools', desc: 'Get top-tier hardware allowances and subscriptions for whatever tooling you need.', icon: Zap },
                { label: 'High Trust, High Freedom', desc: 'No micro-management or time-tracking. We measure value delivered, not hours.', icon: Heart }
              ].map((perk) => {
                const Icon = perk.icon
                return (
                  <div key={perk.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div className="icon-box" style={{ width: 34, height: 34, background: theme === 'dark' ? 'rgba(79,195,247,0.12)' : 'rgba(21,101,192,0.06)' }}>
                      <Icon size={14} className="text-accent" />
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{perk.label}</h4>
                      <p className="text-body" style={{ fontSize: 13, lineHeight: 1.5 }}>{perk.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right panel: Job Listings */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
              fontSize: 20,
              fontWeight: 600,
              color: 'var(--text-primary)',
              marginBottom: 20,
            }}>
              Active Openings
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {JOBS.map((job) => (
                <a
                  key={job.title}
                  href={job.link}
                  style={{
                    background: theme === 'dark' ? 'rgba(17,24,39,0.65)' : 'rgba(255,255,255,0.75)',
                    border: '1px solid var(--border)',
                    borderRadius: 20,
                    padding: '24px 28px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 300ms var(--ease-out-quart)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-strong)'
                    e.currentTarget.style.boxShadow = theme === 'dark'
                      ? '0 15px 30px -10px rgba(21,101,192,0.22)'
                      : '0 15px 30px -10px rgba(21,101,192,0.08)';
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div>
                    <h4 style={{
                      fontFamily: 'var(--font-space-grotesk, "Space Grotesk", sans-serif)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: 4,
                    }}>
                      {job.title}
                    </h4>
                    <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-secondary)',
                  }}>
                    <ArrowUpRight size={14} />
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .careers-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
