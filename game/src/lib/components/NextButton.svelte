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
	import { fetchCountry } from '../utils';

	let button = $state();

	let finishRound = $derived($correctAnswer || $names.length >= 5);
	let isLastRound = $derived($rounds >= $maxRounds);
	let canAdvanceWithEnter = $state(false);

	// Add delay before allowing Enter to advance
	$effect(() => {
		if (finishRound) {
			canAdvanceWithEnter = false;
			const timer = setTimeout(() => {
				canAdvanceWithEnter = true;
			}, 500); // 500ms delay
			return () => clearTimeout(timer);
		}
	});

	async function handleNextRound() {
		// Check if game should end
		if (isLastRound) {
			gameEnded.set(true);
			return;
		}

		button.innerText = 'Loading...';

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
	<button onclick={handleNextRound} bind:this={button} class="btn btn-primary">NEXT</button>
{/if}

<svelte:window
	onkeydown={(e) => {
		if (finishRound && canAdvanceWithEnter && e.key === 'Enter') handleNextRound();
	}}
/>
