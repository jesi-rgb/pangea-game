<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';
	import world from '/src/world.geojson.json';

	console.log(world);
	let randomCountry = world.features[parseInt(Math.random() * world.features.length)];

	$: geoObject = { type: 'FeatureCollection', features: [randomCountry] };

	$: console.log(geoObject);

	console.log(randomCountry);
</script>

<div class="h-[500px] w-[400px] md:w-[600px] mx-auto border-2 border-dashed p-1 rounded-xl">
	<BaseMap background={'#1D232A'}>
		<FeatureLayer
			geojson={geoObject}
			styleAccessor={(feature) => ({
				fill: '#EEE',
				'vector-effect': 'non-scaling-stroke'
			})}
		/>
	</BaseMap>
</div>
