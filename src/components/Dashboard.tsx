import { SocialPost } from "@/types";
import React from "react";
import KpiCard from "./KpiCard";
import PerformanceChart from "./PerformanceChart";
import EngagementMetrics from "./EngagementMetrics";
import PlatformAnalysis from "./PlatformAnalysis";
import PlatformDistributionChart from "./PlatformDistributionChart";
import { formatKpiMetric } from "@/lib/data-utils";
import {
  BarChart,
  Heart,
  MessageSquare,
  Repeat,
  Bookmark,
  Users,
  RotateCcw,
} from "lucide-react";

interface DashboardProps {
  data: SocialPost[];
  onReset: () => void;
}

export default function Dashboard({ data, onReset }: DashboardProps) {
  // Calculations remain the same
  const totalPosts = data.length;
  const totalReach = data.reduce(
    (acc, post) => acc + (post.reach as number),
    0
  );
  const totalLikes = data.reduce(
    (acc, post) => acc + (post.likes as number),
    0
  );
  const totalComments = data.reduce(
    (acc, post) => acc + (post.comments as number),
    0
  );
  const totalShares = data.reduce(
    (acc, post) => acc + (post.shares as number),
    0
  );
  const totalSaves = data.reduce(
    (acc, post) => acc + (post.saves as number),
    0
  );

  return (
    <div className="w-full max-w-6xl space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Performance Overview</h2>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-sm text-gray-200 rounded-md hover:bg-gray-600 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Analyze New File</span>
        </button>
      </div>

      {/* 2. Apply the new formatting function to each metric */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="Total Posts"
          metric={formatKpiMetric(totalPosts)}
          icon={<BarChart className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Reach"
          metric={formatKpiMetric(totalReach)}
          icon={<Users className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Likes"
          metric={formatKpiMetric(totalLikes)}
          icon={<Heart className="w-5 h-5" />}
        />
        {totalComments > 0 && (
          <KpiCard
            title="Total Comments"
            metric={formatKpiMetric(totalComments)}
            icon={<MessageSquare className="w-5 h-5" />}
          />
        )}
        {totalShares > 0 && (
          <KpiCard
            title="Total Shares"
            metric={formatKpiMetric(totalShares)}
            icon={<Repeat className="w-5 h-5" />}
          />
        )}
        {totalSaves > 0 && (
          <KpiCard
            title="Total Saves"
            metric={formatKpiMetric(totalSaves)}
            icon={<Bookmark className="w-5 h-5" />}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PerformanceChart data={data} />
        <PlatformDistributionChart data={data} />
      </div>

      <PlatformAnalysis data={data} />

      <div>
        <h2 className="text-2xl font-bold mb-6 text-white">
          Content Quality Metrics
        </h2>
        <EngagementMetrics data={data} />
      </div>
    </div>
  );
}
