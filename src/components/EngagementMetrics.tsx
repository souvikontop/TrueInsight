import { SocialPost } from "@/types";
import React from "react";
import KpiCard from "./KpiCard";
import { Percent, Star } from "lucide-react";

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

  // Engagement Rate calculation with a check to prevent division by zero
  const engagementRate =
    totalReach > 0 ? (totalEngagements / totalReach) * 100 : 0;

  // Save-to-Like Ratio calculation with a check to prevent division by zero
  const saveToLikeRatio = totalLikes > 0 ? (totalSaves / totalLikes) * 100 : 0;

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <KpiCard
        title="Engagement Rate / Reach"
        // .toFixed(2) formats the number to two decimal places
        metric={`${engagementRate.toFixed(2)}%`}
        icon={<Percent className="w-5 h-5" />}
      />
      <KpiCard
        title="Save-to-Like Quality Score"
        metric={`${saveToLikeRatio.toFixed(2)}%`}
        icon={<Star className="w-5 h-5" />}
      />
    </div>
  );
}
