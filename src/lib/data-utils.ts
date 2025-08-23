import { SocialPost } from "@/types";

export const cleanData = (rawData: any[]): SocialPost[] => {
  const cleaned = rawData.map((item) => {
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

  return cleaned.filter((item) => item.date && item.platform);
};

// This function takes our array of posts and groups them into an object.
// The result will look like: { Instagram: [post1, post2], Facebook: [post3, post4] }
export const groupDataByPlatform = (data: SocialPost[]) => {
  return data.reduce((acc, post) => {
    const platform = post.platform;
    // If the accumulator object doesn't have a key for this platform yet, create it with an empty array.
    if (!acc[platform]) {
      acc[platform] = [];
    }
    // Push the current post into the array for its platform.
    acc[platform].push(post);
    return acc;
  }, {} as Record<string, SocialPost[]>); // The initial value is an empty object.
};
