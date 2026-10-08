#!/usr/bin/env bash
# Pull the latest code and rebuild the site. Run on the VPS from /home/khoanet:
#   bash deploy/update.sh

set -euo pipefail
cd "$(dirname "$0")/.."

git pull --ff-only
docker compose up -d --build
docker image prune -f

echo "==> Checking the site..."
sleep 3
curl -fsS -o /dev/null -w "local: HTTP %{http_code}\n" http://127.0.0.1:3100/
