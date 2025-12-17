<script>
	import '../app.css';
	import Footer from '../lib/components/Footer.svelte';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<main class="my-5 md:my-20 w-[95%] md:max-w-5xl mx-auto">
	{@render children?.()}
</main>
