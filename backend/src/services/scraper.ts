import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';
import { logger } from '../config/logger';
import { prisma } from '../config/database';
import { NEWS_SOURCES, CELEBRITIES, TOP_COINS } from '@web3-daily-news/shared';
import env from '../config/environment';

const parser = new Parser();

export class ScraperService {
  private readonly newsSources = [
    {
      name: 'CoinDesk',
      url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
      selector: 'item',
    },
    {
      name: 'Cointelegraph',
      url: 'https://cointelegraph.com/rss',
      selector: 'item',
    },
    {
      name: 'The Block',
      url: 'https://www.theblock.co/rss.xml',
      selector: 'item',
    },
  ];

  async scrapeAllNews(): Promise<void> {
    logger.info('Starting news scraping...');
    
    try {
      for (const source of this.newsSources) {
        await this.scrapeNewsSource(source);
      }
      
      logger.info('News scraping completed');
    } catch (error) {
      logger.error('Error during news scraping:', error);
    }
  }

  private async scrapeNewsSource(source: { name: string; url: string }): Promise<void> {
    try {
      const feed = await parser.parseURL(source.url);
      
      for (const item of feed.items.slice(0, 20)) { // Limit to 20 latest items
        if (!item.link || !item.title) continue;

        // Check if already exists
        const existing = await prisma.newsItem.findUnique({
          where: { url: item.link }
        });

        if (existing) continue;

        // Get full content
        const content = await this.getArticleContent(item.link);
        
        // Extract metadata
        const metadata = this.extractMetadata(item.title + ' ' + (content || ''));

        await prisma.newsItem.create({
          data: {
            title: item.title,
            content: content || item.contentSnippet || '',
            url: item.link,
            source: source.name,
            publishedAt: item.pubDate ? new Date(item.pubDate) : new Date(),
            category: metadata.category,
            tags: JSON.stringify(metadata.tags),
            relatedPeople: JSON.stringify(metadata.relatedPeople),
            chain: metadata.chain,
            project: metadata.project,
            sentiment: metadata.sentiment,
            importance: metadata.importance,
          },
        });

        logger.info(`Scraped article: ${item.title} from ${source.name}`);
      }
    } catch (error) {
      logger.error(`Error scraping ${source.name}:`, error);
    }
  }

  private async getArticleContent(url: string): Promise<string | null> {
    try {
      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const $ = cheerio.load(response.data);
      
      // Remove ads and unwanted elements
      $('script, style, nav, footer, aside, .advertisement').remove();
      
      // Try common content selectors
      const contentSelectors = [
        'article',
        '.article-content',
        '.post-content',
        '.entry-content',
        '.content',
        'main',
      ];
      
      for (const selector of contentSelectors) {
        const content = $(selector).text().trim();
        if (content.length > 200) {
          return content;
        }
      }
      
      return $('body').text().trim().substring(0, 1000);
    } catch (error) {
      logger.warn(`Failed to get content for ${url}:`, error);
      return null;
    }
  }

  private extractMetadata(text: string) {
    const lowerText = text.toLowerCase();
    
    // Extract chain
    const chains = ['bitcoin', 'ethereum', 'solana', 'cardano', 'polygon', 'avalanche'];
    const chain = chains.find(c => lowerText.includes(c));
    
    // Extract people
    const people = [];
    for (const celebrity of CELEBRITIES) {
      if (lowerText.includes(celebrity.name.toLowerCase()) || 
          lowerText.includes(celebrity.username.toLowerCase())) {
        people.push(celebrity.name);
      }
    }
    
    // Extract tags
    const tags = [];
    const keywords = ['defi', 'nft', 'dao', 'staking', 'mining', 'trading', 'regulation'];
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        tags.push(keyword);
      }
    }
    
    // Determine category
    let category = 'General';
    if (lowerText.includes('defi') || lowerText.includes('yield')) category = 'DeFi';
    else if (lowerText.includes('nft') || lowerText.includes('collectible')) category = 'NFT';
    else if (lowerText.includes('game') || lowerText.includes('gaming')) category = 'Gaming';
    else if (lowerText.includes('regulation') || lowerText.includes('sec')) category = 'Regulation';
    else if (lowerText.includes('price') || lowerText.includes('market')) category = 'Market';
    
    // Simple sentiment analysis
    const positiveWords = ['bullish', 'surge', 'rally', 'gain', 'profit', 'success', 'adoption'];
    const negativeWords = ['bearish', 'crash', 'fall', 'loss', 'hack', 'scam', 'concern'];
    
    let sentiment = 'neutral';
    const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
    
    if (positiveCount > negativeCount) sentiment = 'positive';
    else if (negativeCount > positiveCount) sentiment = 'negative';
    
    // Determine importance (simple heuristic)
    let importance = 5;
    if (people.length > 0) importance += 1;
    if (chain) importance += 1;
    if (lowerText.includes('launch') || lowerText.includes('partnership')) importance += 2;
    if (lowerText.includes('hack') || lowerText.includes('exploit')) importance += 3;
    
    return {
      chain: chain ? chain.charAt(0).toUpperCase() + chain.slice(1) : undefined,
      project: undefined, // Would need more sophisticated extraction
      category,
      tags,
      relatedPeople: people,
      sentiment,
      importance: Math.min(10, importance),
    };
  }

  async scrapeCelebrityUpdates(): Promise<void> {
    logger.info('Starting celebrity updates scraping...');
    
    try {
      for (const celebrity of CELEBRITIES) {
        await this.scrapeCelebrityTweets(celebrity as any);
      }
      
      logger.info('Celebrity updates scraping completed');
    } catch (error) {
      logger.error('Error during celebrity scraping:', error);
    }
  }

  private async scrapeCelebrityTweets(celebrity: any): Promise<void> {
    try {
      if (!celebrity.twitterHandle) return;
      
      // Using jina.ai to get Twitter content without API
      const url = `${env.TWITTER_RSS_BASE}/${celebrity.twitterHandle}`;
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      
      // Extract tweets (this is a simplified approach)
      const tweets = $('article').slice(0, 5); // Get latest 5 tweets
      
      for (let i = 0; i < tweets.length; i++) {
        const tweetElement = tweets.eq(i);
        const content = tweetElement.text().trim();
        const tweetUrl = `${env.TWITTER_RSS_BASE}/${celebrity.twitterHandle}/status/${i}`;
        
        if (!content || content.length < 10) continue;
        
        // Check if already exists
        const existing = await prisma.celebrityUpdate.findFirst({
          where: { 
            celebrityId: celebrity.id,
            content: content.substring(0, 100) // Use first 100 chars as identifier
          }
        });
        
        if (existing) continue;
        
        // Get or create celebrity
        let celebrityRecord = await prisma.celebrity.findUnique({
          where: { username: celebrity.username }
        });
        
        if (!celebrityRecord) {
          celebrityRecord = await prisma.celebrity.create({
            data: {
              id: celebrity.id,
              name: celebrity.name,
              username: celebrity.username,
              bio: `${celebrity.role} at ${celebrity.company || 'Unknown'}`,
              role: celebrity.role,
              company: celebrity.company || null,
              twitterHandle: celebrity.twitterHandle,
              expertise: JSON.stringify(celebrity.expertise || []),
              verified: true,
              relatedProjects: JSON.stringify([]),
            },
          });
        }
        
        await prisma.celebrityUpdate.create({
          data: {
            celebrityId: celebrityRecord.id,
            content,
            url: tweetUrl,
            publishedAt: new Date(),
            platform: 'Twitter',
            tags: JSON.stringify([]),
            relatedProjects: JSON.stringify([]),
          },
        });
        
        // Update celebrity's latest update time
        await prisma.celebrity.update({
          where: { id: celebrityRecord.id },
          data: { latestUpdate: new Date() }
        });
      }
      
      logger.info(`Scraped updates for ${celebrity.name}`);
    } catch (error) {
      logger.error(`Error scraping tweets for ${celebrity.name}:`, error);
    }
  }

  async scrapeMarketData(): Promise<void> {
    logger.info('Starting market data scraping...');
    
    try {
      const response = await axios.get(
        `${env.COINGECKO_API_BASE_URL}/coins/markets?vs_currency=usd&ids=${TOP_COINS.join(',')}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h,7d`
      );
      
      for (const coin of response.data) {
        await prisma.marketData.upsert({
          where: { symbol: coin.symbol.toUpperCase() },
          update: {
            name: coin.name,
            currentPrice: coin.current_price,
            priceChange24h: coin.price_change_percentage_24h || 0,
            priceChange7d: coin.price_change_percentage_7d_in_currency || 0,
            marketCap: coin.market_cap,
            volume24h: coin.total_volume,
            rank: coin.market_cap_rank,
            sparklineData: JSON.stringify(coin.sparkline_in_7d?.price || []),
            lastUpdated: new Date(),
          },
          create: {
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            currentPrice: coin.current_price,
            priceChange24h: coin.price_change_percentage_24h || 0,
            priceChange7d: coin.price_change_percentage_7d_in_currency || 0,
            marketCap: coin.market_cap,
            volume24h: coin.total_volume,
            rank: coin.market_cap_rank,
            sparklineData: JSON.stringify(coin.sparkline_in_7d?.price || []),
            lastUpdated: new Date(),
          },
        });
      }
      
      logger.info('Market data scraping completed');
    } catch (error) {
      logger.error('Error during market data scraping:', error);
    }
  }

  async scrapeAll(): Promise<void> {
    await Promise.all([
      this.scrapeAllNews(),
      this.scrapeCelebrityUpdates(),
      this.scrapeMarketData(),
    ]);
  }
}