'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import { ShieldCheck, Heart, Lock, Eye } from 'lucide-react'

export default function PrivacyPolicy() {
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
            <h1 className="text-h2" style={{ marginBottom: 16 }}>Our Privacy Promise</h1>
            <p className="text-body-lg" style={{ color: 'var(--text-muted)' }}>
              Last updated: {new Date().toLocaleDateString()} — Written for humans, by humans.
            </p>
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
                At Accemberg, we build digital products with uncompromising quality. We believe that how we handle your personal data should reflect that exact same philosophy. This policy isn&apos;t just legal jargon—it&apos;s our transparent promise about how we respect and protect your information.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
              
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ padding: 8, borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    <Heart size={20} />
                  </div>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>1. The information we collect</h2>
                </div>
                <p>
                  We only ask for what we actually need to build great things together. When you reach out to us, request a consultation, or join our team, we collect standard professional details like your name, email, phone number, and company info. We don&apos;t sneakily harvest data you didn&apos;t intend to share.
                </p>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ padding: 8, borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    <Eye size={20} />
                  </div>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>2. How we use your data</h2>
                </div>
                <p>
                  We use your information strictly to communicate with you, deliver our engineering services, and occasionally send you updates that we genuinely think you&apos;ll find valuable. <strong>We will never sell your data to third parties.</strong> You are our partner, not our product.
                </p>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ padding: 8, borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>3. How we keep it safe</h2>
                </div>
                <p>
                  As a team of engineers, security is in our DNA. We use enterprise-grade encryption, secure servers, and strict access controls to ensure your data stays locked down. We treat your personal information with the same rigor and security standards we apply to our clients&apos; production codebases.
                </p>
              </section>

              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <div style={{ padding: 8, borderRadius: 8, background: 'var(--accent-dim)', color: 'var(--accent)' }}>
                    <Lock size={20} />
                  </div>
                  <h2 className="text-h3" style={{ margin: 0, fontSize: 22 }}>4. Your rights and control</h2>
                </div>
                <p>
                  It&apos;s your data, and you are in control. If you ever want to see what information we have, correct a mistake, or ask us to delete your details entirely, just let us know. We make the process simple, fast, and entirely frictionless.
                </p>
              </section>

            </div>

            <hr style={{ borderTop: '1px solid var(--border)', margin: '16px 0' }} />

            <div style={{ textAlign: 'center' }}>
              <h3 className="text-h3" style={{ fontSize: 18, marginBottom: 12 }}>Got questions?</h3>
              <p style={{ margin: 0 }}>
                If anything in this policy doesn&apos;t make sense, or if you just want to talk about how we handle security, our inbox is always open. Reach out to us at <a href="mailto:office@accemberg.com" style={{ color: 'var(--accent)', fontWeight: 600 }}>office@accemberg.com</a>.
              </p>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
