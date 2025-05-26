
import React from 'react';
import { Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface FitReason {
  category: string;
  description: string;
}

interface FitSnapshotProps {
  score: number;
  reasons: FitReason[];
}

export const FitSnapshot = ({ score, reasons }: FitSnapshotProps) => {
  const getFitScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFitLevel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Fair';
    return 'Low';
  };

  return (
    <div className="space-y-4">
      {/* Fit Score Ring */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-gray-200"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${score * 1.76} 176`}
                className={cn(getFitScoreColor(score), "transition-all duration-600")}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn("text-lg font-bold", getFitScoreColor(score))}>
                {score}%
              </span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-gray-900">Fit Score</h3>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className={cn("text-sm cursor-help", getFitScoreColor(score))}>
                {getFitLevel(score)} match
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1 text-xs">
                <div>90-100%: Excellent</div>
                <div>75-89%: Strong</div>
                <div>50-74%: Fair</div>
                <div>&lt;50%: Low</div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Why This is a Match */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Why this is a match</h4>
        <div className="space-y-3">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <div>
                <span className="font-medium text-gray-900">{reason.category}</span>
                <span className="text-gray-600"> — "{reason.description}"</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
