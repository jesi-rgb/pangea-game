<script>
	import { names, distances } from '../../stores.js';
</script>

<ol
	class="hidden xl:block h-1/3 list-decimal text-xl tabular-nums my-10 [&_li:last-child]:border-0"
>
	{#each $names as name, i}
		<li class="flex justify-between w-full border-b py-2">
			<div>
				<span class="">{name}</span>
			</div>
			<span class="">{$distances[i]}</span>
		</li>
	{/each}
</ol>
