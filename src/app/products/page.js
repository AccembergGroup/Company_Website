'use client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Products from '@/components/Products'

export default function ProductsPage() {
  return (
    <div className="page-wrapper" style={{ opacity: 1 }}>
      <Navbar />
      <main style={{ paddingTop: '120px' }}>
        <Products />
      </main>
      <Footer />
    </div>
  )
}
