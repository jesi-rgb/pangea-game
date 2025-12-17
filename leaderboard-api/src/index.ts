import { Database } from 'bun:sqlite';
import { initDB, addScore, getLeaderboard, getTotalEntries } from './db';
import type { SubmitScoreRequest, LeaderboardResponse } from './types';

const PORT = process.env.PORT || 3001;
const CORS_ORIGINS = process.env.CORS_ORIGIN?.split(',') || [
	'http://localhost:5173',
	'http://localhost:4173',
	'https://pangea.fra.unikraft.app'
];

// Initialize database - use volume path in production, local path in dev
const DB_PATH = process.env.DATABASE_PATH || 'leaderboard.db';
const db = new Database(DB_PATH);
initDB(db);

console.log(`📦 Using database at: ${DB_PATH}`);

// Helper to add CORS headers
function corsHeaders(origin: string | null): HeadersInit {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type'
	};
}

// Helper to create JSON response
function jsonResponse(data: any, status: number, origin: string | null) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			'Content-Type': 'application/json',
			...corsHeaders(origin)
		}
	});
}

const server = Bun.serve({
	port: PORT,
	fetch: async (req) => {
		const url = new URL(req.url);
		const origin = req.headers.get('origin');

		// Handle CORS preflight
		if (req.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: corsHeaders(origin)
			});
		}

		// Health check
		if (url.pathname === '/health') {
			return jsonResponse({ status: 'ok' }, 200, origin);
		}

		// GET /api/leaderboard
		if (url.pathname === '/api/leaderboard' && req.method === 'GET') {
			try {
				const limitParam = url.searchParams.get('limit');
				const limit = limitParam ? parseInt(limitParam, 10) : 100;

				if (isNaN(limit) || limit < 1 || limit > 1000) {
					return jsonResponse(
						{ error: 'Invalid limit parameter. Must be between 1 and 1000' },
						400,
						origin
					);
				}

				const entries = getLeaderboard(db, limit);
				const total = getTotalEntries(db);

				const response: LeaderboardResponse = { entries, total };
				return jsonResponse(response, 200, origin);
			} catch (error) {
				console.error('Error fetching leaderboard:', error);
				return jsonResponse({ error: 'Failed to fetch leaderboard' }, 500, origin);
			}
		}

		// POST /api/scores
		if (url.pathname === '/api/scores' && req.method === 'POST') {
			try {
				const body = (await req.json()) as SubmitScoreRequest;

				// Validate request body
				if (!body.player_name || body.score === undefined) {
					return jsonResponse(
						{ error: 'Missing required fields: player_name and score' },
						400,
						origin
					);
				}

				// Validate player name
				const name = body.player_name.trim().toUpperCase();
				if (name.length !== 4) {
					return jsonResponse({ error: 'Player name must be exactly 4 characters' }, 400, origin);
				}

				const entry = addScore(db, name, body.score);
				return jsonResponse(entry, 201, origin);
			} catch (error) {
				console.error('Error adding score:', error);
				return jsonResponse(
					{ error: error instanceof Error ? error.message : 'Failed to add score' },
					500,
					origin
				);
			}
		}

		// 404 for unknown routes
		return jsonResponse({ error: 'Not found' }, 404, origin);
	}
});

console.log(`🚀 Leaderboard API running on http://localhost:${server.port}`);
