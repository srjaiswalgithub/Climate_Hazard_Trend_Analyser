

import axios from 'axios';

// Open-Meteo API expects lat, lon, start_date, end_date
// For demo, map regions to lat/lon or parse if custom
const regionCoords = {
  California: { lat: 36.7783, lon: -119.4179 },
  Texas: { lat: 31.9686, lon: -99.9018 },
  'New York': { lat: 43.2994, lon: -74.2179 },
  Florida: { lat: 27.9944, lon: -81.7603 },
  India: { lat: 22.9734, lon: 78.6569 },
  Pakistan: { lat: 30.3753, lon: 69.3451 },
  Nepal: { lat: 28.3949, lon: 84.124 },
  Bangladesh: { lat: 23.685, lon: 90.3563 },
  Bhutan: { lat: 27.5142, lon: 90.4336 },
  'Sri Lanka': { lat: 7.8731, lon: 80.7718 },
};


async function fetchClimateData(region, startDate, endDate) {
  let lat, lon;

  if (region.startsWith('lat:')) {
    // custom region in format lat:xx,lon:yy
    const parts = region.split(',');
    lat = parseFloat(parts[0].split(':')[1]);
    lon = parseFloat(parts[1].split(':')[1]);
  } else if (regionCoords[region]) {
    lat = regionCoords[region].lat;
    lon = regionCoords[region].lon;
  } else {
    throw new Error('Unknown region');
  }

  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max&timezone=UTC`;

  const response = await axios.get(url);
  const daily = response.data.daily;

  if (!daily || !daily.time || !daily.temperature_2m_max) {
    throw new Error('Invalid data from API');
  }

  return daily.time.map((date, i) => ({
    date,
    maxTemp: daily.temperature_2m_max[i],
  }));
}


export default fetchClimateData;
