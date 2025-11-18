# Contributing to HER iran

Thank you for your interest in contributing. This platform is designed for anonymous publishing with a focus on security and privacy.

## Security First

Before contributing, please understand:

- This project prioritizes **anonymity and security**
- Avoid adding tracking, analytics, or third-party scripts
- Keep dependencies minimal
- Performance matters (users may have slow connections)
- Privacy is paramount

## What to Contribute

### Welcome Contributions

- **Bug fixes** - Fix issues without compromising security
- **Performance improvements** - Faster load times, smaller bundles
- **Accessibility improvements** - Screen reader support, keyboard navigation
- **Documentation** - Clearer instructions, better examples
- **Design refinements** - CSS improvements that maintain the aesthetic

### Please Avoid

- Third-party analytics or tracking
- Comment systems or user accounts
- Server-side features (keep it static)
- Heavy JavaScript libraries
- Features that compromise anonymity

## Development Workflow

### 1. Fork and Clone

```bash
git clone your-fork-url
cd HERiran
npm install
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes

```bash
# Edit files
npm run dev  # Test locally
npm run build  # Verify build works
```

### 4. Test Thoroughly

- [ ] Site builds successfully
- [ ] No console errors
- [ ] Works on mobile
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] No new dependencies without justification
- [ ] Performance not degraded

### 5. Commit

```bash
git add .
git commit -m "Description of changes"
```

Use clear commit messages:
- `fix: Correct mobile menu positioning`
- `feat: Add print stylesheet`
- `docs: Update deployment guide`
- `perf: Optimize image loading`

### 6. Submit Pull Request

Describe:
- What you changed and why
- How you tested it
- Any potential security implications
- Screenshots if visual changes

## Code Style

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types
- Export interfaces for reusability

### React

- Functional components only
- Use hooks appropriately
- Keep components focused and small

### CSS/Tailwind

- Use Tailwind classes when possible
- Custom CSS in `globals.css` for prose styles
- Maintain the design aesthetic (serif fonts, generous spacing)

### File Organization

```
app/           # Pages and routes
components/    # Reusable components
lib/           # Utility functions
content/       # Markdown content
public/        # Static assets
```

## Design Guidelines

### Typography

- Display font: Cormorant Garamond
- Body font: Crimson Text
- Sans-serif: Inter (for UI elements)
- Maintain large font sizes for readability

### Colors

Stick to the defined palette:
- Cream: `#FAF9F6`
- Burgundy: `#8B1538`
- Saffron: `#F4C430`
- Teal: `#008B8B`

### Spacing

- Generous white space
- 80px vertical gaps between post cards
- 120px horizontal padding on desktop articles
- Maintain breathing room

### Persian Patterns

- Keep subtle (5-20% opacity)
- Use as accents, not focal points
- Maintain elegant, minimal aesthetic

## Adding Dependencies

Only add dependencies if:
1. Absolutely necessary
2. Well-maintained and trusted
3. Small bundle size
4. Security record is clean
5. No privacy concerns

**Before adding:**
```bash
# Check bundle size impact
npm install package-name
npm run build
# Compare out/ folder size before and after
```

## Testing

### Manual Testing Checklist

- [ ] Homepage displays correctly
- [ ] Individual posts render properly
- [ ] Category filtering works
- [ ] About page loads
- [ ] 404 page shows for bad routes
- [ ] RSS feed generates
- [ ] Mobile responsive
- [ ] Tablet responsive
- [ ] Desktop layout correct
- [ ] Dark mode system preference respected (if implemented)

### Performance Testing

```bash
# Build and serve locally
npm run build
npx serve out

# Test with Lighthouse in Chrome DevTools
# Aim for 90+ scores in all categories
```

### Accessibility Testing

- Use keyboard only (Tab, Enter, Esc)
- Test with screen reader (NVDA, JAWS, VoiceOver)
- Check color contrast ratios
- Verify semantic HTML

## Documentation

When adding features, update:
- `README.md` - Main documentation
- `DEPLOYMENT.md` - If affects deployment
- `QUICKSTART.md` - If affects basic usage
- Inline code comments for complex logic

## Questions?

- Email: heriran@protonmail.com
- Create an issue in the repository
- Check existing documentation

## Code of Conduct

This project supports:
- Free expression and anonymous publishing
- Privacy and security
- Respectful collaboration
- Human rights and dignity

This project opposes:
- Surveillance and tracking
- Censorship and oppression
- Doxxing and harassment

## License

By contributing, you agree that your contributions will be licensed under the same terms as the project.

---

**Thank you for helping make anonymous publishing safer and more accessible.**

