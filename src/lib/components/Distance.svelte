<script>
	import { correctAnswer, country, names } from '../../stores';
	import { normalize } from 'normalize-diacritics';
	import { distanceInKmBetweenEarthCoordinates, bearing } from '../utils';

	$: lastCountry = $names[$names.length - 1];
	$: finishRound = $names.length >= 5 || $correctAnswer;

	async function calculateDistance(lastCountry) {
		if (lastCountry == undefined) {
			return;
		}
		const normalizedCountry = await normalize(lastCountry.replaceAll(' ', '').replaceAll("'", ''));

		console.log(`https://country-api-omega.vercel.app/info/${normalizedCountry}`);
		const promise = await fetch(`https://country-api-omega.vercel.app/info/${normalizedCountry}`);
		const info = await promise.json();

		const guessLat = info.label_y,
			guessLon = info.label_x;

		const countryLat = $country.properties.label_y,
			countryLon = $country.properties.label_x;

		const distance = distanceInKmBetweenEarthCoordinates(
			countryLat,
			countryLon,
			guessLat,
			guessLon
		);
		const antipodalDistance = 20000;

		console.log(distance);

		const angle = bearing(countryLat, countryLon, guessLat, guessLon);

		const distanceData = {
			distance: distance,
			ratio: (1 - distance / antipodalDistance) * 100,
			angle: angle
		};
		console.log(angle);
		return distanceData;
	}
</script>

<div class="text-xl">
	{#if !finishRound}
		{#await calculateDistance(lastCountry)}
			<section class="mb-5">
				<div>Loading...</div>
			</section>
		{:then distance}
			{#if distance == undefined}
				<section class="mb-5 opacity-0">
					<div>a</div>
				</section>
			{:else}
				<section class="mb-5 flex justify-between tabular-nums">
					<div class="flex items-center space-x-3">
						<div class="font-bold" style="transform:rotate({distance.angle}deg)">→</div>
						<div>{distance.ratio.toFixed(2)}%</div>
					</div>
					<div>{distance.distance.toLocaleString('en-UK', { maximumFractionDigits: 2 })} km</div>
				</section>
			{/if}
		{/await}
	{/if}
</div>
