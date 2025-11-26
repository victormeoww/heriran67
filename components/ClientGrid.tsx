'use client'

import { Post } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import PersianPattern from '@/components/PersianPattern'
import { useLayout } from './LayoutContext'
import { useState } from 'react'

export default function ClientGrid({ postsFa, postsEn }: { postsFa: Post[], postsEn: Post[] }) {
  const { language } = useLayout()
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  
  // Select posts based on language
  const posts = language === 'fa' ? postsFa : postsEn
  
  // Layout Strategy:
  // 1. Featured Post (Newest)
  // 2. Grid of 6
  // 3. Sidebar list for the rest
  
  const featuredPost = posts[0]
  const mainGridPosts = posts.slice(1, 7)
  const sidebarPosts = posts.slice(7)

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8 py-8 md:py-12">
      
      {/* Disclaimer for English Mode */}
      {language === 'en' && showDisclaimer && (
        <div className="bg-burgundy/10 border-2 border-burgundy/30 px-6 py-5 mb-10 fade-in rounded-sm">
          <div className="flex items-start justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-burgundy text-lg">⚠</span>
                <p className="text-sm font-sans font-bold text-burgundy uppercase tracking-wide">
                  Translation Notice
                </p>
              </div>
              <p className="text-sm text-charcoal leading-relaxed">
                <strong>Some English translations may be AI-generated.</strong> All content on this site is originally written in Persian by one person. You can view the original text by switching the language to Farsi using the button in the header.
              </p>
            </div>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="text-burgundy/50 hover:text-burgundy transition-colors text-xl leading-none mt-0.5 font-bold"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Featured Section - Full Width but contained */}
      {featuredPost && (
        <section className="mb-16 md:mb-24 border-b border-charcoal/10 pb-12">
          <PostCard post={featuredPost} featured />
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Main Feed (Left in LTR, Right in RTL) */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal/40">
              {language === 'fa' ? 'آخرین نوشته‌ها' : 'Latest Stories'}
            </h2>
            <div className="h-px flex-grow bg-charcoal/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
            {mainGridPosts.map((post) => (
              <div key={post.slug}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar (Right in LTR, Left in RTL) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            {/* Dissident Fund Widget */}
            <div className="bg-gradient-to-br from-burgundy to-burgundy/90 text-cream p-6 md:p-8 mb-8 rounded-sm relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-gold text-xl">✦</span>
                  <h3 className="text-lg font-bold text-gold tracking-wide">
                    {language === 'fa' ? 'صندوق مخالفان' : 'Dissident Fund'}
                  </h3>
                </div>
                <p className={`text-sm leading-relaxed text-cream/95 mb-4 ${language === 'fa' ? 'font-persian' : 'font-sans'}`}>
                  {language === 'fa' 
                    ? 'من یکی از بنیان‌گذاران «صندوق مخالفان» هستم — سازمانی که از فعالان و صداهای مقاومت حمایت می‌کند.' 
                    : 'I co-founded Dissident Fund — an organization supporting activists and voices of resistance.'}
                </p>
                <p className={`text-xs leading-relaxed text-cream/80 mb-5 ${language === 'fa' ? 'font-persian' : 'font-sans'}`}>
                  {language === 'fa' 
                    ? 'اگر می‌خواهید وب‌سایتی راه‌اندازی کنید یا مثل من فعالیت کنید، با ما تماس بگیرید.' 
                    : 'Want to start a website or pursue activism like this? Reach out to us.'}
                </p>
                <a 
                  href="https://dissidentfund.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-cream transition-colors border-b border-gold/50 hover:border-cream pb-0.5"
                >
                  {language === 'fa' ? 'حمایت کنید' : 'Support & Connect'}
                  <span className={`text-base leading-none ${language === 'fa' ? 'rotate-180' : ''}`}>→</span>
                </a>
              </div>
              <div className="absolute -bottom-6 -left-6 opacity-10">
                <PersianPattern variant="star" className="w-28 h-28" />
              </div>
            </div>

            {/* About Widget */}
            <div className="bg-charcoal text-cream p-6 md:p-8 mb-12 rounded-sm relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-gold">
                  {language === 'fa' ? 'درباره ما' : 'About'}
                </h3>
                <p className={`text-base leading-relaxed text-cream/90 mb-6 ${language === 'fa' ? 'font-persian' : 'font-serif'}`}>
                  {language === 'fa' 
                    ? 'ما وقایع‌نگاران گمنام ایرانی در حال تغییر هستیم. ثبت مبارزه، بدون سانسور و بدون فیلتر.' 
                    : 'We are the anonymous chroniclers of a changing Iran. Documenting the struggle, uncensored and unfiltered.'}
                </p>
              </div>
              <div className="absolute -bottom-8 -right-8 text-white/5">
                <PersianPattern variant="geometric" className="w-32 h-32" />
              </div>
            </div>

            {/* List Widget */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-charcoal/10 pb-3">
                <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal/40">
                  {language === 'fa' ? 'آرشیو' : 'Archive'}
                </h3>
              </div>
              
              <div className="flex flex-col gap-2">
                {sidebarPosts.map((post) => (
                  <PostCard key={post.slug} post={post} minimal />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
