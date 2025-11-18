import Link from 'next/link'
import { Post, formatDate } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { slug, frontmatter, readTime } = post
  const categoryColors = {
    'Essay': 'text-burgundy',
    'Breaking News': 'text-teal',
    'Personal': 'text-saffron',
  }

  if (featured) {
    return (
      <article className="relative overflow-hidden rounded-lg bg-white shadow-lg hover-lift group">
        <div className="p-8 md:p-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`text-xs font-sans uppercase tracking-widest ${categoryColors[frontmatter.category]}`}>
              {frontmatter.category}
            </span>
            <span className="text-charcoal/30">·</span>
            <span className="text-sm font-sans text-charcoal/60">
              {formatDate(frontmatter.date)}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-balance leading-tight group-hover:text-burgundy transition-colors">
            <Link href={`/posts/${slug}`}>
              {frontmatter.title}
            </Link>
          </h2>

          <p className="text-xl md:text-2xl text-charcoal/80 leading-relaxed mb-8 text-balance">
            {frontmatter.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <Link 
              href={`/posts/${slug}`}
              className="inline-flex items-center text-burgundy font-sans text-sm uppercase tracking-wide hover:gap-2 transition-all group"
            >
              <span>Continue Reading</span>
              <svg className="w-4 h-4 ml-2 group-hover:ml-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="text-sm font-sans text-charcoal/50">
              {readTime} min read
            </span>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group">
      <Link href={`/posts/${slug}`} className="block">
        <div className="mb-3 flex items-center space-x-3">
          <span className={`text-xs font-sans uppercase tracking-widest ${categoryColors[frontmatter.category]}`}>
            {frontmatter.category}
          </span>
          <span className="text-charcoal/30">·</span>
          <span className="text-sm font-sans text-charcoal/60">
            {formatDate(frontmatter.date)}
          </span>
          <span className="text-charcoal/30">·</span>
          <span className="text-sm font-sans text-charcoal/50">
            {readTime} min
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-display font-semibold mb-3 text-balance leading-tight group-hover:text-burgundy transition-colors">
          {frontmatter.title}
        </h3>

        <p className="text-lg text-charcoal/70 leading-relaxed text-balance">
          {frontmatter.excerpt}
        </p>
      </Link>
    </article>
  )
}

