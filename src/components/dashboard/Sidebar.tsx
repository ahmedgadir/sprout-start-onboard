
import React from 'react';
import { 
  Home, 
  Search, 
  FileText, 
  TrendingUp, 
  FolderOpen, 
  Settings,
  Target
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: Search, label: 'Discover', path: '/discovery' },
  { icon: FileText, label: 'Drafts & Proposals', path: '/proposals' },
  { icon: TrendingUp, label: 'Progress Reports', path: '/reports' },
  { icon: FolderOpen, label: 'Documents', path: '/documents' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 w-[72px] h-full bg-white border-r border-gray-200 flex flex-col items-center py-4 z-10">
      {/* Logo */}
      <div className="w-10 h-10 bg-[#2C6E49] rounded-lg flex items-center justify-center mb-8">
        <Target className="w-6 h-6 text-white" />
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center transition-colors group relative",
                isActive
                  ? "bg-[#2C6E49] text-white"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              )}
              title={item.label}
            >
              <Icon className="w-5 h-5" />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
