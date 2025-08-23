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
    // Only call the parent function if both dates are selected
    if (startDate && endDate) {
      onDateChange(startDate, endDate);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-lg flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="w-5 h-5 text-gray-400" />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-700 text-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ArrowRight className="w-5 h-5 text-gray-500" />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-700 text-gray-200 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleApply}
        disabled={!startDate || !endDate}
        className="px-4 py-2 bg-blue-600 text-sm text-white font-semibold rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Apply
      </button>
    </div>
  );
}
