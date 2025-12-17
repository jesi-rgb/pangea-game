import { json } from '@sveltejs/kit';
import { LEADERBOARD_API_URL } from '$lib/constants';

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

		// Forward to leaderboard API
		const response = await fetch(`${LEADERBOARD_API_URL}/api/scores`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ player_name, score })
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: 'Failed to submit score' }));
			return json(errorData, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error submitting score:', error);
		return json({ error: 'Failed to submit score' }, { status: 500 });
	}
}
