#!/bin/bash
# Checks prerequisites, deploys the leaderboard API and/or the game, then
# verifies the public endpoints respond.
#
# Usage: ./deploy.sh [all|leaderboard|game]   (default: all)

set -euo pipefail

cd "$(dirname "$0")"

TARGET="${1:-all}"
METRO="${METRO:-fra}"
GAME_URL="https://pangea.$METRO.unikraft.app"
LEADERBOARD_URL="https://pangea-leaderboard.$METRO.unikraft.app"

case "$TARGET" in
  all | leaderboard | game) ;;
  *)
    echo "Usage: $0 [all|leaderboard|game]" >&2
    exit 2
    ;;
esac

fail() {
  echo "❌ $1" >&2
  exit 1
}

echo "🔎 Preflight checks..."

for bin in unikraft docker curl; do
  command -v "$bin" >/dev/null || fail "'$bin' not found in PATH"
done

docker info >/dev/null 2>&1 || fail "Docker daemon is not reachable (is OrbStack/Docker running?)"

# `unikraft build` talks to BuildKit through a Docker container named buildkitd.
case "$(docker inspect -f '{{.State.Running}}' buildkitd 2>/dev/null || echo missing)" in
  true) ;;
  false)
    echo "Starting buildkitd container..."
    docker start buildkitd >/dev/null
    ;;
  *) fail "No 'buildkitd' container. Create one: docker run -d --name buildkitd --privileged moby/buildkit:latest" ;;
esac

unikraft instances ls -o quiet >/dev/null 2>&1 || fail "Not authenticated with Unikraft Cloud (run: unikraft login)"

# The game calls the countries API (game/src/lib/constants.js), which lives in a separate repo.
if ! unikraft instances ls -f service.name -o json | grep -q '"name": "pangea-countries"'; then
  echo "⚠️  No instance attached to the 'pangea-countries' service; the game's country lookups will fail."
fi

echo "✅ Preflight OK"
echo ""

if [[ "$TARGET" == all || "$TARGET" == leaderboard ]]; then
  ./leaderboard-api/deploy.sh
  echo ""
fi

if [[ "$TARGET" == all || "$TARGET" == game ]]; then
  ./game/deploy.sh
  echo ""
fi

# Instances scale to zero, so the first request may wait on a cold start.
check() {
  local url="$1"
  local code
  for _ in 1 2 3 4 5; do
    code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 "$url" || true)"
    if [[ "$code" == 2* ]]; then
      echo "  ✅ $url"
      return 0
    fi
    sleep 3
  done
  echo "  ❌ $url (HTTP $code)"
  return 1
}

echo "🩺 Verifying endpoints..."
status=0
if [[ "$TARGET" == all || "$TARGET" == leaderboard ]]; then
  check "$LEADERBOARD_URL/health" || status=1
fi
if [[ "$TARGET" == all || "$TARGET" == game ]]; then
  check "$GAME_URL/" || status=1
  # Exercises the game -> leaderboard proxy end to end.
  check "$GAME_URL/api/leaderboard?limit=1" || status=1
fi

exit "$status"
