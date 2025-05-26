
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Grant {
  id: string;
  title: string;
  funder: string;
  amount: string;
  deadline: string;
  location: string;
  tags: string[];
  description: string;
  contact: string;
  website: string;
  eligibility: string;
  requirements: string[];
  funderProfile: string;
  notes: string;
}

interface NotesTabProps {
  grant: Grant;
}

export const NotesTab = ({ grant }: NotesTabProps) => {
  const [notes, setNotes] = useState(grant.notes);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900">Shared Notes</h4>
        <span className="text-xs text-gray-500">Auto-saved</span>
      </div>
      
      <div className="space-y-3">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full min-h-[200px] p-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2C6E49] focus:border-transparent"
          placeholder="Add notes about this grant opportunity..."
        />
        
        <div className="text-xs text-gray-500">
          <p>Use @mentions to notify team members</p>
          <p className="mt-1">Last edited by John Doe • 2 hours ago</p>
        </div>
      </div>
    </div>
  );
};
