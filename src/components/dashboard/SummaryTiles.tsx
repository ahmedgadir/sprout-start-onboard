
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
  },
  {
    title: 'Deadlines ≤ 14 days',
    value: 3,
    icon: Clock,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    hasAlert: true,
  },
  {
    title: 'Funding in Pipeline',
    value: 485000,
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    isCurrency: true,
  },
  {
    title: 'Reports Due',
    value: 2,
    icon: FileText,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
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
    <div className="grid grid-cols-4 gap-6">
      {tiles.map((tile, index) => {
        const Icon = tile.icon;
        return (
          <Card
            key={tile.title}
            className="p-6 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              // Filter Kanban to relevant cards
              console.log(`Filtering by ${tile.title}`);
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {tile.title}
                </p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatValue(animatedValues[index], tile.isCurrency || false)}
                  </p>
                  {tile.hasAlert && tile.value > 0 && (
                    <Flame className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${tile.bgColor}`}>
                <Icon className={`w-6 h-6 ${tile.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
