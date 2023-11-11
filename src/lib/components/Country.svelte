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
	class="h-[350px] w-[350px] md:w-[500px] md:h-[500px] border-2 border-dashed border-accent p-1 rounded-xl shadow-xl shadow-black/10 dark:shadow-accent/5"
>
	{#if geoObject}
		<BaseMap>
			<FeatureLayer
				geojson={geoObject}
				styleAccessor={(feature) => ({
					class: 'fill-base-content ',
					'vector-effect': 'non-scaling-stroke'
				})}
			/>
		</BaseMap>
	{/if}
	<div class="text-3xl mt-10 tabular-nums">
		Population estimate: {data['properties']['pop_est'].toLocaleString()}
	</div>
</div>
