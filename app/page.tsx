import { getAllPosts, getFeaturedPost } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import PersianPattern from '@/components/PersianPattern'

export default function HomePage() {
  const featuredPost = getFeaturedPost()
  const allPosts = getAllPosts()
  const otherPosts = allPosts.filter(post => post.slug !== featuredPost?.slug)
  
  const mainPosts = otherPosts.slice(0, 6)
  const sidePosts = otherPosts.slice(6, 10)

  return (
    <div className="min-h-screen bg-cream">
      {/* Main Content Container - The "Paper" */}
      <div className="max-w-[1400px] mx-auto border-x border-charcoal/10 bg-cream min-h-screen shadow-2xl shadow-charcoal/5">
        
        {/* Featured / Hero Section */}
        {featuredPost && (
          <section className="border-b border-charcoal/10 relative overflow-hidden group">
            {/* Background Pattern Watermark */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
              <PersianPattern variant="star" className="w-full h-full text-charcoal" />
            </div>
            
            <div className="p-6 md:p-12 lg:p-20">
              <PostCard post={featuredPost} featured />
            </div>
          </section>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column - Main Feed */}
          <div className="lg:col-span-8 lg:border-r border-charcoal/10 p-6 md:p-12">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12">
              <span className="w-3 h-3 bg-burgundy rotate-45"></span>
              <h2 className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-charcoal">
                Latest Dispatches
              </h2>
              <div className="h-px flex-grow bg-charcoal/10"></div>
            </div>

            <div className="space-y-16">
              {mainPosts.map((post, index) => (
                <div key={post.slug} className="fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <PostCard post={post} />
                  {/* Divider between posts, but not after the last one */}
                  {index !== mainPosts.length - 1 && (
                    <div className="mt-16 flex justify-center opacity-20">
                       <PersianPattern variant="divider" className="w-48 h-2 text-charcoal" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 bg-sand/10">
            <div className="sticky top-24 p-6 md:p-12">
              
              {/* About Box */}
              <div className="bg-charcoal text-cream p-8 mb-16 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-bold mb-4 text-gold">Mission</h3>
                  <p className="font-serif text-lg leading-relaxed text-cream/90 mb-6">
                    We are the anonymous chroniclers of a changing Iran. Documenting the struggle, uncensored and unfiltered.
                  </p>
                  <div className="w-full h-px bg-white/20 mb-6"></div>
                  <p className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-gold/80">
                    Established 2025
                  </p>
                </div>
                {/* Decorative bg pattern */}
                <div className="absolute -bottom-10 -right-10 text-white/5">
                  <PersianPattern variant="geometric" className="w-40 h-40" />
                </div>
              </div>

              {/* Secondary Posts List */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8 border-b border-charcoal/10 pb-3">
                  <span className="w-2 h-2 bg-charcoal rounded-full"></span>
                  <h3 className="text-xs font-sans font-bold tracking-[0.2em] uppercase text-charcoal">
                    More Stories
                  </h3>
                </div>
                
                <div className="space-y-0 divide-y divide-charcoal/10 border-t border-b border-charcoal/10">
                  {sidePosts.length > 0 ? (
                    sidePosts.map((post) => (
                      <PostCard key={post.slug} post={post} minimal />
                    ))
                  ) : (
                    <p className="py-4 text-sm font-serif text-charcoal/50 italic">No archive available.</p>
                  )}
                </div>
              </div>

              {/* Newsletter / RSS Stub */}
              <div className="text-center p-8 border border-charcoal/10 bg-white/50">
                <PersianPattern variant="geometric" className="w-8 h-8 mx-auto text-burgundy mb-4 opacity-50" />
                <h4 className="font-display text-xl font-bold text-charcoal mb-2">Stay Connected</h4>
                <p className="text-sm font-serif text-charcoal/60 mb-4">
                  Follow our RSS feed for secure updates.
                </p>
                <a href="/rss.xml" className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.2em] bg-burgundy text-cream px-4 py-2 hover:bg-charcoal transition-colors">
                  Subscribe RSS
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
