#!/bin/bash
set -e

# Ładuj konfigurację z .env.local
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
else
  echo "❌ Błąd: Brak pliku .env.local"
  echo "Skopiuj .env.local.example do .env.local i uzupełnij dane SSH"
  exit 1
fi

# Sprawdź czy wymagane zmienne są ustawione
if [ -z "$SSH_USER" ] || [ -z "$SSH_HOST" ] || [ -z "$SSH_PATH" ]; then
  echo "❌ Błąd: Brak wymaganych zmiennych środowiskowych"
  echo "Wymagane: SSH_USER, SSH_HOST, SSH_PATH"
  exit 1
fi

# Ustaw domyślne wartości jeśli nie podano
SSH_PORT=${SSH_PORT:-22}
SSH_KEY=${SSH_KEY:-~/.ssh/id_rsa}

# Rozwiń ścieżkę do klucza SSH (obsługa ~)
SSH_KEY_EXPANDED="${SSH_KEY/#\~/$HOME}"

# Buduj opcje SSH
SSH_OPTS="-p $SSH_PORT -i $SSH_KEY_EXPANDED -o ConnectTimeout=5"

echo "🔍 Running linters and formatters..."
npm run lint:fix
if [ $? -ne 0 ]; then
  echo "❌ Błąd: Linting failed"
  echo "Popraw błędy i spróbuj ponownie"
  exit 1
fi

echo "🏗️  Building static site..."
npm run generate

echo "🔍 Checking SSH connection..."
echo "   Using: ssh $SSH_OPTS $SSH_USER@$SSH_HOST"
ssh $SSH_OPTS -o BatchMode=yes "$SSH_USER@$SSH_HOST" exit 2>/dev/null
if [ $? -ne 0 ]; then
  echo "❌ Błąd: Nie można połączyć się przez SSH"
  echo "Sprawdź dane logowania lub klucz SSH"
  echo "Polecenie: ssh $SSH_OPTS $SSH_USER@$SSH_HOST"
  exit 1
fi

echo "📦 Deploying to $SSH_HOST:$SSH_PATH..."
rsync -avz --delete \
  -e "ssh $SSH_OPTS" \
  --exclude='.DS_Store' \
  --exclude='*.map' \
  --progress \
  .output/public/ \
  "$SSH_USER@$SSH_HOST:$SSH_PATH"

echo "✅ Deployment complete!"
echo "🌐 Strona dostępna na: https://blog.cutmakers.pl"
