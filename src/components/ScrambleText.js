'use client'

import { useRef, useEffect, useState } from 'react'

const CHARS = '01#$&%X?*<>+='

export default function ScrambleText({ text, speed = 35 }) {
  // Start with true text to avoid Next.js Server Hydration Mismatch
  const [displayText, setDisplayText] = useState(text)
  const [mounted, setMounted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    setMounted(true)
    // Pre-scramble heavily hidden behind the scenes immediately upon client mount
    setDisplayText(text.replace(/[^\s]/g, () => CHARS[Math.floor(Math.random() * CHARS.length)]))
  }, [text])

  useEffect(() => {
    const el = ref.current
    if (!el || !mounted) return

    let frame
    let frameCount = 0

    const startScramble = () => {
      const loop = () => {
        frameCount++
        let result = ''
        
        const progress = frameCount / speed
        const correctChars = Math.floor(progress * text.length)
        
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') {
            result += ' '
          } else if (i < correctChars) {
            result += text[i]
          } else {
            result += CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        
        setDisplayText(result)
        
        if (frameCount < speed) {
          frame = requestAnimationFrame(loop)
        } else {
          setDisplayText(text)
        }
      }
      
      frame = requestAnimationFrame(loop)
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(el)
        startScramble()
      }
    }, { threshold: 0.1 })
    
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [mounted, text, speed])

  return (
    <span 
      ref={ref} 
      className="scramble-text" 
      style={{ 
        display: 'inline-block', 
        fontVariantNumeric: 'tabular-nums', 
        // Hide until hydrated to hide the flash-scramble
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
    >
      {displayText}
    </span>
  )
}
