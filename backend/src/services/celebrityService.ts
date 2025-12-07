import { prisma } from '../config/database';
import { Celebrity, CelebrityUpdate, PaginationOptions, ApiResponse } from '@web3-daily-news/shared';

export class CelebrityService {
  async getCelebrities(
    pagination: PaginationOptions = { page: 1, limit: 20 }
  ): Promise<ApiResponse<Celebrity[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;
    
    const [celebrities, total] = await Promise.all([
      prisma.celebrity.findMany({
        orderBy: { latestUpdate: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.celebrity.count(),
    ]);
    
    const formattedCelebrities = celebrities.map(celebrity => ({
      ...celebrity,
      relatedProjects: JSON.parse(celebrity.relatedProjects || '[]'),
      expertise: JSON.parse(celebrity.expertise || '[]'),
      latestUpdate: celebrity.latestUpdate,
    }));
    
    return {
      data: formattedCelebrities as Celebrity[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      success: true,
    };
  }
  
  async getCelebrityById(id: string): Promise<Celebrity | null> {
    const celebrity = await prisma.celebrity.findUnique({
      where: { id },
      include: {
        updates: {
          orderBy: { publishedAt: 'desc' },
          take: 10,
        },
      },
    });
    
    if (!celebrity) return null;
    
    return {
      ...celebrity,
      relatedProjects: JSON.parse(celebrity.relatedProjects || '[]'),
      expertise: JSON.parse(celebrity.expertise || '[]'),
      latestUpdate: celebrity.latestUpdate,
    } as Celebrity;
  }
  
  async getCelebrityUpdates(
    celebrityId: string,
    pagination: PaginationOptions = { page: 1, limit: 20 }
  ): Promise<ApiResponse<CelebrityUpdate[]>> {
    const { page, limit } = pagination;
    const offset = (page - 1) * limit;
    
    const [updates, total] = await Promise.all([
      prisma.celebrityUpdate.findMany({
        where: { celebrityId },
        orderBy: { publishedAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.celebrityUpdate.count({ where: { celebrityId } }),
    ]);
    
    const formattedUpdates = updates.map(update => ({
      ...update,
      tags: JSON.parse(update.tags || '[]'),
      relatedProjects: JSON.parse(update.relatedProjects || '[]'),
      publishedAt: update.publishedAt,
    }));
    
    return {
      data: formattedUpdates as CelebrityUpdate[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      success: true,
    };
  }
  
  async getTrendingCelebrities(limit: number = 10): Promise<Celebrity[]> {
    const celebrities = await prisma.celebrity.findMany({
      where: { 
        latestUpdate: { 
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      },
      orderBy: { followers: 'desc' },
      take: limit,
    });
    
    return celebrities.map(celebrity => ({
      ...celebrity,
      relatedProjects: JSON.parse(celebrity.relatedProjects || '[]'),
      expertise: JSON.parse(celebrity.expertise || '[]'),
      latestUpdate: celebrity.latestUpdate,
    })) as Celebrity[];
  }
}