'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// ── Critical above-the-fold: eager imports ─────────────────────────────────
import Preloader from '@/components/Preloader'
import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'

// ── Below-the-fold: lazy loaded chunks (zero parse cost at startup) ─────────
const StatsBar      = dynamic(() => import('@/components/StatsBar'),      { ssr: false })
const About         = dynamic(() => import('@/components/About'),         { ssr: false })
const Services      = dynamic(() => import('@/components/Services'),      { ssr: false })
const Products      = dynamic(() => import('@/components/Products'),      { ssr: false })
const Process       = dynamic(() => import('@/components/Process'),       { ssr: false })
const Solutions     = dynamic(() => import('@/components/Solutions'),     { ssr: false })
const WhyAccemberg  = dynamic(() => import('@/components/WhyAccemberg'),  { ssr: false })
const TechStack     = dynamic(() => import('@/components/TechStack'),     { ssr: false })
const Partners      = dynamic(() => import('@/components/Partners'),      { ssr: false })
const Projects      = dynamic(() => import('@/components/Projects'),      { ssr: false })
const Testimonials  = dynamic(() => import('@/components/Testimonials'),  { ssr: false })
const Careers       = dynamic(() => import('@/components/Careers'),       { ssr: false })
const SectionDivider = dynamic(() => import('@/components/SectionDivider'), { ssr: false })
const Faqs          = dynamic(() => import('@/components/Faqs'),          { ssr: false })
const Contact       = dynamic(() => import('@/components/Contact'),       { ssr: false })
const Footer        = dynamic(() => import('@/components/Footer'),        { ssr: false })

// Register GSAP ScrollTrigger once, lazily
let scrollTriggerRegistered = false
function ensureScrollTrigger() {
  if (scrollTriggerRegistered || typeof window === 'undefined') return
  import('gsap').then(({ gsap }) => {
    import('gsap/dist/ScrollTrigger').then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger)
      scrollTriggerRegistered = true
    })
  })
}

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  // Only mount below-fold components after preloader finishes
  const [mountBelowFold, setMountBelowFold] = useState(false)

  useEffect(() => {
    if (preloaderDone) {
      ensureScrollTrigger()
      // Give the browser a full frame to paint Hero before loading the rest
      const raf = requestAnimationFrame(() => {
        setTimeout(() => setMountBelowFold(true), 100)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [preloaderDone])

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />

      {/* Page content fades in after preloader */}
      <div
        className="page-wrapper"
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: preloaderDone ? 'opacity 600ms cubic-bezier(0.16,1,0.3,1)' : 'none',
        }}
      >
        <Navbar />
        <main>
          <Hero preloaderDone={preloaderDone} />

          {/* Everything below the fold — only mounts after Hero is painted */}
          {mountBelowFold && (
            <>
              <StatsBar />
              <About />
              <Services />
              <Products />
              <Process />
              <Solutions />
              <WhyAccemberg />
              <TechStack />
              <Partners />
              <Projects />
              <Testimonials />
              <Careers />
              <SectionDivider index={2} />
              <Faqs />
              <Contact />
            </>
          )}
        </main>
        {mountBelowFold && <Footer />}
      </div>
    </>
  )
}

