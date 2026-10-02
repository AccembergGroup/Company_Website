'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Projects from '@/components/Projects'

export default function ProjectsPage() {
  return (
    <div className="page-wrapper" style={{ opacity: 1 }}>
      <Navbar />
      <main style={{ paddingTop: '120px' }}>
        <Projects />
      </main>
      <Footer />
    </div>
  )
}
