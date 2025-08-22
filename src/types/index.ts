// src/types/index.ts

export type SocialPost = {
  // We expect these exact column headers in the CSV file.
  // The 'string | number' type gives us flexibility before we clean the data.
  date: string;
  platform: "Instagram" | "Facebook" | "Twitter" | "LinkedIn";
  reach: string | number;
  likes: string | number;
  comments: string | number;
  shares: string | number;
  saves: string | number;
};
