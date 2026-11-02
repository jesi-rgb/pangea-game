<script>
	import { names } from '../../stores.js';
	import { MAX_GUESSES } from '$lib/constants';
</script>

<div
	class="diagonal-fractions text-2xl leading-none text-primary tabular-nums transition-[font-weight]"
	style="font-weight:{200 + ($names.length / MAX_GUESSES) * 700}"
	aria-label="{$names.length} of {MAX_GUESSES} guesses used"
>
	<sup>{$names.length}</sup>⁄<sub>{MAX_GUESSES}</sub>
</div>
