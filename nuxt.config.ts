// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/fontaine'
  ],

  // Optymalizacja dla Core Web Vitals
  nitro: {
    preset: 'static',
    compressPublicAssets: true,
  },

  // Content module configuration
  content: {
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'bash']
    },
    markdown: {
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // Image optimization
  image: {
    format: ['webp', 'avif'],
    quality: 80,
  },

  // SEO optimization
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'pl'
      }
    }
  },

  // Performance optimizations
  experimental: {
    payloadExtraction: false,
  },

  vite: {
    build: {
      cssCodeSplit: true,
    }
  }
})
