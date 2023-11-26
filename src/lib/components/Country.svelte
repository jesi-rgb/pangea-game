<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';

	export let country;

	let geoObject = {};
	$: if (country) {
		geoObject = { type: 'FeatureCollection', features: [country] };
	} else {
		geoObject = {};
	}
</script>

<div
	class="h-[350px] w-[350px] md:w-[500px] md:h-[500px] border-4 border-dashed border-primary p-1 rounded-xl shadow-xl shadow-primary/5"
>
	{#if geoObject}
		{#key geoObject}
			<BaseMap>
				<FeatureLayer
					geojson={geoObject}
					styleAccessor={(feature) => ({
						class: 'fill-primary-content stroke-primary stroke-2',
						'vector-effect': 'non-scaling-stroke'
					})}
				/>
			</BaseMap>
		{/key}
	{:else}
		<div>loading</div>
	{/if}
</div>
