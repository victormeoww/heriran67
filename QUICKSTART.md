# Quick Start Guide

Get your HER iran blog running in 5 minutes.

## 1. Install Dependencies

```bash
cd HERiran
npm install
```

## 2. Create Your First Post

Create a file: `content/posts/2025-01-20-my-first-post.md`

```markdown
---
title: "My First Post"
date: "2025-01-20"
category: "Personal"
excerpt: "This is my first post on HER iran."
featured: true
---

# Welcome

This is my first post. Write your content here using markdown.

## Subheading

Add your thoughts, stories, and reflections.
```

## 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 4. Build for Production

```bash
npm run build
```

The static site will be in the `/out` directory.

## 5. Deploy

Upload the `/out` folder to any static hosting:

- **Cloudflare Pages** (recommended)
- Vercel
- Netlify  
- GitHub Pages
- Your own server

See `DEPLOYMENT.md` for detailed instructions.

---

## Daily Workflow

```bash
# 1. Write a new post
vim content/posts/2025-01-21-new-post.md

# 2. Preview locally
npm run dev

# 3. Build
npm run build

# 4. Deploy (method depends on your hosting)
# For Cloudflare Pages: git push origin main
# For manual deploy: upload /out folder
```

---

## Need Help?

- Full documentation: `README.md`
- Deployment guide: `DEPLOYMENT.md`
- Contact: heriran@protonmail.com

**You're ready to publish. Stay safe.**

