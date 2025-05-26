
import React from 'react';
import { CheckCircle, Circle, Upload, Paperclip } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Attachment {
  id: string;
  name: string;
  required: boolean;
  uploaded: boolean;
  fileSize?: string;
}

export const AttachmentChecklist = () => {
  const attachments: Attachment[] = [
    { id: '1', name: 'Organization IRS Letter', required: true, uploaded: true, fileSize: '2.1 MB' },
    { id: '2', name: 'Audited Financial Statement', required: true, uploaded: false },
    { id: '3', name: 'Board of Directors List', required: true, uploaded: false },
    { id: '4', name: 'Letters of Support', required: false, uploaded: true, fileSize: '1.8 MB' },
    { id: '5', name: 'Organizational Chart', required: false, uploaded: false },
    { id: '6', name: 'Previous Grant Reports', required: false, uploaded: false },
  ];

  const requiredCount = attachments.filter(a => a.required).length;
  const uploadedRequired = attachments.filter(a => a.required && a.uploaded).length;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Attachments</h3>
          <span className="text-xs text-gray-500">
            {uploadedRequired}/{requiredCount} required
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          {attachments.map((attachment) => (
            <div key={attachment.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-2">
                {attachment.uploaded ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300" />
                )}
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    {attachment.name}
                    {attachment.required && <span className="text-red-500 ml-1">*</span>}
                  </div>
                  {attachment.uploaded && attachment.fileSize && (
                    <div className="text-xs text-gray-500">{attachment.fileSize}</div>
                  )}
                </div>
              </div>
              
              {!attachment.uploaded && (
                <Paperclip className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500 mb-1">Required Attachments</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${(uploadedRequired / requiredCount) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
