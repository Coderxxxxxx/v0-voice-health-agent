'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light')
      
      if (initialTheme !== theme) {
        setTheme(initialTheme)
      }
      
      const html = document.documentElement
      if (initialTheme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    } catch (e) {
      // Silently fail in SSR
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    try {
      const html = document.documentElement
      if (newTheme === 'dark') {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
      localStorage.setItem('theme', newTheme)
    } catch (e) {
      // Silently fail if localStorage not available
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    return { theme: 'light' as Theme, toggleTheme: () => {} }
  }
  return context
}
