
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Lightbulb, TrendingUp, Target } from 'lucide-react';

const insights = [
  {
    id: 1,
    icon: TrendingUp,
    title: '3 Drafting grants lack budgets',
    description: 'Generate detailed budgets to improve submission readiness',
    action: 'Generate Budgets',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 2,
    icon: Target,
    title: '4 new grants match your focus areas',
    description: 'Youth + Health opportunities found in our database',
    action: 'View Matches',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 3,
    icon: Lightbulb,
    title: 'Optimize your proposal language',
    description: 'AI suggests improvements for stronger applications',
    action: 'Review Suggestions',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
];

export const AIInsightBanner = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const insight = insights[currentInsight];
  const Icon = insight.icon;

  return (
    <Card className={`p-4 ${insight.bgColor} ${insight.borderColor} border`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 rounded-lg bg-white shadow-sm`}>
            <Icon className={`w-5 h-5 ${insight.color}`} />
          </div>
          
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
            
            <div className="flex items-center space-x-2">
              <Button size="sm" className="bg-[#2C6E49] hover:bg-[#1B4332] text-white">
                {insight.action}
              </Button>
              
              {insights.length > 1 && (
                <div className="flex space-x-1">
                  {insights.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentInsight(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentInsight ? 'bg-gray-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDismissed(true)}
          className="text-gray-400 hover:text-gray-600 -mr-2 -mt-2"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
