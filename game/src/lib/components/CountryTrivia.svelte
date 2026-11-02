<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { country } from '../../stores';

	let p = $derived($country.properties);

	let facts = $derived([
		{ label: 'Code', value: p.adm0_a3 },
		{ label: 'Coordinates', value: `${p.label_y.toFixed(2)}, ${p.label_x.toFixed(2)}` },
		{ label: 'Population', value: p.pop_est.toLocaleString() },
		{ label: 'Region', value: p.region_un },
		{ label: 'Subregion', value: p.subregion }
	]);
</script>

<div in:fly={{ y: 10, duration: 600, delay: 200, easing: quintOut }}>
	<dl class="divide-y divide-base-300 text-sm">
		{#each facts as fact (fact.label)}
			<div class="flex justify-between gap-4 py-2">
				<dt class="text-muted">{fact.label}</dt>
				<dd class="text-right font-semibold tabular-nums">{fact.value}</dd>
			</div>
		{/each}
	</dl>

	<a
		class="btn mt-3 btn-block rounded-field btn-sm btn-ghost"
		target="_blank"
		href="https://www.google.com/maps?q={p.name_long}+{p.adm0_a3}"
	>
		<svg class="size-4" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"
			><path
				d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"
			/></svg
		>
		Open {p.name} in Google Maps
	</a>
</div>
