
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Calendar, DollarSign, Filter, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
];

export const GrantPipelineKanban = () => {
  const [grants, setGrants] = useState(sampleGrants);

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

  return (
    <Card className="p-8 h-full bg-white shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">Grant Pipeline</h2>
          <p className="text-gray-600 text-lg">
            {grants.length} active grants • ${grants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()} in pipeline
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="default" className="h-10">
            <Filter className="w-4 h-4 mr-2" />
            Filter & Sort
          </Button>
          <Button size="default" className="bg-[#2C6E49] hover:bg-[#1B4332] h-10">
            <Plus className="w-4 h-4 mr-2" />
            Add New Grant
          </Button>
        </div>
      </div>

      {/* Horizontal Kanban Board */}
      <div className="flex space-x-6 h-[700px] overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            {/* Column Header */}
            <div className={`p-4 rounded-t-xl border-b-2 ${column.headerColor} border-gray-200`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-lg">{column.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                    {getGrantsForColumn(column.id).length}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                ${getGrantsForColumn(column.id).reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()} total
              </div>
            </div>

            {/* Column Content */}
            <div className={`h-full rounded-b-xl border-l border-r border-b ${column.color} p-4 space-y-4 overflow-y-auto`} style={{ maxHeight: '620px' }}>
              {getGrantsForColumn(column.id).map((grant) => (
                <div
                  key={grant.id}
                  className="bg-white border border-gray-200 rounded-xl p-5 cursor-move hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                  draggable
                >
                  {/* Grant Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2C6E49] to-[#4C956C] rounded-lg text-white text-sm flex items-center justify-center font-bold shadow-sm">
                        {grant.funder.charAt(0)}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(grant.priority)}`} title={`${grant.priority} priority`}></div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Grant Title & Funder */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-1 text-lg leading-tight">
                      {grant.title}
                    </h4>
                    <p className="text-sm text-gray-600 font-medium">{grant.funder}</p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    {grant.description}
                  </p>

                  {/* Amount */}
                  <div className="flex items-center space-x-2 mb-4 p-3 bg-gray-50 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-lg font-bold text-gray-900">
                      ${grant.amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <Badge
                      variant="outline"
                      className={`text-sm font-medium ${getDeadlineColor(grant.deadline)}`}
                    >
                      {getDaysUntilDeadline(grant.deadline)} days remaining
                    </Badge>
                  </div>

                  {/* Team */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Team</span>
                    </div>
                    <div className="flex -space-x-2">
                      {grant.assignees.slice(0, 3).map((assignee, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 bg-[#4C956C] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-sm"
                          title={assignee}
                        >
                          {assignee}
                        </div>
                      ))}
                      {grant.assignees.length > 3 && (
                        <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium shadow-sm">
                          +{grant.assignees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty State */}
              {getGrantsForColumn(column.id).length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-white border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">No grants yet</p>
                  <p className="text-sm text-gray-400 mt-1">Drag grants here or add new ones</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
