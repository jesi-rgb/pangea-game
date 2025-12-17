import { country, countryList, loadingCountry } from '../stores';
import { API_BASE_URL } from '$lib/constants';

// export async function load({ fetch, params }) {
//   const countryPromise = await fetch(`${API_BASE_URL}/random_country`);
//   const newCountry = await countryPromise.json();
//   country.set(newCountry);
//
//   const countryListPromise = await fetch(`${API_BASE_URL}/country_names`);
//   const newCountryList = await countryListPromise.json();
//   countryList.set(newCountryList.sort());
//
//   loadingCountry.set(false);
// }
