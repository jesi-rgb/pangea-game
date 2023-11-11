<script>
	import { names } from '../../stores.js';
	import Answer from './Answer.svelte';
	import InputNames from './InputNames.svelte';

	export let data;
	console.log('data', data);
	const answer = data['properties']['name_long'];

	let userInput;
	function enterName(e) {
		if (e.key === 'Enter') {
			$names = [...$names, userInput.value];
			userInput.value = '';
		}
	}
</script>

<div class="w-1/3 self-end flex flex-col justify-between">
	<Answer {answer} />

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
