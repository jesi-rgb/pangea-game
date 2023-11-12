<script>
	import { country, correctAnswer, names, points } from '../../stores.js';
	import Answer from './Answer.svelte';
	import CountryTrivia from './CountryTrivia.svelte';
	import InputNames from './InputNames.svelte';
	import Selection from './Selection.svelte';

	let userInput;
	$: answer = $country['properties']['name_long'];

	$: finishRound = $names.length >= 5 || $correctAnswer;

	function enterName(e) {
		if (e.key === 'Enter') {
			$names = [...$names, userInput.value];

			if (userInput.value === answer) {
				console.log('in');
				points.update((p) => p + 100);
				console.log($points);
			}
			userInput.value = '';
		}
	}
</script>

<div class="xl:self-end flex flex-col justify-between w-[350px]">
	<Answer />

	<InputNames />

	{#if finishRound}
		<CountryTrivia />
	{:else}
		<Selection />
	{/if}
</div>
