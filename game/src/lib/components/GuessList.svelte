<script>
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { names, distances, country } from '../../stores.js';
	import { MAX_GUESSES } from '$lib/constants';

	let answer = $derived($country.properties?.name_long);

	/** @param {number} km */
	const formatKm = (km) => km.toLocaleString('en-GB', { maximumFractionDigits: 0 });
</script>

<ol class="flex flex-col gap-2">
	{#each { length: MAX_GUESSES }, i}
		{@const name = $names[i]}
		{@const measure = $distances[i]}
		{#if name === undefined}
			<li
				class="flex h-11 items-center gap-3 rounded-field border border-dashed border-base-300 px-3 text-sm text-subtle"
			>
				<span class="w-4 text-center tabular-nums">{i + 1}</span>
			</li>
		{:else if name === answer}
			<li
				class="flex h-11 items-center gap-3 rounded-field border border-success/40 bg-success/15 px-3"
				in:fly={{ y: 8, duration: 400, easing: quintOut }}
			>
				<span class="w-4 text-center text-sm text-success tabular-nums">{i + 1}</span>
				<span class="flex-1 truncate font-semibold">{name}</span>
				<svg class="size-5 text-success" viewBox="0 0 256 256" fill="currentColor"
					><path
						d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
					/></svg
				>
			</li>
		{:else}
			<li
				class="relative flex h-11 items-center gap-3 overflow-hidden rounded-field border border-base-300 px-3"
				in:fly={{ y: 8, duration: 400, easing: quintOut }}
			>
				{#if measure}
					<div
						class="absolute inset-y-0 left-0 origin-left animate-grow-x opacity-20"
						style="width:{measure.ratio}%; background: color-mix(in oklab, var(--color-success) {measure.ratio}%, var(--color-error));"
					></div>
				{/if}
				<span class="relative w-4 text-center text-sm text-muted tabular-nums">{i + 1}</span>
				<span class="relative flex-1 truncate font-medium">{name}</span>
				{#if measure === undefined}
					<span class="loading loading-xs loading-dots text-muted"></span>
				{:else if measure === null}
					<span class="relative text-sm text-muted">n/a</span>
				{:else}
					<span class="relative text-sm text-muted tabular-nums">{formatKm(measure.distance)} km</span>
					<svg
						class="relative size-4 shrink-0"
						style="transform: rotate({measure.angle}deg)"
						viewBox="0 0 256 256"
						fill="currentColor"
						aria-hidden="true"
						><path
							d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"
						/></svg
					>
					<span
						class="relative w-12 text-right text-sm tabular-nums"
						style="font-weight:{300 + measure.ratio * 6}"
					>
						{measure.ratio.toFixed(0)}%
					</span>
				{/if}
			</li>
		{/if}
	{/each}
</ol>
