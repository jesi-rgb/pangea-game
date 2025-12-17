export interface LeaderboardEntry {
	id: number;
	player_name: string;
	score: number;
	created_at: string;
}

export interface SubmitScoreRequest {
	player_name: string;
	score: number;
}

export interface LeaderboardResponse {
	entries: LeaderboardEntry[];
	total: number;
}
