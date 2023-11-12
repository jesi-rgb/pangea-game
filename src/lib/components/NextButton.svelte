<script>
	import { loadingCountry, correctAnswer, country, names } from '../../stores';
	import { fetchCountry } from '../utils';

	let button;
</script>

{#if $correctAnswer || $names.length >= 5}
	<button
		on:click={async () => {
			button.innerText = 'Loading...';

			const newCountry = await fetchCountry();
			country.set(newCountry);

			names.set([]);
			correctAnswer.set(false);
			loadingCountry.set(true);
		}}
		bind:this={button}
		class="btn btn-primary">NEXT</button
	>
{/if}
