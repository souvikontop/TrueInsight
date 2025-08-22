import React from "react";

// Define the props the component will accept
interface KpiCardProps {
  title: string;
  metric: string; // We use string to allow for formatted numbers (e.g., "1,234")
  icon: React.ReactNode; // We can pass an icon component as a prop
}

export default function KpiCard({ title, metric, icon }: KpiCardProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="text-blue-400">{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-50">{metric}</p>
      </div>
    </div>
  );
}
