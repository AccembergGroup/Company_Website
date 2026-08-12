'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export default function HeroWaveCanvas() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animFrameId

    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const cols = 28
    const rows = 18
    let t = 0
    const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false

    const render = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      if (!prefersReduced) {
        t += 0.015
      }

      const fov = 350
      const xc = width / 2
      const yc = height / 2 + 50 // center of perspective

      // Draw rows (horizontal grid lines)
      for (let r = 0; r < rows; r++) {
        ctx.beginPath()
        for (let c = 0; c < cols; c++) {
          const x3d = (c - cols / 2) * (width / (cols - 1.2))
          const y3d = (r - rows / 2) * (height / (rows - 0.8))

          const dist = Math.sqrt(x3d * x3d + y3d * y3d)
          const z3d = Math.sin(dist * 0.008 - t * 2) * 55 * Math.exp(-dist * 0.0006)

          const angleX = -0.45
          const rotatedY = y3d * Math.cos(angleX) - z3d * Math.sin(angleX)
          const rotatedZ = y3d * Math.sin(angleX) + z3d * Math.cos(angleX) + 240

          const scale = fov / (fov + rotatedZ)
          const sx = xc + x3d * scale
          const sy = yc + rotatedY * scale

          if (c === 0) {
            ctx.moveTo(sx, sy)
          } else {
            ctx.lineTo(sx, sy)
          }
        }

        const alpha = (r / rows) * 0.14
        ctx.strokeStyle = theme === 'dark'
          ? `rgba(79, 195, 247, ${alpha})`
          : `rgba(21, 101, 192, ${alpha})`
        ctx.lineWidth = 1.0
        ctx.stroke()
      }

      // Draw cols (vertical grid lines)
      for (let c = 0; c < cols; c++) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          const x3d = (c - cols / 2) * (width / (cols - 1.2))
          const y3d = (r - rows / 2) * (height / (rows - 0.8))

          const dist = Math.sqrt(x3d * x3d + y3d * y3d)
          const z3d = Math.sin(dist * 0.008 - t * 2) * 55 * Math.exp(-dist * 0.0006)

          const angleX = -0.45
          const rotatedY = y3d * Math.cos(angleX) - z3d * Math.sin(angleX)
          const rotatedZ = y3d * Math.sin(angleX) + z3d * Math.cos(angleX) + 240

          const scale = fov / (fov + rotatedZ)
          const sx = xc + x3d * scale
          const sy = yc + rotatedY * scale

          if (r === 0) {
            ctx.moveTo(sx, sy)
          } else {
            ctx.lineTo(sx, sy)
          }
        }
        const alpha = 0.04
        ctx.strokeStyle = theme === 'dark'
          ? `rgba(79, 195, 247, ${alpha})`
          : `rgba(21, 101, 192, ${alpha})`
        ctx.lineWidth = 0.8
        ctx.stroke()
      }

      if (!prefersReduced) {
        animFrameId = requestAnimationFrame(render)
      }
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
      if (prefersReduced) {
        render()
      }
    }
    window.addEventListener('resize', handleResize)

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameId) {
        cancelAnimationFrame(animFrameId)
      }
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.7,
      }}
    />
  )
}
