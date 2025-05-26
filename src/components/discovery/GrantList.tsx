
import React from 'react';
import { GrantCard } from './GrantCard';

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
  isNew?: boolean;
}

interface GrantListProps {
  onGrantSelect: (grantId: string) => void;
  selectedGrantId: string | null;
}

const mockGrants: Grant[] = [
  {
    id: '1',
    title: 'Community Food Security Initiative',
    funder: {
      name: 'Buffalo Foundation',
      logo: '/placeholder.svg'
    },
    fitScore: 94,
    hintChip: 'Geo & Programs match',
    awardRange: '$25k–$50k',
    deadline: new Date('2024-07-15'),
    tooltipReason: 'Top reason: HQ in Buffalo, NY falls within eligible region.',
    isNew: true
  },
  {
    id: '2',
    title: 'Youth Development Programs',
    funder: {
      name: 'Gates Foundation',
      logo: '/placeholder.svg'
    },
    fitScore: 87,
    hintChip: 'Youth focus',
    awardRange: '$100k–$250k',
    deadline: new Date('2024-06-30'),
    tooltipReason: 'Top reason: Your youth programs align with funder priorities.',
    isNew: true
  },
  {
    id: '3',
    title: 'Senior Nutrition Support',
    funder: {
      name: 'Ford Foundation',
      logo: '/placeholder.svg'
    },
    fitScore: 82,
    hintChip: 'Budget aligned',
    awardRange: '$50k–$100k',
    deadline: new Date('2024-08-20'),
    tooltipReason: 'Top reason: Your organization budget matches typical grantee size.'
  },
  {
    id: '4',
    title: 'Environmental Justice Initiative',
    funder: {
      name: 'Rockefeller Foundation',
      logo: '/placeholder.svg'
    },
    fitScore: 76,
    hintChip: 'Program alignment',
    awardRange: '$75k–$150k',
    deadline: new Date('2024-06-10'),
    tooltipReason: 'Top reason: Environmental programs match funder focus areas.'
  },
  {
    id: '5',
    title: 'Digital Equity Program',
    funder: {
      name: 'Knight Foundation',
      logo: '/placeholder.svg'
    },
    fitScore: 71,
    hintChip: 'Tech focus match',
    awardRange: '$30k–$75k',
    deadline: new Date('2024-09-15'),
    tooltipReason: 'Top reason: Technology initiatives align with digital equity goals.'
  }
];

export const GrantList = ({ onGrantSelect, selectedGrantId }: GrantListProps) => {
  const newGrantsCount = mockGrants.filter(grant => grant.isNew).length;
  const lastPulledDate = new Date('2024-05-26');

  return (
    <div className="h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Grant Discovery</h1>
        <div className="flex items-center justify-between mt-2">
          <p className="text-gray-600">
            {mockGrants.length} grants found matching your criteria
            {newGrantsCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {newGrantsCount} new
              </span>
            )}
          </p>
          <p className="text-sm text-gray-500">
            Last updated: {lastPulledDate.toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      </div>
      
      <div className="p-4 space-y-4 h-[calc(100%-120px)] overflow-y-auto">
        {mockGrants.map((grant) => (
          <GrantCard
            key={grant.id}
            grant={grant}
            isSelected={selectedGrantId === grant.id}
            onClick={() => onGrantSelect(grant.id)}
          />
        ))}
      </div>
    </div>
  );
};
