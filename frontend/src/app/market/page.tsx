'use client';

import { useState, useEffect } from 'react';
import { MarketData } from '@web3-daily-news/shared';
import { marketApi } from '@/lib/api';
import { MarketTable } from '@/components/market/market-table';
import { PriceChart } from '@/components/market/price-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Search } from 'lucide-react';
import { formatPrice, formatPercentage, formatNumber } from '@/lib/utils';

export default function MarketPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [marketStats, setMarketStats] = useState<any>(null);
  const [topGainers, setTopGainers] = useState<MarketData[]>([]);
  const [topLosers, setTopLosers] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'table' | 'cards'>('table');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketDataRes, statsRes, gainersRes, losersRes] = await Promise.all([
          marketApi.getMarketData(100),
          marketApi.getMarketStats(),
          marketApi.getTopGainers(10),
          marketApi.getTopLosers(10),
        ]);

        setMarketData(marketDataRes);
        setMarketStats(statsRes);
        setTopGainers(gainersRes);
        setTopLosers(losersRes);
      } catch (error) {
        console.error('Error fetching market data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredMarketData = marketData.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Market Overview</h1>
        <p className="text-gray-600">
          Real-time cryptocurrency prices, market trends, and trading data
        </p>
      </div>

      {/* Market Stats */}
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
                <DollarSign className="h-8 w-8 text-primary" />
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
                <Activity className="h-8 w-8 text-blue-600" />
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

      {/* Controls */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search coins by name or symbol..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={view === 'table' ? 'default' : 'outline'}
                onClick={() => setView('table')}
                className="flex items-center space-x-2"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Table View</span>
              </Button>
              <Button
                variant={view === 'cards' ? 'default' : 'outline'}
                onClick={() => setView('cards')}
                className="flex items-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span>Card View</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Market Data */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Cryptocurrency Prices</span>
                <Badge variant="outline">{filteredMarketData.length} coins</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {view === 'table' ? (
                <MarketTable data={filteredMarketData} />
              ) : (
                <div className="p-6">
                  <div className="grid gap-4">
                    {filteredMarketData.map((coin) => (
                      <div key={coin.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-gray-600">
                                {coin.symbol.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{coin.name}</h3>
                              <p className="text-sm text-gray-500">{coin.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatPrice(coin.currentPrice)}</p>
                            <p className={`text-sm font-medium ${
                              coin.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {formatPercentage(coin.priceChange24h)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <PriceChart data={coin} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Movers */}
        <div className="space-y-6">
          {/* Top Gainers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-600">
                <TrendingUp className="h-5 w-5" />
                <span>Top Gainers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topGainers.map((coin, index) => (
                  <div key={coin.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-500 w-4">{index + 1}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{coin.name}</p>
                        <p className="text-xs text-gray-500">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatPrice(coin.currentPrice)}</p>
                      <p className="text-sm font-bold text-green-600">
                        {formatPercentage(coin.priceChange24h)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Losers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <TrendingDown className="h-5 w-5" />
                <span>Top Losers</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topLosers.map((coin, index) => (
                  <div key={coin.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-500 w-4">{index + 1}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{coin.name}</p>
                        <p className="text-xs text-gray-500">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{formatPrice(coin.currentPrice)}</p>
                      <p className="text-sm font-bold text-red-600">
                        {formatPercentage(coin.priceChange24h)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}