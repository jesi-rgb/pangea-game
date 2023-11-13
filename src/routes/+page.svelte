<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';
	import Points from '../lib/components/Points.svelte';
	import { country } from '../stores';
	import NextButton from '../lib/components/NextButton.svelte';

	$: countryData = $country;
</script>

<head>
	<title>WORLDLE</title>
</head>

<main class="w-fit mx-auto xl:w-full">
	<div class="flex justify-between">
		<div class="mb-10">
			<div class="font-bold text-5xl name">WORLDLE</div>
			<Points />
		</div>
		<div class="hidden xl:block">
			<NextButton />
		</div>
	</div>
	<div class="flex flex-col xl:flex-row justify-between">
		<Country country={countryData} />
		<NameForm country={countryData} />
	</div>

	<div class="mt-10 justify-end flex xl:hidden">
		<NextButton />
	</div>
</main>

<style>
	.name {
		font-feature-settings: 'ss03';
		font-variation-settings: 'opsz' 72, 'ital' 0.8, 'wght' 969;
	}
</style>
