<script>
	import { playerName } from '../../stores.js';

	let nameInput = $state('');
	let isValid = $derived(nameInput.length === 4 && /^[A-Za-z]{4}$/.test(nameInput));

	function handleSubmit() {
		if (isValid) {
			playerName.set(nameInput.toUpperCase());
		}
	}

	function handleInput(e) {
		// Only allow letters, max 4 characters
		let value = e.target.value.replace(/[^A-Za-z]/g, '');
		nameInput = value.slice(0, 4).toUpperCase();
	}

	function handleKeydown(e) {
		if (e.key === 'Enter' && isValid) {
			handleSubmit();
		}
	}
</script>

<div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
	<div class="bg-base-100 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
		<h2 class="text-3xl font-bold mb-2 text-center">PANGEA</h2>
		<p class="text-center text-muted mb-6">Enter your player name</p>

		<div class="form-control w-full">
			<label class="label" for="player-name-input">
				<span class="label-text">4-Letter Name (Arcade Style)</span>
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

		<button onclick={handleSubmit} disabled={!isValid} class="btn btn-primary btn-lg w-full mt-4">
			START GAME
		</button>

		<p class="text-sm text-center text-muted mt-4">
			Guess 10 countries and compete for the high score!
		</p>
	</div>
</div>
