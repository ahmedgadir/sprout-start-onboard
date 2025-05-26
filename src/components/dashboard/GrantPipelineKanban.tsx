
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Calendar, DollarSign, Filter, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const stages = [
  { id: 'ideas', title: 'Ideas & Leads', color: 'bg-slate-50 border-slate-200', headerColor: 'bg-slate-100' },
  { id: 'researching', title: 'Researching', color: 'bg-blue-50 border-blue-200', headerColor: 'bg-blue-100' },
  { id: 'drafting', title: 'Drafting', color: 'bg-amber-50 border-amber-200', headerColor: 'bg-amber-100' },
  { id: 'ready', title: 'Ready to Submit', color: 'bg-purple-50 border-purple-200', headerColor: 'bg-purple-100' },
  { id: 'submitted', title: 'Submitted', color: 'bg-emerald-50 border-emerald-200', headerColor: 'bg-emerald-100' },
  { id: 'reporting', title: 'Reporting', color: 'bg-orange-50 border-orange-200', headerColor: 'bg-orange-100' },
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
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(['researching', 'drafting']));
  const [draggedGrant, setDraggedGrant] = useState<number | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const { toast } = useToast();

  const getGrantsForStage = (stageId: string) => {
    return grants.filter(grant => grant.status === stageId);
  };

  const toggleStageExpansion = (stageId: string) => {
    setExpandedStages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stageId)) {
        newSet.delete(stageId);
      } else {
        newSet.add(stageId);
      }
      return newSet;
    });
  };

  const handleDragStart = (e: React.DragEvent, grantId: number) => {
    console.log('Drag started for grant:', grantId);
    setDraggedGrant(grantId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', grantId.toString());
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log('Drag ended');
    setDraggedGrant(null);
    setDragOverStage(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    console.log('Drag enter stage:', stageId);
    setDragOverStage(stageId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // Only clear if we're actually leaving the drop zone
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverStage(null);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    console.log('Drop on stage:', targetStageId, 'with grant:', draggedGrant);
    
    if (draggedGrant === null) return;

    const grant = grants.find(g => g.id === draggedGrant);
    if (!grant) return;

    const oldStatus = grant.status;
    if (oldStatus === targetStageId) {
      setDraggedGrant(null);
      setDragOverStage(null);
      return;
    }

    setGrants(prev => prev.map(g => 
      g.id === draggedGrant 
        ? { ...g, status: targetStageId }
        : g
    ));

    const stageName = stages.find(stage => stage.id === targetStageId)?.title || targetStageId;
    toast({
      title: "Grant moved",
      description: `"${grant.title}" moved to ${stageName}`,
    });

    setDraggedGrant(null);
    setDragOverStage(null);
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

      {/* Vertical Stage Layout */}
      <div className="space-y-3 h-[600px] overflow-y-auto">
        {stages.map((stage) => {
          const stageGrants = getGrantsForStage(stage.id);
          const isExpanded = expandedStages.has(stage.id);
          
          return (
            <div 
              key={stage.id}
              className={`border rounded-lg transition-all duration-200 ${
                dragOverStage === stage.id ? 'ring-2 ring-[#2C6E49] ring-opacity-50 bg-opacity-80' : ''
              } ${stage.color}`}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, stage.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Stage Header */}
              <div 
                className={`p-4 border-b cursor-pointer ${stage.headerColor} hover:bg-opacity-80 transition-colors`}
                onClick={() => toggleStageExpansion(stage.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-gray-900">{stage.title}</h3>
                    <span className="bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
                      {stageGrants.length}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">
                      ${stageGrants.reduce((sum, grant) => sum + grant.amount, 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="h-7 px-2">
                      <Plus className="w-3 h-3" />
                    </Button>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Stage Content */}
              {isExpanded && (
                <div className="p-4">
                  {stageGrants.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {stageGrants.map((grant) => (
                        <div
                          key={grant.id}
                          className={`bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all duration-200 group ${
                            draggedGrant === grant.id ? 'opacity-50 transform scale-105 shadow-lg' : ''
                          }`}
                          draggable
                          onDragStart={(e) => handleDragStart(e, grant.id)}
                          onDragEnd={handleDragEnd}
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
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-12 h-12 bg-white border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <Plus className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-gray-500 text-sm font-medium">No grants in this stage</p>
                      <p className="text-xs text-gray-400 mt-1">Drag grants here or click + to add</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
