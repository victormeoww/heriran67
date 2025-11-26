'use client'

import { Post } from '@/lib/posts'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import PersianPattern from '@/components/PersianPattern'
import { useLayout } from '@/components/LayoutContext'
import { useEffect } from 'react'

interface PostContentProps {
  postFa: Post | null
  postEn: Post | null
  allPostsFa: Post[]
  allPostsEn: Post[]
  slug: string
  renderedContentFa: string
  renderedContentEn: string
}

export default function PostContent({ 
  postFa, 
  postEn, 
  allPostsFa, 
  allPostsEn, 
  slug,
  renderedContentFa,
  renderedContentEn
}: PostContentProps) {
  const searchParams = useSearchParams()
  const langParam = searchParams.get('lang')
  const { language, setLanguage } = useLayout()
  
  // Sync language from URL param on mount
  useEffect(() => {
    if (langParam === 'en' && language !== 'en') {
      setLanguage('en')
    } else if (!langParam && language !== 'fa') {
      setLanguage('fa')
    }
  }, [langParam, language, setLanguage])
  
  // Determine which post to show based on language
  const currentLang = langParam === 'en' ? 'en' : language
  const post = currentLang === 'en' ? (postEn || postFa) : (postFa || postEn)
  const allPosts = currentLang === 'en' ? allPostsEn : allPostsFa
  const renderedContent = currentLang === 'en' ? renderedContentEn : renderedContentFa
  
  if (!post) return null

  const currentIndex = allPosts.findIndex(p => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  
  // Build URLs with language parameter
  const buildPostUrl = (postSlug: string) => {
    return currentLang === 'en' ? `/posts/${postSlug}?lang=en` : `/posts/${postSlug}`
  }

  return (
    <article className={`min-h-screen bg-cream selection:bg-burgundy/10 ${currentLang === 'fa' ? 'font-persian' : ''}`}>
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-12 md:pb-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-8 text-xs font-sans tracking-[0.2em] uppercase text-charcoal/60">
          <Link href={`/category/${post.frontmatter.category}`} className="text-burgundy hover:underline">
            {post.frontmatter.category}
          </Link>
          <span>|</span>
          <span>{post.frontmatter.date}</span>
        </div>

        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal leading-[1.15] mb-12 text-balance ${currentLang === 'fa' ? 'font-persian' : ''}`}>
          {post.frontmatter.title}
        </h1>

        <div className="flex justify-center mb-12">
          <PersianPattern variant="divider" className="w-32 md:w-64 h-4 text-burgundy" opacity={0.4} />
        </div>

        <p className={`text-xl md:text-2xl font-display italic text-charcoal/80 leading-relaxed max-w-2xl mx-auto ${currentLang === 'fa' ? 'font-persian not-italic' : ''}`}>
          {post.frontmatter.excerpt}
        </p>
      </header>

      {/* Article Content */}
      <div className="max-w-[720px] mx-auto px-6 pb-24">
        <div 
          className={`prose prose-lg md:prose-xl ${currentLang === 'fa' ? 'font-persian' : ''}`}
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
        
        {/* End Mark */}
        <div className="flex justify-center mt-16 mb-24">
           <div className="w-2 h-2 bg-burgundy rounded-full mx-1"></div>
           <div className="w-2 h-2 bg-burgundy rounded-full mx-1"></div>
           <div className="w-2 h-2 bg-burgundy rounded-full mx-1"></div>
        </div>
      </div>

      {/* Navigation Footer */}
      <nav className="bg-white border-t border-charcoal/5 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-center text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal/40 mb-16">
            {currentLang === 'fa' ? 'نوشته‌های بیشتر' : 'More Stories'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
            {prevPost && (
              <Link 
                href={buildPostUrl(prevPost.slug)}
                className="group text-center md:text-left block"
              >
                <span className="text-xs font-sans text-charcoal/40 mb-4 block group-hover:text-burgundy transition-colors">
                  {currentLang === 'fa' ? 'قبلی' : 'Previous'}
                </span>
                <h4 className={`text-2xl md:text-3xl font-display font-bold text-charcoal group-hover:text-burgundy transition-colors ${currentLang === 'fa' ? 'font-persian' : ''}`}>
                  {prevPost.frontmatter.title}
                </h4>
              </Link>
            )}

            {nextPost && (
              <Link 
                href={buildPostUrl(nextPost.slug)}
                className="group text-center md:text-right block"
              >
                <span className="text-xs font-sans text-charcoal/40 mb-4 block group-hover:text-burgundy transition-colors">
                  {currentLang === 'fa' ? 'بعدی' : 'Next'}
                </span>
                <h4 className={`text-2xl md:text-3xl font-display font-bold text-charcoal group-hover:text-burgundy transition-colors ${currentLang === 'fa' ? 'font-persian' : ''}`}>
                  {nextPost.frontmatter.title}
                </h4>
              </Link>
            )}
          </div>
          
          <div className="text-center mt-24">
             <Link 
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 border border-charcoal/10 rounded-full text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
            >
              {currentLang === 'fa' ? 'بازگشت به خانه' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </nav>
    </article>
  )
}
