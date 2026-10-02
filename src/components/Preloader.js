'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const SESSION_KEY = 'acc_intro_seen_v3'

const T_ASSEMBLE  = 1000  
const T_HOLD      = 500   
const T_DISSOLVE  = 800   
const T_OVERLAY   = 400   
const SAMPLE_STEP = 3     

function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4) }
function easeInQuart(t)  { return t * t * t * t }
function easeInOut(t)    { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2 }

export default function Preloader({ onDone }) {
  
  const [show, setShow]             = useState(null)
  const [overlayFade, setOverlayFade] = useState(false)

  const canvasRef  = useRef(null)
  const animIdRef  = useRef(null)
  const doneRef    = useRef(false)

  
  useEffect(() => {
    
    setTimeout(() => setShow(true), 0)
  }, [])

  
  useEffect(() => {
    if (show === true) {
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [show])

  
  useEffect(() => {
    if (show !== true) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const CW  = document.documentElement.clientWidth || window.innerWidth
    const CH  = document.documentElement.clientHeight || window.innerHeight

    canvas.width  = CW * DPR
    canvas.height = CH * DPR
    canvas.style.width  = `${CW}px`
    canvas.style.height = `${CH}px`
    ctx.scale(DPR, DPR)

    
    const buildParticles = () => {
      const off  = document.createElement('canvas')
      off.width  = CW
      off.height = CH
      const oc   = off.getContext('2d')

      const bigSize   = Math.min(CW / 9, 82)
      const smallSize = bigSize * 0.44
      const cx = CW / 2
      const cy = CH / 2

      
      oc.font         = `500 ${smallSize}px "Space Grotesk", sans-serif`
      oc.textAlign    = 'center'
      oc.textBaseline = 'alphabetic'
      oc.fillStyle    = 'rgba(200, 218, 240, 0.75)'
      oc.fillText('WELCOME TO', cx, cy - bigSize * 0.3)

      
      oc.font      = `700 ${bigSize}px "Space Grotesk", sans-serif`
      oc.fillStyle = '#FFFFFF'
      oc.fillText('ACCEMBERG', cx, cy + bigSize * 0.9)

      
      const { data } = oc.getImageData(0, 0, CW, CH)
      const particles = []

      for (let y = 0; y < CH; y += SAMPLE_STEP) {
        for (let x = 0; x < CW; x += SAMPLE_STEP) {
          const i = (y * CW + x) * 4
          if (data[i + 3] < 50) continue  

          const r = data[i], g = data[i+1], b = data[i+2]

          
          const edge = Math.floor(Math.random() * 4)
          let sx, sy
          switch (edge) {
            case 0: sx = Math.random() * CW;       sy = -60;       break 
            case 1: sx = CW + 60;                  sy = Math.random() * CH; break 
            case 2: sx = Math.random() * CW;       sy = CH + 60;   break 
            default: sx = -60;                     sy = Math.random() * CH; break 
          }

          
          const dvx = (Math.random() - 0.5) * 130
          const dvy = -(30 + Math.random() * 110)

          particles.push({
            sx, sy,                      
            tx: x, ty: y,               
            dvx, dvy,                   
            r, g, b,
            a: data[i + 3] / 255,
            size: 1.8 + Math.random() * 1.6,
            delay: Math.random() * 0.25, 
          })
        }
      }

      return particles
    }

    let particles = []
    let startTime = null

    const triggerDone = () => {
      if (doneRef.current) return
      doneRef.current = true
      setOverlayFade(true)
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      setTimeout(() => onDone?.(), T_OVERLAY)
    }

    const render = (now) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime

      ctx.clearRect(0, 0, CW, CH)

      
      if (elapsed < T_ASSEMBLE) {
        const raw = elapsed / T_ASSEMBLE

        for (const p of particles) {
          const t      = Math.max(0, (raw - p.delay) / (1 - p.delay))
          const eased  = easeOutQuart(Math.min(t, 1))
          const opac   = Math.min(t * 5, 1) * p.a

          const x = p.sx + (p.tx - p.sx) * eased
          const y = p.sy + (p.ty - p.sy) * eased

          
          ctx.globalAlpha = opac * 0.18
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`
          ctx.fillRect(x - 1, y - 1, p.size + 3, p.size + 3)

          
          ctx.globalAlpha = opac
          ctx.fillRect(x, y, p.size, p.size)
        }

      
      } else if (elapsed < T_ASSEMBLE + T_HOLD) {
        for (const p of particles) {
          
          const shimmer = 0.92 + 0.08 * Math.sin((elapsed / 400) + p.tx * 0.05)

          ctx.globalAlpha = p.a * shimmer
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`

          ctx.globalAlpha = p.a * 0.18 * shimmer
          ctx.fillRect(p.tx - 1, p.ty - 1, p.size + 3, p.size + 3)

          ctx.globalAlpha = p.a * shimmer
          ctx.fillRect(p.tx, p.ty, p.size, p.size)
        }

      
      } else if (elapsed < T_ASSEMBLE + T_HOLD + T_DISSOLVE) {
        const dissolveRaw = (elapsed - T_ASSEMBLE - T_HOLD) / T_DISSOLVE

        for (const p of particles) {
          
          const sweep  = (p.tx / CW) * 0.5        
          const localT = Math.max(0, (dissolveRaw - sweep) / (1 - sweep * 0.5))
          if (localT <= 0) {
            
            ctx.globalAlpha = p.a
            ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`
            ctx.fillRect(p.tx, p.ty, p.size, p.size)
            continue
          }

          const t     = Math.min(localT, 1)
          const eased = easeInQuart(t)
          const opac  = (1 - eased) * p.a

          const x = p.tx + p.dvx * eased
          const y = p.ty + p.dvy * eased
          const sz = p.size * (1 - eased * 0.6)

          ctx.globalAlpha = opac * 0.2
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`
          ctx.fillRect(x - 1, y - 1, sz + 3, sz + 3)

          ctx.globalAlpha = opac
          ctx.fillRect(x, y, sz, sz)
        }

      
      } else {
        ctx.globalAlpha = 0
        triggerDone()
        return 
      }

      ctx.globalAlpha = 1
      animIdRef.current = requestAnimationFrame(render)
    }

    
    const FONT_SIZE = Math.min(window.innerWidth / 9, 82)
    Promise.all([
      document.fonts.ready,
      document.fonts.load(`700 ${FONT_SIZE}px "Space Grotesk"`),
    ]).then(() => {
      particles = buildParticles()
      animIdRef.current = requestAnimationFrame(render)
    })

    return () => cancelAnimationFrame(animIdRef.current)
    
  }, [show])

  
  if (show === false || show === null) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#070B10',
        transition: overlayFade ? `opacity ${T_OVERLAY}ms cubic-bezier(0.16,1,0.3,1)` : 'none',
        opacity: overlayFade ? 0 : 1,
        pointerEvents: overlayFade ? 'none' : 'all',
      }}
    >
      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(13,27,75,0.55) 0%, #070B10 65%)',
        }}
      />

      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        
        <div style={{
          position: 'absolute',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(13,27,75,0.6) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'preloader-pulse 5s ease-in-out infinite',
        }} />

        
        <div style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(21,101,192,0.45) 0%, transparent 65%)',
          filter: 'blur(40px)',
          animation: 'preloader-pulse 4s ease-in-out infinite 0.6s',
        }} />

        
        <div style={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,195,247,0.35) 0%, transparent 70%)',
          filter: 'blur(18px)',
          animation: 'preloader-pulse 3s ease-in-out infinite 1.2s',
        }} />

        <Image
          src="/logo-transparent-new.png"
          alt=""
          width={260}
          height={260}
          style={{
            objectFit: 'contain',
            opacity: 0.22,
            animation: 'preloader-breathe 6s ease-in-out infinite',
            position: 'relative',
            zIndex: 2,
            
            filter: 'brightness(100) saturate(0) drop-shadow(0 0 24px rgba(255,255,255,0.3)) drop-shadow(0 0 60px rgba(79,195,247,0.25))',
            width: 'auto',
            height: 'auto',
          }}
          priority
        />
      </div>

      
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          zIndex: 2,
        }}
      />

      
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />
      <style>{`
        @keyframes preloader-pulse {
          0%, 100% { transform: scale(1);    opacity: 0.75; }
          50%       { transform: scale(1.12); opacity: 1;    }
        }
        @keyframes preloader-breathe {
          0%, 100% { transform: scale(1);    opacity: 0.22; }
          50%       { transform: scale(1.06); opacity: 0.30; }
        }
      `}</style>
    </div>
  )
}
