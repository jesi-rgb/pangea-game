<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import logo from '$lib/pangea.svg';
	import { LEADERBOARD_API_URL } from '$lib/constants';
	import MetaStuff from '$lib/components/MetaStuff.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let entries = $state([]);
	let loading = $state(true);
	let error = $state('');

	onMount(async () => {
		try {
			const response = await fetch(`${LEADERBOARD_API_URL}/api/leaderboard?limit=100`);

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
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		});
	}

	function getRankIcon(rank) {
		if (rank === 1) return '🥇';
		if (rank === 2) return '🥈';
		if (rank === 3) return '🥉';
		return rank;
	}
</script>

<MetaStuff />

<main class="w-fit mx-auto xl:w-full max-w-5xl px-4">
	<div class="flex justify-between items-center mb-6">
		<div>
			<img src={logo} width="200" class="mx-auto xl:mx-0" alt="PANGEA logo" />
			<h1 class="text-3xl font-bold mt-2">Leaderboard</h1>
		</div>
		<a href="/" class="btn btn-primary">PLAY GAME</a>
	</div>

	{#if loading}
		<div class="flex justify-center items-center min-h-[400px]">
			<span class="loading loading-spinner loading-lg text-primary"></span>
		</div>
	{:else if error}
		<div class="alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{error}</span>
		</div>
	{:else if entries.length === 0}
		<div class="text-center py-12">
			<p class="text-2xl text-muted mb-4">No scores yet!</p>
			<p class="text-muted">Be the first to play and set a high score.</p>
			<a href="/" class="btn btn-primary mt-6">START PLAYING</a>
		</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th class="text-center">Rank</th>
						<th>Player</th>
						<th class="text-right">Score</th>
						<th class="text-right">Date</th>
					</tr>
				</thead>
				<tbody>
					{#each entries as entry, index (entry.id)}
						<tr transition:fly={{ y: 20, duration: 300, delay: index * 30, easing: quintOut }}>
							<td class="text-center font-bold text-xl">{getRankIcon(index + 1)}</td>
							<td class="font-bold text-lg tracking-widest">{entry.player_name}</td>
							<td class="text-right font-bold text-primary tabular-nums">{entry.score}</td>
							<td class="text-right text-muted tabular-nums">{formatDate(entry.created_at)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="text-center mt-6 text-muted">
			<p>Total entries: {entries.length}</p>
		</div>
	{/if}

	<Footer />
</main>
