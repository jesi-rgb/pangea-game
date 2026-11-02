<script>
	import { scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { points, rounds, maxRounds } from '../../stores.js';
</script>

<div class="flex items-end justify-between gap-4">
	<div>
		<div class="text-xs font-semibold tracking-widest text-muted uppercase">Round</div>
		<div class="mt-2 flex items-center gap-1.5" aria-label="Round {$rounds} of {$maxRounds}">
			{#each { length: $maxRounds }, i}
				<span
					class="h-2 rounded-full transition-all duration-500 {i + 1 < $rounds
						? 'w-6 bg-primary'
						: i + 1 === $rounds
							? 'w-10 bg-primary'
							: 'w-6 bg-base-300'}"
				></span>
			{/each}
			<span class="ml-2 text-sm font-semibold tabular-nums">{$rounds}/{$maxRounds}</span>
		</div>
	</div>

	<div class="text-right">
		<div class="text-xs font-semibold tracking-widest text-muted uppercase">Score</div>
		{#key $points}
			<div
				class="origin-right text-3xl leading-none font-black tabular-nums"
				in:scale={{ start: 1.3, duration: 400, easing: backOut }}
			>
				{$points}
			</div>
		{/key}
	</div>
</div>
