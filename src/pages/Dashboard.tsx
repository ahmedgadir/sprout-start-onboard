
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { SummaryTiles } from '@/components/dashboard/SummaryTiles';
import { GrantPipelineKanban } from '@/components/dashboard/GrantPipelineKanban';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { TeamActivityFeed } from '@/components/dashboard/TeamActivityFeed';
import { AIInsightBanner } from '@/components/dashboard/AIInsightBanner';

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
        
        {/* Dashboard Content */}
        <div className="p-6 space-y-6">
          {/* Summary Tiles */}
          <SummaryTiles />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Grant Pipeline Kanban - 60% width */}
            <div className="col-span-7">
              <GrantPipelineKanban />
            </div>
            
            {/* Right Column - 35% width */}
            <div className="col-span-5 space-y-6">
              {/* Calendar/Timeline Widget */}
              <CalendarWidget />
              
              {/* AI Insight Banner */}
              <AIInsightBanner />
              
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
