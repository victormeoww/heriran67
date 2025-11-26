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
      setIsScrolled(window.scrollY > 100) // Increased threshold to clear the masthead
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

  // Current date in Tehran (Persian Calendar)
  const tehranDate = new Date().toLocaleDateString('fa-IR', {
    timeZone: 'Asia/Tehran',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn' // Use latin numbers for cleaner look, or remove for Persian digits
  }).replace(/([0-9]+)/g, (match) => {
    // Convert to Persian digits just in case numberingSystem doesn't catch everything or if preferred
    // For now keeping it readable/mixed or English digits is often preferred in English publications about Iran, 
    // but let's stick to the standard fa-IR output which is usually Persian digits. 
    // User asked for "Persian date", let's try to keep it authentic.
    return match; 
  });

  // Simpler formatting for "Tehran Time"
  const tehranTime = new Date().toLocaleTimeString('en-US', {
    timeZone: 'Asia/Tehran',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="flex flex-col">
      {/* MASTHEAD (Scrolls away) */}
      <header className="bg-cream border-b border-charcoal/10 relative z-40">
        {/* Top Bar - Date */}
        <div className="hidden md:flex justify-between items-center py-2 px-6 md:px-12 border-b border-charcoal/10 text-[10px] font-sans font-bold tracking-[0.2em] uppercase text-charcoal/60">
          <span className="font-serif italic tracking-wider text-charcoal">{tehranDate}</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-burgundy/50 animate-pulse"></span>
            Tehran: {tehranTime}
          </span>
        </div>

        <div className="max-w-[1400px] mx-auto w-full">
          {/* Main Masthead Area */}
          <div className="flex flex-col md:items-center py-8 md:py-12 px-6 md:px-12 relative">
            
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
              <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-none text-charcoal group-hover:opacity-90 transition-opacity">
                HER<span className="text-burgundy italic ml-1 font-serif">iran</span>
              </h1>
              <p className="hidden md:block text-sm font-serif italic text-charcoal/50 mt-3 tracking-wide">
                Voices from the shadows, speaking truth to power.
              </p>
            </Link>
          </div>
        </div>
      </header>

      {/* STICKY NAV BAR */}
      <div className={`sticky top-0 z-50 w-full border-b border-charcoal/10 transition-all duration-300 ${
        isScrolled ? 'bg-cream shadow-sm py-3' : 'bg-cream py-4'
      }`}>
        <nav className="hidden md:flex items-center justify-center space-x-12 max-w-[1400px] mx-auto">
          {/* If scrolled, show small logo on left? Optional, but helps branding */}
          <Link 
            href="/" 
            className={`absolute left-12 font-display font-bold text-2xl tracking-tight text-charcoal transition-opacity duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            HER<span className="text-burgundy italic">iran</span>
          </Link>

          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={`text-[11px] font-sans font-bold tracking-[0.25em] uppercase transition-colors relative py-1 underline-slide ${
                isActive(category.href) ? 'text-burgundy' : 'text-charcoal/60 hover:text-burgundy'
              }`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
        
        {/* Mobile Sticky Bar Content */}
        <div className="md:hidden flex items-center justify-center h-8">
           <span className={`font-display font-bold text-xl tracking-tight text-charcoal transition-opacity duration-300 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}>
             HER<span className="text-burgundy italic">iran</span>
           </span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-cream/98 backdrop-blur-xl z-50 transition-transform duration-700 cubic-bezier(0.22, 1, 0.36, 1) md:hidden flex items-center justify-center ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-4 text-charcoal hover:text-burgundy"
        >
           <span className="block text-xl font-sans">✕</span>
        </button>

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
    </div>
  )
}
