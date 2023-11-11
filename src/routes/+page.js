export async function load({ fetch, params }) {
	const countryPromise = await fetch('https://country-api-omega.vercel.app/random_country');
	const country = countryPromise.json();
	return country;
}
