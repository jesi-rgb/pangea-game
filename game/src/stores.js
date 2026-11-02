import { writable } from 'svelte/store';

export const rounds = writable(1);
export const names = writable([]);
/** Per-guess measurement, index-aligned with `names`: undefined while pending, null when unavailable. */
export const distances = writable([]);
export const correctAnswer = writable(false);
export const points = writable(0);
export const country = writable({});
export const loadingCountry = writable(false);
export const countryList = writable([]);

// Leaderboard stores
export const playerName = writable('');
export const gameEnded = writable(false);
export const maxRounds = writable(5);
