'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark') // Default is dark ("Midnight Neo-Glow")

  useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('theme') || 'dark'
    setTheme(savedTheme)
  }, [])

  useEffect(() => {
    // Apply the theme to the HTML element
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context;
}
