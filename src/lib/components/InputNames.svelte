<script>
	import { names } from '../../stores.js';
</script>

<ol class="hidden xl:block h-1/3 list-decimal tabular-nums my-10">
	{#each $names as name}
		<li class="list-item">{name}</li>
	{/each}
</ol>
