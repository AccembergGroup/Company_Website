'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Process from '@/components/Process'

export default function ProcessPage() {
  return (
    <div className="page-wrapper" style={{ opacity: 1 }}>
      <Navbar />
      <main style={{ paddingTop: '120px' }}>
        <Process />
      </main>
      <Footer />
    </div>
  )
}
