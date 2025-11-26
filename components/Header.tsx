'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLayout } from './LayoutContext'

export default function Header() {
  const { language, toggleLanguage } = useLayout()
  const [tehranTime, setTehranTime] = useState<string>('')

  useEffect(() => {
    // Update time every minute
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Tehran',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        // Show Persian numerals if language is Persian
        numberingSystem: language === 'fa' ? 'persian' : 'latn' 
      }
      setTehranTime(now.toLocaleTimeString(language === 'fa' ? 'fa-IR' : 'en-US', options))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [language])

  return (
    <header className="sticky top-0 z-50 bg-cream border-b border-charcoal/10 h-16 flex items-center shadow-sm">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 flex justify-between items-center">
        
        {/* Left: Language Toggle */}
        <button 
          onClick={toggleLanguage}
          className="text-xs font-sans font-bold tracking-widest uppercase text-charcoal/60 hover:text-burgundy transition-colors border border-charcoal/10 px-3 py-1 rounded-sm"
        >
          {language === 'fa' ? 'English' : 'فارسی'}
        </button>

        {/* Center: Logo */}
        <Link href="/" className="group absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tighter leading-none text-charcoal group-hover:opacity-80 transition-opacity flex items-center gap-1">
            HER<span className="text-burgundy italic font-serif">iran</span>
          </h1>
        </Link>

        {/* Right: Tehran Time */}
        <div className="flex items-center gap-2 text-xs font-sans font-bold tracking-widest text-charcoal/60" dir="ltr">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse"></span>
          <span>THR {tehranTime}</span>
        </div>
      </div>
    </header>
  )
}
