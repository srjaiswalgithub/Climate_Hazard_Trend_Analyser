import React from 'react';

function SummaryBox({ data }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Summary</h2>
      <p>{data.summary || 'Heatwaves have increased by 40% in this region since 1990.'}</p>
    </div>
  );
}

export default SummaryBox;