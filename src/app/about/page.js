'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Faqs from '@/components/Faqs'

export default function AboutPage() {
  return (
    <div className="page-wrapper" style={{ opacity: 1 }}>
      <Navbar />
      <main style={{ paddingTop: '120px' }}>
        <About />
        <Faqs />
      </main>
      <Footer />
    </div>
  )
}
