import { SocialPost } from "@/types";

// A utility function to process the raw data from Papa Parse
export const cleanData = (rawData: any[]): SocialPost[] => {
  const cleaned = rawData.map((item) => {
    // We convert each metric to a number using parseInt.
    // The `|| 0` is a fallback. If a value is missing or not a number (e.g., ""),
    // it will default to 0, preventing our charts from breaking.
    const reach = parseInt(item.reach, 10) || 0;
    const likes = parseInt(item.likes, 10) || 0;
    const comments = parseInt(item.comments, 10) || 0;
    const shares = parseInt(item.shares, 10) || 0;
    const saves = parseInt(item.saves, 10) || 0;

    return {
      date: item.date,
      platform: item.platform,
      reach,
      likes,
      comments,
      shares,
      saves,
    };
  });

  // We filter out any rows that might be completely empty or invalid after parsing
  return cleaned.filter((item) => item.date && item.platform);
};
