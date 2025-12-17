import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';

export async function POST({ request }) {
	try {
		const { player_name, score } = await request.json();

		// Validate input
		if (!player_name || typeof player_name !== 'string') {
			return json({ error: 'Player name is required' }, { status: 400 });
		}

		if (typeof score !== 'number' || score < 0) {
			return json({ error: 'Valid score is required' }, { status: 400 });
		}

		const db = getDb();
		const stmt = db.prepare('INSERT INTO leaderboard (player_name, score) VALUES (?, ?)');
		const result = stmt.run(player_name, score);

		return json({
			success: true,
			id: result.lastInsertRowid
		});
	} catch (error) {
		console.error('Error submitting score:', error);
		return json({ error: 'Failed to submit score' }, { status: 500 });
	}
}
