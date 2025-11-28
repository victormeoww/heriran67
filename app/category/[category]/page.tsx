import { getPostsByCategory } from '@/lib/posts'
import { notFound } from 'next/navigation'
import CategoryContent from './CategoryContent'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const validCategories = ['Essay', 'Breaking News', 'Personal']

export async function generateStaticParams() {
  return validCategories.map((category) => ({
    category: category,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  
  if (!validCategories.includes(category)) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category} | HER iran`,
    description: `Browse all ${category} posts from HER iran`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  
  if (!validCategories.includes(category)) {
    notFound()
  }

  // Fetch posts for both languages
  const postsEn = getPostsByCategory(category, 'en')
  const postsFa = getPostsByCategory(category, 'fa')

  return <CategoryContent category={category} postsEn={postsEn} postsFa={postsFa} />
}
