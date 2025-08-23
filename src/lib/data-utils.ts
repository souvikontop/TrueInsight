import { SocialPost } from "@/types";
import { format, isValid } from "date-fns";

export const cleanData = (rawData: Record<string, any>[]): SocialPost[] => {
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

  const filtered = cleaned.filter((item) => item.date && item.platform);
  const sorted = filtered.sort((a, b) => a.date.localeCompare(b.date));

  return sorted;
};

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

export const formatKpiMetric = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};
