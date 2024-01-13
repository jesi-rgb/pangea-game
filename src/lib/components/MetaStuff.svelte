<script>
	import { MetaTags } from 'svelte-meta-tags';
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
