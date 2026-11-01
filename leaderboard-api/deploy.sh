#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

METRO="${METRO:-fra}"
NAME="leaderboard-api"
SERVICE="pangea-leaderboard"
VOLUME="pangea-volume"
IMAGE="${IMAGE:-jesi-rgb/pangea-leaderboard:latest}"
PORT=3001 # default PORT in src/index.ts

echo "🚀 Deploying Leaderboard API to Unikraft Cloud..."
echo ""

echo "Building and pushing $IMAGE..."
unikraft build . --arch x86_64 --output "$IMAGE"

if ! unikraft volumes get "$VOLUME" >/dev/null 2>&1; then
  echo "Creating volume '$VOLUME'..."
  unikraft volumes create --metro "$METRO" --name "$VOLUME" --size 100MiB
fi

if ! unikraft services get "$SERVICE" >/dev/null 2>&1; then
  echo "Creating service '$SERVICE' (443 -> $PORT)..."
  unikraft services create \
    --metro "$METRO" \
    --name "$SERVICE" \
    --domain "$SERVICE" \
    --service "443:$PORT/tls+http"
fi

if unikraft instances get "$NAME" >/dev/null 2>&1; then
  echo "Deleting old instance..."
  unikraft instances delete "$NAME"
fi

echo "Starting new instance..."
unikraft run \
  --metro "$METRO" \
  --name "$NAME" \
  --image "$IMAGE" \
  --service "$SERVICE" \
  --memory 800MiB \
  --volume "$VOLUME:/mnt" \
  --env DATABASE_PATH=/mnt/leaderboard.db \
  --scale-to-zero policy=on,cooldown-time=5000

echo ""
echo "✅ Deployment complete!"
echo "Health: https://$SERVICE.$METRO.unikraft.app/health"
echo "Leaderboard: https://$SERVICE.$METRO.unikraft.app/api/leaderboard"
