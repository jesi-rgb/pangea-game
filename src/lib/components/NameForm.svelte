<script>
	import { country, names, points } from '../../stores.js';
	import Answer from './Answer.svelte';
	import InputNames from './InputNames.svelte';

	let userInput;
	$: answer = $country['properties']['name_long'];

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

	<div class="mt-10 w-fit">
		<p class="opacity-70">Enter a country name</p>
		<input
			disabled={$names.length >= 5}
			on:keydown={enterName}
			bind:this={userInput}
			type="text"
			class="input input-sm xl:input-md input-bordered input-accent"
		/>
	</div>
</div>
