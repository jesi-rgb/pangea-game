<script>
	import { correctAnswer, names } from '../../stores.js';
	import { MAX_GUESSES } from '$lib/constants';
	import Answer from './Answer.svelte';
	import CountryTrivia from './CountryTrivia.svelte';
	import GuessList from './GuessList.svelte';
	import NextButton from './NextButton.svelte';
	import NumTries from './NumTries.svelte';
	import Selection from './Selection.svelte';

	/** @type {{ ready: boolean }} */
	let { ready } = $props();

	let finishRound = $derived($names.length >= MAX_GUESSES || $correctAnswer);
</script>

<aside
	class="flex flex-col gap-5 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm lg:sticky lg:top-8"
>
	<div class="flex items-center justify-between">
		<h2 class="text-xs font-semibold tracking-widest text-muted uppercase">Your guesses</h2>
		<NumTries />
	</div>

	<GuessList />

	<Answer />

	{#if finishRound}
		<CountryTrivia />
		<NextButton />
	{:else}
		<Selection disabled={!ready} />
	{/if}
</aside>
