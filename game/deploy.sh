#!/bin/bash

set -e

echo "🚀 Deploying Pangea to Unikraft Cloud..."
echo ""

echo "Deleting old instance..."
kraft cloud instance delete pangea

echo "Deploying new instance..."
kraft cloud deploy \
  -M 2048 \
  --name pangea \
  -g pangea \
  --rollout=remove \
  .

echo ""
echo "✅ Deployment complete!"
echo "App should be available at: https://pangea.fra.unikraft.app"
echo ""
echo "Test endpoints:"
echo "  App: https://pangea.fra.unikraft.app"
echo "  Leaderboard API: https://pangea.fra.unikraft.app/api/leaderboard"
echo "  Submit Score: https://pangea.fra.unikraft.app/api/scores"
