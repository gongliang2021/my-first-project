'use client';

import { MarketData } from '@web3-daily-news/shared';
import { formatPrice, formatPercentage, formatNumber } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketTableProps {
  data: MarketData[];
}

export function MarketTable({ data }: MarketTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-900">#</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">24h %</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">7d %</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">Market Cap</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-900">Volume (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr key={coin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 text-gray-600">{coin.rank}</td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-600">
                      {coin.symbol.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{coin.name}</div>
                    <div className="text-sm text-gray-500">{coin.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4 text-right font-medium text-gray-900">
                {formatPrice(coin.currentPrice)}
              </td>
              <td className="py-3 px-4 text-right">
                <div className={`flex items-center justify-end space-x-1 ${
                  coin.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {coin.priceChange24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-medium">
                    {formatPercentage(coin.priceChange24h)}
                  </span>
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <span className={`font-medium ${
                  coin.priceChange7d >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercentage(coin.priceChange7d)}
                </span>
              </td>
              <td className="py-3 px-4 text-right font-medium text-gray-900">
                {formatNumber(coin.marketCap)}
              </td>
              <td className="py-3 px-4 text-right font-medium text-gray-900">
                {formatNumber(coin.volume24h)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}