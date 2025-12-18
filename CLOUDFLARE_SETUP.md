# Konfiguracja Cloudflare Pages - Szybki Start

## Krok 1: Utwórz projekt w Cloudflare Pages

1. Zaloguj się do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Przejdź do **Workers & Pages**
3. Kliknij **Create application** → **Pages**
4. Kliknij **Connect to Git** lub **Direct Upload**

### Opcja A: Połączenie z GitHub (Zalecane dla automatycznego deploymentu)

1. Wybierz swoje repo: `filipwronski/blog`
2. Ustaw konfigurację buildu:
   - **Framework preset**: Nuxt.js
   - **Build command**: `npm run generate` (automatycznie ustawione)
   - **Root directory (path)**: `/` (pozostaw puste)
3. Kliknij **Save and Deploy**

### Opcja B: Manual Upload (szybszy start, bez CI/CD)

1. Lokalnie wygeneruj stronę: `npm run generate`
2. Przeciągnij folder `.output/public/` do Cloudflare
3. Gotowe!

---

## Krok 2: Skonfiguruj ustawienia buildu w Cloudflare

W swoim projekcie Cloudflare Pages przejdź do **Settings** → **Builds & deployments**:

### Framework preset
- Wybierz: **Nuxt.js** (Cloudflare automatycznie ustawi właściwe komendy)

### Build configuration
**Jeśli Framework preset NIE ustawił automatycznie:**
- **Build command**: `npm run generate`
- **Root directory (path)**: `/` (pozostaw puste jeśli projekt jest w root)

### Environment variables
W sekcji **Environment variables** dodaj:
- **Variable name**: `NODE_VERSION`
- **Value**: `22`
- Kliknij **Save**

**WAŻNE**:
- NIE ustawiaj "Deploy command" - zostaw puste lub usuń jeśli jest `npx wrangler deploy`
- Cloudflare automatycznie wykryje katalog `.output/public` dla Nuxt.js

---

## Krok 3: Deployment!

1. Zacommituj wszystkie zmiany:
```bash
git add .
git commit -m "Configure Cloudflare Pages deployment"
git push origin master
```

2. Cloudflare automatycznie:
   - Wykryje push do gałęzi `master`
   - Uruchomi build (`npm run generate`)
   - Wdroży zawartość `.output/public`

3. Zobacz status buildu:
   - W Cloudflare Pages → Twój projekt → **Deployments**
   - Build trwa ~1-2 minuty

4. Po zakończeniu strona będzie dostępna pod:
   - `https://fw-blog.pages.dev`
   - lub URL który Cloudflare wygenerował

---

## Krok 4 (Opcjonalny): Własna domena

1. W Cloudflare Pages → Twój projekt → **Custom domains**
2. Kliknij **Set up a custom domain**
3. Wpisz: `blog.cutmakers.pl`
4. Cloudflare automatycznie:
   - Skonfiguruje DNS (jeśli domena jest w Cloudflare)
   - Wygeneruje SSL certyfikat
   - Przekieruje ruch na Pages

---

## Troubleshooting

### "Missing entry-point to Worker script or to assets directory"

- **Przyczyna**: W sekcji Build configuration jest ustawione pole które nie powinno istnieć dla Pages
- **Rozwiązanie**: W Cloudflare Pages → Settings → Builds & deployments:
  1. Sprawdź **Framework preset** - powinno być **Nuxt.js**
  2. **Build command** = `npm run generate`
  3. NIE powinno być pola "Deploy command" - jeśli jest, usuń jego wartość
  4. Cloudflare automatycznie wykrywa `.output/public` dla Nuxt

### "Build failed"

- Sprawdź logi w Cloudflare Pages → Deployments → [konkretny build]
- Upewnij się że `npm run generate` działa lokalnie
- Sprawdź czy wszystkie zależności są w `package.json`
- Zweryfikuj że Node.js version w Cloudflare = 22 (lub ustaw `NODE_VERSION` env variable)

### Build działa ale strona jest pusta

- Upewnij się że **Framework preset** = **Nuxt.js**
- Sprawdź logi buildu czy `npm run generate` faktycznie tworzy pliki w `.output/public`
- Jeśli używasz innego presetu, Cloudflare może szukać plików w złym miejscu

---

## Porównanie z FTP

| Feature | FTP | Cloudflare Pages |
|---------|-----|------------------|
| Prędkość deploymentu | 🐌 5-10 minut | ⚡ 30-60 sekund |
| GitHub Actions minutes | ❌ ~8 minut | ✅ ~2 minuty |
| CDN | ❌ Brak | ✅ 300+ lokalizacji |
| SSL | ⚠️ Manual | ✅ Automatyczny |
| Atomic deploys | ❌ Nie | ✅ Tak |
| Preview URLs | ❌ Nie | ✅ Dla każdego PR |
| Koszt | 💰 Płatny hosting | 🎉 Darmowy |

---

## Potrzebujesz pomocy?

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
