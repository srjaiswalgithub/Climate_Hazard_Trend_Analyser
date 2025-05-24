import axios from 'axios';

const API_BASE =  'http://localhost:5500/api';

export const fetchClimateData = async (region, dateRange) => {
  try {
    const response = await axios.post(`${API_BASE}/climate/analyze`, {
      region,
      startDate: dateRange.start,
      endDate: dateRange.end,
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching climate data:', err);
    return null;
  }
};
