'use client'

import { useState } from 'react'
import Preloader from '@/components/Preloader'
import Navbar    from '@/components/Navbar'
import Hero      from '@/components/Hero'
import StatsBar  from '@/components/StatsBar'
import About     from '@/components/About'
import Services  from '@/components/Services'
import Products  from '@/components/Products'
import Process   from '@/components/Process'
import Projects  from '@/components/Projects'
import Clients   from '@/components/Clients'
import Contact   from '@/components/Contact'
import Footer    from '@/components/Footer'

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      <Preloader onDone={() => setPreloaderDone(true)} />

      {/* Page content fades in after preloader */}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: preloaderDone ? 'opacity 600ms cubic-bezier(0.16,1,0.3,1)' : 'none',
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <StatsBar />
          <About />
          <Services />
          <Products />
          <Process />
          <Projects />
          <Clients />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
