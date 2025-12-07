'use client';

import Link from 'next/link';
import { NewsItem } from '@web3-daily-news/shared';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';
import { formatRelativeTime, getSentimentColor, getImportanceColor, truncateText } from '@/lib/utils';
import { ExternalLink, Clock, User, Hash } from 'lucide-react';

interface NewsCardProps {
  news: NewsItem;
  showContent?: boolean;
}

export function NewsCard({ news, showContent = false }: NewsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {news.source}
              </Badge>
              <div className={`w-2 h-2 rounded-full ${getImportanceColor(news.importance)}`} />
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatRelativeTime(news.publishedAt)}
              </span>
            </div>
            
            <Link href={`/news/${news.id}`}>
              <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
                {news.title}
              </h3>
            </Link>
          </div>
          
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </CardHeader>
      
      {(showContent || news.content) && (
        <CardContent className="pt-0">
          {showContent && news.content && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">
              {truncateText(news.content, 150)}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {news.category && (
              <Badge variant="secondary" className="text-xs">
                {news.category}
              </Badge>
            )}
            
            {news.chain && (
              <Badge variant="outline" className="text-xs">
                <Hash className="w-3 h-3 mr-1" />
                {news.chain}
              </Badge>
            )}
            
            {news.sentiment && (
              <span className={`text-xs font-medium ${getSentimentColor(news.sentiment)}`}>
                {news.sentiment}
              </span>
            )}
            
            {news.relatedPeople.length > 0 && (
              <div className="flex items-center gap-1 text-gray-500">
                <User className="w-3 h-3" />
                <span>{news.relatedPeople[0]}</span>
                {news.relatedPeople.length > 1 && (
                  <span>+{news.relatedPeople.length - 1}</span>
                )}
              </div>
            )}
            
            {news.tags.length > 0 && (
              <div className="flex gap-1">
                {news.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
                {news.tags.length > 3 && (
                  <span className="text-gray-400">+{news.tags.length - 3}</span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}