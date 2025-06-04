
import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { TopBar } from '@/components/dashboard/TopBar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, FileText, Calendar } from 'lucide-react';
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
        
        {/* Dashboard Content - Clean and simple */}
        <div className="p-12 max-w-4xl mx-auto">
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
          <div className="text-center mb-16">
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
          
          {/* Simple Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Open Drafts */}
            <Card className="p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Open Drafts</p>
                  <p className="text-3xl font-semibold text-gray-900">3</p>
                </div>
              </div>
              <div className="mt-4">
                <Link to="/writing/demo">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-[#22C55E] border-[#22C55E] hover:bg-[#22C55E] hover:text-white"
                  >
                    Continue Writing
                  </Button>
                </Link>
              </div>
            </Card>
            
            {/* Next Deadline */}
            <Card className="p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Next Deadline</p>
                  <p className="text-xl font-semibold text-gray-900">June 30</p>
                  <p className="text-sm text-gray-500">26 days away</p>
                </div>
              </div>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-[#22C55E] border-[#22C55E] hover:bg-[#22C55E] hover:text-white"
                >
                  View Calendar
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Clean spacing at bottom */}
          <div className="h-16"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
