
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Calendar, DollarSign, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns = [
  { id: 'ideas', title: 'Ideas / Leads', count: 3, color: 'bg-gray-100' },
  { id: 'researching', title: 'Researching', count: 5, color: 'bg-blue-100' },
  { id: 'drafting', title: 'Drafting', count: 4, color: 'bg-yellow-100' },
  { id: 'ready', title: 'Ready to Submit', count: 2, color: 'bg-purple-100' },
  { id: 'submitted', title: 'Submitted', count: 6, color: 'bg-green-100' },
  { id: 'reporting', title: 'Reporting', count: 3, color: 'bg-orange-100' },
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
    description: 'Comprehensive program to improve STEM education access',
  },
  {
    id: 2,
    title: 'Community Health Program',
    funder: 'Ford Foundation', 
    amount: 150000,
    deadline: '2024-06-08',
    assignees: ['JD'],
    status: 'drafting',
    description: 'Mental health support for underserved communities',
  },
  {
    id: 3,
    title: 'Environmental Sustainability',
    funder: 'MacArthur Foundation',
    amount: 500000,
    deadline: '2024-07-01',
    assignees: ['MK', 'AB', 'CD'],
    status: 'ideas',
    description: 'Climate change resilience in urban areas',
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
    if (days <= 7) return 'bg-red-100 text-red-700 border-red-200';
    if (days <= 14) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Grant Pipeline</h2>
          <p className="text-gray-600 mt-1">{grants.length} active grants in pipeline</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button size="sm" className="bg-[#2C6E49] hover:bg-[#1B4332]">
            <Plus className="w-4 h-4 mr-2" />
            Add Grant
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 h-[650px]">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className={`p-4 rounded-lg ${column.color} mb-4`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 text-sm">{column.title}</h3>
                <span className="bg-white text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                  {getGrantsForColumn(column.id).length}
                </span>
              </div>
            </div>

            {/* Grant Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {getGrantsForColumn(column.id).map((grant) => (
                <div
                  key={grant.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-all duration-200 group"
                  draggable
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#2C6E49] to-[#4C956C] rounded-lg text-white text-xs flex items-center justify-center font-bold">
                      {grant.funder.charAt(0)}
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Grant Title */}
                  <h4 className="font-semibold text-sm text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {grant.title}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {grant.description}
                  </p>

                  {/* Amount */}
                  <div className="flex items-center space-x-1 mb-3">
                    <DollarSign className="w-3 h-3 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">
                      ${grant.amount.toLocaleString()}
                    </span>
                  </div>

                  {/* Deadline */}
                  <div className="flex items-center space-x-1 mb-4">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <Badge
                      variant="outline"
                      className={`text-xs ${getDeadlineColor(grant.deadline)}`}
                    >
                      {getDaysUntilDeadline(grant.deadline)} days left
                    </Badge>
                  </div>

                  {/* Assignees */}
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {grant.assignees.slice(0, 3).map((assignee, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 bg-[#4C956C] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
                          title={assignee}
                        >
                          {assignee}
                        </div>
                      ))}
                      {grant.assignees.length > 3 && (
                        <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs">
                          +{grant.assignees.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {getGrantsForColumn(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Plus className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm">No grants</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
