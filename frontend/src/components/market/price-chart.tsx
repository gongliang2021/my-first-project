'use client';

import { MarketData } from '@web3-daily-news/shared';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  data: MarketData;
}

export function PriceChart({ data }: PriceChartProps) {
  const sparklineData = data.sparklineData || [];
  
  const chartData = {
    labels: sparklineData.map((_, index) => {
      const hoursAgo = sparklineData.length - index - 1;
      return `${hoursAgo}h`;
    }).reverse(),
    
    datasets: [
      {
        label: data.symbol,
        data: sparklineData,
        borderColor: data.priceChange24h >= 0 ? '#22c55e' : '#ef4444',
        backgroundColor: data.priceChange24h >= 0 ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: data.priceChange24h >= 0 ? '#22c55e' : '#ef4444',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#333',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `$${context.parsed.y.toFixed(6)}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <div className="h-16 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}