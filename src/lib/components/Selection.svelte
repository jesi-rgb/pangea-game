<script>
	import Select from 'svelte-select';
	import { country, countryList, names, points, correctAnswer } from '../../stores';

	$: answer = $country['properties']['name_long'];

	let value;
	function enterName(e) {
		if (value) {
			$names = [...$names, value.value];

			if (value.value === answer) {
				points.update((p) => p + 100);
			}
		}
		value.value = '';
		value.label = '';
	}
</script>

<div class="w-10/12">
	<Select
		disabled={$names.length >= 5 || $correctAnswer}
		items={$countryList}
		class="text-base-content "
		on:select={enterName}
		placeholder="Enter a country name to search"
		bind:value
	/>
</div>
