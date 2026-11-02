<script>
	import { page } from '$app/state';
	import Logo from './Logo.svelte';

	/** @type {HTMLDialogElement} */
	let about;

	const credits = [
		{ before: 'Krafted on Unikraft by', label: 'Jesús Rascón', href: 'https://jesirgb.com' },
		{ before: 'Country shapes from', label: 'GeoJSON Maps', href: 'https://geojson-maps.ash.ms/' },
		{ before: 'Typeset in', label: 'Name Sans', href: 'https://www.arrowtype.com/name-sans' },
		{
			before: 'Logo in',
			label: 'Megazoid Italic',
			href: 'https://djr.com/notes/megazoid-italic-font-of-the-month'
		}
	];
</script>

<header class="flex items-center justify-between gap-4">
	<a href="/" class="text-base-content transition-opacity hover:opacity-80">
		<Logo class="h-9 w-auto md:h-11" />
	</a>

	<nav class="flex items-center gap-1">
		<a
			href="/leaderboard"
			class="btn btn-ghost btn-sm rounded-full"
			class:btn-active={page.url.pathname === '/leaderboard'}
		>
			<svg class="size-4" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"
				><path
					d="M232,64H208V56a16,16,0,0,0-16-16H64A16,16,0,0,0,48,56v8H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z"
				/></svg
			>
			Leaderboard
		</a>
		<button class="btn btn-ghost btn-sm rounded-full" onclick={() => about.showModal()}>
			About
		</button>
	</nav>
</header>

<dialog bind:this={about} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<h2 class="text-2xl font-bold">About Pangea</h2>
		<p class="mt-1 text-muted">
			Guess the country from its silhouette. Five tries per round, five rounds per game.
		</p>
		<ul class="mt-5 divide-y divide-base-300">
			{#each credits as credit (credit.href)}
				<li class="flex items-baseline justify-between gap-4 py-2.5">
					<span class="text-muted">{credit.before}</span>
					<a href={credit.href} class="link font-semibold link-primary" target="_blank"
						>{credit.label}</a
					>
				</li>
			{/each}
		</ul>
		<div class="modal-action">
			<form method="dialog"><button class="btn rounded-full">Close</button></form>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop"><button>close</button></form>
</dialog>
