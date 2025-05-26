
import React, { useState } from 'react';
import { Star, Square, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface Grant {
  id: string;
  title: string;
  funder: {
    name: string;
    logo: string;
  };
  fitScore: number;
  hintChip: string;
  awardRange: string;
  deadline: Date;
  tooltipReason: string;
}

interface GrantCardProps {
  grant: Grant;
  isSelected: boolean;
  onClick: () => void;
}

export const GrantCard = ({ grant, isSelected, onClick }: GrantCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const getFitScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div
      className={cn(
        "relative p-4 border rounded-lg cursor-pointer transition-all duration-200",
        isSelected
          ? "border-[#2C6E49] bg-green-50 shadow-md"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Funder Logo */}
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <div className="w-8 h-8 bg-[#2C6E49] rounded text-white text-xs font-bold flex items-center justify-center">
            {grant.funder.name.substring(0, 2).toUpperCase()}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 truncate pr-2">
              {grant.title}
            </h3>
            
            {/* Fit Score Ring */}
            <div className="flex-shrink-0">
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${grant.fitScore * 1.26} 126`}
                    className={getFitScoreColor(grant.fitScore)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={cn("text-xs font-bold", getFitScoreColor(grant.fitScore))}>
                    {grant.fitScore}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">{grant.funder.name}</p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              {grant.hintChip}
            </Badge>
            <Badge variant="outline" className="text-gray-700">
              {grant.awardRange}
            </Badge>
            <Badge className={cn("text-xs", getDeadlineColor(grant.deadline))}>
              {formatDeadline(grant.deadline)}
            </Badge>
          </div>

          {/* Tooltip */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-xs text-gray-500 cursor-help">
                Why this matches →
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{grant.tooltipReason}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Quick Actions on Hover */}
      {isHovered && (
        <div className="absolute top-2 right-2 flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white shadow-sm hover:bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Star className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white shadow-sm hover:bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 bg-white shadow-sm hover:bg-gray-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
