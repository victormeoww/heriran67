import Link from 'next/link'
import { Post } from '@/lib/posts'
import { useLayout } from './LayoutContext'

interface PostCardProps {
  post: Post
  featured?: boolean
  minimal?: boolean
}

export default function PostCard({ post, featured = false, minimal = false }: PostCardProps) {
  const { slug, frontmatter } = post
  const { language } = useLayout()
  
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
            <span>{frontmatter.date}</span>
          </div>

          {/* Headline */}
          <Link href={`/posts/${slug}`} className="block w-full">
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
            href={`/posts/${slug}`}
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
        <Link href={`/posts/${slug}`} className="block">
          <div className="flex items-baseline justify-between mb-1">
            <span className={`text-[10px] font-bold ${categoryColor(frontmatter.category)}`}>
              {frontmatter.category}
            </span>
          </div>
          <h3 className="text-base font-bold text-charcoal group-hover:text-burgundy transition-colors leading-tight mb-1">
            {frontmatter.title}
          </h3>
          <span className="block text-[10px] text-charcoal/40">
            {frontmatter.date}
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
        <span>{frontmatter.date}</span>
      </div>

      {/* Title */}
      <Link href={`/posts/${slug}`} className="block group-hover:opacity-95 transition-opacity">
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
