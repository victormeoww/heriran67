'use client'

import { Post } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import PersianPattern from '@/components/PersianPattern'
import { useLayout } from '@/components/LayoutContext'

interface CategoryContentProps {
  category: string
  postsEn: Post[]
  postsFa: Post[]
}

// Category translations
const categoryTranslations: Record<string, { fa: string; descEn: string; descFa: string }> = {
  'Essay': {
    fa: 'مقالات',
    descEn: 'In-depth analysis and reflections on culture and politics.',
    descFa: 'تحلیل‌های عمیق و تأملات درباره فرهنگ و سیاست.'
  },
  'Breaking News': {
    fa: 'اخبار',
    descEn: 'Urgent updates and reports from the ground.',
    descFa: 'به‌روزرسانی‌های فوری و گزارش‌ها از صحنه.'
  },
  'Personal': {
    fa: 'شخصی',
    descEn: 'Intimate stories and observations from daily life.',
    descFa: 'داستان‌های صمیمی و مشاهدات از زندگی روزمره.'
  }
}

export default function CategoryContent({ category, postsEn, postsFa }: CategoryContentProps) {
  const { language } = useLayout()
  const isFa = language === 'fa'
  
  const posts = isFa ? postsFa : postsEn
  const categoryData = categoryTranslations[category] || { fa: category, descEn: '', descFa: '' }

  return (
    <div className="min-h-screen bg-cream">
      {/* Category Header */}
      <section className={`pt-16 pb-10 border-b border-charcoal/5 ${isFa ? 'font-persian' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-burgundy mb-4">
              {isFa ? 'دسته‌بندی' : 'Browsing Category'}
            </span>
            
            <h1 className={`text-4xl md:text-6xl font-display font-bold text-charcoal mb-6 ${isFa ? 'font-persian' : ''}`}>
              {isFa ? categoryData.fa : category}
            </h1>
            
            <div className="w-24 h-1 bg-burgundy/20 rounded-full mb-6"></div>
            
            <p className={`text-lg font-serif text-charcoal/60 max-w-2xl ${isFa ? 'font-persian' : ''}`}>
              {isFa ? categoryData.descFa : categoryData.descEn}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
            {posts.map((post, index) => (
              <div 
                key={post.slug}
                className="fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 ${isFa ? 'font-persian' : ''}`}>
            <PersianPattern variant="star" className="w-24 h-24 text-burgundy opacity-10 mx-auto mb-6" />
            <p className={`text-lg text-charcoal/60 font-serif mb-6 ${isFa ? 'font-persian' : ''}`}>
              {isFa ? 'هیچ نوشته‌ای در این دسته‌بندی یافت نشد.' : 'No posts found in this category.'}
            </p>
            <Link 
              href="/"
              className="text-burgundy border-b border-burgundy/30 hover:border-burgundy pb-1 transition-all"
            >
              {isFa ? 'بازگشت به خانه' : 'Return to Homepage'}
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}

