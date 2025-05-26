
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const columns = [
  { id: 'ideas', title: 'Ideas / Leads', count: 3 },
  { id: 'researching', title: 'Researching', count: 5 },
  { id: 'drafting', title: 'Drafting', count: 4 },
  { id: 'ready', title: 'Ready to Submit', count: 2 },
  { id: 'submitted', title: 'Submitted', count: 6 },
  { id: 'reporting', title: 'Reporting', count: 3 },
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
  },
  {
    id: 2,
    title: 'Community Health Program',
    funder: 'Ford Foundation',
    amount: 150000,
    deadline: '2024-06-08',
    assignees: ['JD'],
    status: 'drafting',
  },
  {
    id: 3,
    title: 'Environmental Sustainability',
    funder: 'MacArthur Foundation',
    amount: 500000,
    deadline: '2024-07-01',
    assignees: ['MK', 'AB', 'CD'],
    status: 'ideas',
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
    if (days <= 0) return 'bg-red-500';
    if (days <= 7) return 'bg-red-400';
    if (days <= 14) return 'bg-yellow-400';
    return 'bg-green-400';
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Grant Pipeline</h2>
        <Button size="sm" className="bg-[#2C6E49] hover:bg-[#1B4332]">
          <Plus className="w-4 h-4 mr-2" />
          Add Grant
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4 h-[600px]">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
              <div>
                <h3 className="font-medium text-gray-900 text-sm">{column.title}</h3>
                <p className="text-xs text-gray-500">{getGrantsForColumn(column.id).length} grants</p>
              </div>
            </div>

            {/* Grant Cards */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {getGrantsForColumn(column.id).map((grant) => (
                <div
                  key={grant.id}
                  className="bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-shadow"
                  draggable
                >
                  {/* Funder Logo Placeholder */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-6 h-6 bg-gray-300 rounded text-xs flex items-center justify-center text-gray-600 font-bold">
                      {grant.funder.charAt(0)}
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  {/* Grant Title */}
                  <h4 className="font-medium text-sm text-gray-900 mb-2 truncate">
                    {grant.title}
                  </h4>

                  {/* Amount Bar */}
                  <div className="mb-3">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#4C956C] rounded-full"
                        style={{
                          width: `${Math.min((grant.amount / 500000) * 100, 100)}%`
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      ${grant.amount.toLocaleString()}
                    </p>
                  </div>

                  {/* Deadline Chip */}
                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className={`text-xs text-white ${getDeadlineColor(grant.deadline)}`}
                    >
                      {getDaysUntilDeadline(grant.deadline)} days
                    </Badge>
                  </div>

                  {/* Assignee Avatars */}
                  <div className="flex -space-x-1">
                    {grant.assignees.slice(0, 3).map((assignee, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 bg-[#4C956C] rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium"
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
              ))}

              {getGrantsForColumn(column.id).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No grants</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {grants.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No grants in pipeline</h3>
          <p className="text-gray-500 mb-4">Save a grant from Discover to start your pipeline.</p>
          <Button className="bg-[#2C6E49] hover:bg-[#1B4332]">
            Discover Grants
          </Button>
        </div>
      )}
    </Card>
  );
};
