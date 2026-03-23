'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Language, translations } from './i18n/translations'

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Default to Roman Urdu for Pakistan
  const [language, setLanguageState] = useState<Language>('ur-roman')

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language') as Language | null
      const initialLanguage = savedLanguage || 'ur-roman'
      if (initialLanguage !== language) {
        setLanguageState(initialLanguage)
      }
    } catch (e) {
      // Silently fail in SSR
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('language', lang)
    } catch (e) {
      // Silently fail if localStorage not available
    }
  }

  const t = (key: string): string => {
    const translationObj = translations[language]
    return (translationObj as any)[key] || key
  }

  const isRTL = language === 'ur-rtl'

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    return {
      language: 'ur-roman' as Language,
      setLanguage: () => {},
      t: (key: string) => key,
      isRTL: false,
    }
  }
  return context
}
