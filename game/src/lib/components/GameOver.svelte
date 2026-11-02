<script>
	import { scale, fly, fade } from 'svelte/transition';
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
		country,
		maxRounds
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
</script>

<div
	class="fixed inset-0 z-50 flex items-end justify-center bg-base-content/30 backdrop-blur-sm sm:items-center"
	transition:fade={{ duration: 200 }}
>
	<div
		class="w-full max-w-md rounded-t-box border border-base-300 bg-base-100 p-6 shadow-2xl sm:mx-4 sm:rounded-box sm:p-8"
		transition:scale={{ start: 0.9, duration: 300, easing: backOut }}
	>
		<div class="text-center">
			<p class="text-xs font-semibold tracking-widest text-muted uppercase">Game over</p>
			<div class="mt-3 text-7xl leading-none font-black text-primary tabular-nums">{$points}</div>
			<p class="mt-2 text-muted">points across {$maxRounds} rounds</p>
		</div>

		<div class="mt-8">
			{#if !hasName}
				<label class="block text-center text-sm font-semibold" for="player-name-input">
					Enter your initials for the leaderboard
				</label>
				<input
					id="player-name-input"
					type="text"
					placeholder="ABCD"
					class="input mt-3 input-xl w-full indent-[0.5em] text-center text-3xl font-black tracking-[0.5em] uppercase placeholder:text-subtle focus:border-primary focus:ring-4 focus:ring-primary/15 focus:outline-none"
					value={nameInput}
					oninput={handleInput}
					onkeydown={handleKeydown}
					maxlength="4"
					autocomplete="off"
					autofocus
				/>
				<p class="mt-2 text-center text-xs text-muted tabular-nums">{nameInput.length}/4 letters</p>

				<button
					onclick={handleNameSubmit}
					disabled={!isValid}
					class="btn mt-5 btn-block btn-lg btn-primary"
				>
					Continue
				</button>
			{:else if !submitted}
				<p class="text-center text-lg">
					Nice work, <span class="font-black tracking-[0.2em]">{$playerName}</span>!
				</p>

				<button
					onclick={submitScore}
					disabled={submitting}
					class="btn mt-5 btn-block btn-lg btn-primary"
				>
					{#if submitting}
						<span class="loading loading-spinner"></span>
						Submitting…
					{:else}
						Submit to leaderboard
					{/if}
				</button>

				{#if error}
					<div
						role="alert"
						class="alert mt-3 alert-soft alert-error"
						transition:fly={{ y: -10, duration: 200 }}
					>
						<span>{error}</span>
					</div>
				{/if}
			{:else}
				<div
					role="alert"
					class="alert alert-soft alert-success"
					transition:fly={{ y: -10, duration: 200 }}
				>
					<svg class="size-5" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"
						><path
							d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"
						/></svg
					>
					<span>Score submitted, {$playerName}!</span>
				</div>

				<a href="/leaderboard" class="btn mt-5 btn-block btn-lg btn-primary">View leaderboard</a>
			{/if}

			<button onclick={playAgain} class="btn mt-3 btn-block btn-ghost">Play again</button>
		</div>
	</div>
</div>
