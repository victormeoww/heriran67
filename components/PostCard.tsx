'use client'

import Link from 'next/link'
import { Post } from '@/lib/posts'
import { useLayout } from './LayoutContext'
import { useState, useEffect } from 'react'

interface PostCardProps {
  post: Post
  featured?: boolean
  minimal?: boolean
}

// Helper to get current time in Tehran timezone
function getTehranNow(): Date {
  // Tehran is UTC+3:30
  const now = new Date()
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  return new Date(utc + (3.5 * 60 * 60 * 1000))
}

// Helper to format relative time using Tehran timezone
function getRelativeTime(dateString: string, language: 'fa' | 'en'): string {
  const date = new Date(dateString)
  const tehranNow = getTehranNow()
  const diffMs = tehranNow.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffDays / 7)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (language === 'fa') {
    if (diffDays === 0) return 'امروز'
    if (diffDays === 1) return 'دیروز'
    if (diffDays < 7) return `${diffDays} روز پیش`
    if (diffWeeks === 1) return 'یک هفته پیش'
    if (diffWeeks < 4) return `${diffWeeks} هفته پیش`
    if (diffMonths === 1) return 'یک ماه پیش'
    if (diffMonths < 12) return `${diffMonths} ماه پیش`
    if (diffYears === 1) return 'یک سال پیش'
    return `${diffYears} سال پیش`
  } else {
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffWeeks === 1) return '1 week ago'
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`
    if (diffMonths === 1) return '1 month ago'
    if (diffMonths < 12) return `${diffMonths} months ago`
    if (diffYears === 1) return '1 year ago'
    return `${diffYears} years ago`
  }
}

export default function PostCard({ post, featured = false, minimal = false }: PostCardProps) {
  const { slug, frontmatter } = post
  const { language } = useLayout()
  const [relativeDate, setRelativeDate] = useState<string>(frontmatter.date)
  
  // Update relative date on mount and when language changes (Tehran timezone, every second)
  useEffect(() => {
    setRelativeDate(getRelativeTime(frontmatter.date, language))
    
    // Update every second for real-time accuracy
    const timer = setInterval(() => {
      setRelativeDate(getRelativeTime(frontmatter.date, language))
    }, 1000)
    
    return () => clearInterval(timer)
  }, [frontmatter.date, language])
  
  // Build the post URL with language parameter
  const postUrl = language === 'en' ? `/posts/${slug}?lang=en` : `/posts/${slug}`
  
  const categoryColor = (cat: string) => {
    // Simple map for Persian categories if needed, or use same logic
    if (cat === 'شخصی' || cat === 'Personal') return 'text-gold';
    if (cat === 'اخبار' || cat === 'News') return 'text-teal';
    return 'text-burgundy'; // Essays / Articles
  }

  // FEATURED / HERO LAYOUT
  if (featured) {
    return (
      <article className="group relative w-full">
        <div className="flex flex-col items-start w-full">
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-wide text-charcoal/60">
            <span className={`${categoryColor(frontmatter.category)}`}>
              {frontmatter.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-charcoal/30"></span>
            <span>{relativeDate}</span>
          </div>

          {/* Headline */}
          <Link href={postUrl} className="block w-full">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal leading-tight group-hover:text-burgundy transition-colors duration-300">
              {frontmatter.title}
            </h2>
          </Link>

          {/* Deck / Excerpt */}
          <p className="text-lg md:text-2xl text-charcoal/80 leading-relaxed mb-8 max-w-3xl">
            {frontmatter.excerpt}
          </p>

          {/* Call to Action */}
          <Link 
            href={postUrl}
            className="inline-flex items-center gap-2 text-sm font-bold text-burgundy border-b border-burgundy pb-1 hover:opacity-80 transition-opacity"
          >
            {language === 'fa' ? 'ادامه مطلب' : 'Read Story'}
            <span className={`text-lg leading-none mb-0.5 ${language === 'fa' ? 'rotate-180' : ''}`}>→</span>
          </Link>
        </div>
      </article>
    )
  }

  // MINIMAL / SIDEBAR LAYOUT
  if (minimal) {
    return (
      <article className="group py-3 border-b border-charcoal/5 last:border-0">
        <Link href={postUrl} className="block">
          <div className="flex items-baseline justify-between mb-1">
            <span className={`text-[10px] font-bold ${categoryColor(frontmatter.category)}`}>
              {frontmatter.category}
            </span>
          </div>
          <h3 className="text-base font-bold text-charcoal group-hover:text-burgundy transition-colors leading-tight mb-1">
            {frontmatter.title}
          </h3>
          <span className="block text-[10px] text-charcoal/40">
            {relativeDate}
          </span>
        </Link>
      </article>
    )
  }

  // STANDARD GRID LAYOUT
  return (
    <article className="group flex flex-col h-full">
      {/* Meta Top */}
      <div className="mb-3 flex items-center gap-2 text-[10px] font-bold text-charcoal/50">
        <span className={`${categoryColor(frontmatter.category)}`}>
          {frontmatter.category}
        </span>
        <span>/</span>
        <span>{relativeDate}</span>
      </div>

      {/* Title */}
      <Link href={postUrl} className="block group-hover:opacity-95 transition-opacity">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-charcoal leading-tight group-hover:text-burgundy transition-colors duration-300">
          {frontmatter.title}
        </h3>
        
        <p className="text-base md:text-lg text-charcoal/70 leading-relaxed mb-6 line-clamp-3">
          {frontmatter.excerpt}
        </p>
      </Link>
    </article>
  )
}
