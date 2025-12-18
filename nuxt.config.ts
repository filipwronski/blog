// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxtjs/fontaine'],
  devtools: { enabled: true },

  // SEO optimization
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'pl',
      },
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    },
  },

  // Content module configuration
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'bash'],
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3,
      },
    },
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: false,
  },
  compatibilityDate: '2024-11-01',

  // Optymalizacja dla Core Web Vitals
  nitro: {
    preset: 'static',
    compressPublicAssets: true,
    prerender: {
      autoSubfolderIndex: false,
    },
  },

  vite: {
    build: {
      cssCodeSplit: true,
    },
  },

  // Image optimization
  image: {
    format: ['webp', 'avif'],
    quality: 80,
  },
})
