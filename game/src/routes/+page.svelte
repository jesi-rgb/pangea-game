<script module>
	/** First-game load; shared across remounts so returning to `/` keeps the round in progress. */
	let initialLoad;
</script>

<script>
	import { onMount } from 'svelte';
	import Country from '$lib/components/Country.svelte';
	import NameForm from '$lib/components/NameForm.svelte';
	import Points from '$lib/components/Points.svelte';
	import MetaStuff from '$lib/components/MetaStuff.svelte';
	import GameOver from '$lib/components/GameOver.svelte';
	import { API_BASE_URL } from '$lib/constants';
	import { fetchCountry } from '$lib/utils';
	import { country, countryList, loadingCountry, gameEnded } from '../stores';

	let ready = $derived(!$loadingCountry && !!$country.geometry);

	async function loadGame() {
		const [newCountry, names] = await Promise.all([
			fetchCountry(),
			fetch(`${API_BASE_URL}/country_names`).then((r) => r.json())
		]);
		country.set(newCountry);
		countryList.set(names.sort((a, b) => a.name_long.localeCompare(b.name_long)));
		loadingCountry.set(false);
	}

	onMount(() => {
		initialLoad ??= loadGame().catch((err) => {
			initialLoad = undefined;
			console.error('Failed to load game:', err);
		});
	});
</script>

<MetaStuff />

{#if $gameEnded}
	<GameOver />
{/if}

<div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_23rem] lg:gap-10">
	<section class="space-y-4">
		<Points />
		<Country country={ready ? $country : null} />
	</section>

	<NameForm {ready} />
</div>
