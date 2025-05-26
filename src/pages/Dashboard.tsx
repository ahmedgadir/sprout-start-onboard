
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { SummaryTiles } from '@/components/dashboard/SummaryTiles';
import { GrantPipelineKanban } from '@/components/dashboard/GrantPipelineKanban';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { TeamActivityFeed } from '@/components/dashboard/TeamActivityFeed';
import { AIInsightBanner } from '@/components/dashboard/AIInsightBanner';
import { NewGrantsWidget } from '@/components/dashboard/NewGrantsWidget';

const Dashboard = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-[72px]">
        {/* Top Bar */}
        <TopBar onSearchOpen={() => setSearchOpen(true)} />
        
        {/* Dashboard Content with improved spacing */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
          {/* Summary Tiles - now with better spacing */}
          <div className="mb-8">
            <SummaryTiles />
          </div>
          
          {/* Main Content Grid - redesigned for better proportions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[800px]">
            {/* Grant Pipeline Kanban - Takes up 2/3 of the width on large screens */}
            <div className="lg:col-span-2">
              <GrantPipelineKanban />
            </div>
            
            {/* Right Sidebar - Takes up 1/3 with better internal spacing */}
            <div className="space-y-6">
              {/* AI Insight Banner at the top */}
              <AIInsightBanner />
              
              {/* New Grants Widget */}
              <NewGrantsWidget />
              
              {/* Calendar/Timeline Widget */}
              <CalendarWidget />
              
              {/* Team Activity Feed */}
              <TeamActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
