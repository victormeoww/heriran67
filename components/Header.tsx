'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PersianPattern from './PersianPattern'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: 'Essays', href: '/category/Essay' },
    { name: 'News', href: '/category/Breaking News' },
    { name: 'Personal', href: '/category/Personal' },
    { name: 'About', href: '/about' },
  ]

  const isActive = (href: string) => pathname === href

  // Current date for the masthead
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-500 bg-cream border-b border-charcoal ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      {/* Masthead Top Bar - Date & Status */}
      <div className="hidden md:flex justify-between items-center py-2 px-6 md:px-12 border-b border-charcoal/10 text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-charcoal/60">
        <span>{currentDate}</span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse"></span>
          Secure Connection
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto w-full">
        {/* Main Masthead Area */}
        <div className="flex flex-col md:items-center py-6 md:py-8 px-6 md:px-12 relative">
          
          {/* Mobile Menu Button (Absolute Left) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 z-50 p-2 text-charcoal hover:text-burgundy transition-colors group"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col items-start space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'w-4'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-5'}`} />
            </div>
          </button>

          {/* Logo - Centered on Desktop */}
          <Link href="/" className="group relative z-50 block md:text-center mx-auto md:mx-0 pl-12 md:pl-0">
            <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tighter leading-none text-charcoal group-hover:opacity-90 transition-opacity">
              HER<span className="text-burgundy italic ml-1 font-serif">iran</span>
            </h1>
            <p className="hidden md:block text-xs font-serif italic text-charcoal/50 mt-2 tracking-wide">
              Voices from the shadows, speaking truth to power.
            </p>
          </Link>
        </div>

        {/* Navigation Bar - Desktop Only (Bordered) */}
        <nav className="hidden md:flex items-center justify-center border-t border-charcoal/10 py-3 space-x-12">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`text-xs font-sans font-bold tracking-[0.25em] uppercase transition-colors relative py-1 underline-slide ${
                isActive(category.href) ? 'text-burgundy' : 'text-charcoal/60 hover:text-burgundy'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-cream/98 backdrop-blur-xl z-40 transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) md:hidden flex items-center justify-center ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex flex-col items-center space-y-10">
          {categories.map((category, idx) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-display font-bold text-charcoal hover:text-burgundy hover:italic transition-all tracking-tight"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        
        <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
           <PersianPattern variant="star" className="w-32 h-32 text-burgundy" />
        </div>
      </div>
    </header>
  )
}
