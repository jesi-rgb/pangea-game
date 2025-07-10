export async function fetchCountry() {
  const countryPromise = await fetch('https://pangea-countries-production.up.railway.app/random_country');
  const country = countryPromise.json();
  return country;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function toDegrees(radians) {
  return (radians * 180) / Math.PI;
}

// from https://stackoverflow.com/questions/365826/calculate-distance-between-2-gps-coordinates
export function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
  lat1 = parseFloat(lat1);
  lat2 = parseFloat(lat2);
  lon1 = parseFloat(lon1);
  lon2 = parseFloat(lon2);

  let earthRadiusKm = 6371;

  let dLat = toRadians(lat2 - lat1);
  let dLon = toRadians(lon2 - lon1);

  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

// from https://stackoverflow.com/questions/46590154/calculate-bearing-between-2-points-with-javascript
export function bearing(startLat, startLng, destLat, destLng) {
  startLat = toRadians(startLat);
  startLng = toRadians(startLng);
  destLat = toRadians(destLat);
  destLng = toRadians(destLng);

  let y = Math.sin(destLng - startLng) * Math.cos(destLat);
  let x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);

  let brng = Math.atan2(y, x);

  brng = toDegrees(brng);
  return -90 + ((brng + 180) % 360);
}
