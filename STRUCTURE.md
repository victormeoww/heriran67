# HER iran - Project Structure

## Complete File Tree

```
HERiran/
│
├── 📱 app/                           # Next.js App Router
│   ├── about/
│   │   └── page.tsx                  # About page
│   ├── category/
│   │   └── [category]/
│   │       └── page.tsx              # Dynamic category pages
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx              # Dynamic post pages
│   ├── favicon.ico                   # Site icon
│   ├── globals.css                   # Global styles + prose styling
│   ├── layout.tsx                    # Root layout (fonts, metadata)
│   ├── not-found.tsx                 # 404 page
│   └── page.tsx                      # Homepage
│
├── 🎨 components/                    # React components
│   ├── Footer.tsx                    # Site footer with RSS link
│   ├── Header.tsx                    # Sticky navigation header
│   ├── PersianPattern.tsx            # Decorative SVG patterns
│   └── PostCard.tsx                  # Post preview cards
│
├── 📝 content/                       # Markdown content (CMS)
│   ├── pages/
│   │   └── about.md                  # About page content
│   └── posts/                        # Blog posts
│       ├── 2025-01-05-winter-in-tehran.md
│       ├── 2025-01-10-on-resilience.md
│       ├── 2025-01-15-the-streets-remember.md (featured)
│       └── 2025-01-20-breaking-news-internet-shutdown.md
│
├── 🛠️ lib/                           # Utility functions
│   ├── posts.ts                      # Post reading/parsing
│   └── rss.ts                        # RSS feed generation
│
├── 📜 scripts/                       # Build scripts
│   └── generate-rss.ts               # RSS generation script
│
├── 🌍 public/                        # Static assets
│   └── robots.txt                    # SEO directives
│   └── (rss.xml generated here)      # RSS feed (build-time)
│
├── ⚙️ Configuration Files
│   ├── .eslintrc.json                # ESLint rules
│   ├── .gitignore                    # Git exclusions
│   ├── .npmrc                        # NPM settings
│   ├── .nvmrc                        # Node version (18.18.0)
│   ├── .prettierrc                   # Code formatting
│   ├── next.config.js                # Next.js (static export)
│   ├── package.json                  # Dependencies & scripts
│   ├── postcss.config.js             # PostCSS config
│   ├── tailwind.config.ts            # Tailwind (colors/fonts)
│   └── tsconfig.json                 # TypeScript config
│
└── 📚 Documentation
    ├── CONTRIBUTING.md               # Contribution guidelines
    ├── DEPLOYMENT.md                 # Deployment instructions
    ├── PROJECT_SUMMARY.md            # Project overview
    ├── QUICKSTART.md                 # 5-minute setup
    ├── README.md                     # Complete documentation
    └── STRUCTURE.md                  # This file
```

## Directory Purposes

### `/app` - Application Pages
Next.js 14+ App Router structure. Each folder represents a route:
- `page.tsx` files are page components
- `layout.tsx` wraps all pages
- Dynamic routes use `[param]` syntax

### `/components` - Reusable Components
React components used across multiple pages:
- **Header:** Navigation, mobile menu, category links
- **Footer:** Contact info, RSS link, Persian patterns
- **PostCard:** Post previews (featured and standard variants)
- **PersianPattern:** Three SVG pattern types (star, geometric, divider)

### `/content` - Content Management
Markdown files serving as the CMS:
- **posts/**: Blog posts with frontmatter (title, date, category, excerpt)
- **pages/**: Static page content (currently just about.md)

File naming: `YYYY-MM-DD-post-slug.md`

### `/lib` - Utility Functions
Server-side utilities for data processing:
- **posts.ts:** 
  - `getAllPosts()` - Get all posts, sorted by date
  - `getPostBySlug()` - Get single post
  - `getPostsByCategory()` - Filter by category
  - `getFeaturedPost()` - Get featured post
  - `formatDate()` - Format dates nicely
- **rss.ts:**
  - `generateRSS()` - Create RSS feed XML

### `/scripts` - Build Scripts
Scripts run during build process:
- **generate-rss.ts:** Creates RSS feed before build

### `/public` - Static Assets
Files served directly (no processing):
- `robots.txt` - SEO instructions
- `rss.xml` - Generated RSS feed (created during build)
- Images, fonts, etc. can go here

## Build Output

When you run `npm run build`, Next.js creates:

```
/out/                              # Static site output
├── index.html                     # Homepage
├── about/
│   └── index.html
├── posts/
│   ├── 2025-01-05-winter-in-tehran/
│   │   └── index.html
│   ├── 2025-01-10-on-resilience/
│   │   └── index.html
│   └── [all other posts...]
├── category/
│   ├── Essay/
│   │   └── index.html
│   ├── Breaking News/
│   │   └── index.html
│   └── Personal/
│       └── index.html
├── rss.xml
├── _next/                         # Optimized JS/CSS
│   ├── static/
│   └── ...
└── [other static assets]
```

This `/out` folder is your complete static website ready to deploy.

## Data Flow

```
┌─────────────────────────────────────────────────────────┐
│  Markdown Files (content/posts/*.md)                    │
│  - Title, date, category, excerpt in frontmatter        │
│  - Body content in markdown                             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ Read at build time
                   ▼
┌─────────────────────────────────────────────────────────┐
│  lib/posts.ts                                           │
│  - gray-matter parses frontmatter                       │
│  - Calculates read time                                 │
│  - Sorts by date                                        │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ Used by
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Page Components (app/**/*.tsx)                         │
│  - Homepage: getFeaturedPost(), getAllPosts()           │
│  - Post page: getPostBySlug()                           │
│  - Category: getPostsByCategory()                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ MDXRemote renders
                   ▼
┌─────────────────────────────────────────────────────────┐
│  Styled HTML Output                                     │
│  - Prose styling from globals.css                       │
│  - Tailwind classes for layout                          │
│  - Persian patterns as decorations                      │
└─────────────────────────────────────────────────────────┘
```

## Styling Architecture

```
Global Styles (globals.css)
├── Tailwind directives (@tailwind base/components/utilities)
├── Custom animations (fadeIn, hover-lift, underline-slide)
└── Prose styles for markdown content
    ├── Typography (p, h2, h3)
    ├── Links (burgundy with underline animation)
    ├── Blockquotes (italic with burgundy border)
    ├── Lists (custom spacing)
    ├── Code blocks (light gray background)
    └── Drop cap (first letter of first paragraph)

Tailwind Config (tailwind.config.ts)
├── Custom colors (cream, burgundy, saffron, teal)
├── Font families (display: Cormorant, serif: Crimson, sans: Inter)
└── Max-width utilities (article: 680px)

Component Styles
└── Inline Tailwind classes + custom utilities
```

## Build Process

```
1. Developer runs: npm run build
   │
   ├─→ Step 1: npm run generate-rss
   │   └─→ Reads all posts
   │       └─→ Creates public/rss.xml
   │
   └─→ Step 2: next build
       ├─→ Reads all markdown files
       ├─→ Generates static HTML for each page
       ├─→ Generates static HTML for each post
       ├─→ Generates static HTML for each category
       ├─→ Optimizes CSS (Tailwind purge)
       ├─→ Bundles JavaScript (tree-shaking)
       └─→ Outputs to /out directory

2. Result: /out contains complete static site
   └─→ Ready to deploy to any static host
```

## Development Workflow

```
Write Content
    └─→ Create .md file in content/posts/
        └─→ Add frontmatter (title, date, etc.)
            └─→ Write markdown content
                │
Preview Locally
    └─→ npm run dev
        └─→ Visit localhost:3000
            └─→ Hot reload shows changes
                │
Build for Production
    └─→ npm run build
        └─→ RSS feed generated
            └─→ Static HTML created
                └─→ /out folder ready
                    │
Deploy
    └─→ Upload /out to hosting
        └─→ Site goes live
```

## Key File Relationships

```
layout.tsx (root wrapper)
    │
    ├─→ Imports fonts (Google Fonts)
    ├─→ Wraps with <Header />
    ├─→ Renders {children} (page content)
    └─→ Wraps with <Footer />

page.tsx (homepage)
    │
    ├─→ Calls getAllPosts() from lib/posts.ts
    ├─→ Calls getFeaturedPost() from lib/posts.ts
    ├─→ Renders <PostCard /> for each post
    └─→ Uses <PersianPattern /> for decoration

posts/[slug]/page.tsx (individual post)
    │
    ├─→ Calls getPostBySlug() from lib/posts.ts
    ├─→ Uses <MDXRemote /> to render markdown
    ├─→ Prose styles from globals.css applied
    └─→ Navigation to prev/next posts

category/[category]/page.tsx (category filter)
    │
    ├─→ Calls getPostsByCategory() from lib/posts.ts
    ├─→ Renders grid of <PostCard /> components
    └─→ Back navigation to home
```

## Adding New Features

### Add a New Page
```
1. Create app/your-page/page.tsx
2. Export default component
3. Add metadata (title, description)
4. Link to it from Header or Footer
```

### Add a New Component
```
1. Create components/YourComponent.tsx
2. Export default function
3. Import and use in pages
```

### Modify Styling
```
1. For markdown content: Edit globals.css (.prose styles)
2. For components: Use Tailwind classes
3. For colors/fonts: Edit tailwind.config.ts
```

### Change Category Names
```
1. Update validCategories in category/[category]/page.tsx
2. Update PostFrontmatter type in lib/posts.ts
3. Update categoryColors in components/PostCard.tsx
4. Update navigation in components/Header.tsx
```

## Performance Optimizations

- ✅ **Static generation** - No server processing
- ✅ **Tree-shaking** - Unused code removed
- ✅ **CSS purging** - Only used Tailwind classes included
- ✅ **Font optimization** - Google Fonts with display: swap
- ✅ **Minimal JavaScript** - ~50KB total
- ✅ **No client-side routing** - Direct HTML links
- ✅ **Semantic HTML** - Better SEO and accessibility

## Security Features

- ✅ **No backend** - Can't be hacked
- ✅ **No database** - No SQL injection
- ✅ **No user input** - No XSS vulnerabilities
- ✅ **Static files only** - Served directly
- ✅ **No tracking scripts** - Privacy by default
- ✅ **No comments** - No spam or doxxing risk

---

**This structure prioritizes:**
- Developer experience (clear organization)
- Performance (static generation)
- Security (no server-side code)
- Maintainability (simple, flat structure)
- Privacy (no tracking or user data)

**Perfect for anonymous publishing.**

