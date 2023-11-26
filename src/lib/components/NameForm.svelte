<script>
	import { correctAnswer, names, points } from '../../stores.js';
	import Answer from './Answer.svelte';
	import CountryTrivia from './CountryTrivia.svelte';
	import Distance from './Distance.svelte';
	import InputNames from './InputNames.svelte';
	import NumTries from './NumTries.svelte';
	import Selection from './Selection.svelte';

	$: finishRound = $names.length >= 5 || $correctAnswer;

	$: if (finishRound && !$correctAnswer) {
		points.update((p) => Math.max(0, p - 50));
	}
</script>

<div class="xl:self-end flex flex-col justify-between w-[350px] md:w-[500px] xl:w-[350px]">
	<InputNames />

	<Answer />

	{#if finishRound}
		<CountryTrivia />
	{:else}
		<Distance />
		<div class="flex items-center justify-between xl:flex-row-reverse">
			<NumTries />
			<Selection />
		</div>
	{/if}
</div>
