<script lang="ts">
	import { Combobox } from 'bits-ui';
	import { country, countryList, names, points, correctAnswer } from '../../stores';

	let answer = $derived($country.properties?.name_long);

	let choices = $derived($countryList.filter((x) => !$names.includes(x['name_long'])));

	let value = $state('');
	let searchValue = $state('');
	let inputRef: HTMLInputElement = $state(null);
	let inputKey = $state(0);

	// Get filtered choices as flat array
	const filteredChoices = $derived.by(() => {
		return searchValue === ''
			? choices
			: choices.filter((country) =>
					country.name_long.toLowerCase().includes(searchValue.toLowerCase())
				);
	});

	// Group countries by continent and filter by search
	const groupedChoices = $derived.by(() => {
		// Group by continent
		const grouped = filteredChoices.reduce((acc, country) => {
			const continent = country.continent || 'Other';
			if (!acc[continent]) {
				acc[continent] = [];
			}
			acc[continent].push(country);
			return acc;
		}, {});

		return grouped;
	});

	function enterName(newValue) {
		console.log(newValue);
		if (newValue) {
			// Find the country object from the value
			const selectedCountry = choices.find((c) => c.name_long === newValue);

			if (selectedCountry) {
				$names = [...$names, selectedCountry.name_long];

				if (selectedCountry.name_long === answer) {
					switch ($names.length) {
						case 1:
							points.update((p) => p + 500);
							break;
						case 2:
							points.update((p) => p + 300);
							break;
						case 3:
							points.update((p) => p + 200);
							break;
						default:
							points.update((p) => p + 100);
							break;
					}
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

	let isDisabled = $derived($names.length >= 5 || $correctAnswer);
</script>

<div class="w-10/12">
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
				<Combobox.Input
					clearOnDeselect
					bind:ref={inputRef}
					oninput={(e) => (searchValue = e.currentTarget.value)}
					onkeydown={handleKeydown}
					class="w-full rounded-lg border border-subtle px-4 py-2 pr-10 text-base focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
					placeholder="Enter a country name to search"
					aria-label="Search for a country"
				/>
				<Combobox.Trigger class="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-gray-400">
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
					class="z-50 max-h-96 w-(--bits-combobox-anchor-width)
					bg-muted-bg
					overflow-hidden rounded-lg border border-subtle shadow-lg"
					sideOffset={8}
				>
					<Combobox.Viewport class="p-1">
						{#each Object.entries(groupedChoices) as [continent, countries] (continent)}
							<Combobox.Group>
								<Combobox.GroupHeading
									class="px-3 py-2 text-xs font-semibold uppercase
								tracking-wider text-muted"
								>
									{continent}
								</Combobox.GroupHeading>
								{#each countries as country, i (i + country.name_long)}
									<Combobox.Item
										class="flex h-10 cursor-pointer select-none
									items-center rounded px-3 py-2 text-sm
									outline-none data-highlighted:bg-primary/10
									data-highlighted:text-primary"
										value={country.name_long}
										label={country.name_long}
									>
										{country.name_long}
									</Combobox.Item>
								{/each}
							</Combobox.Group>
						{:else}
							<span class="block px-3 py-2 text-sm text-gray-500">
								No countries found, try again.
							</span>
						{/each}
					</Combobox.Viewport>
				</Combobox.Content>
			</Combobox.Portal>
		</Combobox.Root>
	{/key}
</div>
