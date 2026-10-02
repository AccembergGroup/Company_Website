'use client'

import Image from 'next/image'
import { useTheme } from '@/components/ThemeProvider'

const BANNERS = [
  { src: '/divider-circuit.png', alt: 'Accemberg circuit architecture' },
  { src: '/divider-cloud.png', alt: 'Accemberg cloud infrastructure' },
  { src: '/divider-code.png', alt: 'Accemberg code & data streams' },
]

export default function SectionDivider({ index = 0 }) {
  const { theme } = useTheme()
  const banner = BANNERS[index % BANNERS.length]
  const isCloud = banner.src === '/divider-cloud.png'

  
  const height = isCloud ? 240 : 130

  
  const mask = isCloud
    ? 'radial-gradient(ellipse 65% 85% at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.15) 70%, transparent 100%)'
    : 'radial-gradient(ellipse at center, black 0%, rgba(0,0,0,0.85) 25%, rgba(0,0,0,0.3) 55%, transparent 75%)'

  const overlayBg = theme === 'dark' ? 'rgba(10, 15, 30, 0.68)' : 'rgba(245, 247, 255, 0.68)'
  const blendMode = theme === 'dark' ? 'screen' : 'multiply'
  const imgOpacity = theme === 'dark' ? (isCloud ? 0.35 : 0.24) : (isCloud ? 0.45 : 0.3)
  const imgFilter = theme === 'dark'
    ? `saturate(0.75) contrast(1.1) blur(${isCloud ? '4px' : '3px'})`
    : `saturate(0.5) contrast(1.1) blur(${isCloud ? '4px' : '3px'})`

  return (
    <div className="sdi-wrap" aria-hidden="true" style={{
      marginTop: isCloud ? '-70px' : '0px',
      marginBottom: isCloud ? '-50px' : '0px',
      zIndex: isCloud ? 5 : 1,
    }}>
      <div className="sdi-img-wrap" style={{ height }}>
        <Image
          src={banner.src}
          alt={banner.alt}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            maskImage: mask,
            WebkitMaskImage: mask,
            opacity: imgOpacity,
            mixBlendMode: blendMode,
            filter: imgFilter,
            transition: 'opacity 300ms',
          }}
          sizes="100vw"
          priority={false}
        />
        
        <div className="sdi-overlay" style={{ background: overlayBg }} />

        
        <div className="sdi-fade-top" style={{
          background: theme === 'dark'
            ? 'linear-gradient(to bottom, #0A0F1E 0%, rgba(10, 15, 30, 0.99) 25%, rgba(10, 15, 30, 0.8) 55%, transparent 100%)'
            : 'linear-gradient(to bottom, #F5F7FF 0%, rgba(245, 247, 255, 0.99) 25%, rgba(245, 247, 255, 0.8) 55%, transparent 100%)'
        }} />
        <div className="sdi-fade-bot" style={{
          background: theme === 'dark'
            ? 'linear-gradient(to top, #0A0F1E 0%, rgba(10, 15, 30, 0.99) 25%, rgba(10, 15, 30, 0.8) 55%, transparent 100%)'
            : 'linear-gradient(to top, #F5F7FF 0%, rgba(245, 247, 255, 0.99) 25%, rgba(245, 247, 255, 0.8) 55%, transparent 100%)'
        }} />
        {isCloud && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: theme === 'dark'
              ? 'radial-gradient(ellipse at center, transparent 15%, rgba(10, 15, 30, 0.45) 45%, rgba(10, 15, 30, 0.95) 75%, #0A0F1E 95%, #0A0F1E 100%)'
              : 'radial-gradient(ellipse at center, transparent 15%, rgba(245, 247, 255, 0.45) 45%, rgba(245, 247, 255, 0.95) 75%, #F5F7FF 95%, #F5F7FF 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }} />
        )}
      </div>

      <style>{`
        .sdi-wrap {
          position: relative;
          width: 100%;
          background: transparent;
          pointer-events: none;
        }
        .sdi-img-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: height 300ms;
        }
        .sdi-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          transition: background-color 300ms;
        }
        .sdi-fade-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: ${isCloud ? '120px' : '40px'};
          pointer-events: none;
          z-index: 2;
          transition: background 300ms;
        }
        .sdi-fade-bot {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: ${isCloud ? '120px' : '40px'};
          pointer-events: none;
          z-index: 2;
          transition: background 300ms;
        }
      `}</style>
    </div>
  )
}
