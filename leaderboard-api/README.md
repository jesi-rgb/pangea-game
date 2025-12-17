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

### Prerequisites

1. **Create a volume** (one-time setup):

```bash
kraft cloud volume create leaderboard-data --size 1G
```

2. **Deploy the API**:

```bash
cd leaderboard-api
./deploy.sh
```

### Deployment Details

- **Memory**: 256MB
- **Port**: 3001 (exposed as HTTP)
- **Instance name**: `leaderboard-pangea`
- **Volume**: Mounted at `/data` for database persistence
- **Database path**: `/data/leaderboard.db`

The database persists across redeployments using Unikraft Cloud volumes.

### Production URL

Once deployed, the API will be available at:

```
https://leaderboard.pangea.fra.unikraft.app
```

### Environment Variables

- `PORT` - Server port (default: 3001)
- `DATABASE_PATH` - SQLite database path (production: `/data/leaderboard.db`, dev: `leaderboard.db`)
- `CORS_ORIGIN` - Allowed CORS origins (comma-separated)

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
