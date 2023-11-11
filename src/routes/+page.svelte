<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';
	import Points from '../lib/components/Points.svelte';
	import { correctAnswer, country, names } from '../stores';
	import { fetchCountry } from '../lib/utils';

	$: countryData = $country;
</script>

<head>
	<title>WORLDLE</title>
</head>

<div class="flex justify-between">
	<div class="mb-10">
		<div class="font-bold text-5xl name">WORLDLE</div>
		<Points />
	</div>
	{#if $correctAnswer || $names.length >= 5}
		<button
			on:click={async () => {
				const newCountry = await fetchCountry();
				console.log(newCountry);
				country.set(newCountry);
				names.set([]);
				correctAnswer.set(false);
			}}
			class="btn btn-primary">NEXT</button
		>
	{/if}
</div>
<div class="flex flex-col md:flex-row justify-between">
	<Country country={countryData} />
	<NameForm country={countryData} />
</div>

<style>
	.name {
		font-feature-settings: 'ss03';
		font-variation-settings: 'opsz' 72, 'ital' 0.8, 'wght' 969;
	}
</style>
