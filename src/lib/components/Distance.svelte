<script>
	import { correctAnswer, country, names, distances } from '../../stores';
	import { normalize } from 'normalize-diacritics';
	import { distanceInKmBetweenEarthCoordinates, bearing } from '../utils';
	import { API_BASE_URL } from '../constants';
	import { cubicIn } from 'svelte/easing';

	let lastCountry = $derived($names[$names.length - 1]);
	let finishRound = $derived($names.length >= 5 || $correctAnswer);

	async function calculateDistance(lastCountry) {
		if (lastCountry == undefined) {
			return;
		}
		const normalizedCountry = await normalize(lastCountry.replaceAll(' ', '').replaceAll("'", ''));

		const promise = await fetch(`${API_BASE_URL}/info/${normalizedCountry}`);
		if (!promise.ok) {
			console.warn('Failed to fetch country info:', normalizedCountry, promise.status);
			$distances = [...$distances, 'N/A'];
			return undefined;
		}
		const info = await promise.json();

		const guessLat = info.properties.label_y,
			guessLon = info.properties.label_x;

		const countryLat = $country.properties.label_y,
			countryLon = $country.properties.label_x;

		// Check if we have valid coordinates
		if (guessLat == null || guessLon == null || countryLat == null || countryLon == null) {
			console.warn('Missing coordinates:', {
				guessLat,
				guessLon,
				countryLat,
				countryLon,
				country: lastCountry
			});
			$distances = [...$distances, 'N/A'];
			return undefined;
		}

		let distance = distanceInKmBetweenEarthCoordinates(countryLat, countryLon, guessLat, guessLon);

		// Ensure distance is a valid finite number
		if (!Number.isFinite(distance)) {
			console.warn('Invalid distance calculated:', { distance, lastCountry });
			$distances = [...$distances, 'N/A'];
			return undefined;
		}

		const antipodalDistance = 20000;

		const angle = bearing(countryLat, countryLon, guessLat, guessLon);

		const rawRatio = 1 - distance / antipodalDistance;
		const ratio = cubicIn(rawRatio) * 100;

		const distanceData = {
			distance: distance,
			realRatio: rawRatio,
			ratio: Number.isFinite(ratio) ? ratio : 0,
			angle: Number.isFinite(angle) ? angle : 0
		};

		$distances = [...$distances, distanceData.ratio.toFixed(2) + '%'];
		return distanceData;
	}
</script>

<div class="text-xl mt-4">
	{#await calculateDistance(lastCountry)}
		{#if !finishRound}
			<div class="mb-5">
				<section class="flex justify-between tabular-nums">
					<div class="flex items-center space-x-3 font-semibold">
						<div class="flex space-x-3 items-center">
							<span class="loading loading-bars loading-xs"></span><span>Loading</span>
						</div>
					</div>
					<div>{'10'.toLocaleString('en-UK', { maximumFractionDigits: 2 })} km</div>
				</section>
				<progress class="progress animate-pulse w-full progress-primary" value="0" max="100"
				></progress>
			</div>
		{/if}
	{:then distance}
		{#if !finishRound}
			{#if distance == undefined}
				<!--this prevents layout shift-->
				<section class="mb-5 opacity-0">
					<div>a</div>
				</section>
			{:else}
				<div class="mb-5">
					<section class="flex justify-between tabular-nums">
						<div class="flex items-center space-x-3 font-semibold">
							<div style="transform:rotate({distance.angle}deg);">→</div>
							<div style="font-weight:{distance.ratio * 10}; font-variation-settings: 'opsz' 12;">
								{distance.ratio.toFixed(2)}%
							</div>
						</div>
						<div>{distance.distance.toLocaleString('en-UK', { maximumFractionDigits: 2 })} km</div>
					</section>
					<progress class="progress w-full progress-primary" value={distance.ratio} max="100"
					></progress>
				</div>
			{/if}
		{/if}
	{/await}
</div>
