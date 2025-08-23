import { SocialPost } from "@/types";
import { format, isValid } from "date-fns";

/**
 * Parses raw data, cleans each row, standardizes the date, and sorts the entire dataset chronologically.
 * @param rawData - The raw array of objects from Papa Parse.
 * @returns A clean, sorted array of SocialPost objects.
 */
export const cleanData = (rawData: any[]): SocialPost[] => {
  const cleaned = rawData.map((item) => {
    let formattedDate = "";
    // The JavaScript Date constructor is flexible and can parse many formats
    const parsedDate = new Date(item.date);
    // We check if the parsed date is valid
    if (isValid(parsedDate)) {
      // If valid, we re-format it into our standard YYYY-MM-DD
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

  // Filter out any rows that might be completely empty or have an invalid date after parsing
  const filtered = cleaned.filter((item) => item.date && item.platform);

  // Sort the data chronologically using direct string comparison (reliable for YYYY-MM-DD format)
  const sorted = filtered.sort((a, b) => a.date.localeCompare(b.date));

  return sorted;
};

/**
 * Groups an array of posts into an object where keys are platform names.
 * @param data - A clean array of SocialPost objects.
 * @returns An object with posts grouped by platform.
 */
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

/**
 * Formats a large number into an abbreviated string with 'K' for thousands or 'M' for millions.
 * @param num - The number to format.
 * @returns A formatted string (e.g., "1.2M", "15.3K", "500").
 */
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
