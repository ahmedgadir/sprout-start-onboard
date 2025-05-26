
import React, { useState, useEffect } from 'react';
import { X, Star, Square, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FitSnapshot } from './FitSnapshot';
import { OverviewTab } from './OverviewTab';
import { RequirementsTab } from './RequirementsTab';
import { FunderProfileTab } from './FunderProfileTab';
import { NotesTab } from './NotesTab';

interface GrantPreviewDrawerProps {
  grantId: string;
  onClose: () => void;
}

const mockGrantData = {
  '1': {
    title: 'Community Food Security Initiative',
    funder: {
      name: 'Buffalo Foundation',
      logo: '/placeholder.svg'
    },
    fitScore: 94,
    awardRange: '$25k–$50k',
    deadline: new Date('2024-07-15'),
    fitReasons: [
      {
        category: 'Geography',
        description: 'Your programs operate in Erie County, NY, an eligible region.'
      },
      {
        category: 'Program alignment',
        description: 'Your Senior Meals initiative matches the funder\'s Food Security priority.'
      },
      {
        category: 'Org size',
        description: 'Typical grantee budgets $200k–$800k; yours is $450k.'
      }
    ]
  }
};

export const GrantPreviewDrawer = ({ grantId, onClose }: GrantPreviewDrawerProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const grant = mockGrantData[grantId as keyof typeof mockGrantData];

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore(prev => {
          const target = grant?.fitScore || 0;
          const increment = Math.ceil(target / 30);
          if (prev >= target) {
            clearInterval(interval);
            return target;
          }
          return Math.min(prev + increment, target);
        });
      }, 20);
      return () => clearInterval(interval);
    }, 100);

    return () => clearTimeout(timer);
  }, [grant?.fitScore]);

  if (!grant) return null;

  const getDeadlineColor = (deadline: Date) => {
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return 'bg-red-100 text-red-800';
    if (diffDays <= 30) return 'bg-orange-100 text-orange-800';
    return 'bg-gray-100 text-gray-800';
  };

  const formatDeadline = (deadline: Date) => {
    const now = new Date();
    const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Overdue';
    if (diffDays === 1) return '1 day';
    if (diffDays <= 30) return `${diffDays} days`;
    
    return deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header Bar */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="w-8 h-8 bg-[#2C6E49] rounded text-white text-xs font-bold flex items-center justify-center">
                {grant.funder.name.substring(0, 2).toUpperCase()}
              </div>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                {grant.title}
              </h2>
              <p className="text-xs text-gray-600">{grant.funder.name}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <Badge className={getDeadlineColor(grant.deadline)}>
            {formatDeadline(grant.deadline)}
          </Badge>
          <Badge variant="outline">{grant.awardRange}</Badge>
        </div>

        <Button variant="outline" size="sm" className="w-full">
          <span>Save to Pipeline</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Fit Snapshot - Always Visible */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <FitSnapshot 
          score={animatedScore}
          reasons={grant.fitReasons}
        />
      </div>

      {/* Tabbed Content */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="requirements" className="text-xs">Requirements</TabsTrigger>
            <TabsTrigger value="funder" className="text-xs">Funder</TabsTrigger>
            <TabsTrigger value="notes" className="text-xs">Notes</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="overview" className="mt-0 p-4">
              <OverviewTab />
            </TabsContent>
            <TabsContent value="requirements" className="mt-0 p-4">
              <RequirementsTab />
            </TabsContent>
            <TabsContent value="funder" className="mt-0 p-4">
              <FunderProfileTab />
            </TabsContent>
            <TabsContent value="notes" className="mt-0 p-4">
              <NotesTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Bottom Bar */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Star className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Square className="h-4 w-4 mr-1" />
            Compare
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Bell className="h-4 w-4 mr-1" />
            Alert
          </Button>
        </div>
      </div>
    </div>
  );
};
