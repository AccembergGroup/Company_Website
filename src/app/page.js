'use client'

import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

import Preloader from '@/components/Preloader'
import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'

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
// Note: a "Clients" marquee component exists in src/components/Clients.js but is not
// imported here — its ROW_ONE/ROW_TWO lists were placeholder company names, not real
// clients. Re-add the import and render it once real logos/names are available.
const Careers       = dynamic(() => import('@/components/Careers'),       { ssr: false })
const SectionDivider = dynamic(() => import('@/components/SectionDivider'), { ssr: false })
const Faqs          = dynamic(() => import('@/components/Faqs'),          { ssr: false })
const Contact       = dynamic(() => import('@/components/Contact'),       { ssr: false })
const Footer        = dynamic(() => import('@/components/Footer'),        { ssr: false })

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
  
  const [mountBelowFold, setMountBelowFold] = useState(false)

  useEffect(() => {
    if (preloaderDone) {
      ensureScrollTrigger()
      
      const raf = requestAnimationFrame(() => {
        setTimeout(() => setMountBelowFold(true), 100)
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [preloaderDone])

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />

      
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

          
          {mountBelowFold && (
            <>
              <StatsBar />
              <Solutions />
              <WhyAccemberg />
              <TechStack />
              <Partners />
              {/* Clients marquee disabled — ROW_ONE/ROW_TWO in Clients.js were placeholder
                  company names, not real clients. Re-enable once real logos/names are ready. */}
              <Careers />
            </>
          )}
        </main>
        {mountBelowFold && <Footer />}
      </div>
    </>
  )
}
