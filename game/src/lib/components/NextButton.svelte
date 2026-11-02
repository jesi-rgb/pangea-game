<script>
	import {
		loadingCountry,
		correctAnswer,
		country,
		names,
		distances,
		rounds,
		maxRounds,
		gameEnded
	} from '../../stores';
	import { MAX_GUESSES } from '$lib/constants';
	import { fetchCountry } from '$lib/utils';

	let loading = $state(false);

	let finishRound = $derived($correctAnswer || $names.length >= MAX_GUESSES);
	let isLastRound = $derived($rounds >= $maxRounds);
	let canAdvanceWithEnter = $state(false);

	// Delay Enter so the keypress that submitted the last guess doesn't also skip the round.
	$effect(() => {
		if (finishRound) {
			canAdvanceWithEnter = false;
			const timer = setTimeout(() => {
				canAdvanceWithEnter = true;
			}, 500);
			return () => clearTimeout(timer);
		}
	});

	async function handleNextRound() {
		if (loading) return;
		if (isLastRound) {
			gameEnded.set(true);
			return;
		}

		loading = true;

		names.set([]);
		correctAnswer.set(false);
		loadingCountry.set(true);
		distances.set([]);
		rounds.update((r) => r + 1);

		const newCountry = await fetchCountry();
		country.set(newCountry);

		loadingCountry.set(false);
	}
</script>

{#if finishRound}
	<button onclick={handleNextRound} disabled={loading} class="btn btn-block btn-lg btn-primary">
		{#if loading}
			<span class="loading loading-sm loading-spinner"></span>
		{:else}
			{isLastRound ? 'See results' : 'Next country'}
			<kbd class="kbd border-primary-content/30 bg-primary-content/15 text-primary-content kbd-sm"
				>↵</kbd
			>
		{/if}
	</button>
{/if}

<svelte:window
	onkeydown={(e) => {
		if (finishRound && canAdvanceWithEnter && e.key === 'Enter') handleNextRound();
	}}
/>
