'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Services from '@/components/Services'

export default function ServicesPage() {
  return (
    <div className="page-wrapper" style={{ opacity: 1 }}>
      <Navbar />
      <main style={{ paddingTop: '120px' }}>
        <Services />
      </main>
      <Footer />
    </div>
  )
}
