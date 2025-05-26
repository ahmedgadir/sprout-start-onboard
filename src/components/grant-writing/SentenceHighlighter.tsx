
import React, { useState } from 'react';
import { RotateCcw, MessageCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SentenceHighlighterProps {
  content: string;
}

type SentenceQuality = 'good' | 'review' | 'problematic';

interface AnalyzedSentence {
  text: string;
  quality: SentenceQuality;
  feedback?: string;
  suggestions?: string[];
}

export const SentenceHighlighter = ({ content }: SentenceHighlighterProps) => {
  const [selectedSentence, setSelectedSentence] = useState<number | null>(null);

  // Mock sentence analysis
  const analyzeSentences = (text: string): AnalyzedSentence[] => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    return sentences.map((sentence, index) => {
      const wordCount = sentence.trim().split(' ').length;
      let quality: SentenceQuality = 'good';
      let feedback = '';
      let suggestions: string[] = [];

      if (wordCount > 25) {
        quality = 'review';
        feedback = 'Consider breaking this long sentence into shorter ones for better readability.';
        suggestions = ['Split into two sentences', 'Remove unnecessary words', 'Simplify structure'];
      } else if (sentence.includes('very') || sentence.includes('really')) {
        quality = 'review';
        feedback = 'Consider using more specific descriptive words.';
        suggestions = ['Replace with stronger adjectives', 'Be more specific'];
      } else if (Math.random() > 0.8) {
        quality = 'problematic';
        feedback = 'This sentence may need significant revision.';
        suggestions = ['Rewrite for clarity', 'Check grammar', 'Improve flow'];
      }

      return {
        text: sentence.trim(),
        quality,
        feedback,
        suggestions
      };
    });
  };

  const sentences = analyzeSentences(content);

  const getHighlightClass = (quality: SentenceQuality) => {
    switch (quality) {
      case 'good':
        return 'bg-green-100 hover:bg-green-150 border-green-200';
      case 'review':
        return 'bg-yellow-100 hover:bg-yellow-150 border-yellow-200';
      case 'problematic':
        return 'bg-red-100 hover:bg-red-150 border-red-200';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>Good</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
            <span>Needs Review</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
            <span>Problematic</span>
          </div>
        </div>
      </div>

      <div className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
        {sentences.map((sentence, index) => (
          <Popover key={index}>
            <PopoverTrigger asChild>
              <span
                className={`inline-block m-1 p-1 rounded border cursor-pointer transition-colors ${getHighlightClass(sentence.quality)}`}
                onClick={() => setSelectedSentence(index)}
              >
                {sentence.text}.
              </span>
            </PopoverTrigger>
            {sentence.feedback && (
              <PopoverContent className="w-80" side="top">
                <div className="space-y-3">
                  <div className="text-sm font-medium">Feedback</div>
                  <div className="text-sm text-gray-600">{sentence.feedback}</div>
                  
                  {sentence.suggestions && sentence.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-sm font-medium">Suggestions</div>
                      <div className="space-y-1">
                        {sentence.suggestions.map((suggestion, idx) => (
                          <Button
                            key={idx}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start text-left"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button size="sm" variant="outline">
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Rewrite
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Explain
                    </Button>
                    <Button size="sm" variant="outline">
                      <Check className="w-3 h-3 mr-1" />
                      Accept
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            )}
          </Popover>
        ))}
      </div>
    </div>
  );
};
