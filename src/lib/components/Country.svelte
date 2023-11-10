<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';
	import world from '/src/world.geojson.json';
	import { GeoJSON2SVG } from 'geojson2svg';

	let randomCountry = world.features[parseInt(Math.random() * world.features.length)];

	const converter = new GeoJSON2SVG({
		output: 'path'
	});

	let country = world.features.filter((d) => d.properties.adm0_iso === 'KWT')[0];

	$: geoObject = { type: 'FeatureCollection', features: [randomCountry] };

	$: console.log(geoObject);
</script>

<div class="h-96 w-96 mx-auto border border-red-500">
	<BaseMap>
		<FeatureLayer
			geojson={geoObject}
			styleAccessor={(feature) => ({
				fill: 'tomato',
				stroke: 'tomato',
				'vector-effect': 'non-scaling-stroke'
			})}
		/>
	</BaseMap>
</div>

<div class="mx-auto w-fit text-4xl font-bold mt-10">{randomCountry.properties.name_es}</div>
