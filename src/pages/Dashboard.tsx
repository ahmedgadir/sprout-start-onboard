
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { NewGrantsWidget } from '@/components/dashboard/NewGrantsWidget';
import { CalendarWidget } from '@/components/dashboard/CalendarWidget';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, FileText, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 ml-[72px]">
        {/* Top Bar */}
        <TopBar onSearchOpen={() => setSearchOpen(true)} />
        
        {/* Dashboard Content */}
        <div className="p-8 max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-semibold text-gray-900 mb-4 leading-relaxed">
              Welcome back to Fundsprout
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find the perfect grants for your organization
            </p>
          </div>
          
          {/* Main Action - Big Green Button */}
          <div className="text-center mb-12">
            <Link to="/discovery">
              <Button 
                size="lg" 
                className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-12 py-6 text-xl font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Search className="w-6 h-6 mr-3" />
                Find Grants
              </Button>
            </Link>
          </div>

          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Open Drafts */}
            <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Open Drafts</p>
                  <p className="text-3xl font-semibold text-gray-900">3</p>
                </div>
              </div>
              <Link to="/writing/demo">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full text-[#22C55E] border-[#22C55E] hover:bg-[#22C55E] hover:text-white"
                >
                  Continue Writing
                </Button>
              </Link>
            </Card>

            {/* Funding Won */}
            <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Funding Won</p>
                  <p className="text-3xl font-semibold text-gray-900">$485K</p>
                  <p className="text-sm text-green-600 font-medium">+$125K this month</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-[#22C55E] border-[#22C55E] hover:bg-[#22C55E] hover:text-white"
              >
                View Reports
              </Button>
            </Card>
            
            {/* Next Deadline */}
            <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Next Deadline</p>
                  <p className="text-xl font-semibold text-gray-900">June 30</p>
                  <p className="text-sm text-red-600 font-medium">26 days away</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="w-full text-[#22C55E] border-[#22C55E] hover:bg-[#22C55E] hover:text-white"
              >
                View Calendar
              </Button>
            </Card>
          </div>

          {/* Widgets Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* New Grants Widget */}
            <NewGrantsWidget />
            
            {/* Calendar Widget */}
            <CalendarWidget />
          </div>
          
          {/* Clean spacing at bottom */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
