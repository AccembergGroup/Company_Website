'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Play } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { useTheme } from '@/components/ThemeProvider'
import Magnetic from '@/components/Magnetic'
import HeroWaveCanvas from './HeroWaveCanvas'
import ScrambleText from './ScrambleText'

const ORBIT_RADIUS = 220   
const ORBIT_RADIUS_Y = 176  
const ORBIT_MS = 28000     

const ORBIT_ITEMS = [
  { id: 'api', icon: '</>', label: 'API', accent: '#4FC3F7', glow: 'rgba(79,195,247,0.65)', baseSize: 70 },
  { id: 'nextjs', icon: '▲', label: 'NEXT.JS', accent: '#E2E8F0', glow: 'rgba(226,232,240,0.55)', baseSize: 56 },
  { id: 'aiml', icon: '◆', label: 'AI / ML', accent: '#A78BFA', glow: 'rgba(167,139,250,0.65)', baseSize: 56 },
  { id: 'react', icon: '⬡', label: 'REACT', accent: '#61DAFB', glow: 'rgba(97,218,251,0.65)', baseSize: 56 },
  { id: 'cloud', icon: '☁', label: 'CLOUD', accent: '#34D399', glow: 'rgba(52,211,153,0.65)', baseSize: 56 },
  { id: 'aws', icon: '◈', label: 'AWS', accent: '#FF9900', glow: 'rgba(255,153,0,0.65)', baseSize: 56 },
  { id: 'db', icon: '⬡', label: 'DB', accent: '#FBBF24', glow: 'rgba(251,191,36,0.65)', baseSize: 70 },
  { id: 'devops', icon: '◈', label: 'DEVOPS', accent: '#F472B6', glow: 'rgba(244,114,182,0.65)', baseSize: 70 },
]

const TRUSTED_BRANDS = [
  {
    name: 'OpenAI', color: '#10A37F',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#10A37F">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
      </svg>
    ),
  },
  {
    name: 'AWS', color: '#FF9900',
    logo: (
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
        <text x="0" y="16" fontSize="16" fontWeight="bold" fill="#FF9900">AWS</text>
        <path d="M2 20 Q 20 26 38 18" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M34 18 L 38 18 L 36 22" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Google Cloud', color: '#4285F4',
    logo: (
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
        <path d="M12 4L4 18H28L20 4H12Z" stroke="#34A853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="14" r="3" fill="#EA4335" stroke="#FBBC05" strokeWidth="2" />
        <path d="M12 4L16 11" stroke="#4285F4" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Vercel', color: 'var(--text-primary)',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--text-primary)">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
  {
    name: 'Shopify', color: '#95BF47',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#95BF47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    name: 'Figma', color: '#F24E1E',
    logo: (
      <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
        <path d="M10 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" fill="#F24E1E" />
        <path d="M10 14a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="#1ABCFE" />
        <path d="M10 14a5 5 0 1 0-10 0 5 5 0 0 0 10 0z" fill="#0ACF83" />
      </svg>
    ),
  },
  {
    name: 'Stripe', color: '#635BFF',
    logo: (
      <svg width="45" height="24" viewBox="0 0 45 24" fill="none">
        <text x="0" y="18" fontSize="20" fontWeight="900" fill="#635BFF" letterSpacing="-1">stripe</text>
      </svg>
    ),
  },
  {
    name: 'Coinbase', color: '#0052FF',
    logo: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
        <circle cx="12" cy="12" r="4" fill="#0052FF" />
      </svg>
    ),
  },
]

const TECH_DETAILS = {
  'API': { desc: 'High-performance REST & GraphQL APIs. We architect scalable, secure API layers with sub-14ms response times that power your entire ecosystem.', tag: 'Backend Services', capabilities: ['REST', 'GRAPHQL', 'gRPC'] },
  'NEXT.JS': { desc: 'Enterprise Next.js applications with server-side rendering, edge functions, and optimized delivery — built for performance and SEO from day one.', tag: 'Frontend Framework', capabilities: ['SSR', 'EDGE ROUTING', 'TURBOPACK'] },
  'AI / ML': { desc: 'Custom ML pipelines, LLM integrations, and AI-powered features embedded directly into your product for measurable business impact.', tag: 'Intelligence Layer', capabilities: ['LLMS', 'ML PIPELINES', 'AGENTS'] },
  'REACT': { desc: 'Precision-crafted React applications with component systems, state management, and pixel-perfect UIs that scale across teams.', tag: 'UI Engineering', capabilities: ['COMPONENTS', 'REDUX', 'VIRTUAL DOM'] },
  'CLOUD': { desc: 'Multi-cloud architecture design, infrastructure-as-code, and cloud-native solutions that eliminate single points of failure.', tag: 'Cloud Architecture', capabilities: ['KUBERNETES', 'TERRAFORM', 'CNCF'] },
  'AWS': { desc: 'Deep AWS expertise — from serverless Lambda functions to EKS clusters and RDS deployments, we architect production-ready AWS stacks.', tag: 'Cloud Platform', capabilities: ['LAMBDA', 'EKS', 'RDS'] },
  'DB': { desc: 'Database architecture for scale — PostgreSQL, Redis, MongoDB, and time-series solutions with query optimization and zero-downtime migrations.', tag: 'Data Engineering', capabilities: ['POSTGRESQL', 'REDIS', 'MONGODB'] },
  'DEVOPS': { desc: 'Full CI/CD pipeline design, container orchestration, monitoring, and automated deployment strategies for resilient delivery.', tag: 'Platform Operations', capabilities: ['CI/CD', 'DOCKER', 'PROMETHEUS'] },
}

function OrbitRing({ radiusX, radiusY, items, durationMs, paused, reducedMotion }) {
  const { theme } = useTheme()

  
  const LOGO_SIZE = 112    
  const MAX_CARD = 70     
  const STAGE_W = radiusX * 2 + MAX_CARD + 40
  const STAGE_H = radiusY * 2 + MAX_CARD + 40
  const CX = STAGE_W / 2
  const CY = STAGE_H / 2

  
  const stageRef = useRef(null)
  const planeRef = useRef(null)
  const nodeRefs = useRef([])
  const particleRefs = useRef([])
  const angleRef = useRef(0)
  const currentSpeedRef = useRef(1.0)
  const targetSpeedRef = useRef(1.0)
  const lineRef = useRef(null)
  const pin1Ref = useRef(null)
  const popoverCoordsRef = useRef(null)
  const hoveredIdxRef = useRef(null)

  
  const logoWrapperRef = useRef(null)
  const logoSphereRef = useRef(null)
  const pulseRef = useRef(null)
  const primaryRingRef = useRef(null)
  const secondaryRingRef = useRef(null)
  const p1Ref = useRef(null)
  const p2Ref = useRef(null)
  const highlightSectorRef = useRef(null)

  const logoTiltRef = useRef({ x: 0, y: 0, strength: 0 })
  const currentLogoTilt = useRef({ x: 0, y: 0, strength: 0 })
  const primaryRingAngleRef = useRef(0)
  const secondaryRingAngleRef = useRef(0)
  const p1AngleRef = useRef(0)
  const p2AngleRef = useRef(0)
  const pulseScaleRef = useRef(1.0)
  const pulseOpacityRef = useRef(0)
  const isLogoHoveredRef = useRef(false)
  const lastLogoHoveredRef = useRef(false)
  const connectionAngleRef = useRef(0)
  const connectionStrengthRef = useRef(0)

  
  const positionSettersRef = useRef([])
  const scaleSettersRef = useRef([])

  
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [popoverCoords, setPopoverCoords] = useState(null)

  
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || paused) return

    const hero = stage.closest('#hero')
    if (!hero) return

    const onMouseMove = (e) => {
      const rect = stageRef.current?.getBoundingClientRect()
      if (!rect) return

      const logoCX = rect.left + rect.width / 2
      const logoCY = rect.top + rect.height / 2
      const dx = e.clientX - logoCX
      const dy = e.clientY - logoCY
      const distance = Math.sqrt(dx * dx + dy * dy)

      const maxDist = 300
      const strength = Math.max(0, 1 - distance / maxDist)

      logoTiltRef.current = {
        x: (dy / maxDist) * -3.0, 
        y: (dx / maxDist) * 3.0,  
        strength: strength
      }
    }

    const onMouseLeave = () => {
      logoTiltRef.current = { x: 0, y: 0, strength: 0 }
    }

    hero.addEventListener('mousemove', onMouseMove, { passive: true })
    hero.addEventListener('mouseleave', onMouseLeave)
    return () => {
      hero.removeEventListener('mousemove', onMouseMove)
      hero.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [paused])

  
  useEffect(() => {
    const nodes = nodeRefs.current.filter(Boolean)

    
    nodes.forEach(node => {
      gsap.set(node, { xPercent: -50, yPercent: -50 })
    })

    positionSettersRef.current = nodes.map(node => ({
      x: gsap.quickSetter(node, 'x', 'px'),
      y: gsap.quickSetter(node, 'y', 'px')
    }))

    scaleSettersRef.current = nodes.map(node => {
      const depthWrap = node.querySelector('.orb-depth-wrap')
      return depthWrap ? gsap.quickSetter(depthWrap, 'scale') : null
    })
  }, [items])

  
  useEffect(() => {
    if (paused) return

    const tick = (time, deltaTime) => {
      const dt = deltaTime || 16.67 

      
      currentSpeedRef.current += (targetSpeedRef.current - currentSpeedRef.current) * 0.1

      const dAngle = (dt / durationMs) * Math.PI * 2 * currentSpeedRef.current
      angleRef.current += dAngle

      const a0 = angleRef.current
      const nodes = nodeRefs.current.filter(Boolean)
      const n = nodes.length

      
      const isDark = theme === 'dark'
      const breath = Math.sin(time * (2 * Math.PI / 4.0)) * 0.5 + 0.5 
      const breathScale = 1.0 + breath * 0.015

      const tilt = currentLogoTilt.current
      const targetTilt = logoTiltRef.current
      tilt.x += (targetTilt.x - tilt.x) * 0.1
      tilt.y += (targetTilt.y - tilt.y) * 0.1
      tilt.strength += (targetTilt.strength - tilt.strength) * 0.1

      
      if (logoWrapperRef.current) {
        logoWrapperRef.current.style.transform = `translate3d(0, 0, 15px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale(${breathScale.toFixed(4)})`
      }

      
      const directHoverBonus = isLogoHoveredRef.current ? 0.25 : 0.0
      if (isLogoHoveredRef.current && !lastLogoHoveredRef.current) {
        pulseScaleRef.current = 1.0
        pulseOpacityRef.current = 0.85
      }
      lastLogoHoveredRef.current = isLogoHoveredRef.current

      
      if (pulseOpacityRef.current > 0) {
        pulseScaleRef.current += (dt * 0.001) * 0.8
        pulseOpacityRef.current -= (dt * 0.001) * 2.2
        if (pulseRef.current) {
          pulseRef.current.style.transform = `scale(${pulseScaleRef.current.toFixed(3)})`
          pulseRef.current.style.opacity = Math.max(0, pulseOpacityRef.current).toFixed(3)
        }
      }

      
      if (logoSphereRef.current) {
        const bgX = 35 + tilt.y * 3
        const bgY = 32 + tilt.x * -3
        const sphereGlowOpacity = 0.22 + tilt.strength * 0.08 + directHoverBonus * 0.15

        logoSphereRef.current.style.background = isDark
          ? `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(79,195,247,${sphereGlowOpacity.toFixed(2)}) 0%, rgba(8,18,42,0.98) 100%)`
          : `radial-gradient(circle at ${bgX}% ${bgY}%, rgba(255,255,255,0.95) 0%, rgba(220,230,255,0.95) 100%)`

        const borderOpacity = isDark
          ? (0.35 + directHoverBonus * 0.2).toFixed(2)
          : (0.22 + directHoverBonus * 0.1).toFixed(2)
        logoSphereRef.current.style.borderColor = isDark
          ? `rgba(79,195,247,${borderOpacity})`
          : `rgba(21,101,192,${borderOpacity})`

        const shadowBlur = isDark ? (28 + directHoverBonus * 12) : (28 + directHoverBonus * 8)
        const shadowGlowOpacity = isDark ? (0.22 + directHoverBonus * 0.15) : (0.10 + directHoverBonus * 0.05)
        logoSphereRef.current.style.boxShadow = isDark
          ? `0 0 ${shadowBlur}px rgba(79,195,247,${shadowGlowOpacity}), inset 0 1px 0 rgba(255,255,255,0.15)`
          : `0 0 ${shadowBlur}px rgba(21,101,192,${shadowGlowOpacity}), inset 0 1px 0 rgba(255,255,255,0.5)`
      }

      
      const pSpeed = isLogoHoveredRef.current ? 0.65 : 0.5
      primaryRingAngleRef.current += (dt * 0.001) * pSpeed
      if (primaryRingRef.current) {
        primaryRingRef.current.style.transform = `rotate(${(primaryRingAngleRef.current * 180 / Math.PI).toFixed(1)}deg)`
      }

      
      secondaryRingAngleRef.current += (dt * 0.001) * (-0.25)
      if (secondaryRingRef.current) {
        secondaryRingRef.current.style.transform = `rotate(${(secondaryRingAngleRef.current * 180 / Math.PI).toFixed(1)}deg)`
      }

      
      p1AngleRef.current += (dt * 0.001) * (isLogoHoveredRef.current ? 1.4 : 1.1)
      const p1x = 64 * Math.cos(p1AngleRef.current)
      const p1y = 64 * Math.sin(p1AngleRef.current)
      if (p1Ref.current) {
        gsap.set(p1Ref.current, { x: p1x, y: p1y, xPercent: -50, yPercent: -50 })
      }

      p2AngleRef.current += (dt * 0.001) * (-0.7)
      const p2x = 72 * Math.cos(p2AngleRef.current)
      const p2y = 72 * Math.sin(p2AngleRef.current)
      if (p2Ref.current) {
        gsap.set(p2Ref.current, { x: p2x, y: p2y, xPercent: -50, yPercent: -50 })
      }

      
      const pGlow = 0.5 + tilt.strength * 0.5
      if (p1Ref.current) p1Ref.current.style.opacity = pGlow.toFixed(2)
      if (p2Ref.current) p2Ref.current.style.opacity = (pGlow * 0.8).toFixed(2)

      
      if (hoveredIdxRef.current !== null) {
        const theta = a0 + (2 * Math.PI / n) * hoveredIdxRef.current
        connectionAngleRef.current = theta
        connectionStrengthRef.current += (1.0 - connectionStrengthRef.current) * 0.1
      } else {
        connectionStrengthRef.current += (0.0 - connectionStrengthRef.current) * 0.1
      }

      if (highlightSectorRef.current) {
        const str = connectionStrengthRef.current
        highlightSectorRef.current.setAttribute('opacity', (str * 0.75).toFixed(2))
        if (str > 0.01) {
          const ang = connectionAngleRef.current
          const arcR = 64
          const angleStart = ang - 0.2
          const angleEnd = ang + 0.2
          const hx1 = 100 + arcR * Math.cos(angleStart)
          const hy1 = 100 + arcR * Math.sin(angleStart)
          const hx2 = 100 + arcR * Math.cos(angleEnd)
          const hy2 = 100 + arcR * Math.sin(angleEnd)
          highlightSectorRef.current.setAttribute('d', `M ${hx1.toFixed(1)} ${hy1.toFixed(1)} A ${arcR} ${arcR} 0 0 1 ${hx2.toFixed(1)} ${hy2.toFixed(1)}`)
        }
      }

      
      nodes.forEach((node, i) => {
        if (!node) return
        const item = items[i]

        const theta = a0 + (2 * Math.PI / n) * i

        
        const x = CX + radiusX * Math.cos(theta)
        const y = CY + radiusY * Math.sin(theta)

        const depthVal = Math.sin(theta) 
        const depthScale = 0.96 + depthVal * 0.10

        
        const posSetter = positionSettersRef.current[i]
        if (posSetter) {
          posSetter.x(x)
          posSetter.y(y)
        }

        
        const scaleSetter = scaleSettersRef.current[i]
        if (scaleSetter) {
          scaleSetter(depthScale)
        }

        const isHovered = hoveredIdxRef.current === i
        node.style.zIndex = Math.round(180 + depthVal * 50 + (isHovered ? 40 : 0))

        let finalOpacity = 0.86 + depthVal * 0.14
        const isDimmed = hoveredIdxRef.current !== null && !isHovered
        if (isDimmed) {
          finalOpacity = Math.max(finalOpacity * 0.88, 0.65)
        }
        node.style.opacity = finalOpacity.toFixed(3)

        
        const cardInner = node.querySelector('.orb-card-inner')
        if (cardInner) {
          const glowAmt = isHovered ? 0.75 : (0.28 + depthVal * 0.12)
          const glowColor = item.glow.replace(/rgba?\(([^)]+)\)/, (match, g) => {
            const parts = g.split(',')
            parts[3] = glowAmt.toFixed(2)
            return `rgba(${parts.join(',')})`
          })

          cardInner.style.boxShadow = `0 4px 10px rgba(0,0,0,0.5), 0 0 ${(isHovered ? 18 : 10)}px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`
          cardInner.style.borderColor = isHovered ? `${item.accent}cc` : `${item.accent}33`
        }
      })

      
      const PARTS = [
        { speed: 1.5, phase: 0 },
        { speed: 1.2, phase: Math.PI }
      ]
      PARTS.forEach(({ speed, phase }, idx) => {
        const pNode = particleRefs.current[idx]
        if (!pNode) return
        const pt = a0 * speed + phase
        const px = CX + radiusX * Math.cos(pt)
        const py = CY + radiusY * Math.sin(pt)
        gsap.set(pNode, { x: px, y: py, xPercent: -50, yPercent: -50 })
      })

      
      const currentCoords = popoverCoordsRef.current
      if (hoveredIdxRef.current !== null && lineRef.current && currentCoords) {
        const theta = a0 + (2 * Math.PI / n) * hoveredIdxRef.current
        const px = CX + radiusX * Math.cos(theta)
        const py = CY + radiusY * Math.sin(theta)

        lineRef.current.setAttribute('x1', px.toFixed(1))
        lineRef.current.setAttribute('y1', py.toFixed(1))

        if (pin1Ref.current) {
          pin1Ref.current.setAttribute('cx', px.toFixed(1))
          pin1Ref.current.setAttribute('cy', py.toFixed(1))
        }
      }
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
    
  }, [paused, radiusX, radiusY, items])

  
  const getPopoverCoords = (cx, cy, cardSize) => {
    const w = 300 
    const h = 130 
    const gap = 20
    const half = cardSize / 2
    const minX = 16
    const maxX = STAGE_W - 16
    const minY = 16
    const maxY = STAGE_H - 16

    const candidates = [
      
      {
        name: 'right',
        x: cx + half + gap,
        y: cy - h / 2,
        targetX: cx + half,
        targetY: cy
      },
      
      {
        name: 'left',
        x: cx - half - gap - w,
        y: cy - h / 2,
        targetX: cx - half,
        targetY: cy
      },
      
      {
        name: 'above',
        x: cx - w / 2,
        y: cy - half - gap - h,
        targetX: cx,
        targetY: cy - half
      },
      
      {
        name: 'below',
        x: cx - w / 2,
        y: cy + half + gap,
        targetX: cx,
        targetY: cy + half
      }
    ]

    
    let selected = candidates.find(c =>
      c.x >= minX && c.x + w <= maxX && c.y >= minY && c.y + h <= maxY
    )

    if (!selected) {
      
      const preferRight = cx <= STAGE_W / 2
      selected = preferRight ? candidates[0] : candidates[1]
    }

    
    const popoverX = Math.max(minX, Math.min(selected.x, maxX - w))
    const popoverY = Math.max(minY, Math.min(selected.y, maxY - h))

    
    let targetX = selected.targetX
    let targetY = selected.targetY

    
    if (selected.name === 'right') {
      targetX = popoverX
      targetY = cy
    } else if (selected.name === 'left') {
      targetX = popoverX + w
      targetY = cy
    } else if (selected.name === 'above') {
      targetX = cx
      targetY = popoverY + h
    } else if (selected.name === 'below') {
      targetX = cx
      targetY = popoverY
    }

    return { popoverX, popoverY, targetX, targetY }
  }

  
  useEffect(() => {
    if (hoveredIdx === null) {
      setTimeout(() => setPopoverCoords(null), 0)
      popoverCoordsRef.current = null
      return
    }

    const calculatePos = () => {
      const item = items[hoveredIdx]
      const size = item.baseSize || 56

      const theta = angleRef.current + (2 * Math.PI / items.length) * hoveredIdx
      const px = CX + radiusX * Math.cos(theta)
      const py = CY + radiusY * Math.sin(theta)

      const coords = getPopoverCoords(px, py, size)
      setPopoverCoords(coords)
      popoverCoordsRef.current = coords
    }

    calculatePos()

    window.addEventListener('resize', calculatePos)
    return () => {
      window.removeEventListener('resize', calculatePos)
    }
    
  }, [hoveredIdx, CX, CY, radiusX, radiusY, items])

  
  const handlePointerEnter = (i) => {
    setHoveredIdx(i)
    hoveredIdxRef.current = i
    targetSpeedRef.current = 0.0 

    
    const nodes = nodeRefs.current.filter(Boolean)
    const activeNode = nodes[i]
    if (activeNode) {
      const hoverWrap = activeNode.querySelector('.orb-hover-wrap')
      if (hoverWrap) {
        gsap.to(hoverWrap, { scale: 1.12, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
      }
    }
  }

  const handlePointerLeave = (i) => {
    setHoveredIdx(null)
    hoveredIdxRef.current = null
    targetSpeedRef.current = 1.0 

    
    const nodes = nodeRefs.current.filter(Boolean)
    const activeNode = nodes[i]
    if (activeNode) {
      const hoverWrap = activeNode.querySelector('.orb-hover-wrap')
      if (hoverWrap) {
        gsap.to(hoverWrap, { scale: 1.0, duration: 0.2, ease: 'power2.out', overwrite: 'auto' })
      }
    }
  }

  const isDark = theme === 'dark'

  return (
    <div
      ref={stageRef}
      className="orbit-stage-container"
      style={{
        position: 'relative',
        width: STAGE_W,
        height: STAGE_H,
      }}
    >
      
      <div
        ref={planeRef}
        style={{
          position: 'absolute',
          inset: 0,
        }}
      >
        
        <div style={{
          position: 'absolute',
          top: CY - radiusY,
          left: CX - radiusX,
          width: radiusX * 2,
          height: radiusY * 2,
          borderRadius: '50%',
          border: '1.5px dashed rgba(79,195,247,0.22)',
          boxShadow: '0 0 32px rgba(21,101,192,0.12), inset 0 0 32px rgba(21,101,192,0.04)',
          pointerEvents: 'none',
        }} />

        
        <div
          ref={logoWrapperRef}
          className="orbit-gsap-logo orbit-logo-core"
          style={{
            position: 'absolute',
            left: CX,
            top: CY,
            width: 0,
            height: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 180,
            transformStyle: 'preserve-3d',
          }}
        >
          
          <div
            ref={pulseRef}
            style={{
              position: 'absolute',
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              borderRadius: '50%',
              border: `2.2px solid ${isDark ? 'rgba(79,195,247,0.5)' : 'rgba(21,101,192,0.45)'}`,
              pointerEvents: 'none',
              transform: 'scale(1)',
              opacity: 0,
            }}
          />

          
          <div
            ref={logoSphereRef}
            onPointerEnter={() => { isLogoHoveredRef.current = true }}
            onPointerLeave={() => { isLogoHoveredRef.current = false }}
            style={{
              position: 'absolute',
              width: LOGO_SIZE,
              height: LOGO_SIZE,
              borderRadius: '50%',
              background: isDark
                ? 'radial-gradient(circle at 35% 32%, rgba(20,50,120,0.85) 0%, rgba(8,18,42,0.98) 100%)'
                : 'radial-gradient(circle at 35% 32%, rgba(255,255,255,0.95) 0%, rgba(220,230,255,0.95) 100%)',
              backdropFilter: 'blur(10px)',
              border: isDark
                ? '1px solid rgba(79,195,247,0.35)'
                : '1px solid rgba(21,101,192,0.22)',
              boxShadow: isDark
                ? '0 0 28px rgba(79,195,247,0.22), inset 0 1px 0 rgba(255,255,255,0.15)'
                : '0 0 28px rgba(21,101,192,0.1), inset 0 1px 0 rgba(255,255,255,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              cursor: 'pointer',
              pointerEvents: 'auto',
            }}
          >
            <Image
              src="/logo-transparent-new.png"
              alt="Accemberg"
              width={72}
              height={72}
              priority
              style={{ objectFit: 'contain', display: 'block', pointerEvents: 'none', width: 'auto', height: 'auto' }}
            />
          </div>

          
          <svg
            style={{
              position: 'absolute',
              width: 200,
              height: 200,
              pointerEvents: 'none',
            }}
          >
            
            <circle
              cx="100"
              cy="100"
              r="58"
              fill="none"
              stroke={isDark ? 'rgba(79,195,247,0.06)' : 'rgba(21,101,192,0.05)'}
              strokeWidth="4"
            />

            
            <circle
              ref={primaryRingRef}
              cx="100"
              cy="100"
              r="64"
              fill="none"
              stroke={isDark ? 'rgba(79, 195, 247, 0.45)' : 'rgba(21, 101, 192, 0.42)'}
              strokeWidth="1.2"
              strokeDasharray="245.7 44.7 67.0 44.7"
              style={{ transformOrigin: 'center' }}
            />

            
            <circle
              ref={secondaryRingRef}
              cx="100"
              cy="100"
              r="72"
              fill="none"
              stroke={isDark ? 'rgba(79, 195, 247, 0.2)' : 'rgba(21, 101, 192, 0.18)'}
              strokeWidth="0.8"
              strokeDasharray="6 8"
              style={{ transformOrigin: 'center' }}
            />

            
            <path
              ref={highlightSectorRef}
              d=""
              fill="none"
              stroke={isDark ? '#4FC3F7' : '#1565C0'}
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0"
            />
          </svg>

          
          
          <div
            ref={p1Ref}
            style={{
              position: 'absolute',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#E0F2FE',
              boxShadow: isDark ? '0 0 6px rgba(79,195,247,1)' : '0 0 5px rgba(21,101,192,0.85)',
              pointerEvents: 'none',
            }}
          />

          
          <div
            ref={p2Ref}
            style={{
              position: 'absolute',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#F0FDF4',
              boxShadow: isDark ? '0 0 5px rgba(52,211,153,0.8)' : '0 0 4px rgba(52,211,153,0.6)',
              pointerEvents: 'none',
            }}
          />
        </div>

        
        {[
          { color: '#4FC3F7', r: 2 },
          { color: '#FBBF24', r: 2 },
        ].map(({ color, r }, idx) => (
          <div
            key={idx}
            ref={el => { particleRefs.current[idx] = el }}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: r * 2, height: r * 2,
              borderRadius: '50%',
              backgroundColor: color,
              boxShadow: `0 0 4px ${color}`,
              opacity: 0.5,
              pointerEvents: 'none',
              zIndex: 100,
            }}
          />
        ))}

        
        {items.map((item, i) => {
          const size = item.baseSize || 56
          return (
            <div
              key={item.id}
              ref={el => { nodeRefs.current[i] = el }}
              className="orb-card-position-wrap"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: size,
                height: size,
                cursor: 'pointer',
              }}
              onPointerEnter={() => handlePointerEnter(i)}
              onPointerLeave={() => handlePointerLeave(i)}
            >
              
              <div
                className="orb-depth-wrap"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                
                <div
                  className="orb-hover-wrap"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  
                  <div
                    className="orb-card-inner"
                    style={{
                      width: '100%', height: '100%',
                      borderRadius: size > 60 ? 16 : 12,
                      background: isDark
                        ? 'linear-gradient(145deg, rgba(8,18,42,0.96) 0%, rgba(13,27,72,0.92) 100%)'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(235,242,255,0.94) 100%)',
                      border: `1px solid ${item.accent}33`,
                      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: size > 60 ? 5 : 3,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'box-shadow 0.3s, border-color 0.3s, background-color 0.3s',
                    }}
                  >
                    
                    <div style={{
                      position: 'absolute', top: 0, left: '20%', right: '20%',
                      height: 1,
                      background: `linear-gradient(90deg, transparent, ${item.accent}44, transparent)`,
                      pointerEvents: 'none',
                    }} />
                    <span style={{
                      fontSize: size > 60 ? 18 : 14,
                      lineHeight: 1,
                      color: item.accent,
                      fontFamily: 'monospace',
                      filter: `drop-shadow(0 0 3px ${item.glow})`,
                    }}>
                      {item.icon}
                    </span>
                    <span style={{
                      fontSize: size > 60 ? 7.5 : 6,
                      fontWeight: 800,
                      letterSpacing: '0.11em',
                      color: isDark ? '#CBD5E1' : '#334155',
                      fontFamily: "'Space Grotesk', sans-serif",
                      whiteSpace: 'nowrap',
                    }}>
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      
      <div
        className="popover-overlay-layer"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 300,
        }}
      >
        {hoveredIdx !== null && popoverCoords && (() => {
          const item = items[hoveredIdx]
          const detail = TECH_DETAILS[item.label]

          return (
            <>
              
              <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <line
                  ref={lineRef}
                  x1="0"
                  y1="0"
                  x2={popoverCoords.targetX.toFixed(1)}
                  y2={popoverCoords.targetY.toFixed(1)}
                  stroke={item.accent}
                  strokeWidth="1.2"
                  strokeOpacity="0.45"
                  strokeDasharray="4 3"
                  style={{
                    filter: `drop-shadow(0 0 1px ${item.accent})`,
                  }}
                />
                <circle ref={pin1Ref} cx="0" cy="0" r="3" fill={item.accent} />
                <circle cx={popoverCoords.targetX.toFixed(1)} cy={popoverCoords.targetY.toFixed(1)} r="3.5" fill={item.accent} />
              </svg>

              
              <div
                className="orb-card-popover"
                style={{
                  position: 'absolute',
                  left: popoverCoords.popoverX,
                  top: popoverCoords.popoverY,
                  width: 300,
                  padding: '16px 20px',
                  borderRadius: 16,
                  background: isDark
                    ? 'rgba(8, 16, 42, 0.93)'
                    : 'rgba(255, 255, 255, 0.94)',
                  border: `1px solid ${item.accent}3d`,
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
                    : '0 12px 40px rgba(21, 101, 192, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  zIndex: 310,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  textAlign: 'left',
                  pointerEvents: 'none',
                  animation: 'orb-panel-in 0.28s cubic-bezier(0.16, 1, 0.3, 1) both',
                }}
              >
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0, 0, 0, 0.03)',
                    border: `1px solid ${item.accent}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: item.accent,
                    fontFamily: 'monospace',
                    flexShrink: 0,
                    boxShadow: `0 0 12px ${item.glow.replace('0.65', '0.2')}`,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em',
                      color: isDark ? '#FFFFFF' : '#0F172A',
                      fontFamily: "'Space Grotesk', sans-serif",
                      lineHeight: 1.2,
                    }}>{item.label}</div>
                    {detail && (
                      <div style={{
                        fontSize: 10.5, color: item.accent,
                        letterSpacing: '0.08em', fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        lineHeight: 1.2,
                      }}>{detail.tag}</div>
                    )}
                  </div>
                </div>

                
                {detail && (
                  <p style={{
                    fontSize: 13.5, lineHeight: 1.55,
                    color: isDark ? 'rgba(255,255,255,0.76)' : 'rgba(15, 23, 42, 0.72)',
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {detail.desc}
                  </p>
                )}

                
                {detail && detail.capabilities && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
                    {detail.capabilities.map(cap => (
                      <span
                        key={cap}
                        style={{
                          fontSize: 8.5,
                          fontWeight: 700,
                          letterSpacing: '0.05em',
                          color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(15, 23, 42, 0.6)',
                          background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0, 0, 0, 0.03)',
                          border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0, 0, 0, 0.05)',
                          padding: '3px 8px',
                          borderRadius: 6,
                          textTransform: 'uppercase',
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )
        })()}
      </div>
    </div>
  )
}

export default function Hero({ preloaderDone }) {
  const { theme } = useTheme()
  const containerRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const WORDS = [
    { from: 'Concept', to: 'Platform' },
    { from: 'Ambition', to: 'Software' },
    { from: 'Strategy', to: 'Scale' }
  ]
  const [wordIdx, setWordIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(prev => (prev + 1) % WORDS.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setTimeout(() => setReducedMotion(mq.matches), 0)
    const handler = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', handler)

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      mq.removeEventListener('change', handler)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  
  useGSAP(() => {
    if (!preloaderDone) return
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      
      gsap.from('.orbit-gsap-wrap', {
        scale: 0,
        opacity: 0,
        duration: 1.0,
        ease: 'back.out(1.4)',
      })
      
      gsap.from('.orbit-gsap-logo', {
        scale: 0,
        opacity: 0,
        duration: 0.9,
        delay: 0.25,
        ease: 'back.out(1.7)',
      })
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef, dependencies: [preloaderDone, reducedMotion] })

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: 'clamp(120px, 12vw, 160px)',
        paddingBottom: 'clamp(40px, 4vw, 60px)',
        overflow: 'hidden',
        background: 'var(--bg-base)',
        transition: 'background-color 400ms',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'linear-gradient(150deg, #FFFFFF 20%, #F5F7FF 48%, #ECF2FF 72%, #F0D6FF 100%)',
        clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 78%)',
        WebkitClipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 78%)',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '20%', right: '10%',
          width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(12, 73, 162, 0.1) 0%, transparent 70%)',
          animation: reducedMotion ? 'none' : 'hero-glow-pulse 6s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', left: '15%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(12, 73, 162, 0.08) 0%, transparent 70%)',
          animation: reducedMotion ? 'none' : 'hero-glow-pulse 8s ease-in-out infinite 1s',
        }} />
        <HeroWaveCanvas />
      </div>

      
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: theme === 'dark'
          ? 'radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px)'
          : 'radial-gradient(circle, rgba(21,101,192,0.03) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
        WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 90%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid-responsive" style={{
          display: 'grid',
          gap: 'clamp(40px, 5vw, 80px)',
          alignItems: 'center',
          paddingBottom: '40px',
        }}>
          
          <div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(36px, 4.5vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: 24,
            }}>
              <span style={{ display: 'block' }}>
                <span key={`from-${wordIdx}`} className="animate-word-fade" style={{ display: 'inline-block' }}>{WORDS[wordIdx].from}</span>
              </span>
              <span style={{ display: 'block' }}>
                to{' '}
                <span key={`to-${wordIdx}`} className="animate-word-fade" style={{
                  background: 'linear-gradient(135deg, #0C49A2 0%, #1A5EBA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  paddingBottom: '0.1em',
                }}>
                  {WORDS[wordIdx].to}
                </span>
              </span>
              <span style={{ display: 'block' }}>with precision.</span>
            </h1>

            <p className="hero-desc" style={{
              fontSize: 'clamp(15px, 1.4vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: 36,
              maxWidth: 560,
            }}>
              Accemberg is an elite engineering studio. We architect mission-critical digital systems,
              high-velocity SaaS platforms, and resilient cloud infrastructures for organizations
              that demand uncompromising quality.
            </p>

            <div className="hero-btns-container" style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 60 }}>
              <Magnetic>
                <a href="#contact" className="btn btn-primary" style={{
                  boxShadow: theme === 'dark'
                    ? '0 10px 30px -10px rgba(79,195,247,0.4)'
                    : '0 10px 30px -10px rgba(21,101,192,0.4)',
                }}>
                  Start Your Project
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#services" className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <Play size={12} fill="currentColor" stroke="none" />
                  Explore Services
                </a>
              </Magnetic>
            </div>

          </div>

          
          <div
            className="hero-orbit-container"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: 'clamp(400px, 45vw, 600px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
            }}
          >
            
            <div style={{
              position: 'absolute',
              width: 320, height: 320,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(21,101,192,0.28) 0%, rgba(124,58,237,0.12) 55%, transparent 75%)',
              filter: 'blur(30px)',
              pointerEvents: 'none',
              animation: reducedMotion ? 'none' : 'orbitGlowBreath 5s ease-in-out infinite',
            }} />

            
            <div className="orbit-gsap-wrap">
              <OrbitRing
                radiusX={ORBIT_RADIUS}
                radiusY={ORBIT_RADIUS_Y}
                items={ORBIT_ITEMS}
                durationMs={ORBIT_MS}
                paused={reducedMotion}
                reducedMotion={reducedMotion}
              />
            </div>

            
            <div className="mobile-static-grid">
              {ORBIT_ITEMS.map((item) => (
                <div key={item.label} className="mobile-grid-item" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme === 'dark'
                    ? 'linear-gradient(140deg, rgba(8,18,42,0.95) 0%, rgba(13,27,72,0.93) 100%)'
                    : 'linear-gradient(140deg, rgba(255,255,255,0.9) 0%, rgba(240,244,255,0.9) 100%)',
                  border: theme === 'dark'
                    ? `1px solid ${item.accent}33`
                    : `1px solid ${item.accent}66`,
                  borderRadius: 16,
                  padding: '14px 10px',
                  gap: 6,
                  textAlign: 'center',
                  boxShadow: theme === 'dark'
                    ? `0 0 15px ${item.glow.replace('0.65', '0.1')}`
                    : `0 0 15px rgba(21, 101, 192, 0.05)`,
                  transition: 'all 200ms',
                }}>
                  <span style={{ fontSize: 20, color: item.accent }}>{item.icon}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', color: theme === 'dark' ? '#E2E8F0' : '#475569' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 16,
          paddingBottom: 10,
          overflow: 'hidden',
          marginTop: 20,
        }}>
          <p style={{
            fontSize: 11, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            color: 'var(--text-muted)', marginBottom: 12,
          }}>
            Powering next-gen systems for
          </p>
          <div style={{
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent, white 4%, white 96%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 4%, white 96%, transparent)',
          }}>
            <div style={
              reducedMotion
                ? {
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '24px 36px',
                  justifyContent: 'flex-start',
                  padding: '8px 0',
                }
                : {
                  display: 'flex',
                  width: 'max-content',
                  animation: 'hero-marquee 22s linear infinite',
                }
            }>
              {(reducedMotion ? TRUSTED_BRANDS : Array(6).fill(TRUSTED_BRANDS).flat()).map((brand, idx) => (
                <div
                  key={brand.name + idx}
                  style={{
                    padding: reducedMotion ? '0' : '0 28px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    color: brand.color,
                    opacity: 0.85,
                    transition: 'opacity 300ms, transform 300ms',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '0.85'
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {brand.logo}
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                  }}>
                    {brand.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      
      <style>{`
        @keyframes hero-glow-pulse {
          0%, 100% { transform: scale(1);    opacity: 0.75; }
          50%       { transform: scale(1.18); opacity: 1;    }
        }
        @keyframes hero-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-16.6666%); }
        }
        @keyframes orb-breath {
          0%, 100% { transform: scale(0.88); opacity: 0.55; }
          50%       { transform: scale(1.12); opacity: 0.90; }
        }
        @keyframes orb-spin-cw {
          to { transform: rotate(360deg); }
        }
        @keyframes orb-panel-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .orbit-stage {
          transform-style: preserve-3d;
        }

        .orbit-gsap-wrap {
          position: absolute;
          top: calc(50% - 45px); /* Shifted 45px upward on desktop */
          left: 50%;
          transform: translate(-50%, -50%);
          transform-origin: center center;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        @media (max-width: 1440px) {
          .orbit-gsap-wrap {
            transform: translate(-50%, -50%) scale(0.9);
            top: calc(50% - 35px);
          }
        }
        @media (max-width: 1100px) {
          .orbit-gsap-wrap {
            transform: translate(-50%, -50%) scale(0.8);
            top: calc(50% - 25px);
          }
        }
        @media (max-width: 900px) {
          #hero > .container > div {
            grid-template-columns: 1fr !important;
          }
          #hero > .container > div > div:first-child {
            text-align: center;
          }
          .hero-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-btns-container {
            justify-content: center !important;
          }
          .hero-orbit-container {
            transform: none;
            margin-top: 40px;
          }
          .orbit-gsap-wrap {
            transform: translate(-50%, -50%) scale(0.85);
            top: 50%; /* centered on mobile */
          }
        }

        /* ── Mobile: prevent hero flex-centering from pushing text off-screen ── */
        .hero-grid-responsive {
          grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
        }
        @media (max-width: 900px) {
          .hero-grid-responsive {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 768px) {
          #hero {
            justify-content: flex-start !important;
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
          #hero > .container > div > div:first-child {
            margin-bottom: 0 !important;
          }
          .hero-btns-container {
            margin-bottom: 32px !important;
          }
        }
        /* Static grid fallback — hidden, orbit always used */
        .mobile-static-grid {
          display: none !important;
        }

        @media (max-width: 768px) {
          .orbit-gsap-wrap {
            top: calc(50% - 60px) !important;
            transform: translate(-50%, -50%) scale(0.75) !important;
          }
          .hero-orbit-container {
            min-height: 380px !important;
          }
        }
        @media (max-width: 480px) {
          .orbit-gsap-wrap {
            top: calc(50% - 50px) !important;
            transform: translate(-50%, -50%) scale(0.64) !important;
          }
          .hero-orbit-container {
            min-height: 340px !important;
          }
        }
        @media (max-width: 380px) {
          .orbit-gsap-wrap {
            top: calc(50% - 40px) !important;
            transform: translate(-50%, -50%) scale(0.54) !important;
          }
          .hero-orbit-container {
            min-height: 300px !important;
          }
        }

        @keyframes textCycleFade {
          0% { opacity: 0; transform: translateY(15px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-15px); }
        }
        .animate-word-fade {
          display: inline-block;
          animation: textCycleFade 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  )
}
