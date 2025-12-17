# Pangea

A geography guessing game with a global leaderboard.

## Project Structure

This repository contains two independent applications that run on separate Unikraft instances:

```
pangea/
├── game/              # SvelteKit frontend application
└── leaderboard-api/   # Bun backend API for leaderboard
```

### Game (`/game`)

The main SvelteKit application that hosts the geography guessing game. Players try to identify countries and compete for high scores.

- **Tech Stack**: SvelteKit, Svelte 5, TailwindCSS, DaisyUI
- **Port**: 5173 (dev), configurable in production

### Leaderboard API (`/leaderboard-api`)

A lightweight Bun server that handles leaderboard CRUD operations with SQLite storage.

- **Tech Stack**: Bun, SQLite
- **Port**: 3001 (default)
- **Endpoints**:
  - `GET /api/leaderboard?limit=100` - Fetch leaderboard entries
  - `POST /api/scores` - Submit a new score
  - `GET /health` - Health check

## Development

### Running Locally

You'll need to run both services simultaneously in separate terminals:

**Terminal 1 - Leaderboard API:**
```bash
cd leaderboard-api
bun install
bun run dev
```

**Terminal 2 - Game:**
```bash
cd game
bun install
bun run dev
```

The game will be available at `http://localhost:5173` and will connect to the leaderboard API at `http://localhost:3001`.

### Environment Variables

**Game** (`/game`):
- `VITE_LEADERBOARD_API_URL` - URL of the leaderboard API (defaults to `http://localhost:3001`)

**Leaderboard API** (`/leaderboard-api`):
- `PORT` - Server port (defaults to 3001)
- `DATABASE_PATH` - Path to SQLite database (defaults to `leaderboard.db`)
- `CORS_ORIGIN` - Comma-separated list of allowed origins

## Deployment

Each application is deployed independently to separate Unikraft instances:

1. **Game**: Deploy the SvelteKit app to your Unikraft instance
2. **Leaderboard API**: Deploy the Bun server to a separate Unikraft instance
3. Configure the game's `VITE_LEADERBOARD_API_URL` to point to the deployed leaderboard API

See individual README files in each directory for deployment-specific instructions.

## Architecture

The two applications are completely independent:
- The game makes HTTP requests to the leaderboard API
- No shared code or database between them
- They can be scaled and deployed separately
- CORS is configured on the API to allow requests from the game's origin
