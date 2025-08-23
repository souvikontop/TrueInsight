"use client";

import { SocialPost } from "@/types";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface ChartProps {
  data: SocialPost[];
}

const COLORS = [
  "#3b82f6",
  "#84cc16",
  "#ef4444",
  "#f97316",
  "#8b5cf6",
  "#14b8a6",
];

export default function PlatformDistributionChart({ data }: ChartProps) {
  const platformCounts = data.reduce((acc, post) => {
    const platform = post.platform;
    acc[platform] = (acc[platform] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.keys(platformCounts).map((platform) => ({
    name: platform,
    value: platformCounts[platform],
  }));

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full h-96">
      <h3 className="text-lg font-semibold text-white mb-4">
        Post Distribution by Platform
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={110}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name} ${((percent || 0) * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          {/* --- THIS IS THE ONLY LINE THAT CHANGED --- */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937", // A dark background for the box
              borderColor: "#4b5563", // A matching border color
            }}
            itemStyle={{ color: "#e5e7eb" }} // A light gray color for the text
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
