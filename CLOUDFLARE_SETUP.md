# Konfiguracja Cloudflare Pages - Szybki Start

## Krok 1: Utwórz projekt w Cloudflare Pages

1. Zaloguj się do [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Przejdź do **Workers & Pages**
3. Kliknij **Create application** → **Pages**
4. Kliknij **Connect to Git** lub **Direct Upload**

### Opcja A: Połączenie z GitHub (Zalecane dla automatycznego deploymentu)

1. Wybierz swoje repo: `filipwronski/blog`
2. Ustaw konfigurację buildu:
   - **Build command**: `npm run generate`
   - **Build output directory**: `.output/public`
   - **Root directory**: `/` (pozostaw puste)
3. Kliknij **Save and Deploy**

### Opcja B: Manual Upload (szybszy start, bez CI/CD)

1. Lokalnie wygeneruj stronę: `npm run generate`
2. Przeciągnij folder `.output/public/` do Cloudflare
3. Gotowe!

---

## Krok 2: Pobierz dane do GitHub Actions

### Account ID

1. W Cloudflare Dashboard kliknij na swoją nazwę (prawy górny róg)
2. Skopiuj **Account ID** (po prawej stronie)
3. Zapisz go - będzie potrzebny w GitHub

### API Token

1. Przejdź do **My Profile** (ikona profilu → My Profile)
2. Kliknij **API Tokens** (lewa strona)
3. Kliknij **Create Token**
4. Wybierz template: **"Edit Cloudflare Workers"**
5. Lub stwórz **Custom token** z uprawnieniami:
   - **Account → Cloudflare Pages → Edit**
6. Kliknij **Continue to summary** → **Create Token**
7. **Skopiuj token** (widoczny tylko raz!)

---

## Krok 3: Skonfiguruj GitHub Secrets

1. Przejdź do swojego repo: `https://github.com/filipwronski/blog`
2. Kliknij **Settings** → **Secrets and variables** → **Actions**
3. Kliknij **New repository secret** i dodaj:

**Secret 1:**
- Name: `CLOUDFLARE_API_TOKEN`
- Value: [wklej API token z kroku 2]

**Secret 2:**
- Name: `CLOUDFLARE_ACCOUNT_ID`
- Value: [wklej Account ID z kroku 2]

4. Kliknij **Add secret** dla każdego

---

## Krok 4: Upewnij się że projekt nazywa się `fw-blog`

W pliku [.github/workflows/deploy.yml](.github/workflows/deploy.yml) na linii ~36:

```yaml
projectName: fw-blog  # ← Ta nazwa musi zgadzać się z nazwą w Cloudflare Pages
```

Jeśli w Cloudflare Pages utworzyłeś projekt z inną nazwą (np. `blog`), zmień `fw-blog` na tę nazwę.

---

## Krok 5: Deployment!

1. Zacommituj wszystkie zmiany:
```bash
git add .
git commit -m "Configure Cloudflare Pages deployment"
git push origin master
```

2. Przejdź do **Actions** w GitHub - zobaczysz running workflow

3. Po ~1-2 minutach strona będzie dostępna pod:
   - `https://fw-blog.pages.dev`
   - lub URL który Cloudflare wygenerował

---

## Krok 6 (Opcjonalny): Własna domena

1. W Cloudflare Pages → Twój projekt → **Custom domains**
2. Kliknij **Set up a custom domain**
3. Wpisz: `blog.cutmakers.pl`
4. Cloudflare automatycznie:
   - Skonfiguruje DNS (jeśli domena jest w Cloudflare)
   - Wygeneruje SSL certyfikat
   - Przekieruje ruch na Pages

---

## Troubleshooting

### "Error: Unable to find project"

- Upewnij się że `projectName` w workflow zgadza się z nazwą projektu w Cloudflare
- Sprawdź czy projekt został utworzony w Cloudflare Pages

### "Error: Authentication error"

- Sprawdź czy API token ma uprawnienia `Cloudflare Pages:Edit`
- Upewnij się że token nie wygasł
- Sprawdź czy Account ID jest poprawny

### "Build failed"

- Sprawdź logi w GitHub Actions
- Upewnij się że `npm run generate` działa lokalnie
- Sprawdź czy wszystkie zależności są w `package.json`

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
