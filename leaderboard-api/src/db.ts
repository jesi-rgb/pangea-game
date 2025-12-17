import { Database } from 'bun:sqlite';
import type { LeaderboardEntry } from './types';

export function initDB(db: Database): void {
	// Create leaderboard table
	db.run(`
    CREATE TABLE IF NOT EXISTS leaderboard (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      player_name TEXT NOT NULL CHECK(length(player_name) = 4),
      score INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

	// Create indexes for performance
	db.run(`
    CREATE INDEX IF NOT EXISTS idx_score_desc 
    ON leaderboard(score DESC)
  `);

	db.run(`
    CREATE INDEX IF NOT EXISTS idx_created_at 
    ON leaderboard(created_at DESC)
  `);

	console.log('✅ Database initialized');
}

export function addScore(db: Database, playerName: string, score: number): LeaderboardEntry {
	// Validate input
	if (!playerName || playerName.length !== 4) {
		throw new Error('Player name must be exactly 4 characters');
	}

	if (typeof score !== 'number' || score < 0) {
		throw new Error('Score must be a non-negative number');
	}

	// Insert score
	const stmt = db.prepare('INSERT INTO leaderboard (player_name, score) VALUES (?, ?)');

	const result = stmt.run(playerName.toUpperCase(), score);

	// Fetch the inserted record
	const getStmt = db.prepare('SELECT * FROM leaderboard WHERE id = ?');

	const entry = getStmt.get(result.lastInsertRowid) as LeaderboardEntry;

	return entry;
}

export function getLeaderboard(db: Database, limit: number = 100): LeaderboardEntry[] {
	const stmt = db.prepare(`
    SELECT * FROM leaderboard 
    ORDER BY score DESC, created_at ASC 
    LIMIT ?
  `);

	const entries = stmt.all(limit) as LeaderboardEntry[];
	return entries;
}

export function getTotalEntries(db: Database): number {
	const result = db.query('SELECT COUNT(*) as count FROM leaderboard').get() as { count: number };
	return result.count;
}
