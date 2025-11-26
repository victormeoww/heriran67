import Link from 'next/link'
import PersianPattern from './PersianPattern'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-charcoal text-cream border-t-4 border-burgundy">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="inline-block group">
              <h2 className="text-6xl font-display font-bold text-cream tracking-tighter group-hover:opacity-90 transition-opacity">
                HER <span className="text-burgundy italic font-serif">iran</span>
              </h2>
            </Link>
            <p className="text-xl font-serif text-cream/70 leading-relaxed max-w-md italic border-l-2 border-gold pl-6">
              &quot;An anonymous platform amplifying the voices of Iranian women. Uncensored, unfiltered, and resilient.&quot;
            </p>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3 md:col-start-7 space-y-8">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold border-b border-white/10 pb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="block text-sm font-sans tracking-widest text-cream/60 hover:text-white transition-colors uppercase">
                  Mission & About
                </Link>
              </li>
              <li>
                <Link href="/category/Essay" className="block text-sm font-sans tracking-widest text-cream/60 hover:text-white transition-colors uppercase">
                  Essays
                </Link>
              </li>
              <li>
                <Link href="/category/Breaking News" className="block text-sm font-sans tracking-widest text-cream/60 hover:text-white transition-colors uppercase">
                  Breaking News
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold border-b border-white/10 pb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:heriran@protonmail.com" className="block text-sm font-sans tracking-widest text-cream/60 hover:text-white transition-colors uppercase">
                  Secure Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[10px] font-sans font-bold text-cream/30 tracking-[0.2em] uppercase">
            © {currentYear} HER IRAN.
          </p>
          
          <div className="flex items-center gap-4 opacity-30">
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
            <PersianPattern variant="geometric" className="w-4 h-4 text-gold" />
          </div>

          <p className="text-[10px] font-sans font-bold text-cream/30 tracking-[0.2em] uppercase md:text-right">
            SECURE & ANONYMOUS
          </p>
        </div>
      </div>
    </footer>
  )
}
