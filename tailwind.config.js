/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        black: '#0a0a0a',
        surface: '#111111',
        card: '#161616',
        'warm-white': '#f5f5f0',
        'off-white': '#e8e8e2',
        muted: '#666666',
        'muted-light': '#999999',
        accent: '#c9a96e',
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.5em',
      },
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'cursor-expand': 'cursorExpand 0.3s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
