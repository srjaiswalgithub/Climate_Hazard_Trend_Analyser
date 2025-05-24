
import climateRecordModel from '../models/ClimateRecord.js';
import fetchClimateData from '../services/dataFetcher.js';
import detectHeatwaves from '../services/hazardAnalyzer.js';

async function analyzeClimate(req, res) {
  try {
    const { region, startDate, endDate } = req.body;
    
    // Fetch data from API
    const rawData = await fetchClimateData(region, startDate, endDate);

    // Detect heatwaves
    const { threshold, result } = detectHeatwaves(rawData);

    // Save to DB (optional, overwrite existing data for simplicity)
    await climateRecordModel.deleteMany({ region, date: { $gte: startDate, $lte: endDate } });
    const records = result.map(r => ({
      region,
      date: new Date(r.date),
      maxTemp: r.maxTemp,
      isHeatwave: r.isHeatwave,
    }));
    await climateRecordModel.insertMany(records);

    // Prepare chart data aggregated by year
    const yearlyData = {};

    result.forEach(({ date, isHeatwave }) => {
      const year = new Date(date).getFullYear();
      if (!yearlyData[year]) yearlyData[year] = 0;
      if (isHeatwave) yearlyData[year]++;
    });

    // Sort years ascending
    const years = Object.keys(yearlyData).sort();

    const chartData = {
      years,
      values: years.map(y => yearlyData[y]),
    };

    // Summary text
    const firstYear = years[0];
    const lastYear = years[years.length - 1];
    const startValue = yearlyData[firstYear] || 1; // avoid div by zero
    const endValue = yearlyData[lastYear] || 0;
    const increasePercent = ((endValue - startValue) / startValue) * 100;

    const summary = `Heatwaves have increased by ${increasePercent.toFixed(1)}% since ${firstYear}.`;

    res.json({ region, chartData, summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error analyzing climate data', error: error.message });
  }
}

export default analyzeClimate;
