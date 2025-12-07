'use client';

import { useState, useEffect } from 'react';
import { NewsItem, FilterOptions } from '@web3-daily-news/shared';
import { newsApi } from '@/lib/api';
import { NewsCard } from './news-card';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

interface NewsListProps {
  initialNews?: NewsItem[];
  filters?: FilterOptions;
  showContent?: boolean;
}

export function NewsList({ initialNews, filters, showContent = false }: NewsListProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const response = await newsApi.getNews(filters, { page, limit: 20 });
      setNews(prev => [...prev, ...response.data]);
      setHasMore(response.pagination ? response.pagination.page < response.pagination.totalPages : false);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialNews) {
      setNews(initialNews);
      setPage(2);
    }
  }, [initialNews]);

  if (news.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No news articles found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {news.map((article) => (
          <NewsCard key={article.id} news={article} showContent={showContent} />
        ))}
      </div>
      
      {hasMore && (
        <div className="text-center pt-4">
          <Button onClick={loadMore} disabled={loading} variant="outline">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}