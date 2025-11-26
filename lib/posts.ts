import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format } from 'date-fns'

// Define both directories
const postsDirectoryFa = path.join(process.cwd(), 'content/posts')
const postsDirectoryEn = path.join(process.cwd(), 'content/posts-en')

export interface PostFrontmatter {
  title: string
  date: string
  category: string
  excerpt: string
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
  readTime: number
  locale?: 'fa' | 'en'
}

// Helper to get directory based on locale
function getDirectory(locale: 'fa' | 'en' = 'fa') {
  return locale === 'en' ? postsDirectoryEn : postsDirectoryFa
}

export function getAllPosts(locale: 'fa' | 'en' = 'fa'): Post[] {
  const directory = getDirectory(locale)
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(directory)) {
    return []
  }

  const fileNames = fs.readdirSync(directory)
  const posts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(directory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      // Calculate read time (average 200 words per minute)
      const wordCount = content.split(/\s+/).length
      const readTime = Math.ceil(wordCount / 200)

      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
        readTime,
        locale,
      }
    })

  // Sort posts by date, most recent first
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date)
    const dateB = new Date(b.frontmatter.date)
    return dateB.getTime() - dateA.getTime()
  })
}

export function getPostBySlug(slug: string, locale: 'fa' | 'en' = 'fa'): Post | null {
  try {
    const directory = getDirectory(locale)
    const fullPath = path.join(directory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const wordCount = content.split(/\s+/).length
    const readTime = Math.ceil(wordCount / 200)

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      readTime,
      locale
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string, locale: 'fa' | 'en' = 'fa'): Post[] {
  const allPosts = getAllPosts(locale)
  return allPosts.filter(post => post.frontmatter.category === category)
}

export function getFeaturedPost(locale: 'fa' | 'en' = 'fa'): Post | null {
  const allPosts = getAllPosts(locale)
  return allPosts.find(post => post.frontmatter.featured) || allPosts[0] || null
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'MMMM d, yyyy')
}

export function getPageContent(pageName: string): { content: string; data: Record<string, unknown> } | null {
  try {
    const fullPath = path.join(process.cwd(), 'content/pages', `${pageName}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return { content, data }
  } catch {
    return null
  }
}
