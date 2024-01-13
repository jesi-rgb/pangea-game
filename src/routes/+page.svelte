<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';
	import Points from '../lib/components/Points.svelte';
	import { country, countryList, loadingCountry } from '../stores';
	import NextButton from '../lib/components/NextButton.svelte';
	import MetaStuff from '../lib/components/MetaStuff.svelte';
	import logo from '$lib/pangea.svg';

	import Footer from '../lib/components/Footer.svelte';

	$: countryData = $country;

	async function loadCountry() {
		const countryPromise = await fetch('https://country-api-omega.vercel.app/random_country');
		const newCountry = await countryPromise.json();
		country.set(newCountry);

		const countryListPromise = await fetch('https://country-api-omega.vercel.app/country_names');
		const newCountryList = await countryListPromise.json();
		countryList.set(newCountryList.sort());

		loadingCountry.set(false);

		console.log('loaded');
	}
</script>

<MetaStuff />

{#await loadCountry()}
	<main class="w-fit mx-auto xl:w-full">
		<div class="flex justify-between">
			<div class="mb-3 mx-auto xl:mx-0">
				<img src={logo} width="200" class="mx-auto" alt="PANGEA logo" />
				<Points />
			</div>
			<div class="hidden xl:block">
				<NextButton />
			</div>
		</div>
		<div class="flex flex-col xl:flex-row justify-between">
			<div
				class="h-[350px] w-[350px] md:w-[500px] md:h-[500px] border-4 border-dashed border-primary p-1 rounded-xl shadow-xl shadow-primary/5"
			>
				<div class="text-4xl mx-auto text-primary w-fit my-[50%]">Loading...</div>
			</div>
		</div>

		<div class="mt-10 justify-end flex xl:hidden">
			<NextButton />
		</div>
		<Footer />
	</main>
{:then countryLoaded}
	<main class="w-fit mx-auto xl:w-full">
		<div class="flex justify-between">
			<div class="mb-3 mx-auto xl:mx-0">
				<img src={logo} width="200" class="mx-auto" alt="PANGEA logo" />
				<Points />
			</div>
			<div class="hidden xl:block">
				<NextButton />
			</div>
		</div>
		<div class="flex flex-col xl:flex-row justify-between">
			{#if countryData}
				<Country country={countryData} />
			{:else}
				<div>loading</div>
			{/if}
			<NameForm />
		</div>

		<div class="mt-10 justify-end flex xl:hidden">
			<NextButton />
		</div>
		<Footer />
	</main>
{/await}
