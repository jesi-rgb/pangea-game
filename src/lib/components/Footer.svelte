<!-- @migration-task Error while migrating Svelte code: Event attribute must be a JavaScript expression, not a string
https://svelte.dev/e/attribute_invalid_event_handler -->
<footer class="mt-20 flex gap-2">
	<a href="/leaderboard" class="btn btn-outline btn-sm">Leaderboard</a>
	<button onclick={about.showModal()} class="btn btn-outline btn-sm">About</button>

	<dialog id="about" class="modal">
		<div class="modal-box">
			<div class="list-disc flex flex-col space-y-5">
				<li>
					Crafted with care by <a
						href="https://jesirgb.com"
						class="font-semibold underline text-primary">Jesús Rascón</a
					>.
				</li>
				<li>
					<a href="https://geojson-maps.ash.ms/" class="underline font-semibold text-primary"
						>Data source</a
					>.
				</li>
				<li>
					Typeset in
					<a href="https://www.arrowtype.com/name-sans" class="font-semibold underline text-primary"
						>Name Sans</a
					>.
				</li>
				<li>
					Logo in
					<a
						class="font-semibold underline text-primary"
						href="https://djr.com/notes/megazoid-italic-font-of-the-month">Megazoid Italic</a
					>.
				</li>
			</div>
		</div>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</footer>
