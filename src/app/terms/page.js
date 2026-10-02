'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { Scale, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react'

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '160px', minHeight: '100vh', background: 'var(--bg-base)' }}>
        <div className="container" style={{ maxWidth: 840, paddingBottom: '120px' }}>
          
          
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              width: 80, 
              height: 80, 
              borderRadius: 24,
              background: 'var(--surface-elevated)',
              border: '1px solid var(--border)',
              marginBottom: 24,
              boxShadow: '0 8px 32px rgba(12, 73, 162, 0.08)'
            }}>
              <Image
                src="/logo-transparent-new.png"
                alt="Accemberg Logo"
                width={42}
                height={42}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <h1 className="text-h2" style={{ marginBottom: 16 }}>Terms & Conditions</h1>

          </div>

          
          <div className="text-body" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 40,
            background: 'var(--bg-card)',
            padding: '48px 56px',
            borderRadius: 24,
            border: '1px solid var(--border)',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.02)'
          }}>
            
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.8, marginBottom: 0 }}>
                We believe that good business is built on mutual respect and clear expectations. These Terms and Conditions outline the ground rules for using the Accemberg website and engaging with our services. We&apos;ve kept the legalese to a minimum because we prefer straightforward conversations over complicated contracts.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
              
              <section>
                <div style={{ marginBottom: 16 }}>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>1. The Basics</h2>
                </div>
                <p>
                  By accessing our website and engaging with our services, you agree to these terms. It&apos;s simple: use our site responsibly, don&apos;t attempt to break or reverse-engineer our infrastructure, and treat our team with the same professional respect we extend to you.
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 16 }}>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>2. Intellectual Property</h2>
                </div>
                <p>
                  The design, text, graphics, and code that make up the Accemberg website belong to us. You are welcome to draw inspiration from our work, but please do not copy, scrape, or repurpose our content or proprietary assets without our explicit written permission. 
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 16 }}>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>3. Client Engagements</h2>
                </div>
                <p>
                  These website terms do not replace the specific Statements of Work (SOW) or Master Services Agreements (MSA) we sign with our clients. If you choose to partner with Accemberg for bespoke engineering or consulting, our formal contract will govern that professional relationship and supersedes these general website terms.
                </p>
              </section>

              <section>
                <div style={{ marginBottom: 16 }}>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>4. Limitation of Liability</h2>
                </div>
                <p>
                  While we strive to ensure our website is always accurate, secure, and available, we provide it on an &quot;as is&quot; basis. Accemberg cannot be held liable for any indirect, incidental, or consequential damages arising from your use of this informational website.
                </p>
              </section>

            </div>

            <hr style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }} />

            <div style={{ textAlign: 'center' }}>
              <h3 className="text-h3" style={{ fontSize: 18, marginBottom: 12 }}>Need clarification?</h3>
              <p style={{ margin: 0 }}>
                We&apos;re always happy to discuss our terms, how we work, or how we can help your business scale. Reach out to us at <a href="mailto:office@accemberg.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>office@accemberg.com</a>.
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
