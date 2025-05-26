
import React from 'react';
import { Textarea } from '@/components/ui/textarea';

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[400px] resize-none border-0 shadow-none text-base leading-relaxed p-0 focus-visible:ring-0"
        style={{ fontFamily: 'Georgia, serif' }}
      />
    </div>
  );
};
