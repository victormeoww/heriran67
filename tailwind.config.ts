import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F6', // "Off-white" / Paper - softer than pure white
        charcoal: '#121212', // "Ink Black" - softer than pure black, richer
        burgundy: '#7C0A02', // "Deep Barn Red" - more serious, less pink
        gold: '#C5A059', // "Muted Gold" - for accents
        teal: '#1B4D3E', // "Dark Cyan" - sophisticated pairing
        sand: '#F0EFE9', // Slightly darker paper for contrast areas
      },
      fontFamily: {
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'article': '720px',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      animation: {
        'fade-in': 'fadeIn 1.0s cubic-bezier(0.22, 1, 0.36, 1) forwards', // Smoother bezier
      },
    },
  },
  plugins: [],
}
export default config
