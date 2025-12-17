import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

let db = null;

export function getDb() {
	if (!db) {
		const dbPath = env.DATABASE_PATH || './leaderboard.db';
		db = new Database(dbPath);

		// Create table if it doesn't exist
		db.exec(`
			CREATE TABLE IF NOT EXISTS leaderboard (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				player_name TEXT NOT NULL,
				score INTEGER NOT NULL,
				created_at DATETIME DEFAULT CURRENT_TIMESTAMP
			);
			
			CREATE INDEX IF NOT EXISTS idx_score ON leaderboard(score DESC);
			CREATE INDEX IF NOT EXISTS idx_created_at ON leaderboard(created_at DESC);
		`);
	}

	return db;
}
