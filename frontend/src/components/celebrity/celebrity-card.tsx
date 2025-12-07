'use client';

import Link from 'next/link';
import { Celebrity } from '@web3-daily-news/shared';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { formatRelativeTime, truncateText } from '@/lib/utils';
import { Twitter, ExternalLink, Users, Briefcase } from 'lucide-react';

interface CelebrityCardProps {
  celebrity: Celebrity;
}

export function CelebrityCard({ celebrity }: CelebrityCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            {celebrity.avatar ? (
              <img
                src={celebrity.avatar}
                alt={celebrity.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-gray-600">
                {celebrity.name.split(' ').map(n => n[0]).join('')}
              </span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Link href={`/celebrities/${celebrity.id}`}>
                <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                  {celebrity.name}
                </h3>
              </Link>
              {celebrity.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600">@{celebrity.username}</p>
            <p className="text-sm text-gray-700 mt-1">{celebrity.role}</p>
            {celebrity.company && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {celebrity.company}
              </p>
            )}
          </div>
          
          {celebrity.twitterHandle && (
            <a
              href={`https://twitter.com/${celebrity.twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {celebrity.bio && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {truncateText(celebrity.bio, 100)}
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 mb-3">
          {celebrity.expertise.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {celebrity.expertise.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{celebrity.expertise.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{celebrity.followers ? formatNumber(celebrity.followers) : 'N/A'} followers</span>
          </div>
          
          {celebrity.latestUpdate && (
            <span>Updated {formatRelativeTime(celebrity.latestUpdate)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function formatNumber(num: number): string {
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
}