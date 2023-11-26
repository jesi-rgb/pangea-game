<script>
	import Select from 'svelte-select';
	import { country, countryList, names, points, correctAnswer } from '../../stores';

	$: answer = $country['properties']['name_long'];

	$: choices = $countryList.filter((x) => !$names.includes(x['name_long']));
	let label = 'name_long';

	let value;
	function enterName(e) {
		if (value) {
			$names = [...$names, value.name_long];

			if (value.name_long === answer) {
				switch ($names.length) {
					case 1:
						points.update((p) => p + 500);
						break;
					case 2:
						points.update((p) => p + 300);
						break;
					case 3:
						points.update((p) => p + 200);
						break;
					default:
						points.update((p) => p + 100);
						break;
				}
			}
		}
		value = undefined;
	}
</script>

<div class="w-10/12">
	<Select
		disabled={$names.length >= 5 || $correctAnswer}
		items={choices}
		{label}
		on:select={enterName}
		groupBy={(x) => x['continent']}
		placeholder="Enter a country name to search"
		bind:value
	/>
</div>
