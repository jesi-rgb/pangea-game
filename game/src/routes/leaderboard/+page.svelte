<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import MetaStuff from '$lib/components/MetaStuff.svelte';

	let entries = $state([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			const response = await fetch('/api/leaderboard?limit=100');

			if (!response.ok) {
				throw new Error('Failed to fetch leaderboard');
			}

			const data = await response.json();
			entries = data.entries;
		} catch (err) {
			error = err.message || 'Failed to load leaderboard';
			console.error('Error fetching leaderboard:', err);
		} finally {
			loading = false;
		}
	});

	function formatDate(dateString) {
		return new Date(dateString).toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	const medal = ['bg-accent text-accent-content', 'bg-base-300', 'bg-orange-300/60'];
</script>

<MetaStuff />

<div class="mx-auto max-w-3xl">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h1 class="text-4xl font-black tracking-tight">Leaderboard</h1>
			<p class="mt-1 text-muted">The best explorers so far.</p>
		</div>
		<a href="/" class="btn rounded-full btn-primary">Play a game</a>
	</div>

	<div class="mt-8">
		{#if loading}
			<div class="grid min-h-80 place-items-center">
				<span class="loading loading-lg loading-dots text-primary"></span>
			</div>
		{:else if error}
			<div role="alert" class="alert alert-error alert-soft">
				<span>{error}</span>
			</div>
		{:else if entries.length === 0}
			<div class="rounded-box border border-dashed border-base-300 py-16 text-center">
				<p class="text-2xl font-bold">No scores yet</p>
				<p class="mt-1 text-muted">Be the first to play and set a high score.</p>
				<a href="/" class="btn mt-6 rounded-full btn-primary">Start playing</a>
			</div>
		{:else}
			<ol class="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
				{#each entries as entry, index (entry.id)}
					<li
						class="flex items-center gap-4 border-base-300 px-4 py-3 not-last:border-b md:px-6"
						in:fly={{ y: 12, duration: 400, delay: Math.min(index, 15) * 30, easing: quintOut }}
					>
						<span
							class="grid size-9 shrink-0 place-items-center rounded-full text-sm font-bold tabular-nums {medal[
								index
							] ?? 'text-muted'}"
						>
							{index + 1}
						</span>
						<span class="flex-1 text-lg font-bold tracking-[0.2em]">{entry.player_name}</span>
						<span class="hidden text-sm text-muted tabular-nums sm:block"
							>{formatDate(entry.created_at)}</span
						>
						<span class="w-20 text-right text-xl font-black text-primary tabular-nums"
							>{entry.score}</span
						>
					</li>
				{/each}
			</ol>

			<p class="mt-4 text-center text-sm text-muted">
				{entries.length}
				{entries.length === 1 ? 'entry' : 'entries'}
			</p>
		{/if}
	</div>
</div>
