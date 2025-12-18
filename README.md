# Blog z Nuxt 3 + Nuxt Content

Nowoczesny blog zoptymalizowany pod Core Web Vitals, zbudowany z wykorzystaniem Nuxt 3 i Nuxt Content.

## Funkcje

- Static Site Generation dla maksymalnej wydajności
- Optymalizacja obrazów (WebP, AVIF)
- Eliminacja CLS przy ładowaniu fontów
- Proste deployowanie przez SSH/rsync
- **Pre-deployment linting** (ESLint + Prettier z auto-fix)
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

## Code Quality

Projekt używa ESLint i Prettier do zapewnienia wysokiej jakości kodu.

### Dostępne komendy:

```bash
# Sprawdź kod (bez automatycznych poprawek)
npm run lint

# Automatycznie napraw błędy ESLint i sformatuj kod
npm run lint:fix

# Tylko formatowanie (Prettier)
npm run format

# Sprawdź formatowanie bez zmian
npm run format:check
```

### Pre-deployment validation

Przed każdym deploymentem automatycznie uruchamia się `npm run lint:fix`:
- ESLint naprawia błędy składni i styl kodu
- Prettier formatuje wszystkie pliki
- **Jeśli linting failuje, deployment jest blokowany**

## Deployment przez SSH

### Konfiguracja (jednorazowo)

1. **Skopiuj przykładową konfigurację:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Uzupełnij swoje dane SSH w [.env.local](.env.local):**
   ```bash
   SSH_USER=srv75778
   SSH_HOST=188.210.222.237
   SSH_PORT=57185
   SSH_KEY=~/.ssh/seohost_rsa
   SSH_PATH=/domains/blog.cutmakers.pl/public_html/
   ```

   **Uwaga:** Script obsługuje niestandardowe porty i klucze SSH. Jeśli używasz standardowego portu 22 lub domyślnego klucza, możesz pominąć `SSH_PORT` i `SSH_KEY`.

3. **Testuj połączenie:**
   ```bash
   ssh -p 57185 -i ~/.ssh/seohost_rsa srv75778@188.210.222.237
   ```

   Jeśli musisz podać hasło, to normalne - rsync również zapyta o hasło podczas deploymentu.

### Deployment

**Jedna komenda:**
```bash
npm run deploy
```

To wykona:
1. **Linting i formatowanie** (`npm run lint:fix`) - auto-fix błędów
2. **Build statycznej strony** (`npm run generate`)
3. **Sprawdzenie połączenia SSH**
4. **Przesłanie zmian przez rsync** (~10-30 sekund)
5. Wyświetlenie statusu i linku do strony

**Jeśli linting failuje, deployment zostanie zatrzymany.**

### Zalety tego rozwiązania

✅ **$0 kosztów** - build lokalny, brak CI/CD minutes
✅ **10-30 sekund** - rsync przesyła tylko zmienione pliki
✅ **Pełna kontrola** - widzisz dokładnie co się deployuje
✅ **Bezpieczne** - SSH key, dane w .env.local (nie w repo)
✅ **Proste** - jedna komenda `npm run deploy`

### GitHub Actions

Workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) weryfikuje czy build działa po każdym pushu. To jest darmowe i pomaga wychwycić błędy wcześnie.

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

### Deployment przez SSH nie działa

**"Nie można połączyć się przez SSH"**
- Sprawdź dane w [.env.local](.env.local)
- Przetestuj połączenie: `ssh -p 57185 -i ~/.ssh/seohost_rsa srv75778@188.210.222.237`
- Upewnij się że klucz SSH działa i port jest otwarty

**"Permission denied"**
- Sprawdź uprawnienia do katalogu `SSH_PATH` na serwerze
- Użytkownik SSH musi mieć prawo zapisu
- Przetestuj: `ssh user@host "ls -la /sciezka/do/katalogu"`

**"Brak pliku .env.local"**
- Skopiuj przykładową konfigurację: `cp .env.local.example .env.local`
- Uzupełnij swoje dane SSH w pliku

## Licencja

MIT

## Autor

Twoje imię - [Twój GitHub](https://github.com/twoj-profil)
