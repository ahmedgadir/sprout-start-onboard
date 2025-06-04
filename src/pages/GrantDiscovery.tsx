
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GrantList } from '@/components/discovery/GrantList';
import { GrantPreviewDrawer } from '@/components/discovery/GrantPreviewDrawer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const GrantDiscovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGrantId, setSelectedGrantId] = useState<string | null>(
    searchParams.get('grantId')
  );

  useEffect(() => {
    const grantId = searchParams.get('grantId');
    setSelectedGrantId(grantId);
  }, [searchParams]);

  const handleGrantSelect = (grantId: string) => {
    setSelectedGrantId(grantId);
    setSearchParams({ grantId });
  };

  const handleCloseDrawer = () => {
    setSelectedGrantId(null);
    setSearchParams({});
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedGrantId) {
        handleCloseDrawer();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedGrantId]);

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Grant Discovery</h1>
      </div>
      
      <div className="h-[calc(100vh-64px)]">
        <ResizablePanelGroup 
          direction="horizontal" 
          key={selectedGrantId ? 'split' : 'single'}
        >
          <ResizablePanel 
            defaultSize={selectedGrantId ? 55 : 100} 
            minSize={50}
            id="grant-list-panel"
          >
            <GrantList 
              onGrantSelect={handleGrantSelect}
              selectedGrantId={selectedGrantId}
            />
          </ResizablePanel>
          
          {selectedGrantId && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel 
                defaultSize={45} 
                minSize={25} 
                maxSize={50}
                id="grant-preview-panel"
              >
                <GrantPreviewDrawer 
                  grantId={selectedGrantId}
                  onClose={handleCloseDrawer}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default GrantDiscovery;
