<script>
	import { correctAnswer, country, names } from '../../stores';
	import { fetchCountry } from '../utils';
</script>

{#if $correctAnswer || $names.length >= 5}
	<button
		on:click={async () => {
			const newCountry = await fetchCountry();
			console.log(newCountry);
			country.set(newCountry);
			names.set([]);
			correctAnswer.set(false);
		}}
		class="btn btn-primary">NEXT</button
	>
{/if}
