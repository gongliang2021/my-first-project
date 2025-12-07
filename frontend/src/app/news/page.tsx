'use client';

import { useState, useEffect } from 'react';
import { NewsItem, FilterOptions } from '@web3-daily-news/shared';
import { newsApi } from '@/lib/api';
import { NewsList } from '@/components/news/news-list';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Search, Calendar, Hash, Users } from 'lucide-react';

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [chains, setChains] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, categoriesData, chainsData] = await Promise.all([
          newsApi.getNews(filters, { page: 1, limit: 20 }),
          newsApi.getCategories(),
          newsApi.getChains(),
        ]);

        setNews(newsData.data);
        setCategories(categoriesData);
        setChains(chainsData);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h1>
        <p className="text-gray-600">
          Stay updated with the latest developments in Web3, cryptocurrency, and blockchain technology
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  {showFilters ? 'Hide' : 'Show'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className={`space-y-6 ${!showFilters && 'hidden lg:block'}`}>
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={filters.person || ''}
                    onChange={(e) => handleFilterChange('person', e.target.value)}
                  />
                </div>
              </div>

              {/* Date Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filters.date || ''}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                />
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categories
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="category"
                        className="text-primary focus:ring-primary"
                        checked={filters.category === category}
                        onChange={() => handleFilterChange('category', category)}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      className="text-primary focus:ring-primary"
                      checked={!filters.category}
                      onChange={() => handleFilterChange('category', undefined)}
                    />
                    <span className="text-sm">All Categories</span>
                  </label>
                </div>
              </div>

              {/* Chains */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Hash className="inline h-4 w-4 mr-1" />
                  Blockchains
                </label>
                <div className="space-y-2">
                  {chains.map((chain) => (
                    <label key={chain} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="chain"
                        className="text-primary focus:ring-primary"
                        checked={filters.chain === chain}
                        onChange={() => handleFilterChange('chain', chain)}
                      />
                      <span className="text-sm">{chain}</span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="chain"
                      className="text-primary focus:ring-primary"
                      checked={!filters.chain}
                      onChange={() => handleFilterChange('chain', undefined)}
                    />
                    <span className="text-sm">All Chains</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* News List */}
        <div className="flex-1">
          {/* Active Filters */}
          {Object.keys(filters).some(key => filters[key as keyof FilterOptions]) && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {filters.category}
                    <button
                      onClick={() => handleFilterChange('category', undefined)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filters.chain && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Chain: {filters.chain}
                    <button
                      onClick={() => handleFilterChange('chain', undefined)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filters.date && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Date: {filters.date}
                    <button
                      onClick={() => handleFilterChange('date', undefined)}
                      className="ml-1 text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          )}

          <NewsList initialNews={news} filters={filters} showContent={true} />
        </div>
      </div>
    </div>
  );
}