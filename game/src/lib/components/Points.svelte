<script>
	import { points, rounds, maxRounds } from '../../stores.js';
</script>

<div class="tabular-nums font-bold text-xl">
	{$points} <span class="text-muted">points</span> ·
	<span class="text-muted">Round</span>
	{$rounds}/{$maxRounds}
</div>
