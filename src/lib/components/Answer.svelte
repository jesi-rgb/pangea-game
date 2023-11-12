<script>
	import { fly, scale } from 'svelte/transition';
	import { backInOut, backOut, quintIn, quintInOut, quintOut } from 'svelte/easing';
	import { correctAnswer, names, country } from '../../stores.js';
	import NumTries from './NumTries.svelte';

	$: answer = $country['properties']['name_long'];

	$: if ($names[$names.length - 1] == answer) {
		$correctAnswer = true;
	}
</script>

<div class="mt-10 mb-5">
	{#if $correctAnswer}
		<div class="flex justify-between">
			<h1 class="text-3xl font-bold text-primary">{answer}</h1>
			<svg
				in:scale={{ duration: 300, easing: backInOut }}
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				class="fill-primary"
				viewBox="0 0 256 256"
				><path
					d="M237.66,85.26l-128.4,128.4a8,8,0,0,1-11.32,0l-71.6-72a8,8,0,0,1,0-11.31l24-24a8,8,0,0,1,11.32,0l36.68,35.32a8,8,0,0,0,11.32,0l92.68-91.32a8,8,0,0,1,11.32,0l24,23.6A8,8,0,0,1,237.66,85.26Z"
					opacity="0.2"
				/><path
					d="M243.28,68.24l-24-23.56a16,16,0,0,0-22.58,0L104,136h0l-.11-.11L67.25,100.62a16,16,0,0,0-22.57.06l-24,24a16,16,0,0,0,0,22.61l71.62,72a16,16,0,0,0,22.63,0L243.33,90.91A16,16,0,0,0,243.28,68.24ZM103.62,208,32,136l24-24,.11.11,36.64,35.27a16,16,0,0,0,22.52,0L208.06,56,232,79.6Z"
				/></svg
			>
		</div>
	{:else if $names.length >= 5}
		<div class="flex justify-between">
			<a
				href="https://www.google.com/maps?q={$country.properties.name_long}+{$country.properties
					.adm0_a3}"
			>
				<h1
					in:fly={{ x: -50, duration: 1000, delay: 300, easing: quintOut }}
					class="text-3xl font-bold text-error"
				>
					{answer}
				</h1>
			</a>
			<svg
				in:scale={{ duration: 300, easing: backInOut }}
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				class="fill-error"
				viewBox="0 0 256 256"
				><path
					d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"
				/></svg
			>
		</div>
	{:else if $names.length > 0}
		<div class="flex justify-between">
			{#key $names}
				<h1 in:fly={{ x: -20, duration: 200, easing: backOut }} class="text-3xl font-bold">
					{$names[$names.length - 1]}
				</h1>
			{/key}

			<svg
				in:scale={{ duration: 300, easing: backInOut }}
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				class="fill-error"
				viewBox="0 0 256 256"
				><path
					d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"
				/></svg
			>
		</div>
	{:else}
		<div class="opacity-0 text-3xl">YEA</div>
	{/if}
</div>
