import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PersianPattern from '@/components/PersianPattern'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.frontmatter.title} | HER iran`,
    description: post.frontmatter.excerpt,
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex(p => p.slug === params.slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  const categoryColors = {
    'Essay': 'text-burgundy',
    'Breaking News': 'text-teal',
    'Personal': 'text-saffron',
  }

  return (
    <article className="min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <Link 
          href="/"
          className="inline-flex items-center text-charcoal/60 hover:text-burgundy transition-colors font-sans text-sm group"
        >
          <svg className="w-4 h-4 mr-2 group-hover:mr-3 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all posts
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-article mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="flex items-center space-x-3 mb-6">
          <span className={`text-xs font-sans uppercase tracking-widest ${categoryColors[post.frontmatter.category]}`}>
            {post.frontmatter.category}
          </span>
          <span className="text-charcoal/30">·</span>
          <span className="text-sm font-sans text-charcoal/60">
            {formatDate(post.frontmatter.date)}
          </span>
          <span className="text-charcoal/30">·</span>
          <span className="text-sm font-sans text-charcoal/50">
            {post.readTime} min read
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-charcoal leading-tight mb-8 text-balance">
          {post.frontmatter.title}
        </h1>

        {/* Decorative Divider */}
        <div className="flex justify-start mb-8">
          <PersianPattern variant="divider" className="w-48 h-6 text-burgundy" opacity={0.3} />
        </div>

        <p className="text-xl md:text-2xl text-charcoal/70 leading-relaxed italic">
          {post.frontmatter.excerpt}
        </p>
      </header>

      {/* Article Content */}
      <div className="max-w-article mx-auto px-6 md:px-12 pb-16">
        <div className="prose">
          <MDXRemote source={post.content} />
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="flex justify-center py-12">
        <PersianPattern variant="geometric" className="w-16 h-16 text-burgundy opacity-20" />
      </div>

      {/* Previous/Next Navigation */}
      <nav className="max-w-7xl mx-auto px-6 md:px-12 py-16 border-t border-light-gray">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {prevPost ? (
            <Link 
              href={`/posts/${prevPost.slug}`}
              className="group text-left"
            >
              <span className="text-xs font-sans uppercase tracking-widest text-charcoal/50 mb-2 block">
                Previous Post
              </span>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-charcoal group-hover:text-burgundy transition-colors">
                {prevPost.frontmatter.title}
              </h3>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link 
              href={`/posts/${nextPost.slug}`}
              className="group text-left md:text-right"
            >
              <span className="text-xs font-sans uppercase tracking-widest text-charcoal/50 mb-2 block">
                Next Post
              </span>
              <h3 className="text-xl md:text-2xl font-display font-semibold text-charcoal group-hover:text-burgundy transition-colors">
                {nextPost.frontmatter.title}
              </h3>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>
    </article>
  )
}

