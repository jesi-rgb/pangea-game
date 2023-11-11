<script>
	import Country from '../lib/components/Country.svelte';
	export let data;
	console.log(data);
</script>

<div class="font-bold text-center text-4xl">WORLDLE</div>

<Country {data} />
