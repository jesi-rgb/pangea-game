<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';
	import { correctAnswer, names } from '../stores';

	export let data;

	console.log(data);
</script>

<head>
	<title>WORLDLE</title>
</head>

<div class="flex justify-between">
	<div class="font-bold text-5xl mb-10 name">WORLDLE</div>
	{#if $correctAnswer || $names.length >= 5}
		<button class="btn btn-primary">NEXT</button>
	{/if}
</div>
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
