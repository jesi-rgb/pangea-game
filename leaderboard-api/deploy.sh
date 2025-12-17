#!/bin/bash

set -e

echo "🚀 Deploying Leaderboard API to Unikraft Cloud..."
echo ""

# Check if volume exists, create if not
echo "Checking for persistent volume..."
if ! kraft cloud volume list | grep -q "pangea-volume"; then
  echo "Creating volume 'pangea-volume' (100 MiB)..."
  kraft cloud volume create --size 100 --name pangea-volume
else
  echo "Volume 'pangea-volume' already exists"
fi

echo "Deleting old instance..."
kraft cloud instance delete leaderboard-api || true

echo "Deploying new instance (no cache)..."
kraft cloud deploy \
  -M 800 \
  -g pangea-leaderboard \
  -n leaderboard-api \
  -v pangea-volume:/mnt \
  -e DATABASE_PATH=/mnt/leaderboard.db \
  --rollout=remove \
  .

echo ""
echo "✅ Deployment complete!"
echo "API should be available at: https://leaderboard.pangea.fra.unikraft.app"
echo ""
echo "Test endpoints:"
echo "  Health: https://leaderboard.pangea.fra.unikraft.app/health"
echo "  Leaderboard: https://leaderboard.pangea.fra.unikraft.app/api/leaderboard"
echo ""
