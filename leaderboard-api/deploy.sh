#!/bin/bash

set -e

echo "🚀 Deploying Leaderboard API to Unikraft Cloud..."
echo ""

echo "Cleaning build cache..."
docker system prune -f

echo "Deploying new instance (no cache)..."
kraft cloud deploy \
  -M 800 \
  -g pangea-leaderboard \
  -n leaderboard-api \
  -v pangea-volume:/app/data \
  --rollout=remove \
  .

echo ""
echo "✅ Deployment complete!"
echo "API should be available at: https://leaderboard.pangea.fra.unikraft.app"
echo ""
echo "Test endpoints:"
echo "  Health: https://leaderboard.pangea.fra.unikraft.app/health"
echo "  Leaderboard: https://leaderboard.pangea.fra.unikraft.app/api/leaderboard"
