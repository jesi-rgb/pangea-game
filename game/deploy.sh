#!/bin/bash

set -euo pipefail

cd "$(dirname "$0")"

METRO="${METRO:-fra}"
NAME="pangea"
SERVICE="pangea"
IMAGE="${IMAGE:-jesi-rgb/pangea:latest}"
PORT=3000 # must match PORT in Kraftfile

echo "🚀 Deploying Pangea to Unikraft Cloud..."
echo ""

echo "Building and pushing $IMAGE..."
unikraft build . --arch x86_64 --output "$IMAGE"

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
  # The delete request can time out while the instance is still stopping;
  # the deletion carries on server-side, so wait for the name to be released.
  unikraft instances delete "$NAME" || true
  for _ in $(seq 1 60); do
    unikraft instances get "$NAME" >/dev/null 2>&1 || break
    sleep 5
  done
  if unikraft instances get "$NAME" >/dev/null 2>&1; then
    echo "❌ Old instance '$NAME' still exists after 5 minutes" >&2
    exit 1
  fi
fi

echo "Starting new instance..."
unikraft run \
  --metro "$METRO" \
  --name "$NAME" \
  --image "$IMAGE" \
  --service "$SERVICE" \
  --memory 2GiB \
  --scale-to-zero policy=on,cooldown-time=5000

echo ""
echo "✅ Deployment complete!"
echo "App: https://$SERVICE.$METRO.unikraft.app"
