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
        parchment: '#FAF8F5',
        ink: '#2C2C2C',
        border: '#E8E0D5',
        'card-bg': '#FFFFFF',
        'ancient': '#8B7355',
        'postclassical': '#4A6741',
        'earlymodern': '#2C4A7C',
        'modern': '#6B3A7D',
        'contemporary': '#C0392B',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(44, 44, 44, 0.08)',
        'card-hover': '0 8px 24px rgba(44, 44, 44, 0.16)',
        sidebar: '-4px 0 32px rgba(44, 44, 44, 0.12)',
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow',
      },
    },
  },
  plugins: [],
}

export default config
