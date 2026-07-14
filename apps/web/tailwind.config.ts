import type { Config } from 'tailwindcss'

// Anchor Strength design system.
// Dark, athletic palette. Brand color is editable via the theme config;
// swap tokens here to re-skin the whole site.
export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Base dark surface — charcoal/near-black for "gym energy".
        ink: {
          950: '#0a0a0b',
          900: '#111113',
          800: '#18181b',
          700: '#232327',
          600: '#34343a',
        },
        // Anchor brand — steel/iron blue.
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#598dff',
          500: '#3366ff',
          600: '#1f48f5',
          700: '#1937e1',
          800: '#1b2fb6',
          900: '#1d2e8f',
          950: '#141d57',
        },
        // Accent — high-energy electric lime for CTAs/highlights.
        accent: {
          50: '#f7ffe0',
          100: '#ecffb8',
          200: '#dcff80',
          300: '#c4fa38',
          400: '#a8e800',
          500: '#88bd00',
          600: '#689200',
          700: '#4d6c00',
          800: '#3a5100',
          900: '#2f4300',
        },
      },
      fontFamily: {
        // Display: bold condensed for headlines. Body: clean sans.
        display: ['"Bebas Neue"', '"Oswald"', 'Impact', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
        screens: { '2xl': '1200px' },
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
