---
title: Jak zoptymalizować Nuxt 3 pod Core Web Vitals
description: Praktyczny przewodnik po optymalizacji wydajności aplikacji Nuxt 3 z naciskiem na Core Web Vitals.
date: 2025-01-16
---

# Jak zoptymalizować Nuxt 3 pod Core Web Vitals

Core Web Vitals to kluczowe metryki, które Google bierze pod uwagę przy rankingu stron. W tym artykule pokażę, jak zoptymalizować aplikację Nuxt 3, aby osiągnąć doskonałe wyniki.

## Czym są Core Web Vitals?

Core Web Vitals to trzy kluczowe metryki:

- **LCP (Largest Contentful Paint)** - czas ładowania głównej treści (powinien być < 2.5s)
- **FID (First Input Delay)** - responsywność strony (powinien być < 100ms)
- **CLS (Cumulative Layout Shift)** - stabilność wizualna (powinien być < 0.1)

## Optymalizacja w Nuxt 3

### 1. Static Site Generation

Użyj SSG dla maksymalnej wydajności:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'static',
    compressPublicAssets: true,
  }
})
```

### 2. Optymalizacja obrazów

Zainstaluj `@nuxt/image`:

```bash
npm install @nuxt/image
```

Konfiguracja:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    format: ['webp', 'avif'],
    quality: 80,
  }
})
```

Użycie:

```vue
<template>
  <NuxtImg
    src="/images/hero.jpg"
    alt="Hero image"
    width="800"
    height="600"
    loading="lazy"
  />
</template>
```

### 3. Fontaine dla fontów

Eliminuje CLS przy ładowaniu fontów:

```bash
npm install @nuxtjs/fontaine
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/fontaine']
})
```

### 4. Code Splitting

Nuxt 3 robi to automatycznie, ale możesz dodatkowo zoptymalizować:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    build: {
      cssCodeSplit: true,
    }
  }
})
```

### 5. Lazy Loading komponentów

Użyj prefiksu `Lazy` dla komponentów:

```vue
<template>
  <div>
    <LazyHeavyComponent v-if="show" />
  </div>
</template>
```

## Narzędzia do testowania

- **Lighthouse** - audyt w DevTools
- **PageSpeed Insights** - analiza online
- **WebPageTest** - szczegółowe testy

## Podsumowanie

Optymalizacja Core Web Vitals w Nuxt 3 to:

1. Wykorzystanie SSG
2. Optymalizacja obrazów z `@nuxt/image`
3. Eliminacja CLS z `@nuxtjs/fontaine`
4. Lazy loading komponentów
5. Code splitting

Zastosowanie tych technik gwarantuje doskonałe wyniki w Core Web Vitals!

---

*Masz pytania? Zostaw komentarz!*
