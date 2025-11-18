# HER iran

> An anonymous voice from inside Iran

A sophisticated, static blog platform built for privacy, performance, and beauty. This editorial website serves as an anonymous platform for sharing essays, breaking news, and personal reflections from inside Iran.

![HER iran](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=flat-square&logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat-square&logo=tailwind-css)

---

## 🎨 Design Philosophy

**HER iran** combines high-end editorial aesthetics with Persian cultural influences, creating a sophisticated platform that honors both Iranian heritage and contemporary design sensibilities.

### Design Features

- **Typography:** Elegant serif fonts (Cormorant Garamond, Crimson Text) for literary feel
- **Color Palette:** Inspired by Persian carpets and miniatures
  - Cream background (#FAF9F6)
  - Burgundy accent (#8B1538)
  - Saffron gold (#F4C430)
  - Rich teal (#008B8B)
- **Persian Patterns:** Subtle geometric patterns inspired by Persian tile work
- **Responsive:** Optimized for all devices with generous white space
- **Performance:** Fully static, optimized for slow connections

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Basic understanding of Markdown

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd HERiran

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see your site.

---

## 📝 Adding New Posts

### 1. Create a Markdown File

Create a new `.md` file in `/content/posts/` with this naming convention:

```
YYYY-MM-DD-post-slug.md
```

**Example:** `2025-01-20-my-new-post.md`

### 2. Add Frontmatter

At the top of your markdown file, add:

```yaml
---
title: "Your Post Title"
date: "2025-01-20"
category: "Essay" | "Breaking News" | "Personal"
excerpt: "A brief description of your post (120-150 characters)"
featured: true/false
---

Your post content starts here...
```

### 3. Write Your Content

Use standard markdown syntax:

```markdown
## Headings

Regular paragraphs with **bold** and *italic* text.

> Blockquotes for pull quotes

- Bullet lists
- Work naturally

1. Numbered lists
2. Also supported

[Links](https://example.com) work as expected

![Images](/path/to/image.jpg) are supported
```

### 4. Set Featured Post

Only **one post** should have `featured: true` at a time. This post will be prominently displayed on the homepage.

---

## 📁 Project Structure

```
HERiran/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── posts/[slug]/       # Individual post pages
│   ├── category/[cat]/     # Category filter pages
│   ├── about/              # About page
│   └── not-found.tsx       # 404 page
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── Footer.tsx          # Site footer
│   ├── PostCard.tsx        # Post preview cards
│   └── PersianPattern.tsx  # Decorative SVG patterns
├── lib/
│   ├── posts.ts            # Post reading/parsing utilities
│   └── rss.ts              # RSS feed generation
├── content/
│   ├── posts/              # Blog posts (markdown)
│   └── pages/              # Static pages (markdown)
├── public/                 # Static assets
├── scripts/
│   └── generate-rss.ts     # RSS generation script
└── [config files]
```

---

## 🏗️ Building for Production

### Generate Static Site

```bash
npm run build
```

This will:
1. Generate RSS feed
2. Build all pages as static HTML
3. Output to `/out` directory

The `out` folder contains your complete static site, ready to deploy.

---

## 🌐 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

**Best for:** Privacy, speed, DDoS protection

```bash
# 1. Build your site
npm run build

# 2. Deploy to Cloudflare Pages
# - Go to pages.cloudflare.com
# - Connect your Git repository
# - Set build command: npm run build
# - Set output directory: out
# - Deploy!
```

**Cloudflare Pages Benefits:**
- Free tier available
- Global CDN
- Automatic HTTPS
- DDoS protection
- No server configuration needed

### Option 2: Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Option 3: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

### Option 4: GitHub Pages

```bash
# 1. Build
npm run build

# 2. Create gh-pages branch and push /out folder
# 3. Enable GitHub Pages in repository settings
```

### Option 5: Self-Hosted (Any Static Host)

Simply upload the contents of `/out` to any web server. No special configuration needed.

**Nginx Example:**

```nginx
server {
    listen 80;
    server_name heriran.co;
    root /var/www/heriran/out;
    
    location / {
        try_files $uri $uri/ $uri.html =404;
    }
}
```

---

## 🔒 Security & Privacy

### Built-in Privacy Features

✅ **No tracking or analytics** - Zero third-party scripts  
✅ **No comments section** - Protects author anonymity  
✅ **No server-side code** - Fully static, harder to exploit  
✅ **RSS feed** - Allows secure following without repeated visits  
✅ **Minimal JavaScript** - Reduces attack surface  

### Deployment Security Tips

1. **Use HTTPS** - Always enable SSL/TLS
2. **Hide hosting metadata** - Use privacy-focused hosting
3. **Secure your build environment** - Use encrypted connections
4. **ProtonMail for contact** - End-to-end encrypted email
5. **VPN/Tor for updates** - Mask your location when publishing
6. **Regular backups** - Keep encrypted copies of your content

### Content Security

```bash
# Before committing sensitive content:
# 1. Remove metadata from images
exiftool -all= image.jpg

# 2. Use secure connections
git config --global http.sslVerify true

# 3. Consider signing commits with GPG (optional)
git config --global commit.gpgsign true
```

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  cream: '#FAF9F6',
  burgundy: '#8B1538',
  saffron: '#F4C430',
  teal: '#008B8B',
  // Add your own colors
}
```

### Modify Typography

Edit fonts in `app/layout.tsx`:

```typescript
import { Your_Font_Choice } from 'next/font/google'
```

### Add New Categories

1. Add category to `lib/posts.ts` type definition
2. Update `components/Header.tsx` navigation
3. Add color in `components/PostCard.tsx`

### Customize Persian Patterns

Edit `components/PersianPattern.tsx` to create new SVG patterns.

---

## 📱 Content Management Workflow

### Recommended Workflow

```bash
# 1. Write post locally
vim content/posts/2025-01-20-new-post.md

# 2. Preview locally
npm run dev
# Visit http://localhost:3000

# 3. Build static site
npm run build

# 4. Deploy
# (Deployment method depends on your hosting)

# 5. Verify
# Visit your live site and check RSS feed
```

### Backup Strategy

```bash
# Regularly backup your content directory
tar -czf heriran-backup-$(date +%Y%m%d).tar.gz content/

# Store encrypted backups off-site
gpg --encrypt heriran-backup-20250120.tar.gz
```

---

## 🛠️ Advanced Features

### RSS Feed

Generated automatically during build at `/public/rss.xml`

Readers can subscribe via:
- Feed readers (Feedly, NewsBlur)
- RSS apps (Reeder, NetNewsWire)
- Email services (Blogtrottr)

### SEO Optimization

- Meta tags automatically generated from frontmatter
- OpenGraph tags for social sharing
- Semantic HTML structure
- Fast loading times (Core Web Vitals optimized)

### Performance

- Fully static HTML (no server processing)
- Optimized images (use WebP format)
- Minimal JavaScript (~50KB total)
- Tree-shaking and code splitting
- Perfect Lighthouse scores possible

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Posts Not Appearing

- Check markdown file is in `/content/posts/`
- Verify frontmatter format is correct
- Ensure date format is `YYYY-MM-DD`
- Check for YAML syntax errors

### Styles Not Loading

```bash
# Rebuild Tailwind
npm run build
```

### RSS Feed Not Updating

```bash
# Manually regenerate
npm run generate-rss
```

---

## 📖 Markdown Tips

### Pull Quotes

Use blockquotes for elegant pull quotes:

```markdown
> This text will be styled as a large, burgundy pull quote
```

### Horizontal Rules

Create decorative dividers:

```markdown
---
```

### Drop Caps

The first paragraph automatically gets a drop cap on the first letter.

### Code Blocks

````markdown
```javascript
const example = "code blocks are supported"
```
````

---

## 🌍 Internationalization

Currently supports English content. To add Persian/Farsi:

1. Install RTL support
2. Add Persian fonts
3. Modify text direction in layout
4. Update language metadata

---

## 📄 License

This project is provided as-is for editorial and educational purposes. Modify and use as needed for your own anonymous publishing platform.

---

## 🤝 Support

- **Secure Contact:** heriran@protonmail.com
- **Report Issues:** [Create an issue] (if using public repo)
- **RSS Feed:** `/rss.xml`

---

## ⚡ Performance Checklist

Before deploying:

- [ ] Optimize all images (WebP format, compressed)
- [ ] Test on slow connections (3G throttling)
- [ ] Verify RSS feed works
- [ ] Check responsive design on mobile
- [ ] Test all links
- [ ] Verify no console errors
- [ ] Run Lighthouse audit
- [ ] Test with screen readers (accessibility)

---

## 🎯 Content Guidelines

### Writing Style

- **Be authentic** - Write in your voice
- **Be specific** - Details make stories real
- **Be careful** - Protect yourself and others
- **Be consistent** - Regular updates build trust

### Safety Reminders

- Never reveal identifying information
- Remove metadata from images
- Use secure connections always
- Consider timing of posts (timezone info)
- Don't mention specific people without consent

---

**Built with courage. Published with care. Read with purpose.**

*HER iran - An anonymous voice from inside Iran*

