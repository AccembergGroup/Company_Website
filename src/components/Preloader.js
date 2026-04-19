'use client'

import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'acc_intro_seen'

// ── Timing constants (ms) ─────────────────────────────────
const T_ASSEMBLE  = 1800  // particles fly in and form text
const T_HOLD      = 1400  // text sits crisp
const T_DISSOLVE  = 1600  // text disintegrates to dust
const T_OVERLAY   = 700   // final full-screen fade out
const SAMPLE_STEP = 3     // sample every Nth pixel (perf)

function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4) }
function easeInQuart(t)  { return t * t * t * t }
function easeInOut(t)    { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2, 2)/2 }

export default function Preloader({ onDone }) {
  // null = checking, true = show, false = skip entirely
  const [show, setShow]         = useState(null)
  const [overlayFade, setOverlayFade] = useState(false)

  const canvasRef  = useRef(null)
  const videoRef   = useRef(null)
  const animIdRef  = useRef(null)
  const doneRef    = useRef(false)

  // ─── ONE-TIME check via sessionStorage ─────────────────
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false)
      onDone?.()
    } else {
      sessionStorage.setItem(SESSION_KEY, '1')
      setShow(true)
    }
  }, [])

  // ─── Particle engine ────────────────────────────────────
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

    // ── Build offscreen canvas with the text to sample ───
    const buildParticles = () => {
      const off  = document.createElement('canvas')
      off.width  = CW
      off.height = CH
      const oc   = off.getContext('2d')

      const bigSize   = Math.min(CW / 9, 82)
      const smallSize = bigSize * 0.44
      const cx = CW / 2
      const cy = CH / 2

      // "WELCOME TO" — white, above center
      oc.font         = `500 ${smallSize}px "Space Grotesk", sans-serif`
      oc.textAlign    = 'center'
      oc.textBaseline = 'alphabetic'
      oc.fillStyle    = 'rgba(200, 218, 240, 0.75)'
      oc.fillText('WELCOME TO', cx, cy - bigSize * 0.3)

      // "ACCEMBERG" — bold white, below
      oc.font      = `700 ${bigSize}px "Space Grotesk", sans-serif`
      oc.fillStyle = '#FFFFFF'
      oc.fillText('ACCEMBERG', cx, cy + bigSize * 0.9)

      // Sample pixels
      const { data } = oc.getImageData(0, 0, CW, CH)
      const particles = []

      for (let y = 0; y < CH; y += SAMPLE_STEP) {
        for (let x = 0; x < CW; x += SAMPLE_STEP) {
          const i = (y * CW + x) * 4
          if (data[i + 3] < 50) continue  // skip transparent

          const r = data[i], g = data[i+1], b = data[i+2]

          // Start positions: particles fly in from screen edges
          const edge = Math.floor(Math.random() * 4)
          let sx, sy
          switch (edge) {
            case 0: sx = Math.random() * CW;       sy = -60;       break // top
            case 1: sx = CW + 60;                  sy = Math.random() * CH; break // right
            case 2: sx = Math.random() * CW;       sy = CH + 60;   break // bottom
            default: sx = -60;                     sy = Math.random() * CH; break // left
          }

          // Dissolve velocity: mostly upward, slight horizontal drift
          const dvx = (Math.random() - 0.5) * 130
          const dvy = -(30 + Math.random() * 110)

          particles.push({
            sx, sy,                      // start (scatter)
            tx: x, ty: y,               // target (text pixel)
            dvx, dvy,                   // dissolve velocity
            r, g, b,
            a: data[i + 3] / 255,
            size: 1.8 + Math.random() * 1.6,
            delay: Math.random() * 0.25, // slight stagger on assembly
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
      setTimeout(() => onDone?.(), T_OVERLAY)
    }

    const render = (now) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime

      ctx.clearRect(0, 0, CW, CH)

      // ── Phase 1: Assemble ──────────────────────────────
      if (elapsed < T_ASSEMBLE) {
        const raw = elapsed / T_ASSEMBLE

        for (const p of particles) {
          const t      = Math.max(0, (raw - p.delay) / (1 - p.delay))
          const eased  = easeOutQuart(Math.min(t, 1))
          const opac   = Math.min(t * 5, 1) * p.a

          const x = p.sx + (p.tx - p.sx) * eased
          const y = p.sy + (p.ty - p.sy) * eased

          // Soft glow halo
          ctx.globalAlpha = opac * 0.18
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`
          ctx.fillRect(x - 1, y - 1, p.size + 3, p.size + 3)

          // Core particle
          ctx.globalAlpha = opac
          ctx.fillRect(x, y, p.size, p.size)
        }

      // ── Phase 2: Hold ──────────────────────────────────
      } else if (elapsed < T_ASSEMBLE + T_HOLD) {
        for (const p of particles) {
          // Subtle shimmer pulse
          const shimmer = 0.92 + 0.08 * Math.sin((elapsed / 400) + p.tx * 0.05)

          ctx.globalAlpha = p.a * shimmer
          ctx.fillStyle   = `rgb(${p.r},${p.g},${p.b})`

          ctx.globalAlpha = p.a * 0.18 * shimmer
          ctx.fillRect(p.tx - 1, p.ty - 1, p.size + 3, p.size + 3)

          ctx.globalAlpha = p.a * shimmer
          ctx.fillRect(p.tx, p.ty, p.size, p.size)
        }

      // ── Phase 3: Dissolve (sweep left → right) ─────────
      } else if (elapsed < T_ASSEMBLE + T_HOLD + T_DISSOLVE) {
        const dissolveRaw = (elapsed - T_ASSEMBLE - T_HOLD) / T_DISSOLVE

        for (const p of particles) {
          // Each particle starts dissolving based on its x-position (left→right sweep)
          const sweep  = (p.tx / CW) * 0.5        // 0–0.5 stagger based on x
          const localT = Math.max(0, (dissolveRaw - sweep) / (1 - sweep * 0.5))
          if (localT <= 0) {
            // Not yet dissolving — still crisp
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

      // ── Phase 4: Done ──────────────────────────────────
      } else {
        ctx.globalAlpha = 0
        triggerDone()
        return // stop loop
      }

      ctx.globalAlpha = 1
      animIdRef.current = requestAnimationFrame(render)
    }

    // Wait for fonts to be available before sampling
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

  // Not checked yet or already seen
  if (show === false || show === null) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-base)',
        transition: overlayFade ? `opacity ${T_OVERLAY}ms cubic-bezier(0.16,1,0.3,1)` : 'none',
        opacity: overlayFade ? 0 : 1,
        pointerEvents: overlayFade ? 'none' : 'all',
      }}
    >
      {/* Video — full-screen background, very subtle */}
      <video
        ref={videoRef}
        src="/Accemberg_inro.mp4"
        autoPlay
        muted
        playsInline
        loop
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.12,
        }}
      />

      {/* Dark vignette over video */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(7,11,16,0.55) 0%, rgba(7,11,16,0.92) 100%)',
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
