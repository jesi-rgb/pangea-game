<script>
	import '../app.css';
	import SiteHeader from '$lib/components/SiteHeader.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 py-5 md:px-8 md:py-8">
	<SiteHeader />

	<main class="mt-6 flex-1 md:mt-10">
		{@render children?.()}
	</main>
</div>
