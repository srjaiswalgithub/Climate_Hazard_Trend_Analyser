// server/services/hazardAnalyzer.js

import percentile from '../utils/percentile.js';

function detectHeatwaves(data) {
  // data: array of { date, maxTemp }
  const temps = data.map(d => d.maxTemp);
  const threshold = percentile(temps, 95);

  // Mark days as heatwave if maxTemp > threshold for 3 consecutive days
  const result = data.map(d => ({ ...d, isHeatwave: false }));

  for (let i = 0; i < data.length - 2; i++) {
    if (
      data[i].maxTemp > threshold &&
      data[i + 1].maxTemp > threshold &&
      data[i + 2].maxTemp > threshold
    ) {
      result[i].isHeatwave = true;
      result[i + 1].isHeatwave = true;
      result[i + 2].isHeatwave = true;
    }
  }
  return { threshold, result };
}


export default detectHeatwaves;