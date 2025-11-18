# Deployment Guide for HER iran

## Quick Deploy to Cloudflare Pages

### Prerequisites
- Cloudflare account
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Commit your content to Git**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Go to Cloudflare Pages**
   - Visit [pages.cloudflare.com](https://pages.cloudflare.com)
   - Click "Create a project"
   - Connect your Git provider

3. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** `/` (leave default)
   - **Node version:** 18 or higher

4. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete (2-3 minutes)
   - Your site will be live at `your-project.pages.dev`

5. **Add Custom Domain (Optional)**
   - Go to project settings
   - Add custom domain: `heriran.co`
   - Update DNS records as instructed
   - HTTPS automatically configured

### Automatic Deployments

Once connected, every push to your main branch will automatically trigger a new deployment.

---

## Deploy to Vercel

### Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel auto-detects Next.js configuration
5. Click "Deploy"

---

## Deploy to Netlify

### Using Netlify CLI

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=out
```

### Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Choose "Import an existing project"
4. Connect your Git repository
5. Set build command: `npm run build`
6. Set publish directory: `out`
7. Deploy

---

## Self-Hosted Deployment

### Using Nginx

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Copy files to server**
   ```bash
   scp -r out/* user@server:/var/www/heriran/
   ```

3. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       listen [::]:80;
       server_name heriran.co www.heriran.co;
       
       root /var/www/heriran;
       index index.html;
       
       location / {
           try_files $uri $uri/ $uri.html =404;
       }
       
       # Caching
       location ~* \.(jpg|jpeg|png|gif|ico|css|js|woff|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
       
       # Security headers
       add_header X-Frame-Options "SAMEORIGIN" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header X-XSS-Protection "1; mode=block" always;
   }
   ```

4. **Enable SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d heriran.co -d www.heriran.co
   ```

---

## GitHub Pages

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

3. **Add deploy script to package.json**
   ```json
   "scripts": {
     "deploy": "npm run build && touch out/.nojekyll && gh-pages -d out -t true"
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository settings
   - Navigate to "Pages"
   - Set source to `gh-pages` branch
   - Save

---

## Post-Deployment Checklist

- [ ] Verify homepage loads correctly
- [ ] Check all post pages render properly
- [ ] Test category filtering
- [ ] Verify RSS feed is accessible at `/rss.xml`
- [ ] Test on mobile devices
- [ ] Check HTTPS is working
- [ ] Verify custom domain (if applicable)
- [ ] Test performance with Lighthouse
- [ ] Check 404 page works

---

## Security Recommendations

### For Anonymous Publishing

1. **Use a VPN or Tor** when deploying
2. **Register domain privately** (WHOIS privacy protection)
3. **Use ProtonMail** or similar encrypted email
4. **Don't link to personal accounts** in Git history
5. **Remove EXIF data** from images before publishing
6. **Use anonymous payment methods** for hosting (if possible)
7. **Deploy from a secure machine** not linked to your identity

### Cloudflare Specific

Enable these features in Cloudflare dashboard:

- **DDoS protection** (automatic)
- **Always Use HTTPS** (SSL/TLS → Edge Certificates)
- **Security Level: High** (Security → Settings)
- **Challenge Passage: 30 minutes** (Security → Settings)
- **Browser Integrity Check: On** (Security → Settings)

---

## Continuous Deployment

### Workflow

```bash
# 1. Write new post
vim content/posts/2025-01-20-new-post.md

# 2. Preview locally
npm run dev

# 3. Commit and push
git add content/posts/2025-01-20-new-post.md
git commit -m "Add new post: Title"
git push origin main

# 4. Automatic deployment triggers
# (If connected to Cloudflare Pages/Vercel/Netlify)

# 5. Verify deployment
# Visit your site and check the new post
```

---

## Backup Strategy

### Regular Backups

```bash
# Backup content directory
tar -czf backup-$(date +%Y%m%d).tar.gz content/

# Encrypt backup
gpg --encrypt backup-20250120.tar.gz

# Store off-site
# Upload to encrypted cloud storage
```

### Git-Based Backups

Your Git repository is already a backup. Consider:

1. **Private repository** on GitHub/GitLab
2. **Multiple remotes** for redundancy
3. **Regular commits** with meaningful messages

---

## Updating the Site

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Update Next.js
npm install next@latest react@latest react-dom@latest

# Test locally
npm run dev

# Build and deploy
npm run build
```

### Adding New Features

1. Develop and test locally
2. Commit changes to a branch
3. Test build: `npm run build`
4. Merge to main
5. Automatic deployment (if configured)

---

## Monitoring

### Performance Monitoring

- **Lighthouse:** Chrome DevTools → Lighthouse
- **PageSpeed Insights:** [pagespeed.web.dev](https://pagespeed.web.dev)
- **WebPageTest:** [webpagetest.org](https://webpagetest.org)

### Uptime Monitoring

Consider using:
- **UptimeRobot** (free tier available)
- **Freshping** (free)
- **StatusCake** (free tier)

---

## Troubleshooting Deployment

### Build Fails on Platform

**Check Node version:**
```bash
# Most platforms need Node 18+
# Set in platform settings or in package.json:
"engines": {
  "node": ">=18.0.0"
}
```

### 404 on All Routes

- Verify build output directory is set to `out`
- Check that static export is working: `npm run build`
- Ensure `output: 'export'` is set in `next.config.js`

### RSS Feed Not Found

- Ensure `npm run generate-rss` runs before build
- Check `public/rss.xml` exists after build
- Verify `public` folder is included in deployment

### Images Not Loading

- Use relative paths: `/images/photo.jpg`
- Ensure `images: { unoptimized: true }` in `next.config.js`
- Check images are in `public` directory

---

## Support

For deployment help:
- **Email:** heriran@protonmail.com
- **Documentation:** See README.md
- **Platform docs:** Check your hosting provider's documentation

---

**Stay safe. Deploy securely. Publish fearlessly.**

