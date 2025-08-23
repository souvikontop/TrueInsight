import { SocialPost } from "@/types";
import React from "react";
import KpiCard from "./KpiCard";
// 1. Import new icons
import { Percent, Star, MessageCircle, Share2 } from "lucide-react";

interface EngagementMetricsProps {
  data: SocialPost[];
}

export default function EngagementMetrics({ data }: EngagementMetricsProps) {
  // --- CALCULATIONS ---
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
  const totalReach = data.reduce(
    (acc, post) => acc + (post.reach as number),
    0
  );

  const totalEngagements =
    totalLikes + totalComments + totalShares + totalSaves;

  const engagementRate =
    totalReach > 0 ? (totalEngagements / totalReach) * 100 : 0;
  const saveToLikeRatio = totalLikes > 0 ? (totalSaves / totalLikes) * 100 : 0;

  // 2. Add the two new ratio calculations
  const commentToLikeRatio =
    totalLikes > 0 ? (totalComments / totalLikes) * 100 : 0;
  const shareToLikeRatio =
    totalLikes > 0 ? (totalShares / totalLikes) * 100 : 0;

  return (
    // 3. Update the grid to accommodate four items
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        title="Engagement Rate / Reach"
        metric={`${engagementRate.toFixed(2)}%`}
        icon={<Percent className="w-5 h-5" />}
      />
      <KpiCard
        title="Save-to-Like Score"
        metric={`${saveToLikeRatio.toFixed(2)}%`}
        icon={<Star className="w-5 h-5" />}
      />
      {/* 4. Add the two new KPI cards */}
      <KpiCard
        title="Comment-to-Like Ratio"
        metric={`${commentToLikeRatio.toFixed(2)}%`}
        icon={<MessageCircle className="w-5 h-5" />}
      />
      <KpiCard
        title="Share-to-Like Ratio"
        metric={`${shareToLikeRatio.toFixed(2)}%`}
        icon={<Share2 className="w-5 h-5" />}
      />
    </div>
  );
}
