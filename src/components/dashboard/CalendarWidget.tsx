
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const events = [
  { date: 15, type: 'proposal', title: 'Youth Grant Proposal Due' },
  { date: 18, type: 'report', title: 'Q1 Progress Report' },
  { date: 22, type: 'loi', title: 'Environmental Grant LOI' },
  { date: 25, type: 'task', title: 'Budget Review Meeting' },
];

const upcomingItems = [
  { title: 'Youth Education Initiative Proposal', type: 'Proposal Due', date: 'Jun 15', urgent: true },
  { title: 'Community Health Progress Report', type: 'Report Due', date: 'Jun 18', urgent: false },
  { title: 'Environmental Grant Letter of Intent', type: 'LOI Due', date: 'Jun 22', urgent: false },
];

export const CalendarWidget = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'timeline'>('calendar');
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = events.filter(event => event.date === day);
      days.push(
        <div key={day} className="h-8 relative">
          <button className="w-full h-full text-sm hover:bg-gray-100 rounded flex items-center justify-center relative">
            {day}
            {dayEvents.length > 0 && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      event.type === 'proposal' && "bg-blue-500",
                      event.type === 'report' && "bg-green-500",
                      event.type === 'loi' && "bg-purple-500",
                      event.type === 'task' && "bg-orange-500"
                    )}
                  />
                ))}
              </div>
            )}
          </button>
        </div>
      );
    }

    return days;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Calendar & Timeline</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('calendar')}
            className={cn(
              "px-3 py-1 text-sm rounded transition-colors",
              activeTab === 'calendar'
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={cn(
              "px-3 py-1 text-sm rounded transition-colors",
              activeTab === 'timeline'
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Timeline
          </button>
        </div>
      </div>

      {activeTab === 'calendar' ? (
        <div>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h4>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Day Labels */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Upcoming & Overdue
          </h4>
          {upcomingItems.map((item, index) => (
            <div
              key={index}
              className={cn(
                "p-3 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors",
                item.urgent ? "border-red-200 bg-red-50" : "border-gray-200"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h5 className="font-medium text-sm text-gray-900">{item.title}</h5>
                  <p className="text-xs text-gray-600">{item.type}</p>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-medium",
                    item.urgent ? "text-red-600" : "text-gray-600"
                  )}>
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
