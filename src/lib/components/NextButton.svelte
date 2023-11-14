<script>
	import { loadingCountry, correctAnswer, country, names, distances } from '../../stores';
	import { fetchCountry } from '../utils';

	let button;

	$: finishRound = $correctAnswer || $names.length >= 5;

	async function handleNextRound(e) {
		button.innerText = 'Loading...';

		names.set([]);
		correctAnswer.set(false);
		loadingCountry.set(true);
		distances.set([]);

		const newCountry = await fetchCountry();
		country.set(newCountry);
	}
</script>

{#if finishRound}
	<button on:click={handleNextRound} bind:this={button} class="btn btn-primary">NEXT</button>
{/if}

<svelte:window
	on:keydown={(e) => {
		if (finishRound && e.key === 'Enter') handleNextRound();
	}}
/>
