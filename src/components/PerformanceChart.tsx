"use client";

import { SocialPost } from "@/types";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface PerformanceChartProps {
  data: SocialPost[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full h-96">
      <h3 className="text-lg font-semibold text-white mb-4">
        Performance Over Time
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip
            cursor={{ fill: "rgba(107, 114, 128, 0.2)" }}
            contentStyle={{
              backgroundColor: "#1f2937", // bg-gray-800
              borderColor: "#4b5563", // border-gray-600
            }}
          />
          <Legend />
          <Bar dataKey="reach" fill="#3b82f6" name="Reach" />
          <Bar dataKey="likes" fill="#84cc16" name="Likes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
