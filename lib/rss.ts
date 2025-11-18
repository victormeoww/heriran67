import RSS from 'rss'
import { getAllPosts } from './posts'
import fs from 'fs'
import path from 'path'

export function generateRSS() {
  const feed = new RSS({
    title: 'HER iran',
    description: 'An anonymous voice from inside Iran',
    feed_url: 'https://heriran.co/rss.xml',
    site_url: 'https://heriran.co',
    language: 'en',
    pubDate: new Date(),
  })

  const posts = getAllPosts()

  posts.forEach(post => {
    feed.item({
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      url: `https://heriran.co/posts/${post.slug}`,
      date: post.frontmatter.date,
      categories: [post.frontmatter.category],
    })
  })

  const rssPath = path.join(process.cwd(), 'public', 'rss.xml')
  fs.writeFileSync(rssPath, feed.xml())
}

