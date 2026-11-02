<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { correctAnswer, names, country } from '../../stores.js';
	import { MAX_GUESSES, MISS_PENALTY } from '$lib/constants';
	import { pointsForGuess } from '$lib/utils';

	let answer = $derived($country.properties?.name_long);

	$effect(() => {
		if ($names.length > 0 && $names[$names.length - 1] === answer) {
			$correctAnswer = true;
		}
	});
</script>

{#if $correctAnswer}
	<div
		class="rounded-field border border-success/30 bg-success/10 p-4"
		in:fly={{ y: 10, duration: 500, easing: quintOut }}
	>
		<div class="flex items-center justify-between text-sm font-semibold text-success">
			<span>Correct in {$names.length}</span>
			<span class="tabular-nums">+{pointsForGuess($names.length)} pts</span>
		</div>
		<h3 class="mt-1 text-2xl leading-tight font-bold">{answer}</h3>
	</div>
{:else if $names.length >= MAX_GUESSES}
	<div
		class="rounded-field border border-error/30 bg-error/10 p-4"
		in:fly={{ y: 10, duration: 500, easing: quintOut }}
	>
		<div class="flex items-center justify-between text-sm font-semibold text-error">
			<span>Out of guesses. It was</span>
			<span class="tabular-nums">−{MISS_PENALTY} pts</span>
		</div>
		<h3 class="mt-1 text-2xl leading-tight font-bold">{answer}</h3>
	</div>
{/if}
