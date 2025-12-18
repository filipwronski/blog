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

## Deployment na FTP

### Konfiguracja GitHub Actions

1. Przejdź do Settings → Secrets and variables → Actions w swoim repo GitHub

2. Dodaj następujące secrets:
   - `FTP_SERVER` - adres serwera FTP (np. ftp.twojadomena.pl)
   - `FTP_USERNAME` - nazwa użytkownika FTP
   - `FTP_PASSWORD` - hasło do FTP

3. Dostosuj ścieżkę w [.github/workflows/deploy.yml](.github/workflows/deploy.yml):
   - Zmień `server-dir` na odpowiednią ścieżkę na swoim serwerze

4. Push do gałęzi `main` automatycznie uruchomi deployment!

### Manualne wgrywanie przez FTP

Jeśli wolisz manualne wgrywanie:

1. Wygeneruj stronę: `npm run generate`
2. Upload zawartość `.output/public/` na swój hosting FTP
3. Upewnij się, że pliki są w katalogu `public_html` (lub podobnym)

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

### FTP deployment nie działa

- Sprawdź czy secrets są poprawnie skonfigurowane
- Zweryfikuj ścieżkę `server-dir` w workflow
- Sprawdź logi GitHub Actions dla szczegółów

## Licencja

MIT

## Autor

Twoje imię - [Twój GitHub](https://github.com/twoj-profil)
