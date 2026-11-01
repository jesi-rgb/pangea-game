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
- `PORT` / `HOST` - Server bind address in production (set to `3000` / `0.0.0.0` in `game/Kraftfile`)
- Leaderboard and countries API URLs are hardcoded in `game/src/lib/constants.js`

**Leaderboard API** (`/leaderboard-api`):
- `PORT` - Server port (defaults to 3001)
- `DATABASE_PATH` - Path to SQLite database (defaults to `leaderboard.db`)
- `CORS_ORIGIN` - Parsed but currently unused (API responds with `*`)

## Deployment

Each application is deployed independently to Unikraft Cloud with the [`unikraft` CLI](https://unikraft.com/docs/cli). Prerequisites: `unikraft login` and a running Docker with a `buildkitd` container.

```bash
./deploy.sh               # preflight, leaderboard, then game, then endpoint checks
./deploy.sh leaderboard   # only the leaderboard API
./deploy.sh game          # only the game
```

`./deploy.sh` checks the CLI login, Docker, and BuildKit (starting a stopped `buildkitd` container), warns if the `pangea-countries` service has no instance, runs the per-app scripts, and finally checks `/health`, `/` and `/api/leaderboard` on the public URLs.

The per-app scripts can also be run directly:

```bash
./leaderboard-api/deploy.sh   # https://pangea-leaderboard.fra.unikraft.app
./game/deploy.sh              # https://pangea.fra.unikraft.app
```

Each builds and pushes the image, creates its service (and volume) if missing, and replaces the running instance. The game's server routes (`/api/leaderboard`, `/api/scores`) proxy to the leaderboard API URL in `game/src/lib/constants.js`.

## Architecture

The two applications are completely independent:
- The game makes HTTP requests to the leaderboard API
- No shared code or database between them
- They can be scaled and deployed separately
- CORS is configured on the API to allow requests from the game's origin
