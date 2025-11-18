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
        cream: '#FAF9F6',
        charcoal: '#2C2C2C',
        burgundy: '#8B1538',
        saffron: '#F4C430',
        teal: '#008B8B',
        'light-gray': '#E5E5E5',
      },
      fontFamily: {
        serif: ['var(--font-crimson)', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'article': '680px',
      },
    },
  },
  plugins: [],
}
export default config
