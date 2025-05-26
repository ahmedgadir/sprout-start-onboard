
import React, { useState } from 'react';
import { X, Send, Lightbulb, BarChart3, Quote, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface AIAssistantProps {
  currentSection: string;
  onClose: () => void;
}

export const AIAssistant = ({ currentSection, onClose }: AIAssistantProps) => {
  const [message, setMessage] = useState('');
  const [suggestions] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Budget admin cost too high',
      description: 'Administrative costs are 28% of total budget, exceeding the 25% guideline.',
      action: 'Adjust budget allocation'
    },
    {
      id: 2,
      type: 'suggestion',
      title: 'Add impact statistics',
      description: 'Consider adding local youth unemployment statistics to strengthen your need statement.',
      action: 'Insert statistics'
    },
    {
      id: 3,
      type: 'improvement',
      title: 'Strengthen evaluation plan',
      description: 'Your evaluation section could benefit from more specific outcome measurements.',
      action: 'Add metrics'
    }
  ]);

  const quickActions = [
    { label: 'Shorten', icon: '✂️' },
    { label: 'Expand', icon: '📝' },
    { label: 'Add stat', icon: '📊' },
    { label: 'Cite source', icon: '📚' },
    { label: 'Improve flow', icon: '🌊' },
    { label: 'Check grammar', icon: '✓' }
  ];

  const factsSuggestions = [
    {
      id: 1,
      stat: '23% of youth in the district are unemployed',
      source: 'Bureau of Labor Statistics 2024',
      relevance: 'High'
    },
    {
      id: 2,
      stat: 'Programs like this show 67% success rate',
      source: 'Educational Research Journal 2023',
      relevance: 'Medium'
    },
    {
      id: 3,
      stat: '$1 invested in youth programs returns $7 in benefits',
      source: 'Social Impact Analysis 2024',
      relevance: 'High'
    }
  ];

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'improvement': return <Zap className="w-4 h-4 text-green-500" />;
      default: return <Lightbulb className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">AI Assistant</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Suggestions Queue */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Suggestions</h4>
          <div className="space-y-2">
            {suggestions.map((suggestion) => (
              <Card key={suggestion.id} className="p-3">
                <div className="flex items-start space-x-2">
                  {getSuggestionIcon(suggestion.type)}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {suggestion.title}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {suggestion.description}
                    </div>
                    <Button size="sm" variant="outline" className="mt-2">
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="justify-start"
              >
                <span className="mr-2">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Facts & Citations */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            <BarChart3 className="w-4 h-4 inline mr-1" />
            Relevant Facts
          </h4>
          <div className="space-y-2">
            {factsSuggestions.map((fact) => (
              <Card key={fact.id} className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <Quote className="w-3 h-3 text-gray-400 mt-1" />
                    <Badge variant={fact.relevance === 'High' ? 'default' : 'secondary'} className="text-xs">
                      {fact.relevance}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-900">{fact.stat}</div>
                  <div className="text-xs text-gray-500">{fact.source}</div>
                  <Button size="sm" variant="outline" className="w-full">
                    Insert with Citation
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask for help with this section..."
            className="min-h-[60px] resize-none"
          />
          <Button size="sm" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

// Import for AlertTriangle icon
const AlertTriangle = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.963-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);
