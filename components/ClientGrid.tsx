'use client'

import { Post } from '@/lib/posts'
import { CATEGORY_MAP } from '@/lib/categories'
import PostCard from '@/components/PostCard'
import PersianPattern from '@/components/PersianPattern'
import { useLayout } from './LayoutContext'
import { useState } from 'react'
import Link from 'next/link'

interface CategoryCount {
  name: string
  nameFa: string
  count: number
  latestTitle: string
  slug: string
}

export default function ClientGrid({ postsFa, postsEn }: { postsFa: Post[], postsEn: Post[] }) {
  const { language } = useLayout()
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  
  // Select posts based on language
  const posts = language === 'fa' ? postsFa : postsEn
  
  // Calculate category counts using the proper CATEGORY_MAP
  const getCategoryCounts = (): CategoryCount[] => {
    const categories = [
      { name: 'Essay', nameFa: 'مقالات', slug: 'Essay' },
      { name: 'Breaking News', nameFa: 'اخبار', slug: 'Breaking%20News' },
      { name: 'Personal', nameFa: 'شخصی', slug: 'Personal' }
    ]
    
    return categories.map(cat => {
      // Use CATEGORY_MAP for consistent filtering
      const validNames = CATEGORY_MAP[cat.name] || [cat.name]
      const categoryPosts = posts.filter(p => validNames.includes(p.frontmatter.category))
      return {
        ...cat,
        count: categoryPosts.length,
        latestTitle: categoryPosts[0]?.frontmatter.title || ''
      }
    })
  }
  
  const categoryCounts = getCategoryCounts()
  
  // Layout: Featured + 4 main grid + sidebar with limited archive
  const featuredPost = posts[0]
  const mainGridPosts = posts.slice(1, 5) // 4 posts for 2x2 grid
  const sidebarPosts = posts.slice(5, 11) // 6 posts for archive
  const hasMorePosts = posts.length > 11

  return (
    <div className="w-full">
      {/* Disclaimer for English Mode */}
      {language === 'en' && showDisclaimer && (
        <div className="bg-burgundy/10 border-b-2 border-burgundy/20">
          <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-burgundy text-lg">🌐</span>
                <p className="text-sm text-charcoal">
                  <strong className="text-burgundy">Note:</strong> All articles are written by one person in Persian. As manual translation takes time, some translations may be AI-assisted.
                  <button onClick={() => setShowDisclaimer(false)} className="ml-2 text-burgundy underline underline-offset-2 hover:no-underline">Dismiss</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-6 md:py-10">
        
        {/* Featured Section - Full width */}
        {featuredPost && (
          <section className="mb-8 md:mb-12">
            <PostCard post={featuredPost} featured />
          </section>
        )}

        {/* Category Bar */}
        <section className="mb-8 md:mb-12 py-6 border-y border-charcoal/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {categoryCounts.map((cat) => (
              <Link 
                key={cat.name}
                href={`/category/${cat.slug}`}
                className="group flex items-center justify-between p-4 bg-sand/50 hover:bg-sand transition-colors rounded-sm border border-transparent hover:border-charcoal/10"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-bold ${cat.name === 'Essay' ? 'text-burgundy' : cat.name === 'Breaking News' ? 'text-teal' : 'text-gold'}`}>
                      {language === 'fa' ? cat.nameFa : cat.name}
                    </span>
                    <span className="text-xs text-charcoal/40">({cat.count})</span>
                  </div>
                  <p className={`text-xs text-charcoal/60 truncate ${language === 'fa' ? 'font-persian' : ''}`}>
                    {cat.latestTitle}
                  </p>
                </div>
                <span className={`text-charcoal/30 group-hover:text-burgundy transition-colors text-lg ${language === 'fa' ? 'rotate-180' : ''}`}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Feed */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-charcoal/40">
                {language === 'fa' ? 'آخرین نوشته‌ها' : 'Latest Stories'}
              </h2>
              <div className="h-px flex-grow bg-charcoal/10"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              {mainGridPosts.map((post) => (
                <div key={post.slug}>
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20 space-y-6">
              
              {/* Dissident Fund Widget */}
              <div className="bg-gradient-to-br from-burgundy to-burgundy/90 text-cream p-6 rounded-sm relative overflow-hidden shadow-lg border-2 border-burgundy/50">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-gold text-lg">✦</span>
                    <h3 className="text-sm font-bold text-gold tracking-wide uppercase">
                      {language === 'fa' ? 'صندوق مخالفان' : 'Dissident Fund'}
                    </h3>
                  </div>
                  <p className={`text-sm leading-relaxed text-cream/95 mb-4 ${language === 'fa' ? 'font-persian' : 'font-sans'}`}>
                    {language === 'fa' 
                      ? 'من یکی از بنیان‌گذاران «صندوق مخالفان» هستم — سازمانی که از فعالان حمایت می‌کند.' 
                      : 'I co-founded Dissident Fund — supporting activists and voices of resistance.'}
                  </p>
                  <a 
                    href="https://dissidentfund.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:text-cream transition-colors"
                  >
                    {language === 'fa' ? 'بیشتر بدانید' : 'Learn More'}
                    <span className={`text-base leading-none ${language === 'fa' ? 'rotate-180' : ''}`}>→</span>
                  </a>
                </div>
                <div className="absolute -bottom-4 -left-4 opacity-15">
                  <PersianPattern variant="star" className="w-24 h-24" />
                </div>
              </div>

              {/* Archive List */}
              <div className="bg-white border border-charcoal/5 rounded-sm p-5">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-charcoal/10">
                  <h3 className="text-xs font-bold tracking-widest uppercase text-charcoal/40">
                    {language === 'fa' ? 'آرشیو' : 'Archive'}
                  </h3>
                  {hasMorePosts && (
                    <Link 
                      href="/about" 
                      className="text-xs text-burgundy hover:underline"
                    >
                      {language === 'fa' ? 'همه نوشته‌ها' : 'View All'}
                    </Link>
                  )}
                </div>
                
                <div className="flex flex-col divide-y divide-charcoal/5">
                  {sidebarPosts.map((post) => (
                    <PostCard key={post.slug} post={post} minimal />
                  ))}
                </div>
              </div>

              {/* About Widget */}
              <div className="bg-sand/50 p-5 rounded-sm border border-charcoal/5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-charcoal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🖊️</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-charcoal mb-1">
                      {language === 'fa' ? 'نویسنده ناشناس' : 'Anonymous Author'}
                    </h3>
                    <p className={`text-xs text-charcoal/60 leading-relaxed ${language === 'fa' ? 'font-persian' : ''}`}>
                      {language === 'fa' 
                        ? 'یک زن ایرانی، ساکن ایران، در حال ثبت واقعیت.' 
                        : 'An Iranian woman, living in Iran, documenting reality.'}
                    </p>
                    <Link 
                      href="/about" 
                      className="inline-block mt-2 text-xs text-burgundy hover:underline"
                    >
                      {language === 'fa' ? 'درباره ما' : 'About'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Pull Quote Section */}
        <section className="my-12 md:my-16 py-10 md:py-14 border-y border-charcoal/10 bg-sand/30">
          <div className="max-w-3xl mx-auto text-center px-4">
            <PersianPattern variant="star" className="w-10 h-10 mx-auto mb-6 text-burgundy" opacity={0.3} />
            <blockquote className={`text-xl md:text-2xl lg:text-3xl font-display leading-relaxed text-charcoal mb-6 ${language === 'fa' ? 'font-persian font-bold' : 'italic'}`}>
              {language === 'fa' 
                ? '«می‌نویسم چون سکوت چیزی است که رژیم می‌خواهد، و من حاضر نیستم چیزی را که می‌خواهند به آن‌ها بدهم.»'
                : '"I write because silence is what the regime wants, and I refuse to give them what they want."'}
            </blockquote>
            <cite className="text-xs font-bold tracking-widest uppercase text-burgundy not-italic">
              — HER iran
            </cite>
          </div>
        </section>

      </div>
    </div>
  )
}
