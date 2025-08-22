import { SocialPost } from "@/types";
import React from "react";
import KpiCard from "./KpiCard";
import PerformanceChart from "./PerformanceChart"; // 1. Import the new chart component
import {
  BarChart,
  Heart,
  MessageSquare,
  Repeat,
  Bookmark,
  Users,
} from "lucide-react";

interface DashboardProps {
  data: SocialPost[];
}

export default function Dashboard({ data }: DashboardProps) {
  // --- CALCULATIONS ---
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
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Performance Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KpiCard
          title="Total Posts"
          metric={totalPosts.toLocaleString()}
          icon={<BarChart className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Reach"
          metric={totalReach.toLocaleString()}
          icon={<Users className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Likes"
          metric={totalLikes.toLocaleString()}
          icon={<Heart className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Comments"
          metric={totalComments.toLocaleString()}
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Shares"
          metric={totalShares.toLocaleString()}
          icon={<Repeat className="w-5 h-5" />}
        />
        <KpiCard
          title="Total Saves"
          metric={totalSaves.toLocaleString()}
          icon={<Bookmark className="w-5 h-5" />}
        />
      </div>

      {/* 2. Render the chart component here */}
      <div className="mt-8">
        <PerformanceChart data={data} />
      </div>
    </div>
  );
}
