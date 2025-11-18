import Link from 'next/link'
import PersianPattern from './PersianPattern'

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-light-gray mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Persian Pattern Divider */}
        <div className="flex justify-center mb-8">
          <PersianPattern 
            variant="divider" 
            className="w-48 h-6 text-burgundy" 
            opacity={0.3}
          />
        </div>

        {/* Footer Content */}
        <div className="text-center space-y-4">
          <p className="text-sm font-sans text-charcoal/70">
            © 2025 HER iran · An anonymous voice from inside Iran
          </p>
          
          <div className="flex items-center justify-center space-x-6 text-sm font-sans">
            <a 
              href="mailto:heriran@protonmail.com" 
              className="text-charcoal/70 hover:text-burgundy transition-colors underline-slide"
            >
              Secure Contact
            </a>
            <span className="text-charcoal/30">·</span>
            <Link 
              href="/rss.xml" 
              className="text-charcoal/70 hover:text-burgundy transition-colors underline-slide"
            >
              RSS Feed
            </Link>
            <span className="text-charcoal/30">·</span>
            <Link 
              href="/about" 
              className="text-charcoal/70 hover:text-burgundy transition-colors underline-slide"
            >
              About
            </Link>
          </div>

          <p className="text-xs font-sans text-charcoal/50 max-w-2xl mx-auto pt-4">
            This platform prioritizes anonymity and security. No tracking, no analytics, no comments.
            Share this site carefully and use secure connections.
          </p>
        </div>

        {/* Decorative Pattern */}
        <div className="flex justify-center mt-8 opacity-10">
          <PersianPattern variant="geometric" className="w-16 h-16 text-burgundy" />
        </div>
      </div>
    </footer>
  )
}

