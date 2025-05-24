import React, { useState, useEffect } from 'react';
import RegionSelector from '../components/RegionSelector';
import DateRangePicker from '../components/DateRangePicker';
import SummaryBox from '../components/SummaryBox';
import TrendChart from '../components/TrendChart';
import MapView from '../components/MapView';
import { fetchClimateData } from '../services/api';

function Home() {
  const [region, setRegion] = useState('California');
  const [dateRange, setDateRange] = useState({ start: '1990-01-01', end: '2020-12-31' });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([23.5, 83]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchClimateData(region, dateRange);
      setData(result);
      setLoading(false);
    };

    loadData();
  }, [region, dateRange]);

  useEffect(() => {
    if (region.startsWith('lat:')) {
      const parts = region.split(',');
      const lat = parseFloat(parts[0].split(':')[1]);
      const lon = parseFloat(parts[1].split(':')[1]);
      setMapCenter([lat, lon]);
    } else {
      const predefined = {
        California: [36.7783, -119.4179],
        Texas: [31.9686, -99.9018],
        'New York': [43.2994, -74.2179],
        Florida: [27.9944, -81.7603],
        India: [22.9734, 78.6569],
        Pakistan: [30.3753, 69.3451],
        Nepal: [28.3949, 84.124],
        Bangladesh: [23.685, 90.3563],
        Bhutan: [27.5142, 90.4336],
        'Sri Lanka': [7.8731, 80.7718],
      };
      if (predefined[region]) {
        setMapCenter(predefined[region]);
      }
    }
  }, [region]);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Climate Hazard Trend Analyzer</h1>
      <h2 className="text-center text-sm text-gray-500">
        Viewing region: <span className="font-semibold">{region}</span>
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <RegionSelector region={region} setRegion={setRegion} />
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <MapView setRegion={setRegion} center={mapCenter} />

      {loading && <p className="text-center text-gray-500">Loading data...</p>}

      {data && (
        <>
          <SummaryBox data={data} />
          <TrendChart chartData={data.chartData} />
        </>
      )}
    </div>
  );
}

export default Home;