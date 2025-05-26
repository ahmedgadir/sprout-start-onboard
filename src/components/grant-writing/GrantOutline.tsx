
import React from 'react';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Section {
  id: string;
  title: string;
  status: 'todo' | 'draft' | 'review' | 'final';
  wordCount?: number;
  wordLimit?: number;
}

interface GrantOutlineProps {
  currentSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const GrantOutline = ({ currentSection, onSectionChange }: GrantOutlineProps) => {
  const sections: Section[] = [
    { id: 'executive-summary', title: 'Executive Summary', status: 'draft', wordCount: 245, wordLimit: 500 },
    { id: 'need-statement', title: 'Statement of Need', status: 'todo', wordLimit: 1000 },
    { id: 'objectives', title: 'Objectives & Outcomes', status: 'todo', wordLimit: 800 },
    { id: 'methods', title: 'Methods & Activities', status: 'todo', wordLimit: 1200 },
    { id: 'evaluation', title: 'Evaluation Plan', status: 'todo', wordLimit: 600 },
    { id: 'budget-narrative', title: 'Budget Justification', status: 'todo', wordLimit: 400 },
    { id: 'timeline', title: 'Project Timeline', status: 'todo' },
    { id: 'budget-grid', title: 'Budget Grid', status: 'todo' },
    { id: 'logic-model', title: 'Logic Model', status: 'todo' },
  ];

  const getStatusIcon = (status: Section['status']) => {
    switch (status) {
      case 'final':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <Circle className="w-4 h-4 text-blue-500 fill-current" />;
      case 'review':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-300" />;
    }
  };

  const getStatusColor = (status: Section['status']) => {
    switch (status) {
      case 'final': return 'text-green-700';
      case 'draft': return 'text-blue-700';
      case 'review': return 'text-yellow-700';
      default: return 'text-gray-500';
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-900 mb-3">Section Outline</h3>
        
        <div className="space-y-1">
          {sections.map((section) => (
            <div
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "p-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50",
                currentSection === section.id && "bg-blue-50 border border-blue-200"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(section.status)}
                  <span className={cn(
                    "text-sm font-medium",
                    currentSection === section.id ? "text-blue-900" : "text-gray-700"
                  )}>
                    {section.title}
                  </span>
                </div>
                <span className={cn("text-xs capitalize", getStatusColor(section.status))}>
                  {section.status === 'todo' ? 'To Do' : section.status}
                </span>
              </div>
              
              {section.wordCount !== undefined && section.wordLimit && (
                <div className="mt-1 ml-6">
                  <div className="text-xs text-gray-500">
                    {section.wordCount} / {section.wordLimit} words
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                    <div 
                      className="bg-blue-500 h-1 rounded-full" 
                      style={{ width: `${Math.min((section.wordCount / section.wordLimit) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
