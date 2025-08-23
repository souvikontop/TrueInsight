import { SocialPost } from "@/types";
import React, { useState, useMemo } from "react";
import { ArrowUpDown } from "lucide-react";

interface PlatformAnalysisProps {
  data: SocialPost[];
}

type SortKey =
  | "platform"
  | "postCount"
  | "totalReach"
  | "totalLikes"
  | "engagementRate";
type SortDirection = "ascending" | "descending";

const calculateTotals = (posts: SocialPost[]) => {
  const totalLikes = posts.reduce(
    (acc, post) => acc + (post.likes as number),
    0
  );
  const totalComments = posts.reduce(
    (acc, post) => acc + (post.comments as number),
    0
  );
  const totalShares = posts.reduce(
    (acc, post) => acc + (post.shares as number),
    0
  );
  const totalSaves = posts.reduce(
    (acc, post) => acc + (post.saves as number),
    0
  );
  const totalReach = posts.reduce(
    (acc, post) => acc + (post.reach as number),
    0
  );

  const totalEngagements =
    totalLikes + totalComments + totalShares + totalSaves;
  const engagementRate =
    totalReach > 0 ? (totalEngagements / totalReach) * 100 : 0;

  return {
    postCount: posts.length,
    totalLikes,
    totalReach,
    engagementRate,
  };
};

export default function PlatformAnalysis({ data }: PlatformAnalysisProps) {
  // 1. Add state to manage sorting configuration
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: SortDirection;
  } | null>(null);

  const groupedData = data.reduce((acc, post) => {
    const platform = post.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(post);
    return acc;
  }, {} as Record<string, SocialPost[]>);

  const analysisResults = Object.keys(groupedData).map((platform) => {
    const platformPosts = groupedData[platform];
    const totals = calculateTotals(platformPosts);
    return {
      platform,
      ...totals,
    };
  });

  // 2. Memoize the sorting logic so it only runs when data or sort config changes
  const sortedResults = useMemo(() => {
    let sortableItems = [...analysisResults];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [analysisResults, sortConfig]);

  // 3. Create a function to handle sort requests
  const requestSort = (key: SortKey) => {
    let direction: SortDirection = "descending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold text-white mb-4">
        Per-Platform Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              {/* 4. Make headers clickable buttons */}
              <th scope="col" className="px-6 py-3">
                <button
                  onClick={() => requestSort("platform")}
                  className="flex items-center gap-2"
                >
                  Platform <ArrowUpDown size={14} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                <button
                  onClick={() => requestSort("postCount")}
                  className="flex items-center gap-2 w-full justify-end"
                >
                  Posts <ArrowUpDown size={14} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                <button
                  onClick={() => requestSort("totalReach")}
                  className="flex items-center gap-2 w-full justify-end"
                >
                  Total Reach <ArrowUpDown size={14} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                <button
                  onClick={() => requestSort("totalLikes")}
                  className="flex items-center gap-2 w-full justify-end"
                >
                  Total Likes <ArrowUpDown size={14} />
                </button>
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                <button
                  onClick={() => requestSort("engagementRate")}
                  className="flex items-center gap-2 w-full justify-end"
                >
                  Eng. Rate <ArrowUpDown size={14} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 5. Map over the 'sortedResults' instead of 'analysisResults' */}
            {sortedResults.map((result) => (
              <tr
                key={result.platform}
                className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700/50"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-white whitespace-nowrap"
                >
                  {result.platform}
                </th>
                <td className="px-6 py-4 text-right">
                  {result.postCount.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  {result.totalReach.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  {result.totalLikes.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right font-medium text-blue-400">
                  {result.engagementRate.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
