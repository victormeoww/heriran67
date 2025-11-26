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
        <div className="bg-burgundy/10 border border-burgundy/20 text-burgundy p-4 mb-8 rounded-sm relative text-sm font-bold tracking-wide fade-in">
          <div className="flex items-start justify-between gap-4">
            <p>
              <span className="mr-2">⚠️</span>
              Note: Some translations may be AI-generated as content is originally written in Persian. Translation is ongoing and may be slow.
            </p>
            <button 
              onClick={() => setShowDisclaimer(false)}
              className="opacity-50 hover:opacity-100"
            >
              ✕
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
