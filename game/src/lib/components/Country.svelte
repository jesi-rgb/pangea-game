<script>
	import { BaseMap, FeatureLayer } from 'svelte-geo';
	import { fade } from 'svelte/transition';

	/** @type {{ country: any }} */
	let { country } = $props();

	let geoObject = $derived(country && { type: 'FeatureCollection', features: [country] });
	let map = $state();

	const margin = { left: 32, right: 32, top: 32, bottom: 32 };
</script>

<div
	class="map-grid relative aspect-square w-full overflow-hidden rounded-box border border-base-300 shadow-sm"
>
	{#if geoObject}
		{#key geoObject}
			<div class="size-full cursor-grab active:cursor-grabbing" in:fade={{ duration: 400 }}>
				<BaseMap bind:this={map} {margin}>
					<FeatureLayer
						geojson={geoObject}
						styleAccessor={() => ({
							class: 'fill-primary/15 stroke-primary stroke-[1.5] [stroke-linejoin:round]',
							'vector-effect': 'non-scaling-stroke'
						})}
					/>
				</BaseMap>
			</div>
		{/key}

		<div
			class="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between gap-2"
		>
			<span class="rounded-full bg-base-100/80 px-3 py-1 text-xs text-muted backdrop-blur">
				Scroll or pinch to zoom · drag to pan
			</span>
			<button
				class="btn pointer-events-auto rounded-full bg-base-100/80 backdrop-blur btn-xs"
				onclick={() => map?.zoomReset()}
			>
				Reset view
			</button>
		</div>
	{:else}
		<div class="absolute inset-0 grid place-items-center">
			<div class="flex flex-col items-center gap-3 text-primary">
				<span class="loading loading-lg loading-dots"></span>
				<span class="text-sm font-semibold tracking-widest uppercase">Finding a country</span>
			</div>
		</div>
	{/if}
</div>
