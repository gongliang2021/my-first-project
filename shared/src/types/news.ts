import { z } from 'zod';

export const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
  url: z.string(),
  source: z.string(),
  publishedAt: z.date(),
  category: z.string().optional(),
  tags: z.array(z.string()),
  relatedPeople: z.array(z.string()),
  chain: z.string().optional(),
  project: z.string().optional(),
  sentiment: z.enum(['positive', 'negative', 'neutral']).optional(),
  importance: z.number().min(1).max(10).default(5),
});

export const CelebritySchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  bio: z.string(),
  avatar: z.string().optional(),
  role: z.string(),
  company: z.string().optional(),
  followers: z.number().optional(),
  verified: z.boolean().default(false),
  twitterHandle: z.string().optional(),
  latestUpdate: z.date().optional(),
  relatedProjects: z.array(z.string()),
  expertise: z.array(z.string()),
});

export const CelebrityUpdateSchema = z.object({
  id: z.string(),
  celebrityId: z.string(),
  content: z.string(),
  url: z.string(),
  publishedAt: z.date(),
  platform: z.string(),
  likes: z.number().optional(),
  retweets: z.number().optional(),
  replies: z.number().optional(),
  tags: z.array(z.string()),
  relatedProjects: z.array(z.string()),
});

export const MarketDataSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  currentPrice: z.number(),
  priceChange24h: z.number(),
  priceChange7d: z.number(),
  marketCap: z.number(),
  volume24h: z.number(),
  rank: z.number(),
  sparklineData: z.array(z.number()),
  lastUpdated: z.date(),
});

export const TrendingTopicSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  mentionCount: z.number(),
  sentimentScore: z.number(),
  relatedProjects: z.array(z.string()),
  relatedPeople: z.array(z.string()),
  timeline: z.array(z.object({
    date: z.date(),
    count: z.number(),
  })),
});

export type NewsItem = z.infer<typeof NewsItemSchema>;
export type Celebrity = z.infer<typeof CelebritySchema>;
export type CelebrityUpdate = z.infer<typeof CelebrityUpdateSchema>;
export type MarketData = z.infer<typeof MarketDataSchema>;
export type TrendingTopic = z.infer<typeof TrendingTopicSchema>;

export interface FilterOptions {
  date?: string;
  category?: string;
  chain?: string;
  project?: string;
  person?: string;
  tags?: string[];
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  success: boolean;
  message?: string;
}