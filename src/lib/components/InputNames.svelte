<script>
	import { names, distances } from '../../stores.js';
	$: console.log($distances);
</script>

<ol class="hidden xl:block h-1/3 list-decimal tabular-nums my-10">
	{#each $names as name, i}
		<li class=" flex justify-between w-full">
			<span class="">{name}</span>
			<span class="">{$distances[i]}</span>
		</li>
	{/each}
</ol>
