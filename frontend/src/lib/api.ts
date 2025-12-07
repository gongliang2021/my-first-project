import axios from 'axios';
import { NewsItem, Celebrity, MarketData, ApiResponse, FilterOptions, PaginationOptions } from '@web3-daily-news/shared';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
});

// News API
export const newsApi = {
  getNews: async (filters?: FilterOptions, pagination?: PaginationOptions): Promise<ApiResponse<NewsItem[]>> => {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category);
    if (filters?.chain) params.append('chain', filters.chain);
    if (filters?.project) params.append('project', filters.project);
    if (filters?.person) params.append('person', filters.person);
    if (filters?.date) params.append('date', filters.date);
    if (filters?.tags) params.append('tags', filters.tags.join(','));
    
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    
    const response = await api.get(`/news?${params.toString()}`);
    return response.data;
  },
  
  getHeadlines: async (limit: number = 10): Promise<NewsItem[]> => {
    const response = await api.get(`/news/headlines?limit=${limit}`);
    return response.data.data;
  },
  
  getNewsById: async (id: string): Promise<NewsItem> => {
    const response = await api.get(`/news/${id}`);
    return response.data.data;
  },
  
  getCategories: async (): Promise<string[]> => {
    const response = await api.get('/news/categories');
    return response.data.data;
  },
  
  getChains: async (): Promise<string[]> => {
    const response = await api.get('/news/chains');
    return response.data.data;
  },
};

// Celebrity API
export const celebrityApi = {
  getCelebrities: async (pagination?: PaginationOptions): Promise<ApiResponse<Celebrity[]>> => {
    const params = new URLSearchParams();
    
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    
    const response = await api.get(`/celebrities?${params.toString()}`);
    return response.data;
  },
  
  getCelebrityById: async (id: string): Promise<Celebrity> => {
    const response = await api.get(`/celebrities/${id}`);
    return response.data.data;
  },
  
  getTrendingCelebrities: async (limit: number = 10): Promise<Celebrity[]> => {
    const response = await api.get(`/celebrities/trending?limit=${limit}`);
    return response.data.data;
  },
  
  getCelebrityUpdates: async (id: string, pagination?: PaginationOptions): Promise<ApiResponse<any[]>> => {
    const params = new URLSearchParams();
    
    if (pagination?.page) params.append('page', pagination.page.toString());
    if (pagination?.limit) params.append('limit', pagination.limit.toString());
    
    const response = await api.get(`/celebrities/${id}/updates?${params.toString()}`);
    return response.data;
  },
};

// Market API
export const marketApi = {
  getMarketData: async (limit: number = 100): Promise<MarketData[]> => {
    const response = await api.get(`/market?limit=${limit}`);
    return response.data.data;
  },
  
  getMarketStats: async (): Promise<any> => {
    const response = await api.get('/market/stats');
    return response.data.data;
  },
  
  getTopGainers: async (limit: number = 10): Promise<MarketData[]> => {
    const response = await api.get(`/market/gainers?limit=${limit}`);
    return response.data.data;
  },
  
  getTopLosers: async (limit: number = 10): Promise<MarketData[]> => {
    const response = await api.get(`/market/losers?limit=${limit}`);
    return response.data.data;
  },
  
  getMarketDataBySymbol: async (symbol: string): Promise<MarketData> => {
    const response = await api.get(`/market/${symbol}`);
    return response.data.data;
  },
};