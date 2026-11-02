import { normalize } from 'normalize-diacritics';
import { cubicIn } from 'svelte/easing';
import { API_BASE_URL, GUESS_POINTS } from './constants';

/** @param {number} guessNumber 1-based guess on which the answer was found */
export function pointsForGuess(guessNumber) {
	return GUESS_POINTS[Math.min(guessNumber, GUESS_POINTS.length) - 1];
}

/**
 * Distance, proximity (0–100, eased) and arrow rotation from a guess towards the target.
 * Returns null when the guess has no usable coordinates.
 */
export async function measureGuess(guessName, target) {
	const slug = await normalize(guessName.replaceAll(' ', '').replaceAll("'", ''));
	const response = await fetch(`${API_BASE_URL}/info/${slug}`);
	if (!response.ok) {
		console.warn('Failed to fetch country info:', slug, response.status);
		return null;
	}
	const info = await response.json();

	const guessLat = info.properties.label_y,
		guessLon = info.properties.label_x;
	const targetLat = target.properties.label_y,
		targetLon = target.properties.label_x;
	if (guessLat == null || guessLon == null || targetLat == null || targetLon == null) {
		console.warn('Missing coordinates:', { guessName, guessLat, guessLon, targetLat, targetLon });
		return null;
	}

	const distance = distanceInKmBetweenEarthCoordinates(targetLat, targetLon, guessLat, guessLon);
	if (!Number.isFinite(distance)) {
		console.warn('Invalid distance calculated:', { distance, guessName });
		return null;
	}

	const antipodalDistance = 20000;
	const ratio = cubicIn(1 - distance / antipodalDistance) * 100;
	const angle = bearing(targetLat, targetLon, guessLat, guessLon);

	return {
		distance,
		ratio: Number.isFinite(ratio) ? ratio : 0,
		angle: Number.isFinite(angle) ? angle : 0
	};
}

export async function fetchCountry() {
	const countryPromise = await fetch(`${API_BASE_URL}/random_country`);
	const country = countryPromise.json();
	return country;
}

function toRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
	return (radians * 180) / Math.PI;
}

// from https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
export function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
	lat1 = parseFloat(lat1);
	lat2 = parseFloat(lat2);
	lon1 = parseFloat(lon1);
	lon2 = parseFloat(lon2);

	let earthRadiusKm = 6371;

	let dLat = toRadians(lat2 - lat1);
	let dLon = toRadians(lon2 - lon1);

	lat1 = toRadians(lat1);
	lat2 = toRadians(lat2);

	let a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	return earthRadiusKm * c;
}

// from https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript
export function bearing(startLat, startLng, destLat, destLng) {
	startLat = toRadians(startLat);
	startLng = toRadians(startLng);
	destLat = toRadians(destLat);
	destLng = toRadians(destLng);

	let y = Math.sin(destLng - startLng) * Math.cos(destLat);
	let x =
		Math.cos(startLat) * Math.sin(destLat) -
		Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);

	let brng = Math.atan2(y, x);

	brng = toDegrees(brng);
	return -90 + ((brng + 180) % 360);
}
