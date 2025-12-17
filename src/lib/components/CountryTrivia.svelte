<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { country } from '../../stores';

	let triviaData = $derived({
		code: $country.properties.adm0_a3,
		coordinates: {
			lat: $country.properties.label_y.toFixed(2),
			lng: $country.properties.label_x.toFixed(2)
		},
		population: $country.properties.pop_est.toLocaleString(),
		region: $country.properties.region_un,
		subregion: $country.properties.subregion,
		name: $country.properties.name,
		nameLong: $country.properties.name_long
	});
</script>

<div class="flex flex-col" in:fly={{ x: -20, duration: 1000, delay: 600, easing: quintOut }}>
	<div class="flex justify-between">
		<div>Code</div>
		<span class="font-extrabold text-primary">{triviaData.code}</span>
	</div>

	<div class="flex justify-between">
		<div>Coordinates</div>
		<span class="font-bold tabular-nums"
			>{triviaData.coordinates.lat}, {triviaData.coordinates.lng}</span
		>
	</div>

	<div class="flex justify-between tabular-nums">
		<div>Population estimate</div>
		<span class="font-bold">{triviaData.population}</span>
	</div>
	<div class="flex justify-between">
		<div>Region</div>
		<span class="font-bold">{triviaData.region}</span>
	</div>
	<div class="flex justify-between">
		<div>Subregion</div>
		<span class="font-bold">{triviaData.subregion}</span>
	</div>

	<div class="mt-5 flex justify-between align-baseline">
		<div class="flex align-baseline">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="21"
				height="21"
				class="fill-primary"
				viewBox="0 0 256 256"
				><path
					d="M48,96a80,80,0,1,1,80,80A80.09,80.09,0,0,1,48,96Zm146.46,69.28A96,96,0,0,1,58.72,29.54A8,8,0,1,0,47.18,18.46A112,112,0,0,0,120,207.71V224H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V207.72a111.21,111.21,0,0,0,69.54-30.9,8,8,0,1,0-11.08-11.54Z"
				/></svg
			>
			View on Google Maps
		</div>
		<a
			class="underline text-primary text-right font-bold"
			target="_blank"
			href="https://www.google.com/maps?q={triviaData.nameLong}+{triviaData.code}"
			><span>{triviaData.name}</span></a
		>
	</div>
</div>
