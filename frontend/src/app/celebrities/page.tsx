'use client';

import { useState, useEffect } from 'react';
import { Celebrity } from '@web3-daily-news/shared';
import { celebrityApi } from '@/lib/api';
import { CelebrityCard } from '@/components/celebrity/celebrity-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, Search } from 'lucide-react';

export default function CelebritiesPage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [trendingCelebrities, setTrendingCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTrending, setShowTrending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [celebritiesData, trendingData] = await Promise.all([
          celebrityApi.getCelebrities({ page: 1, limit: 50 }),
          celebrityApi.getTrendingCelebrities(10),
        ]);

        setCelebrities(celebritiesData.data);
        setTrendingCelebrities(trendingData);
      } catch (error) {
        console.error('Error fetching celebrities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCelebrities = celebrities.filter(celebrity =>
    celebrity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    celebrity.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    celebrity.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    celebrity.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const displayCelebrities = showTrending ? trendingCelebrities : filteredCelebrities;

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Crypto Celebrities</h1>
        <p className="text-gray-600">
          Follow the thoughts and updates from the most influential people in the Web3 space
        </p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search celebrities by name, role, or expertise..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={showTrending ? "default" : "outline"}
                onClick={() => setShowTrending(true)}
                className="flex items-center space-x-2"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </Button>
              <Button
                variant={!showTrending ? "default" : "outline"}
                onClick={() => setShowTrending(false)}
                className="flex items-center space-x-2"
              >
                <Users className="h-4 w-4" />
                <span>All Celebrities</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Celebrities</p>
                <p className="text-2xl font-bold text-gray-900">{celebrities.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Trending Now</p>
                <p className="text-2xl font-bold text-gray-900">{trendingCelebrities.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Search Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {showTrending ? trendingCelebrities.length : filteredCelebrities.length}
                </p>
              </div>
              <Search className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Celebrity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCelebrities.map((celebrity) => (
          <CelebrityCard key={celebrity.id} celebrity={celebrity} />
        ))}
      </div>

      {displayCelebrities.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No celebrities found</h3>
          <p className="text-gray-500">
            {searchTerm ? 'Try adjusting your search terms' : 'Check back later for updates'}
          </p>
        </div>
      )}

      {/* Expertise Tags */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Popular Expertise Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['Ethereum', 'Layer 2', 'DeFi', 'NFT', 'Gaming', 'AI', 'Regulation', 'Trading'].map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                onClick={() => setSearchTerm(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}