import { SocialPost } from "@/types";
import React from "react";

// The component will receive the original flat data array as a prop
interface PlatformAnalysisProps {
  data: SocialPost[];
}

// A helper function to calculate totals for an array of posts
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
  // 1. Group the data by platform
  const groupedData = data.reduce((acc, post) => {
    const platform = post.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(post);
    return acc;
  }, {} as Record<string, SocialPost[]>);

  // 2. Calculate the totals for each platform
  const analysisResults = Object.keys(groupedData).map((platform) => {
    const platformPosts = groupedData[platform];
    const totals = calculateTotals(platformPosts);
    return {
      platform,
      ...totals,
    };
  });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-semibold text-white mb-4">
        Per-Platform Analysis
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                Platform
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Posts
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Total Reach
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Total Likes
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Eng. Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {analysisResults.map((result) => (
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
