
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Share, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { GrantSnapshot } from '@/components/grant-writing/GrantSnapshot';
import { GrantOutline } from '@/components/grant-writing/GrantOutline';
import { AttachmentChecklist } from '@/components/grant-writing/AttachmentChecklist';
import { GrantEditor } from '@/components/grant-writing/GrantEditor';
import { AIAssistant } from '@/components/grant-writing/AIAssistant';

const GrantWriting = () => {
  const { grantId } = useParams();
  const [aiAssistantOpen, setAiAssistantOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('executive-summary');
  const [grantStatus, setGrantStatus] = useState<'Draft' | 'In Review' | 'Final'>('Draft');

  // Mock grant data
  const grantData = {
    title: "Youth Development and Education Initiative",
    funder: "Department of Education",
    deadline: "2024-03-15",
    amount: "$250,000",
    status: grantStatus
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'In Review': return 'bg-blue-100 text-blue-800';
      case 'Final': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{grantData.title}</h1>
              <p className="text-sm text-gray-500">{grantData.funder} • {grantData.amount}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge className={getStatusColor(grantData.status)}>
              {grantData.status}
            </Badge>
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Version History
            </Button>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Collaborators
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[calc(100vh-73px)]">
        <ResizablePanelGroup direction="horizontal">
          {/* Left Rail */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full bg-white border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Grant Overview</h2>
              </div>
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-4 p-4">
                  <GrantSnapshot grantData={grantData} />
                  <GrantOutline 
                    currentSection={currentSection}
                    onSectionChange={setCurrentSection}
                  />
                  <AttachmentChecklist />
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center - Editor */}
          <ResizablePanel defaultSize={aiAssistantOpen ? 50 : 70} minSize={40}>
            <GrantEditor 
              currentSection={currentSection}
              grantData={grantData}
            />
          </ResizablePanel>

          {/* Right Rail - AI Assistant */}
          {aiAssistantOpen && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={30} minSize={25} maxSize={40}>
                <AIAssistant 
                  currentSection={currentSection}
                  onClose={() => setAiAssistantOpen(false)}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default GrantWriting;
