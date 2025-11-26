import { getAllPosts } from '@/lib/posts'
import ClientGrid from '@/components/ClientGrid'

export default function HomePage() {
  // Fetch both languages at build/request time
  const postsFa = getAllPosts('fa')
  const postsEn = getAllPosts('en')
  
  return (
    <div className="min-h-screen bg-cream">
      <ClientGrid postsFa={postsFa} postsEn={postsEn} />
    </div>
  )
}
