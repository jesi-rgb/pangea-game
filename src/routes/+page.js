import { country } from '../stores';

export async function load({ fetch, params }) {
	const countryPromise = await fetch('https://country-api-omega.vercel.app/random_country');
	const newCountry = await countryPromise.json();
	country.set(newCountry);
}
