<script>
	import Select from 'svelte-select';
	import { country, countryList, names, points } from '../../stores';

	$: answer = $country['properties']['name_long'];

	let value;
	function enterName(e) {
		if (value) {
			$names = [...$names, value.value];

			if (value.value === answer) {
				console.log('in');
				points.update((p) => p + 100);
				console.log($points);
			}
		}
		value.value = '';
		value.label = '';
		console.log(value);
	}
</script>

<Select
	disabled={$names.length >= 5 ? true : false}
	items={$countryList}
	class="text-base-content fill-black bg-black"
	on:select={enterName}
	placeholder="Enter a country name to search"
	bind:value
/>
