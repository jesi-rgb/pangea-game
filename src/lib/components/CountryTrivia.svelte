<script>
	import { fly } from 'svelte/transition';
	import { backOut, quintOut } from 'svelte/easing';
	import { country } from '../../stores';
</script>

<div class="flex flex-col" in:fly={{ x: -20, duration: 1000, delay: 600, easing: quintOut }}>
	<div>
		Code: <span class="font-bold">{$country.properties.adm0_a3}</span>
	</div>
	<div>
		Coordinates: <span class="font-bold"
			>{$country.properties.label_x}, {$country.properties.label_y}</span
		>
	</div>
	<div>
		Population estimate: <span class="font-bold"
			>{$country.properties.pop_est.toLocaleString()}</span
		>
	</div>
	<div>
		Region: <span class="font-bold">{$country.properties.region_un}</span>
	</div>
	<div>
		Subregion: <span class="font-bold">{$country.properties.subregion}</span>
	</div>
	<div>
		View on Google Maps: <a
			class="underline text-primary"
			target="_blank"
			href="https://www.google.com/maps?q={$country.properties.name_long}+{$country.properties
				.adm0_a3}"><span>{$country.properties.name}</span></a
		>
	</div>
</div>
