'use client'

import { useRef, useEffect, useState } from 'react'

const CHARS = '01#$&%X?*<>+='

export default function ScrambleText({ text, speed = 35 }) {
  const [displayText, setDisplayText] = useState(text)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame
    let frameCount = 0
    let started = false

    const startScramble = () => {
      if (started) return
      started = true
      
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
      setDisplayText(text) 
    }
  }, [text, speed])

  return (
    <span 
      ref={ref} 
      className="scramble-text" 
      style={{ 
        display: 'inline-block', 
        fontVariantNumeric: 'tabular-nums', 
      }}
    >
      {displayText}
    </span>
  )
}
