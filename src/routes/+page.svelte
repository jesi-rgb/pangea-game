<script>
	import Country from '../lib/components/Country.svelte';
	import NameForm from '../lib/components/NameForm.svelte';
	import Points from '../lib/components/Points.svelte';
	import { country, correctAnswer } from '../stores';
	import NextButton from '../lib/components/NextButton.svelte';
	import logo from '$lib/pangea.svg';

	import { MetaTags } from 'svelte-meta-tags';
	import Footer from '../lib/components/Footer.svelte';

	$: countryData = $country;
</script>

<MetaTags
	title="PANGEA - The country guessing game"
	description="Guess the country based on its shape"
	canonical="https://pangea-game.vercel.app"
	additionalLinkTags={[
		{ rel: 'icon', href: '/favicon-32x32.png' },
		{ rel: 'icon', href: '/favicon-16x16.png' },
		{ rel: 'apple-touch-icon', href: 'apple-touch-icon.png' },
		{ rel: 'manifest', href: '/site.webmanifest' }
	]}
	additionalMetaTags={[{ property: 'theme-color', content: '#fff' }]}
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
		<div class="mb-3 mx-auto xl:mx-0">
			<img src={logo} width="200" alt="PANGEA logo" />
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
	<Footer />
</main>
