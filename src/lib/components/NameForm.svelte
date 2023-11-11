<script>
	import { country, countryList, names, points } from '../../stores.js';
	import Answer from './Answer.svelte';
	import InputNames from './InputNames.svelte';
	import Selection from './Selection.svelte';

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

	/* <div class="mt-10 w-fit"> */
	/* 	<p class="opacity-70">Enter a country name</p> */
	/* 	<input */
	/* 		disabled={$names.length >= 5} */
	/* 		on:keydown={enterName} */
	/* 		bind:this={userInput} */
	/* 		type="text" */
	/* 		class="input input-sm xl:input-md input-bordered input-accent" */
	/* 	/> */
	/* </div> */
</script>

<div class="xl:self-end flex flex-col justify-between w-[350px]">
	<Answer />

	<InputNames />

	<Selection />
</div>
