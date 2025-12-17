import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db';

export function GET({ url }) {
	try {
		const db = getDb();
		const limit = parseInt(url.searchParams.get('limit') || '100');

		const entries = db
			.prepare(
				`
				SELECT id, player_name, score, created_at 
				FROM leaderboard 
				ORDER BY score DESC, created_at ASC 
				LIMIT ?
			`
			)
			.all(limit);

		return json({ entries });
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		return json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
	}
}
