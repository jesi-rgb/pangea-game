<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import MetaStuff from '$lib/components/MetaStuff.svelte';
	import Footer from '$lib/components/Footer.svelte';

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
			<svg
				viewBox="0 0 181 58"
				class="fill-base-content max-w-30"
				xmlns:serif="http://www.serif.com/"
				style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"
				><rect id="Artboard2" x="-26.425" y="-128.473" width="240" height="240" fill="none" />
				<path
					class="fill-base-content"
					d="M14.894,46.213c-0.411,-0.114 -0.813,-0.247 -1.206,-0.399l-2.1,8.034l-11.588,1.008l8.439,-32.781l10.417,-0.906c0.848,-0.074 1.682,-0.067 2.492,0.016l-2.478,9.612c-0.188,-0.02 -0.382,-0.022 -0.579,-0.005c-1.696,0.147 -3.109,1.672 -3.109,3.355c-0,1.34 0.896,2.424 2.118,2.735l-2.406,9.331Zm152.082,-37.564c-1.362,-0.522 -2.866,-0.754 -4.388,-0.622c-7.187,0.625 -12.759,6.798 -12.759,14.169c-0,6.126 4.501,10.637 10.756,11.233l-2.708,10.501l-145.775,13.106l2.792,-10.823c1.358,0.376 2.806,0.534 4.326,0.402c7.106,-0.618 12.799,-7.082 12.799,-13.932c0,-6.24 -4.722,-10.891 -10.671,-11.498l2.084,-8.079l145.774,-13.106l-2.23,8.649Zm-0,-0c0.661,0.253 1.29,0.575 1.871,0.957l0.403,-1.517l11.185,-0.973l-3.957,15.326l3.149,-0.274l-2.664,10.087l-13.567,1.18c-0.968,0.084 -1.908,0.08 -2.811,-0.006l2.511,-9.735c0.214,0.029 0.436,0.034 0.663,0.015c1.696,-0.148 3.109,-1.673 3.109,-3.355c0,-1.37 -0.937,-2.473 -2.2,-2.756l2.308,-8.949Zm-149.676,28.233l1.57,-6.085c1.427,0.151 2.53,1.322 2.53,2.809c0,1.683 -1.413,3.208 -3.109,3.355c-0.345,0.03 -0.679,0.001 -0.991,-0.079Zm147.368,-19.284l-1.572,6.096c-1.386,-0.188 -2.446,-1.342 -2.446,-2.799c0,-1.683 1.413,-3.208 3.109,-3.355c0.315,-0.028 0.62,-0.006 0.909,0.058Zm-103.69,24.744l11.144,-0.969l3.796,-14.151c0.323,-1.27 1.413,-2.286 2.745,-2.201c1.333,0.044 1.898,1.156 1.696,2.456l-3.553,13.489l14.374,-1.251l2.665,-10.086l-3.19,0.277l4.038,-15.333l-27.012,2.349l-6.703,25.42Zm30.498,2.956l23.136,1.593l2.422,-9.184l-5.531,-0.4c5.572,-1.967 9.69,-7.052 9.69,-12.62c0,-4.447 -2.261,-8.136 -5.733,-10.198l2.382,-9.14l-9.852,0.857l-1.777,6.804c-6.823,1.275 -12.113,7.303 -12.113,14.033c0,4.086 2.221,7.538 5.613,9.487l-5.815,-0.416l-2.422,9.184Zm16.151,-16.307c-1.696,0.148 -3.11,-1.131 -3.11,-2.814c0,-1.682 1.414,-3.207 3.11,-3.355c1.695,-0.147 3.109,1.132 3.109,2.814c-0,1.683 -1.414,3.208 -3.109,3.355Zm43.938,-19.364l-16.312,1.418c-7.43,0.647 -13.365,6.611 -13.365,13.621c-0,6.81 5.935,11.862 13.365,11.216l2.866,-0.249l1.535,-5.942l6.743,-0.587l5.168,-19.477Zm-15.464,9.317c1.695,-0.148 3.109,1.091 3.109,2.774c-0,1.722 -1.414,3.207 -3.109,3.355c-1.696,0.147 -3.069,-1.096 -3.069,-2.818c-0,-1.683 1.373,-3.164 3.069,-3.311Zm-89.78,24.673l13.567,-1.18l2.665,-10.087l-3.15,0.274l3.957,-15.326l-11.184,0.973l-0.404,1.517c-1.777,-1.167 -3.998,-1.775 -6.259,-1.579c-7.187,0.625 -12.759,6.798 -12.759,14.169c0,7.011 5.895,11.906 13.567,11.239Zm0.363,-9.726c-1.696,0.147 -3.109,-1.132 -3.109,-2.814c0,-1.683 1.413,-3.208 3.109,-3.355c1.696,-0.148 3.109,1.131 3.109,2.814c0,1.682 -1.413,3.207 -3.109,3.355Z"
				/></svg
			>
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
