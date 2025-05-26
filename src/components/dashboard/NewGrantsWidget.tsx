
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NewGrant {
  id: string;
  title: string;
  funder: string;
  fitScore: number;
  awardRange: string;
  deadline: Date;
}

const newGrants: NewGrant[] = [
  {
    id: '1',
    title: 'Community Food Security Initiative',
    funder: 'Buffalo Foundation',
    fitScore: 94,
    awardRange: '$25k–$50k',
    deadline: new Date('2024-07-15')
  },
  {
    id: '2', 
    title: 'Youth Development Programs',
    funder: 'Gates Foundation',
    fitScore: 87,
    awardRange: '$100k–$250k',
    deadline: new Date('2024-06-30')
  }
];

export const NewGrantsWidget = () => {
  const lastPulledDate = new Date('2024-05-26');

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-[#2C6E49]" />
          <h3 className="text-lg font-semibold text-gray-900">New Grants</h3>
          <Badge className="bg-green-100 text-green-800">
            {newGrants.length} new
          </Badge>
        </div>
        <Link to="/discovery">
          <Button variant="ghost" size="sm">
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        Last updated: {lastPulledDate.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </p>

      <div className="space-y-3">
        {newGrants.map((grant) => (
          <Link 
            key={grant.id}
            to={`/discovery?grantId=${grant.id}`}
            className="block"
          >
            <div className="p-3 border border-gray-200 rounded-lg hover:border-[#2C6E49] hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
                  {grant.title}
                </h4>
                <div className="flex items-center space-x-1 ml-2">
                  <div className="w-8 h-8 bg-[#2C6E49] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {grant.fitScore}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mb-2">{grant.funder}</p>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {grant.awardRange}
                </Badge>
                <span className="text-xs text-gray-500">
                  {Math.ceil((grant.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}d
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link to="/discovery">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4 text-[#2C6E49] border-[#2C6E49] hover:bg-[#2C6E49] hover:text-white"
        >
          View All Grants
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </Link>
    </Card>
  );
};
