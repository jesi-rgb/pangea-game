<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { get } from 'svelte/store';
	import { country, countryList, names, distances, points, correctAnswer } from '../../stores';
	import { MAX_GUESSES, MISS_PENALTY } from '$lib/constants';
	import { measureGuess, pointsForGuess } from '$lib/utils';

	let { disabled = false }: { disabled?: boolean } = $props();

	let answer = $derived($country.properties?.name_long);

	let choices = $derived($countryList.filter((x) => !$names.includes(x['name_long'])));

	let value = $state('');
	let searchValue = $state('');
	let inputRef: HTMLInputElement = $state(null);
	let inputKey = $state(0);

	const filteredChoices = $derived.by(() => {
		return searchValue === ''
			? choices
			: choices.filter((country) =>
					country.name_long.toLowerCase().includes(searchValue.toLowerCase())
				);
	});

	const groupedChoices = $derived.by(() => {
		return filteredChoices.reduce((acc, country) => {
			const continent = country.continent || 'Other';
			(acc[continent] ??= []).push(country);
			return acc;
		}, {});
	});

	async function recordDistance(index: number, guess: string) {
		const target = get(country);
		const measure =
			guess === answer ? { distance: 0, ratio: 100, angle: 0 } : await measureGuess(guess, target);
		// The round may have advanced while we were fetching.
		if (get(country) !== target) return;
		distances.update((d) => {
			const next = [...d];
			next[index] = measure;
			return next;
		});
	}

	function enterName(newValue) {
		if (newValue) {
			const selectedCountry = choices.find((c) => c.name_long === newValue);

			if (selectedCountry) {
				$names = [...$names, selectedCountry.name_long];
				recordDistance($names.length - 1, selectedCountry.name_long);

				if (selectedCountry.name_long === answer) {
					points.update((p) => p + pointsForGuess($names.length));
				} else if ($names.length >= MAX_GUESSES) {
					points.update((p) => Math.max(0, p - MISS_PENALTY));
				}
			}
		}
		value = '';
		searchValue = '';
		inputKey++; // Force remount of input to clear it
		setTimeout(() => {
			if (inputRef) {
				inputRef.focus();
			}
		}, 0);
	}

	function handleKeydown(e) {
		if (e.key === 'Enter' && searchValue && filteredChoices.length > 0) {
			// Select the first filtered item
			value = filteredChoices[0].name_long;
			enterName(value);
		}
		inputRef.focus();
	}

	let isDisabled = $derived(disabled || $names.length >= MAX_GUESSES || $correctAnswer);
</script>

<div>
	{#key inputKey}
		<Combobox.Root
			type="single"
			bind:value
			onValueChange={enterName}
			onOpenChangeComplete={(o) => {
				if (!o) {
					searchValue = '';
					value = '';
				}
			}}
			disabled={isDisabled}
		>
			<div class="relative">
				<svg
					class="pointer-events-none absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2 text-muted"
					viewBox="0 0 256 256"
					fill="currentColor"
					aria-hidden="true"
					><path
						d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
					/></svg
				>
				<Combobox.Input
					clearOnDeselect
					bind:ref={inputRef}
					oninput={(e) => (searchValue = e.currentTarget.value)}
					onkeydown={handleKeydown}
					class="input input-lg w-full rounded-field pr-11 pl-12 text-base focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15"
					placeholder="Type a country…"
					aria-label="Search for a country"
				/>
				<Combobox.Trigger
					class="absolute top-1/2 right-3 size-6 -translate-y-1/2 text-muted hover:text-base-content"
					aria-label="Show all countries"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
						<path
							fill-rule="evenodd"
							d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
							clip-rule="evenodd"
						/>
					</svg>
				</Combobox.Trigger>
			</div>
			<Combobox.Portal>
				<Combobox.Content
					class="z-50 max-h-80 w-(--bits-combobox-anchor-width) overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-xl"
					sideOffset={8}
				>
					<Combobox.Viewport class="p-1.5">
						{#each Object.entries(groupedChoices) as [continent, countries] (continent)}
							<Combobox.Group>
								<Combobox.GroupHeading
									class="px-3 pt-3 pb-1 text-xs font-semibold tracking-widest text-muted uppercase"
								>
									{continent}
								</Combobox.GroupHeading>
								{#each countries as country, i (i + country.name_long)}
									<Combobox.Item
										class="flex h-10 cursor-pointer items-center rounded-field px-3 text-sm outline-none select-none data-highlighted:bg-primary data-highlighted:text-primary-content"
										value={country.name_long}
										label={country.name_long}
									>
										{country.name_long}
									</Combobox.Item>
								{/each}
							</Combobox.Group>
						{:else}
							<span class="block px-3 py-2 text-sm text-muted">No countries found, try again.</span>
						{/each}
					</Combobox.Viewport>
				</Combobox.Content>
			</Combobox.Portal>
		</Combobox.Root>
	{/key}
</div>
