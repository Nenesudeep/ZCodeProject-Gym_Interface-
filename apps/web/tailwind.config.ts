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
    // Content modules hold dynamic Tailwind class strings (gallery gradients, etc.).
    './app/**/*.{vue,js,ts}',
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
        // Anchor brand — primary red from Instagram profile.
        brand: {
          50: '#fff2f2',
          100: '#ffe0e0',
          200: '#ffb8b8',
          300: '#ff8787',
          400: '#ff4d4d',
          500: '#e60000',
          600: '#c20000',
          700: '#9a0000',
          800: '#730000',
          900: '#4d0000',
          950: '#2a0000',
        },
        // Accent — energetic gold/yellow to pair with red.
        accent: {
          50: '#fffce8',
          100: '#fff7b3',
          200: '#ffed7a',
          300: '#ffe233',
          400: '#ffd600',
          500: '#e6bf00',
          600: '#b38f00',
          700: '#806600',
          800: '#5c4a00',
          900: '#3d3100',
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
