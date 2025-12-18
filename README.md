# Blog z Nuxt 3 + Nuxt Content

Nowoczesny blog zoptymalizowany pod Core Web Vitals, zbudowany z wykorzystaniem Nuxt 3 i Nuxt Content.

## Funkcje

- Static Site Generation dla maksymalnej wydajności
- Optymalizacja obrazów (WebP, AVIF)
- Eliminacja CLS przy ładowaniu fontów
- Automatyczne deployowanie na FTP przez GitHub Actions
- Podświetlanie składni kodu
- Responsywny design
- SEO-friendly

## Wymagania

- Node.js 18+ lub 20+
- npm, pnpm, yarn lub bun

## Instalacja

1. Sklonuj repozytorium:

```bash
git clone <url-twojego-repo>
cd fw-blog
```

2. Zainstaluj zależności:

```bash
npm install
```

## Development

Uruchom serwer deweloperski na `http://localhost:3000`:

```bash
npm run dev
```

## Dodawanie postów

1. Utwórz nowy plik Markdown w `content/blog/`:

```bash
touch content/blog/nazwa-posta.md
```

2. Dodaj frontmatter i treść:

```markdown
---
title: Tytuł twojego posta
description: Krótki opis posta dla SEO
date: 2025-01-15
---

# Tytuł posta

Treść twojego posta...
```

3. Post automatycznie pojawi się na stronie głównej!

## Budowanie dla produkcji

Wygeneruj statyczną stronę:

```bash
npm run generate
```

Pliki zostaną wygenerowane w katalogu `.output/public/`.

Podgląd lokalny:

```bash
npm run preview
```

## Deployment na Cloudflare Pages

### Automatyczny deployment przez Git integration

1. **Utwórz projekt Cloudflare Pages:**
   - Zaloguj się do [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Przejdź do Workers & Pages → Create application → Pages
   - Wybierz **Connect to Git** i połącz swoje repo

2. **Skonfiguruj build settings:**
   - **Framework preset**: Nuxt.js (automatycznie ustawi `npm run generate`)
   - **Environment variable**: Dodaj `NODE_VERSION` = `22`
   - Upewnij się że NIE ma ustawionego "Deploy command"
   - Cloudflare automatycznie wykryje katalog `.output/public`

3. **Push do gałęzi `master` uruchomi deployment!**
   - Cloudflare automatycznie wykryje zmiany
   - Build: ~1-2 minuty
   - Deploy: natychmiastowy
   - URL: `fw-blog.pages.dev` (lub twoja własna domena)

4. **GitHub Actions weryfikuje build:**
   - Workflow w [.github/workflows/deploy.yml](.github/workflows/deploy.yml) upewnia się że build działa
   - To oszczędza czas - jeśli build failuje, zobaczysz to w GitHub zanim Cloudflare spróbuje

### Konfiguracja domeny własnej

1. W Cloudflare Pages → Custom domains
2. Dodaj `blog.cutmakers.pl`
3. Cloudflare automatycznie skonfiguruje DNS i SSL

### Zalety Cloudflare Pages

✅ **Darmowy** - nieograniczony bandwidth i requesty
✅ **Błyskawiczny** - globalny CDN w 300+ lokalizacjach
✅ **Szybki build** - nie marnuje GitHub Actions minutes
✅ **Atomic deployments** - zero downtime
✅ **Preview URLs** - automatyczne dla każdego PR
✅ **Auto SSL** - darmowy certyfikat HTTPS

## Struktura projektu

```
fw-blog/
├── .github/workflows/    # GitHub Actions
├── content/blog/         # Posty blogowe (Markdown)
├── pages/                # Strony Vue
│   ├── index.vue        # Strona główna
│   └── blog/
│       ├── index.vue    # Lista postów
│       └── [slug].vue   # Szablon pojedynczego posta
├── public/              # Pliki statyczne
├── components/          # Komponenty Vue
├── app.vue             # Layout główny
├── nuxt.config.ts      # Konfiguracja Nuxt
└── package.json        # Zależności

```

## Optymalizacja Core Web Vitals

Blog jest zoptymalizowany pod kątem CWV:

- **LCP**: Static Generation + optymalizacja obrazów
- **FID**: Minimalna ilość JavaScript
- **CLS**: Fontaine eliminuje przesunięcia layoutu

Sprawdź wyniki w:
- Chrome DevTools → Lighthouse
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Technologie

- [Nuxt 3](https://nuxt.com/) - Framework Vue.js
- [Nuxt Content](https://content.nuxt.com/) - Content management
- [@nuxt/image](https://image.nuxt.com/) - Optymalizacja obrazów
- [@nuxtjs/fontaine](https://github.com/nuxt-modules/fontaine) - Optymalizacja fontów
- [GitHub Actions](https://github.com/features/actions) - CI/CD

## Customizacja

### Zmiana kolorów

Edytuj style w plikach `.vue` - szukaj wartości hex w `<style>`:

- Gradient nagłówka: `#667eea`, `#764ba2`
- Linki: `#667eea`

### Dodanie komponentów

Twórz komponenty w `components/` i używaj ich bezpośrednio w postach Markdown:

```vue
<!-- components/MyComponent.vue -->
<template>
  <div>Mój komponent</div>
</template>
```

```markdown
<!-- content/blog/post.md -->
::MyComponent
::
```

## Troubleshooting

### Build errors

Jeśli napotykasz błędy podczas budowania:

```bash
rm -rf .nuxt node_modules package-lock.json
npm install
```

### Cloudflare Pages deployment nie działa

- Sprawdź logi buildu w Cloudflare Pages → Deployments
- Upewnij się że **Framework preset** = **Nuxt.js**
- Usuń wartość z pola **Deploy command** jeśli istnieje (zostaw puste)
- Jeśli widzisz "Missing entry-point" error, sprawdź czy nie ma ustawionego Deploy command
- Zobacz więcej rozwiązań w [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md#troubleshooting)

## Licencja

MIT

## Autor

Twoje imię - [Twój GitHub](https://github.com/twoj-profil)
