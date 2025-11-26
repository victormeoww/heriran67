'use client'

import Link from 'next/link'
import PersianPattern from './PersianPattern'
import { useLayout } from './LayoutContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language } = useLayout()
  
  return (
    <footer className="bg-charcoal text-cream border-t border-charcoal/10 mt-12">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-6">
            <Link href="/" className="inline-block group">
              <h2 className="text-4xl font-display font-bold text-cream tracking-tighter group-hover:opacity-90 transition-opacity">
                HER <span className="text-burgundy italic font-serif">iran</span>
              </h2>
            </Link>
            <p className="text-lg text-cream/70 leading-relaxed max-w-md font-persian">
              {language === 'fa' 
                ? 'یک پلتفرم ناشناس برای بازتاب صدای زنان ایران. بدون سانسور، بدون فیلتر، و مقاوم.' 
                : 'An anonymous platform amplifying the voices of Iranian women. Uncensored, unfiltered, and resilient.'}
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">
              {language === 'fa' ? 'بخش‌ها' : 'Platform'}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="block text-sm text-cream/60 hover:text-white transition-colors">
                  {language === 'fa' ? 'درباره ما' : 'Mission & About'}
                </Link>
              </li>
              <li>
                <Link href="#" className="block text-sm text-cream/60 hover:text-white transition-colors">
                   {language === 'fa' ? 'مقالات' : 'Essays'}
                </Link>
              </li>
              <li>
                <Link href="#" className="block text-sm text-cream/60 hover:text-white transition-colors">
                   {language === 'fa' ? 'اخبار' : 'News'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold mb-6">
              {language === 'fa' ? 'تماس' : 'Connect'}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:heriran@protonmail.com" className="block text-sm text-cream/60 hover:text-white transition-colors">
                  {language === 'fa' ? 'ایمیل امن' : 'Secure Contact'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-cream/30 tracking-widest uppercase">
            © {currentYear} HER IRAN.
          </p>
          
          <div className="flex items-center gap-4 opacity-20">
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
          </div>

          <p className="text-[10px] font-bold text-cream/30 tracking-widest uppercase md:text-right">
             {language === 'fa' ? 'امن و ناشناس' : 'SECURE & ANONYMOUS'}
          </p>
        </div>
      </div>
    </footer>
  )
}
