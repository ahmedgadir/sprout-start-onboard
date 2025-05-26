
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { GrantList } from '@/components/discovery/GrantList';
import { GrantPreviewDrawer } from '@/components/discovery/GrantPreviewDrawer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const GrantDiscovery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGrantId, setSelectedGrantId] = useState<string | null>(
    searchParams.get('grantId')
  );
  const [searchOpen, setSearchOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 ml-[72px]">
        <TopBar onSearchOpen={() => setSearchOpen(true)} />
        
        <div className="h-[calc(100vh-56px)]">
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
    </div>
  );
};

export default GrantDiscovery;
