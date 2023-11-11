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

<div class="w-1/3 self-end flex flex-col justify-between">
	<Answer />

	<InputNames />

	<div class="mt-10">
		<p class="opacity-70">Enter a country name</p>
		<div class="w-1/3">
			<input
				disabled={$names.length >= 5}
				on:keydown={enterName}
				bind:this={userInput}
				type="text"
				class="input input-bordered input-accent"
			/>
		</div>
	</div>
</div>
