'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsItem, MarketData, Celebrity } from '@web3-daily-news/shared';
import { newsApi, marketApi, celebrityApi } from '@/lib/api';
import { NewsCard } from '@/components/news/news-card';
import { CelebrityCard } from '@/components/celebrity/celebrity-card';
import { MarketTable } from '@/components/market/market-table';
import { PriceChart } from '@/components/market/price-chart';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Newspaper, ArrowRight, Activity } from 'lucide-react';
import { formatPrice, formatPercentage, formatNumber } from '@/lib/utils';

export default function HomePage() {
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [marketStats, setMarketStats] = useState<any>(null);
  const [topGainers, setTopGainers] = useState<MarketData[]>([]);
  const [topLosers, setTopLosers] = useState<MarketData[]>([]);
  const [trendingCelebrities, setTrendingCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [headlinesData, marketDataRes, statsRes, gainersRes, losersRes, celebritiesRes] = await Promise.all([
          newsApi.getHeadlines(8),
          marketApi.getMarketData(10),
          marketApi.getMarketStats(),
          marketApi.getTopGainers(5),
          marketApi.getTopLosers(5),
          celebrityApi.getTrendingCelebrities(6),
        ]);

        setHeadlines(headlinesData);
        setMarketData(marketDataRes);
        setMarketStats(statsRes);
        setTopGainers(gainersRes);
        setTopLosers(losersRes);
        setTrendingCelebrities(celebritiesRes);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Web3 Daily News Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted source for real-time cryptocurrency news, market insights, and updates from industry leaders
          </p>
        </div>

        {/* Market Overview */}
        {marketStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Market Cap</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${formatNumber(marketStats.totalMarketCap)}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">24h Volume</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${formatNumber(marketStats.totalVolume24h)}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Gainers</p>
                    <p className="text-2xl font-bold text-green-600">
                      {marketStats.gainersCount}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Losers</p>
                    <p className="text-2xl font-bold text-red-600">
                      {marketStats.losersCount}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </section>

      {/* Headlines Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Newspaper className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-gray-900">Today's Headlines</h2>
          </div>
          <Link href="/news">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>View All News</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {headlines.map((article) => (
            <NewsCard key={article.id} news={article} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Market Movers */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Top Market Movers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Top Gainers */}
                <div>
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Top Gainers</span>
                  </h4>
                  <div className="space-y-3">
                    {topGainers.map((coin) => (
                      <div key={coin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">
                              {coin.symbol.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{coin.name}</p>
                            <p className="text-sm text-gray-500">{coin.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatPrice(coin.currentPrice)}</p>
                          <p className="text-sm font-medium text-green-600">
                            {formatPercentage(coin.priceChange24h)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Losers */}
                <div>
                  <h4 className="font-semibold text-red-600 mb-3 flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4" />
                    <span>Top Losers</span>
                  </h4>
                  <div className="space-y-3">
                    {topLosers.map((coin) => (
                      <div key={coin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">
                              {coin.symbol.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{coin.name}</p>
                            <p className="text-sm text-gray-500">{coin.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatPrice(coin.currentPrice)}</p>
                          <p className="text-sm font-medium text-red-600">
                            {formatPercentage(coin.priceChange24h)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trending Celebrities */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Trending Celebrities</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingCelebrities.map((celebrity) => (
                  <CelebrityCard key={celebrity.id} celebrity={celebrity} />
                ))}
              </div>
              <Link href="/celebrities" className="mt-4 block">
                <Button variant="outline" className="w-full">
                  View All Celebrities
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Market Table Preview */}
      {marketData.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Market Overview</h2>
            </div>
            <Link href="/market">
              <Button variant="outline" className="flex items-center space-x-2">
                <span>View Full Market</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-0">
              <MarketTable data={marketData} />
            </CardContent>
          </Card>
        </section>
      )}
    </div>
  );
}