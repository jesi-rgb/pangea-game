<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';

	export let data;

	console.log(data);
</script>

<div class="font-bold text-5xl mb-10 name">WORLDLE</div>

<div class="flex flex-col md:flex-row justify-between">
	<Country {data} />
	<NameForm {data} />
</div>

<style>
	.name {
		font-feature-settings: 'ss03';
		font-variation-settings: 'opsz' 72, 'ital' 0.8, 'wght' 969;
	}
</style>
