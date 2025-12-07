import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  DATABASE_URL: z.string(),
  COINGECKO_API_BASE_URL: z.string().default('https://api.coingecko.com/api/v3'),
  TWITTER_RSS_BASE: z.string().default('https://r.jina.ai/http://twitter.com'),
  NEWS_UPDATE_INTERVAL: z.string().transform(Number).default('3600000'),
  SCRAPING_INTERVAL: z.string().transform(Number).default('3600000'),
});

const env = envSchema.parse(process.env);

export default env;