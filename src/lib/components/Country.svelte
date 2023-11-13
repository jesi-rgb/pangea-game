<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';

	export let country;

	let geoObject;
	$: if (country) {
		geoObject = { type: 'FeatureCollection', features: [country] };
	}
</script>

<div
	class="h-[350px] w-[350px] md:w-[500px] md:h-[500px] border-4 border-dashed border-primary p-1 rounded-xl shadow-xl shadow-primary/5"
>
	{#key geoObject}
		<BaseMap>
			<FeatureLayer
				geojson={geoObject}
				styleAccessor={(feature) => ({
					class: 'fill-base-content',
					'vector-effect': 'non-scaling-stroke'
				})}
			/>
		</BaseMap>
	{/key}
</div>
