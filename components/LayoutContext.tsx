'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Direction = 'ltr' | 'rtl'
type Language = 'en' | 'fa'

interface LayoutContextType {
  direction: Direction
  language: Language
  toggleLanguage: () => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fa')
  const [direction, setDirection] = useState<Direction>('rtl')

  useEffect(() => {
    setDirection(language === 'fa' ? 'rtl' : 'ltr')
    document.documentElement.lang = language
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr'
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fa' ? 'en' : 'fa'))
  }

  return (
    <LayoutContext.Provider value={{ direction, language, toggleLanguage }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}

