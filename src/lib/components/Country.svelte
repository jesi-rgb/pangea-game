<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';

	let { country } = $props();

	let geoObject = $derived({ type: 'FeatureCollection', features: [country] });
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
						class:
							'fill-primary-content stroke-primary stroke-2 drop-shadow-[0_2px_1px_rgba(109,0,117,0.15)]',

						'vector-effect': 'non-scaling-stroke'
					})}
				/>
			</BaseMap>
		{/key}
	{:else}
		<div class="flex space-x-3 mx-auto text-center w-min align-middle h-min my-[150px]">
			<span class="loading loading-bars loading-lg"></span>
			<div class="text-5xl font-bold">Loading...</div>
		</div>
	{/if}
</div>
