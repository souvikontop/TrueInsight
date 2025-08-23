import React from "react";

export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-10">
      <div
        className="w-12 h-12 rounded-full animate-spin border-4 border-solid border-blue-500 border-t-transparent"
        role="status"
        aria-live="polite"
      ></div>
      <p className="text-gray-400">Processing data...</p>
    </div>
  );
}
