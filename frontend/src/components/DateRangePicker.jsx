import React from 'react';

function DateRangePicker({ dateRange, setDateRange }) {
  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <label className="block font-medium mb-2">Select Date Range</label>
      <div className="flex gap-2">
        <input
          type="date"
          name="start"
          value={dateRange.start}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
        <input
          type="date"
          name="end"
          value={dateRange.end}
          onChange={handleChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
    </div>
  );
}

export default DateRangePicker;
