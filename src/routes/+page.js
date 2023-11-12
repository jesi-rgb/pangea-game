import { country, countryList, loadingCountry } from '../stores';

export async function load({ fetch, params }) {
  const countryPromise = await fetch('https://country-api-omega.vercel.app/random_country');
  const newCountry = await countryPromise.json();
  country.set(newCountry);

  const countryListPromise = await fetch('https://country-api-omega.vercel.app/country_names');
  const newCountryList = await countryListPromise.json();
  countryList.set(newCountryList);

  loadingCountry.set(false);
}
