import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function TrendChart({ chartData }) {
  const data = {
    labels: chartData?.years || ['1990', '2000', '2010', '2020'],
    datasets: [
      {
        label: 'Heatwave Days',
        data: chartData?.values || [5, 10, 15, 20],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Heatwave Trend Over Time' },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Line data={data} options={options} />
    </div>
  );
}

export default TrendChart;