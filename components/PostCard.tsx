import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
  minimal?: boolean
}

export default function PostCard({ post, featured = false, minimal = false }: PostCardProps) {
  const { slug, frontmatter } = post
  
  // Category Styles - simplified to just text colors, used sparingly
  const categoryColor = (cat: string) => {
    switch(cat) {
      case 'Essay': return 'text-burgundy';
      case 'Breaking News': return 'text-teal';
      case 'Personal': return 'text-gold';
      default: return 'text-charcoal';
    }
  }

  // FEATURED / HERO LAYOUT
  if (featured) {
    return (
      <article className="group relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Kicker */}
          <div className="flex items-center gap-3 mb-4 md:mb-6 text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-charcoal/60">
            <span className={`${categoryColor(frontmatter.category)}`}>
              {frontmatter.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-charcoal/30"></span>
            <span>{formatDate(frontmatter.date)}</span>
          </div>

          {/* Headline */}
          <Link href={`/posts/${slug}`} className="block">
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 md:mb-8 text-charcoal leading-[0.9] tracking-tight text-balance group-hover:text-burgundy transition-colors duration-500">
              {frontmatter.title}
            </h2>
          </Link>

          {/* Deck / Excerpt - Reduced max-width and font size slightly for better fit */}
          <p className="text-lg md:text-2xl font-serif text-charcoal/80 leading-relaxed max-w-xl mx-auto mb-8 md:mb-10 text-balance">
            {frontmatter.excerpt}
          </p>

          {/* Call to Action */}
          <Link 
            href={`/posts/${slug}`}
            className="inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-burgundy hover:bg-burgundy hover:text-cream px-5 py-2.5 border border-burgundy transition-all duration-300"
          >
            Read Story
            <span className="text-lg leading-none mb-0.5">→</span>
          </Link>
        </div>
      </article>
    )
  }

  // MINIMAL / SIDEBAR LAYOUT
  if (minimal) {
    return (
      <article className="group py-4 hover:bg-white/50 transition-colors px-2 -mx-2">
        <Link href={`/posts/${slug}`} className="block">
          <div className="flex items-baseline justify-between mb-1">
            <span className={`text-[9px] font-sans font-bold uppercase tracking-[0.15em] ${categoryColor(frontmatter.category)}`}>
              {frontmatter.category}
            </span>
          </div>
          <h3 className="text-lg font-display font-bold text-charcoal group-hover:text-burgundy transition-colors leading-tight mb-1">
            {frontmatter.title}
          </h3>
          <span className="block text-[10px] font-sans text-charcoal/40 uppercase tracking-wide">
            {formatDate(frontmatter.date)}
          </span>
        </Link>
      </article>
    )
  }

  // STANDARD GRID LAYOUT
  return (
    <article className="group flex flex-col h-full">
      {/* Meta Top */}
      <div className="mb-4 flex items-center gap-2 text-[10px] font-sans font-bold tracking-[0.2em] uppercase">
        <span className={`${categoryColor(frontmatter.category)}`}>
          {frontmatter.category}
        </span>
        <span className="text-charcoal/20">/</span>
        <span className="text-charcoal/40">{formatDate(frontmatter.date)}</span>
      </div>

      {/* Title */}
      <Link href={`/posts/${slug}`} className="block group-hover:opacity-95 transition-opacity">
        <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-charcoal leading-[1.0] group-hover:text-burgundy transition-colors duration-300 tracking-tight text-balance">
          {frontmatter.title}
        </h3>
        
        <p className="text-base md:text-lg font-serif text-charcoal/70 leading-[1.6] mb-6 line-clamp-3">
          {frontmatter.excerpt}
        </p>
      </Link>

      {/* Read More Link */}
      <div className="mt-auto">
        <Link 
          href={`/posts/${slug}`}
          className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-charcoal/40 group-hover:text-burgundy border-b border-transparent group-hover:border-burgundy pb-0.5 transition-all"
        >
          Continue Reading
        </Link>
      </div>
    </article>
  )
}
