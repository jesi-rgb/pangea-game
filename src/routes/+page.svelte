<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';
	import Points from '../lib/components/Points.svelte';
	import { country } from '../stores';
	import NextButton from '../lib/components/NextButton.svelte';
	import logo from '$lib/pangea.svg';

	import { MetaTags } from 'svelte-meta-tags';

	$: countryData = $country;
</script>

<head>
	<title>PANGEA – The country guessing game</title>

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta name="msapplication-TileColor" content="#da532c" />
	<meta name="theme-color" content="#ffffff" />
</head>

<MetaTags
	title="PANGEA - The country guessing game"
	description="Guess the country based on its shape"
	canonical="https://pangea-game.vercel.app"
	keywords={[
		'worldle',
		'country',
		'guess',
		'game',
		'guessing game',
		'country guessing game',
		'pangea',
		'pangea game'
	]}
	openGraph={{
		url: 'https://pangea-game.vercel.app',
		title: 'PANGEA',
		description: 'The country guessing game',
		images: [
			{
				url: 'https://pangea-game.vercel.app/thumb.png',
				width: 1200,
				height: 600,
				alt: 'PANGEA'
			}
		]
	}}
	twitter={{
		handle: '@jesi-rgb',
		cardType: 'summary_large_image',
		title: 'PANGEA',
		description: 'The country guessing game',
		image: 'https://pangea-game.vercel.app/thumb.png',
		imageAlt: 'PANGEA'
	}}
/>

<main class="w-fit mx-auto xl:w-full">
	<div class="flex justify-between">
		<div class="mb-10 mx-auto xl:mx-0">
			<div class="font-bold text-5xl name"><img src={logo} width="200" alt="PANGEA logo" /></div>
			<Points />
		</div>
		<div class="hidden xl:block">
			<NextButton />
		</div>
	</div>
	<div class="flex flex-col xl:flex-row justify-between">
		<Country country={countryData} />
		<NameForm />
	</div>

	<div class="mt-10 justify-end flex xl:hidden">
		<NextButton />
	</div>
</main>

<style>
	.name {
		font-feature-settings: 'ss03';
		font-variation-settings: 'opsz' 72, 'ital' 0.8, 'wght' 969;
	}
</style>
