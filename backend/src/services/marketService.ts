import { prisma } from '../config/database';
import { MarketData } from '@web3-daily-news/shared';

export class MarketService {
  async getMarketData(limit: number = 100): Promise<MarketData[]> {
    const marketData = await prisma.marketData.findMany({
      orderBy: { rank: 'asc' },
      take: limit,
    });
    
    return marketData.map(data => ({
      ...data,
      sparklineData: JSON.parse(data.sparklineData || '[]'),
      lastUpdated: data.lastUpdated,
    })) as MarketData[];
  }
  
  async getMarketDataBySymbol(symbol: string): Promise<MarketData | null> {
    const data = await prisma.marketData.findUnique({
      where: { symbol: symbol.toUpperCase() },
    });
    
    if (!data) return null;
    
    return {
      ...data,
      sparklineData: JSON.parse(data.sparklineData || '[]'),
      lastUpdated: data.lastUpdated,
    } as MarketData;
  }
  
  async getTopGainers(limit: number = 10): Promise<MarketData[]> {
    const marketData = await prisma.marketData.findMany({
      where: { priceChange24h: { gt: 0 } },
      orderBy: { priceChange24h: 'desc' },
      take: limit,
    });
    
    return marketData.map(data => ({
      ...data,
      sparklineData: JSON.parse(data.sparklineData || '[]'),
      lastUpdated: data.lastUpdated,
    })) as MarketData[];
  }
  
  async getTopLosers(limit: number = 10): Promise<MarketData[]> {
    const marketData = await prisma.marketData.findMany({
      where: { priceChange24h: { lt: 0 } },
      orderBy: { priceChange24h: 'asc' },
      take: limit,
    });
    
    return marketData.map(data => ({
      ...data,
      sparklineData: JSON.parse(data.sparklineData || '[]'),
      lastUpdated: data.lastUpdated,
    })) as MarketData[];
  }
  
  async getMarketStats() {
    const totalMarketCap = await prisma.marketData.aggregate({
      _sum: { marketCap: true },
    });
    
    const totalVolume = await prisma.marketData.aggregate({
      _sum: { volume24h: true },
    });
    
    const gainersCount = await prisma.marketData.count({
      where: { priceChange24h: { gt: 0 } },
    });
    
    const losersCount = await prisma.marketData.count({
      where: { priceChange24h: { lt: 0 } },
    });
    
    return {
      totalMarketCap: totalMarketCap._sum.marketCap || 0,
      totalVolume24h: totalVolume._sum.volume24h || 0,
      gainersCount,
      losersCount,
      totalCoins: await prisma.marketData.count(),
    };
  }
}