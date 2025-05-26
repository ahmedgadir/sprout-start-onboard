
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Clock, DollarSign, FileText, Flame } from 'lucide-react';

const tiles = [
  {
    title: 'Open Grants',
    value: 12,
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    change: '+2 this week',
    changeColor: 'text-green-600',
  },
  {
    title: 'Deadlines ≤ 14 days',
    value: 3,
    icon: Clock,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    hasAlert: true,
    change: '2 urgent',
    changeColor: 'text-red-600',
  },
  {
    title: 'Funding in Pipeline',
    value: 485000,
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    isCurrency: true,
    change: '+$125K this month',
    changeColor: 'text-green-600',
  },
  {
    title: 'Reports Due',
    value: 2,
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    change: 'This month',
    changeColor: 'text-gray-600',
  },
];

export const SummaryTiles = () => {
  const [animatedValues, setAnimatedValues] = useState(tiles.map(() => 0));

  useEffect(() => {
    // Animate count-up on load
    tiles.forEach((tile, index) => {
      const finalValue = tile.value;
      const duration = 1000; // 1 second
      const steps = 20;
      const increment = finalValue / steps;
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= finalValue) {
          currentValue = finalValue;
          clearInterval(timer);
        }
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.floor(currentValue);
          return newValues;
        });
      }, duration / steps);
    });
  }, []);

  const formatValue = (value: number, isCurrency: boolean) => {
    if (isCurrency) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value);
    }
    return value.toLocaleString();
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your grants.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiles.map((tile, index) => {
          const Icon = tile.icon;
          return (
            <Card
              key={tile.title}
              className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm hover:scale-105"
              onClick={() => {
                // Filter Kanban to relevant cards
                console.log(`Filtering by ${tile.title}`);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-3">
                    <p className="text-sm font-medium text-gray-600">
                      {tile.title}
                    </p>
                    {tile.hasAlert && tile.value > 0 && (
                      <Flame className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-bold text-gray-900">
                      {formatValue(animatedValues[index], tile.isCurrency || false)}
                    </p>
                    <p className={`text-sm font-medium ${tile.changeColor}`}>
                      {tile.change}
                    </p>
                  </div>
                </div>
                <div className={`p-3 rounded-xl ${tile.bgColor}`}>
                  <Icon className={`w-6 h-6 ${tile.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
