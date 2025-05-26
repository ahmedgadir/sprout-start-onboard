
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { MoreHorizontal, Plus, Calendar, DollarSign, Filter, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const columns = [
  { id: 'ideas', title: 'Ideas & Leads', count: 3, color: 'bg-slate-50 border-slate-200', headerColor: 'bg-slate-100' },
  { id: 'researching', title: 'Researching', count: 5, color: 'bg-blue-50 border-blue-200', headerColor: 'bg-blue-100' },
  { id: 'drafting', title: 'Drafting', count: 4, color: 'bg-amber-50 border-amber-200', headerColor: 'bg-amber-100' },
  { id: 'ready', title: 'Ready to Submit', count: 2, color: 'bg-purple-50 border-purple-200', headerColor: 'bg-purple-100' },
  { id: 'submitted', title: 'Submitted', count: 6, color: 'bg-emerald-50 border-emerald-200', headerColor: 'bg-emerald-100' },
  { id: 'reporting', title: 'Reporting', count: 3, color: 'bg-orange-50 border-orange-200', headerColor: 'bg-orange-100' },
];

const sampleGrants = [
  {
    id: 1,
    title: 'Youth Education Initiative',
    funder: 'Gates Foundation',
    amount: 250000,
    deadline: '2024-06-15',
    assignees: ['JD', 'MK'],
    status: 'researching',
    description: 'Comprehensive program to improve STEM education access in underserved communities',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Community Health Program',
    funder: 'Ford Foundation', 
    amount: 150000,
    deadline: '2024-06-08',
    assignees: ['JD'],
    status: 'drafting',
    description: 'Mental health support services for underserved communities nationwide',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'Environmental Sustainability Project',
    funder: 'MacArthur Foundation',
    amount: 500000,
    deadline: '2024-07-01',
    assignees: ['MK', 'AB', 'CD'],
    status: 'ideas',
    description: 'Climate change resilience and adaptation strategies in urban areas',
    priority: 'high',
  },
  {
    id: 4,
    title: 'Digital Literacy Program',
    funder: 'Google Foundation',
    amount: 75000,
    deadline: '2024-05-30',
    assignees: ['AB'],
    status: 'ready',
    description: 'Teaching digital skills to elderly populations in rural areas',
    priority: 'medium',
  },
  {
    id: 5,
    title: 'Arts Access Initiative',
    funder: 'National Arts Council',
    amount: 125000,
    deadline: '2024-07-15',
    assignees: ['CD', 'EF'],
    status: 'submitted',
    description: 'Expanding arts education programs in underserved schools',
    priority: 'low',
  },
  {
    id: 6,
    title: 'Clean Water Project',
    funder: 'Gates Foundation',
    amount: 300000,
    deadline: '2024-08-01',
    assignees: ['JD', 'MK', 'GH'],
    status: 'reporting',
    description: 'Installing water filtration systems in developing communities',
    priority: 'high',
  },
];

export const GrantPipelineKanban = () => {
  const [grants, setGrants] = useState(sampleGrants);
  const [visibleColumns, setVisibleColumns] = useState(0);
  const columnsPerView = 3;

  const getGrantsForColumn = (columnId: string) => {
    return grants.filter(grant => grant.status === columnId);
  };

  const getDaysUntilDeadline = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getDeadlineColor = (deadline: string) => {
    const days = getDaysUntilDeadline(deadline);
    if (days <= 0) return 'bg-red-500 text-white';
    if (days <= 7) return 'bg-red-100 text-red-700 border-red-300';
    if (days <= 14) return 'bg-amber-100 text-amber-700 border-amber-300';
    return 'bg-green-100 text-green-700 border-green-300';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const canScrollPrev = visibleColumns > 0;
  const canScrollNext = visibleColumns + columnsPerView < columns.length;

  const scrollPrev = () => {
    if (canScrollPrev) {
      setVisibleColumns(prev => Math.max(0, prev - 1));
    }
  };

  const scrollNext = () => {
    if (canScrollNext) {
      setVisibleColumns(prev => Math.min(columns.length - columnsPerView, prev + 1));
    }
  };

  const visibleColumnsData = columns.slice(visibleColumns, visibleColumns + columnsPerView);

  return (
    <Card className="p-6 h-full bg-white shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Grant Pipeline</h2>
          <p className="text-gray-600">
            {grants.length} active grants • ${grants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()} in pipeline
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter & Sort
          </Button>
          <Button size="sm" className="bg-[#2C6E49] hover:bg-[#1B4332]">
            <Plus className="w-4 h-4 mr-2" />
            Add New Grant
          </Button>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Showing {visibleColumns + 1}-{Math.min(visibleColumns + columnsPerView, columns.length)} of {columns.length} stages
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex space-x-1">
          {columns.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index >= visibleColumns && index < visibleColumns + columnsPerView
                  ? 'bg-[#2C6E49]'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-3 gap-4 h-[500px]">
        {visibleColumnsData.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className={`p-3 rounded-t-lg border-b-2 ${column.headerColor} border-gray-200`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{column.title}</h3>
                <span className="bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
                  {getGrantsForColumn(column.id).length}
                </span>
              </div>
              <div className="text-xs text-gray-600">
                ${getGrantsForColumn(column.id).reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()}
              </div>
            </div>

            {/* Column Content */}
            <div className={`flex-1 rounded-b-lg border-l border-r border-b ${column.color} p-3 space-y-2 overflow-y-auto`}>
              {getGrantsForColumn(column.id).map((grant) => (
                <div
                  key={grant.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 group"
                  draggable
                >
                  {/* Grant Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#2C6E49] to-[#4C956C] rounded text-white text-xs flex items-center justify-center font-bold">
                        {grant.funder.charAt(0)}
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(grant.priority)}`} title={`${grant.priority} priority`}></div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-3 h-3 text-gray-500" />
                    </button>
                  </div>

                  {/* Grant Title & Funder */}
                  <div className="mb-2">
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm leading-tight line-clamp-2">
                      {grant.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-medium">{grant.funder}</p>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center space-x-1 mb-2 p-2 bg-gray-50 rounded">
                    <DollarSign className="w-3 h-3 text-green-600" />
                    <span className="text-sm font-bold text-gray-900">
                      ${grant.amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center space-x-1 mb-2">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <Badge
                      variant="outline"
                      className={`text-xs ${getDeadlineColor(grant.deadline)}`}
                    >
                      {getDaysUntilDeadline(grant.deadline)}d
                    </Badge>
                  </div>

                  {/* Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">Team</span>
                    </div>
                    <div className="flex -space-x-1">
                      {grant.assignees.slice(0, 2).map((assignee, index) => (
                        <div
                          key={index}
                          className="w-5 h-5 bg-[#4C956C] rounded-full border border-white flex items-center justify-center text-white text-xs font-medium"
                          title={assignee}
                        >
                          {assignee.charAt(0)}
                        </div>
                      ))}
                      {grant.assignees.length > 2 && (
                        <div className="w-5 h-5 bg-gray-400 rounded-full border border-white flex items-center justify-center text-white text-xs font-medium">
                          +{grant.assignees.length - 2}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {getGrantsForColumn(column.id).length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm font-medium">No grants yet</p>
                  <p className="text-xs text-gray-400 mt-1">Drag grants here</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
