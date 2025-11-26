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

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-700 cubic-bezier(0.22, 1, 0.36, 1) ${
        isScrolled 
          ? 'bg-cream/95 backdrop-blur-md border-b border-charcoal/5 py-4' 
          : 'bg-cream border-b border-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative z-50 block">
            <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tighter leading-none text-charcoal group-hover:opacity-80 transition-opacity">
              HER<span className="text-burgundy italic ml-1 font-serif">iran</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`text-[11px] font-sans font-bold tracking-[0.25em] uppercase transition-colors relative py-2 underline-slide ${
                  isActive(category.href) ? 'text-burgundy' : 'text-charcoal/60 hover:text-burgundy'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 p-2 -mr-2 text-charcoal hover:text-burgundy transition-colors group"
            aria-label="Toggle menu"
          >
            <div className="w-8 flex flex-col items-end space-y-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'w-8 rotate-45 translate-y-2' : 'w-8 group-hover:w-6'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'opacity-0' : 'w-4 group-hover:w-8'}`} />
              <span className={`block h-0.5 bg-current transition-all duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-2' : 'w-6 group-hover:w-4'}`} />
            </div>
          </button>
        </div>
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
        
        {/* Decorative Pattern in Menu */}
        <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
           <PersianPattern variant="star" className="w-32 h-32 text-burgundy" />
        </div>
      </div>
    </header>
  )
}
