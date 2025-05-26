
import React from 'react';
import { Calendar, DollarSign, Building, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GrantSnapshotProps {
  grantData: {
    title: string;
    funder: string;
    deadline: string;
    amount: string;
    status: string;
  };
}

export const GrantSnapshot = ({ grantData }: GrantSnapshotProps) => {
  const daysUntilDeadline = Math.ceil(
    (new Date(grantData.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-medium text-gray-900 mb-3">Grant Snapshot</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Funder:</span>
            <span className="font-medium">{grantData.funder}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium text-green-600">{grantData.amount}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Deadline:</span>
            <span className="font-medium">{grantData.deadline}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Days left:</span>
            <span className={`font-medium ${daysUntilDeadline < 7 ? 'text-red-600' : 'text-gray-900'}`}>
              {daysUntilDeadline}
            </span>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Completion Progress</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">35% complete</div>
        </div>
      </CardContent>
    </Card>
  );
};
