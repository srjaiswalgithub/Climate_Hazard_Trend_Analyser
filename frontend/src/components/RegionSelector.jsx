import React from 'react';

function RegionSelector({ region, setRegion }) {
  const regions = [
    'California', 'Texas', 'New York', 'Florida',
    'India', 'Pakistan', 'Nepal', 'Bangladesh', 'Bhutan', 'Sri Lanka',
    'Custom'
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <label className="block font-medium mb-2">Select Region</label>
      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="w-full border border-gray-300 rounded p-2"
      >
        {regions.map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RegionSelector;