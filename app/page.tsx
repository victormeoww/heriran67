import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import PersianPattern from '@/components/PersianPattern'

export default function HomePage() {
  const featuredPost = getFeaturedPost()
  const allPosts = getAllPosts()
  const recentPosts = allPosts.filter(post => post.slug !== featuredPost?.slug).slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-cream py-16 md:py-24 overflow-hidden">
        <div className="absolute top-10 right-10 opacity-5">
          <PersianPattern variant="star" className="w-48 h-48 text-burgundy" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-charcoal fade-in">
            HER <span className="text-burgundy">iran</span>
          </h1>
          <p className="text-xl md:text-2xl font-serif text-charcoal/70 max-w-2xl mx-auto fade-in">
            An anonymous voice from inside Iran
          </p>
          
          {/* Decorative Divider */}
          <div className="flex justify-center mt-12">
            <PersianPattern variant="divider" className="w-64 h-8 text-burgundy" opacity={0.3} />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 -mt-8 mb-24 fade-in">
          <PostCard post={featuredPost} featured />
        </section>
      )}

      {/* Recent Posts */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-charcoal">
            Recent Writing
          </h2>
        </div>

        {recentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
            {recentPosts.map((post, index) => (
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
          <div className="text-center py-20">
            <p className="text-xl text-charcoal/60 font-serif">
              No posts yet. Check back soon.
            </p>
          </div>
        )}
      </section>

      {/* Decorative Footer Pattern */}
      <div className="flex justify-center pb-12">
        <PersianPattern variant="geometric" className="w-20 h-20 text-burgundy opacity-10" />
      </div>
    </div>
  )
}

