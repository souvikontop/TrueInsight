"use client";

import React, { useState } from "react";
import { Calendar, ArrowRight } from "lucide-react";

interface DateRangePickerProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

export default function DateRangePicker({
  onDateChange,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    if (startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  return (
    // 1. Make the main container a column on mobile, and a row on medium screens and up
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-lg flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
        <div className="flex items-center gap-2 w-full">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-gray-700 text-gray-200 rounded-md p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <ArrowRight className="w-5 h-5 text-gray-500 hidden sm:block" />
        <div className="flex items-center gap-2 w-full">
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-gray-700 text-gray-200 rounded-md p-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <button
        onClick={handleApply}
        disabled={!startDate || !endDate}
        // 2. Make the button full-width on mobile, and auto-width on larger screens
        className="px-4 py-2 bg-blue-600 text-sm text-white font-semibold rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed w-full md:w-auto"
      >
        Apply
      </button>
    </div>
  );
}
