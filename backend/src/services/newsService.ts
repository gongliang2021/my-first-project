import { prisma } from '../config/database';
import { NewsItem, FilterOptions, PaginationOptions, ApiResponse } from '@web3-daily-news/shared';

export class NewsService {
  async getNews(
    filters: FilterOptions = {},
    pagination: PaginationOptions = { page: 1, limit: 20 }
  ): Promise<ApiResponse<NewsItem[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;
    
    const where: any = {};
    
    if (filters.category) {
      where.category = filters.category;
    }
    
    if (filters.chain) {
      where.chain = filters.chain;
    }
    
    if (filters.project) {
      where.project = { contains: filters.project };
    }
    
    if (filters.person) {
      where.relatedPeople = { contains: filters.person };
    }
    
    if (filters.date) {
      const targetDate = new Date(filters.date);
      const nextDate = new Date(targetDate);
      nextDate.setDate(nextDate.getDate() + 1);
      
      where.publishedAt = {
        gte: targetDate,
        lt: nextDate,
      };
    }
    
    if (filters.tags && filters.tags.length > 0) {
      where.OR = filters.tags.map(tag => ({
        tags: { contains: tag }
      }));
    }
    
    const [news, total] = await Promise.all([
      prisma.newsItem.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.newsItem.count({ where }),
    ]);
    
    const formattedNews = news.map(item => ({
      ...item,
      tags: JSON.parse(item.tags || '[]'),
      relatedPeople: JSON.parse(item.relatedPeople || '[]'),
      publishedAt: item.publishedAt,
    }));
    
    return {
      data: formattedNews as NewsItem[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      success: true,
    };
  }
  
  async getNewsById(id: string): Promise<NewsItem | null> {
    const news = await prisma.newsItem.findUnique({
      where: { id },
    });
    
    if (!news) return null;
    
    return {
      ...news,
      tags: JSON.parse(news.tags || '[]'),
      relatedPeople: JSON.parse(news.relatedPeople || '[]'),
      publishedAt: news.publishedAt,
    } as NewsItem;
  }
  
  async getHeadlines(limit: number = 10): Promise<NewsItem[]> {
    const news = await prisma.newsItem.findMany({
      where: { importance: { gte: 7 } },
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });
    
    return news.map(item => ({
      ...item,
      tags: JSON.parse(item.tags || '[]'),
      relatedPeople: JSON.parse(item.relatedPeople || '[]'),
      publishedAt: item.publishedAt,
    })) as NewsItem[];
  }
  
  async getCategories(): Promise<string[]> {
    const categories = await prisma.newsItem.findMany({
      select: { category: true },
      distinct: ['category'],
      where: { category: { not: null } },
    });
    
    return categories.map(c => c.category!).filter(Boolean);
  }
  
  async getChains(): Promise<string[]> {
    const chains = await prisma.newsItem.findMany({
      select: { chain: true },
      distinct: ['chain'],
      where: { chain: { not: null } },
    });
    
    return chains.map(c => c.chain!).filter(Boolean);
  }
}