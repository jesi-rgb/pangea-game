# Agent notes

## Shipping game changes to https://pangea.fra.unikraft.app

Pushing to GitHub does not deploy; there is no CI. Deploy manually from the repo root:

```bash
./deploy.sh game   # preflight (unikraft login, Docker, buildkitd), build + push image, replace instance, endpoint checks
```

- Builds `game/` via `game/Kraftfile` (Dockerfile rootfs, `base-compat:14` pinned on purpose — see comment there) and pushes `jesi-rgb/pangea:latest`.
- Replaces the `pangea` instance on the `pangea` service (metro `fra`); deleting the old instance can take minutes.
- Instances scale to zero, so the first request after deploy may be a cold start.
- Leaderboard API deploys separately: `./deploy.sh leaderboard` → https://pangea-leaderboard.fra.unikraft.app.
- Inspect live state: `unikraft instances get pangea`.

## Git

- `origin` points at `jesi-rgb/worldle-unlimited`, which GitHub redirects to `jesi-rgb/pangea-game`.
- `game/bun.lockb` is binary; on merge conflicts keep the side matching `game/package.json`, then run `bun install` in `game/`.
