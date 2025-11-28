'use client'

import Link from 'next/link'
import PersianPattern from './PersianPattern'
import { useLayout } from './LayoutContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language } = useLayout()
  
  return (
    <footer className="bg-charcoal text-cream">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-burgundy via-gold to-burgundy"></div>
      
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-block group">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-cream tracking-tighter group-hover:opacity-90 transition-opacity">
                HER <span className="text-burgundy italic font-serif">iran</span>
              </h2>
            </Link>
            <p className={`text-base text-cream/70 leading-relaxed max-w-sm ${language === 'fa' ? 'font-persian' : 'font-serif'}`}>
              {language === 'fa' 
                ? 'یک پلتفرم ناشناس برای بازتاب صدای زنان ایران. بدون سانسور، بدون فیلتر، و مقاوم.' 
                : 'An anonymous platform amplifying the voices of Iranian women. Uncensored, unfiltered, and resilient.'}
            </p>
            
            {/* Secure contact */}
            <div className="pt-4">
              <a 
                href="mailto:heriran@protonmail.com"
                className="inline-flex items-center gap-2 text-sm text-gold hover:text-cream transition-colors"
              >
                <span className="w-2 h-2 bg-teal rounded-full animate-pulse"></span>
                {language === 'fa' ? 'ایمیل امن' : 'Secure Contact'}
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              {language === 'fa' ? 'دسته‌بندی‌ها' : 'Categories'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/category/Essay" className="text-sm text-cream/60 hover:text-white transition-colors link-underline">
                  {language === 'fa' ? 'مقالات' : 'Essays'}
                </Link>
              </li>
              <li>
                <Link href="/category/Breaking%20News" className="text-sm text-cream/60 hover:text-white transition-colors link-underline">
                  {language === 'fa' ? 'اخبار' : 'Breaking News'}
                </Link>
              </li>
              <li>
                <Link href="/category/Personal" className="text-sm text-cream/60 hover:text-white transition-colors link-underline">
                  {language === 'fa' ? 'شخصی' : 'Personal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-5">
              {language === 'fa' ? 'اطلاعات' : 'Information'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-cream/60 hover:text-white transition-colors link-underline">
                  {language === 'fa' ? 'درباره ما' : 'About & Mission'}
                </Link>
              </li>
              <li>
                <a 
                  href="https://dissidentfund.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-cream/60 hover:text-white transition-colors link-underline"
                >
                  {language === 'fa' ? 'صندوق مخالفان' : 'Dissident Fund'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-bold text-cream/40 tracking-widest uppercase">
              © {currentYear} HER IRAN
            </p>
            <span className="text-cream/20">|</span>
            <p className="text-[10px] text-cream/40 tracking-widest uppercase">
              {language === 'fa' ? 'امن و ناشناس' : 'Secure & Anonymous'}
            </p>
          </div>
          
          <div className="flex items-center gap-3 opacity-30">
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="star" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
          </div>
        </div>
      </div>
    </footer>
  )
}
