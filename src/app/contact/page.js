'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Contact from '@/components/Contact'

export default function ContactPage() {
  return (
    <div className="page-wrapper" style={{ opacity: 1 }}>
      <Navbar />
      <main style={{ paddingTop: '120px' }}>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
