// Nuxt 3 config for the Anchor Strength marketing site.
// SSR enabled so marketing pages rank on Google (the main reason we chose Nuxt over SPA).
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Site URL — used by sitemap + robots + canonical URLs.
  // Override with SITE_URL in production.
  site: {
    url: process.env.SITE_URL || 'https://anchorstrength.fit',
    name: 'Anchor Strength',
  },

  // Runtime config: secrets/server-only + public (exposed to client).
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:4000',
    public: {
      apiBaseUrl: process.env.PUBLIC_API_BASE_URL || 'http://localhost:4000',
      plausibleDomain: process.env.PLAUSIBLE_DOMAIN || '',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s · Anchor Strength',
      title: "Boduppal's 1st Calisthenics Gym",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Anchor Strength is Boduppal\'s first calisthenics gym. Calisthenics, MMA, kettlebell group training, yoga, dance, animal flow & more in Hyderabad. Join a team, not just a gym.',
        },
        { name: 'theme-color', content: '#0a0a0b' },
        { property: 'og:image', content: '/og-default.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  // Render CMS-driven pages with ISR for speed; keep everything SSR by default.
  routeRules: {
    '/': { isr: 3600 },
    '/programs/**': { isr: 3600 },
    '/blog/**': { isr: 3600 },
  },

  typescript: {
    strict: true,
    typeCheck: false, // run via `pnpm typecheck` in CI to avoid blocking dev
  },

  nitro: {
    compressPublicAssets: true,
  },
})
