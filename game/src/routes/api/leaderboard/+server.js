import { json } from '@sveltejs/kit';
import { LEADERBOARD_API_URL } from '$lib/constants';

export async function GET({ url }) {
	try {
		const limit = url.searchParams.get('limit') || '100';

		// Forward to leaderboard API
		const response = await fetch(`${LEADERBOARD_API_URL}/api/leaderboard?limit=${limit}`);

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({ error: 'Failed to fetch leaderboard' }));
			return json(errorData, { status: response.status });
		}

		const data = await response.json();
		return json(data);
	} catch (error) {
		console.error('Error fetching leaderboard:', error);
		return json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
	}
}
