# Leaderboard API

Simple SQLite-based leaderboard API for Pangea game, running on Unikraft Cloud.

## Local Development

```bash
# Install dependencies
bun install

# Run in dev mode (with hot reload)
bun run dev

# Run in production mode
bun run start
```

API runs on `http://localhost:3001`

## Endpoints

### Health Check

```
GET /health
```

Returns: `{"status": "ok"}`

### Get Leaderboard

```
GET /api/leaderboard?limit=100
```

Query parameters:

- `limit` (optional): Number of entries to return (default: 100, max: 1000)

Returns:

```json
{
	"entries": [
		{
			"id": 1,
			"player_name": "ABCD",
			"score": 2000,
			"created_at": "2025-12-17 12:00:00"
		}
	],
	"total": 1
}
```

### Submit Score

```
POST /api/scores
Content-Type: application/json

{
  "player_name": "ABCD",
  "score": 1500
}
```

Requirements:

- `player_name`: Exactly 4 letters (A-Z)
- `score`: Non-negative number

Returns:

```json
{
	"id": 1,
	"player_name": "ABCD",
	"score": 1500,
	"created_at": "2025-12-17 12:00:00"
}
```

## Deployment to Unikraft Cloud

Requires the [`unikraft` CLI](https://unikraft.com/docs/cli) (`unikraft login`) and a running Docker/BuildKit.

```bash
cd leaderboard-api
./deploy.sh
```

The script builds and pushes `jesi-rgb/pangea-leaderboard:latest`, creates the `pangea-volume` volume and `pangea-leaderboard` service if missing, then replaces the `leaderboard-api` instance.

### Deployment Details

- **Memory**: 800MiB
- **Port**: 443 → 3001 via the `pangea-leaderboard` service
- **Instance name**: `leaderboard-api`
- **Volume**: `pangea-volume` mounted at `/mnt` for database persistence
- **Database path**: `/mnt/leaderboard.db`

The database persists across redeployments using Unikraft Cloud volumes.

### Production URL

```
https://pangea-leaderboard.fra.unikraft.app
```

### Environment Variables

- `PORT` - Server port (default: 3001)
- `DATABASE_PATH` - SQLite database path (production: `/mnt/leaderboard.db`, dev: `leaderboard.db`)
- `CORS_ORIGIN` - Parsed but currently unused; the API responds with `Access-Control-Allow-Origin: *`

## Database Schema

```sql
CREATE TABLE leaderboard (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_name TEXT NOT NULL CHECK(length(player_name) = 4),
  score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Indexes:

- `idx_score_desc` on `score DESC` (for fast leaderboard queries)
- `idx_created_at` on `created_at DESC` (for sorting by date)
