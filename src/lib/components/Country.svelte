<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';

	export let data;
	const randomCountry = data;

	let geoObject;
	$: if (randomCountry) {
		geoObject = { type: 'FeatureCollection', features: [randomCountry] };
	}
</script>

<div
	class="h-[350px] w-[350px] md:w-[500px] md:h-[500px] mx-auto border-2 border-dashed p-1 rounded-xl"
>
	{#if geoObject}
		<BaseMap background={'#1D232A'}>
			<FeatureLayer
				geojson={geoObject}
				styleAccessor={(feature) => ({
					fill: '#EEE',
					'vector-effect': 'non-scaling-stroke'
				})}
			/>
		</BaseMap>
	{/if}
</div>

<div class="mx-auto w-fit text-3xl">
	{data['properties']['pop_est'].toLocaleString()}
</div>
