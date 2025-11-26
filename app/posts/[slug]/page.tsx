import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import PostContent from './PostContent'
import { Suspense } from 'react'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const postsFa = getAllPosts('fa')
  const postsEn = getAllPosts('en')
  
  // Combine slugs from both languages (they should be the same)
  const slugs = new Set([
    ...postsFa.map(p => p.slug),
    ...postsEn.map(p => p.slug)
  ])
  
  return Array.from(slugs).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug, 'fa') || getPostBySlug(params.slug, 'en')
  
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

// Simple markdown to HTML converter for basic content
function markdownToHtml(markdown: string): string {
  return markdown
    // Convert paragraphs (double newlines)
    .split(/\n\n+/)
    .map(block => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      // Check if it's already wrapped or is a special block
      if (trimmed.startsWith('<')) return trimmed
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`
    })
    .join('\n')
}

export default function PostPage({ params }: PostPageProps) {
  const postFa = getPostBySlug(params.slug, 'fa')
  const postEn = getPostBySlug(params.slug, 'en')

  if (!postFa && !postEn) {
    notFound()
  }

  const allPostsFa = getAllPosts('fa')
  const allPostsEn = getAllPosts('en')
  
  // Pre-render the content as HTML
  const renderedContentFa = postFa ? markdownToHtml(postFa.content) : ''
  const renderedContentEn = postEn ? markdownToHtml(postEn.content) : ''

  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <PostContent 
        postFa={postFa} 
        postEn={postEn} 
        allPostsFa={allPostsFa}
        allPostsEn={allPostsEn}
        slug={params.slug}
        renderedContentFa={renderedContentFa}
        renderedContentEn={renderedContentEn}
      />
    </Suspense>
  )
}
