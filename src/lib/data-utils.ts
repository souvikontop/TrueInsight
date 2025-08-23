import { SocialPost } from "@/types";
import { format, isValid } from "date-fns";

// cleanData function remains the same
export const cleanData = (rawData: any[]): SocialPost[] => {
  const cleaned = rawData.map((item) => {
    let formattedDate = "";
    const parsedDate = new Date(item.date);
    if (isValid(parsedDate)) {
      formattedDate = format(parsedDate, "yyyy-MM-dd");
    }

    const reach = parseInt(item.reach, 10) || 0;
    const likes = parseInt(item.likes, 10) || 0;
    const comments = parseInt(item.comments, 10) || 0;
    const shares = parseInt(item.shares, 10) || 0;
    const saves = parseInt(item.saves, 10) || 0;

    return {
      date: formattedDate,
      platform: item.platform,
      reach,
      likes,
      comments,
      shares,
      saves,
    };
  });

  return cleaned.filter((item) => item.date && item.platform);
};

// groupDataByPlatform function remains the same
export const groupDataByPlatform = (data: SocialPost[]) => {
  return data.reduce((acc, post) => {
    const platform = post.platform;
    if (!acc[platform]) {
      acc[platform] = [];
    }
    acc[platform].push(post);
    return acc;
  }, {} as Record<string, SocialPost[]>);
};

// --- ADD THIS NEW FUNCTION ---
// This function takes a number and formats it with K (thousands) or M (millions)
export const formatKpiMetric = (num: number): string => {
  if (num >= 1000000) {
    // Divide by 1 million and format to 1 decimal place
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    // Divide by 1 thousand and format to 1 decimal place
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  // For numbers less than 1000, just return them as a string
  return num.toString();
};
