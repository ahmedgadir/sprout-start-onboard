
import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Command } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TopBarProps {
  onSearchOpen: () => void;
}

export const TopBar = ({ onSearchOpen }: TopBarProps) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="h-[56px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left Side - Org Switcher */}
      <div className="flex items-center space-x-4">
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-6 h-6 bg-[#2C6E49] rounded text-white text-xs font-bold flex items-center justify-center">
            AC
          </div>
          <span className="font-medium text-gray-900">Acme Charity</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      {/* Center - Global Search */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search grants, funders, docs..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-10 pr-20 h-10 bg-gray-50 border-gray-200 focus:bg-white"
            onFocus={onSearchOpen}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1 text-xs text-gray-400">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>
      
      {/* Right Side - Notifications & User */}
      <div className="flex items-center space-x-3">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5 text-gray-500" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
        </Button>
        
        {/* User Avatar */}
        <button className="flex items-center space-x-2 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">
          <div className="w-8 h-8 bg-[#4C956C] rounded-full flex items-center justify-center text-white text-sm font-medium">
            JD
          </div>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};
