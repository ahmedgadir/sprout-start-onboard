
import React, { useState } from 'react';
import { Wand2, RotateCcw, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/grant-writing/RichTextEditor';
import { SentenceHighlighter } from '@/components/grant-writing/SentenceHighlighter';

interface GrantEditorProps {
  currentSection: string;
  grantData: any;
}

export const GrantEditor = ({ currentSection, grantData }: GrantEditorProps) => {
  const [editorMode, setEditorMode] = useState<'write' | 'review'>('write');
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [confidence, setConfidence] = useState(0.85);

  const sectionTitles: Record<string, string> = {
    'executive-summary': 'Executive Summary',
    'need-statement': 'Statement of Need',
    'objectives': 'Objectives & Outcomes',
    'methods': 'Methods & Activities',
    'evaluation': 'Evaluation Plan',
    'budget-narrative': 'Budget Justification',
    'timeline': 'Project Timeline',
    'budget-grid': 'Budget Grid',
    'logic-model': 'Logic Model',
  };

  const wordLimits: Record<string, number> = {
    'executive-summary': 500,
    'need-statement': 1000,
    'objectives': 800,
    'methods': 1200,
    'evaluation': 600,
    'budget-narrative': 400,
  };

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setContent(`This is a generated draft for the ${sectionTitles[currentSection]}. The content would be tailored based on the RFP requirements, organizational context, and best practices for this section type.`);
      setIsGenerating(false);
    }, 2000);
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-100 text-green-800';
    if (score >= 0.6) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getConfidenceText = (score: number) => {
    if (score >= 0.8) return 'High Confidence';
    if (score >= 0.6) return 'Medium Confidence';
    return 'Needs Review';
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Section Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            {sectionTitles[currentSection]}
          </h2>
          <div className="flex items-center space-x-2">
            {content && (
              <Badge className={getConfidenceColor(confidence)}>
                {getConfidenceText(confidence)}
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditorMode(editorMode === 'write' ? 'review' : 'write')}
            >
              <Eye className="w-4 h-4 mr-2" />
              {editorMode === 'write' ? 'Review Mode' : 'Edit Mode'}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              size="sm"
            >
              <Wand2 className="w-4 h-4 mr-2" />
              {isGenerating ? 'Generating...' : 'Generate Draft'}
            </Button>
            
            {content && (
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Regenerate
              </Button>
            )}
          </div>
          
          {wordLimits[currentSection] && (
            <div className="text-sm text-gray-500">
              {content.split(' ').length} / {wordLimits[currentSection]} words
            </div>
          )}
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!content ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Wand2 className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium mb-2">Ready to start writing?</h3>
              <p className="mb-4">Generate a draft or start writing manually</p>
              <Button onClick={handleGenerateDraft} disabled={isGenerating}>
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? 'Generating...' : 'Generate Draft'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {editorMode === 'write' ? (
              <RichTextEditor 
                content={content}
                onChange={setContent}
                placeholder={`Start writing your ${sectionTitles[currentSection].toLowerCase()}...`}
              />
            ) : (
              <SentenceHighlighter content={content} />
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Last saved: 2 minutes ago
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button size="sm">
              Mark as Final
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
