<script>
	import { scale, fly } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import {
		points,
		playerName,
		gameEnded,
		rounds,
		names,
		distances,
		correctAnswer,
		loadingCountry,
		country
	} from '../../stores.js';
	import { fetchCountry } from '$lib/utils';

	let submitting = $state(false);
	let submitted = $state(false);
	let error = $state('');
	let nameInput = $state('');
	let isValid = $derived(nameInput.length === 4 && /^[A-Za-z]{4}$/.test(nameInput));
	let hasName = $derived($playerName !== '');

	function handleInput(e) {
		// Only allow letters, max 4 characters
		let value = e.target.value.replace(/[^A-Za-z]/g, '');
		nameInput = value.slice(0, 4).toUpperCase();
	}

	function handleKeydown(e) {
		if (e.key === 'Enter' && isValid) {
			handleNameSubmit();
		}
	}

	function handleNameSubmit() {
		if (isValid) {
			playerName.set(nameInput.toUpperCase());
		}
	}

	async function submitScore() {
		submitting = true;
		error = '';

		try {
			const response = await fetch('/api/scores', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					player_name: $playerName,
					score: $points
				})
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error || 'Failed to submit score');
			}

			submitted = true;
		} catch (err) {
			error = err.message || 'Failed to submit score. Please try again.';
			console.error('Error submitting score:', err);
		} finally {
			submitting = false;
		}
	}

	async function playAgain() {
		// Reset all game state
		rounds.set(1);
		points.set(0);
		names.set([]);
		distances.set([]);
		correctAnswer.set(false);
		gameEnded.set(false);
		loadingCountry.set(true);
		playerName.set('');

		// Load new country
		const newCountry = await fetchCountry();
		country.set(newCountry);
		loadingCountry.set(false);
	}

	function viewLeaderboard() {
		window.location.href = '/leaderboard';
	}
</script>

<div
	class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
	transition:fly={{ y: 20, duration: 300 }}
>
	<div
		class="bg-base-100 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
		transition:scale={{ duration: 300, easing: backOut }}
	>
		<div class="text-center">
			<h2 class="text-4xl font-bold mb-2">GAME OVER!</h2>

			<div class="bg-primary/10 rounded-xl p-6 mb-6">
				<div class="text-6xl font-bold text-primary mb-2">{$points}</div>
				<div class="text-lg text-muted">Final Score</div>
			</div>

			{#if !hasName}
				<!-- Name entry form -->
				<p class="text-muted mb-4">Enter your name to submit your score!</p>

				<div class="form-control w-full mb-4">
					<label class="label" for="player-name-input">
						<span class="label-text">4-Letter Name</span>
					</label>
					<input
						id="player-name-input"
						type="text"
						placeholder="ABCD"
						class="input input-bordered input-primary input-lg w-full text-center text-2xl font-bold tracking-widest"
						value={nameInput}
						oninput={handleInput}
						onkeydown={handleKeydown}
						maxlength="4"
						autofocus
					/>
					<label class="label">
						<span class="label-text-alt">{nameInput.length}/4 characters {isValid ? '✓' : ''}</span>
					</label>
				</div>

				<button
					onclick={handleNameSubmit}
					disabled={!isValid}
					class="btn btn-primary btn-lg w-full mb-3"
				>
					CONTINUE
				</button>

				<button onclick={playAgain} class="btn btn-outline w-full">PLAY AGAIN</button>
			{:else if !submitted}
				<p class="text-muted mb-6">Nice work, {$playerName}!</p>

				<button
					onclick={submitScore}
					disabled={submitting}
					class="btn btn-primary btn-lg w-full mb-3"
				>
					{#if submitting}
						<span class="loading loading-spinner"></span>
						Submitting...
					{:else}
						SUBMIT TO LEADERBOARD
					{/if}
				</button>

				{#if error}
					<div class="alert alert-error mb-3" transition:fly={{ y: -10, duration: 200 }}>
						<span>{error}</span>
					</div>
				{/if}

				<button onclick={playAgain} class="btn btn-outline w-full">PLAY AGAIN</button>
			{:else}
				<p class="text-muted mb-6">Nice work, {$playerName}!</p>

				<div class="alert alert-success mb-3" transition:fly={{ y: -10, duration: 200 }}>
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
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Score submitted successfully!</span>
				</div>

				<button onclick={viewLeaderboard} class="btn btn-primary btn-lg w-full mb-3">
					VIEW LEADERBOARD
				</button>

				<button onclick={playAgain} class="btn btn-outline w-full">PLAY AGAIN</button>
			{/if}
		</div>
	</div>
</div>
