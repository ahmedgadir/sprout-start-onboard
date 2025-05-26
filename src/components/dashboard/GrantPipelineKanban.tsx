import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Plus, Calendar, DollarSign, Filter, Users, ChevronDown, ChevronUp, Sparkles, ArrowRight, X, Star, Eye, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

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

interface NewGrant {
  id: string;
  title: string;
  funder: string;
  fitScore: number;
  awardRange: string;
  deadline: Date;
}

const newGrants: NewGrant[] = [
  {
    id: '1',
    title: 'Community Food Security Initiative',
    funder: 'Buffalo Foundation',
    fitScore: 94,
    awardRange: '$25k–$50k',
    deadline: new Date('2024-07-15')
  },
  {
    id: '2', 
    title: 'Youth Development Programs',
    funder: 'Gates Foundation',
    fitScore: 87,
    awardRange: '$100k–$250k',
    deadline: new Date('2024-06-30')
  }
];

export const GrantPipelineKanban = () => {
  const navigate = useNavigate();
  const [grants, setGrants] = useState(sampleGrants);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(['researching', 'drafting']));
  const [draggedGrant, setDraggedGrant] = useState<number | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);
  const [selectedGrant, setSelectedGrant] = useState<typeof sampleGrants[0] | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  const lastPulledDate = new Date('2024-05-26');

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

  const handleGrantClick = (grant: typeof sampleGrants[0]) => {
    setSelectedGrant(grant);
  };

  const closePreview = () => {
    setSelectedGrant(null);
  };

  const getMatchReasons = (grant: typeof sampleGrants[0]) => {
    const reasons = [
      { type: 'Geography', description: `Your programs operate in ${grant.funder} service area, an eligible region.` },
      { type: 'Program alignment', description: `Your initiatives match the funder's focus areas and priorities.` },
      { type: 'Org size', description: `Typical grantee budgets align with your organization's capacity.` }
    ];
    return reasons;
  };

  const getFitScore = (grant: typeof sampleGrants[0]) => {
    // Generate fit score based on grant properties
    if (grant.priority === 'high') return Math.floor(Math.random() * 10) + 90;
    if (grant.priority === 'medium') return Math.floor(Math.random() * 15) + 75;
    return Math.floor(Math.random() * 25) + 50;
  };

  const getHintChip = (grant: typeof sampleGrants[0]) => {
    const hints = ['Geo & Programs match', 'Budget aligned', 'Youth focus', 'Community focus', 'Education aligned'];
    return hints[grant.id % hints.length];
  };

  return (
    <Card className="p-6 h-full bg-white shadow-sm flex flex-col">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
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

      {/* New Grants Section */}
      <div className="mb-6 flex-shrink-0">
        <div className="border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="p-4 border-b border-green-200 bg-green-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#2C6E49]" />
                  <h3 className="text-lg font-semibold text-gray-900">New Grants</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {newGrants.length} new
                  </Badge>
                </div>
                <span className="text-sm text-gray-600">
                  Last updated: {lastPulledDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              <Link to="/discovery">
                <Button variant="outline" size="sm" className="text-[#2C6E49] border-[#2C6E49] hover:bg-[#2C6E49] hover:text-white">
                  View All Grants
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {newGrants.map((grant) => (
                <Link 
                  key={grant.id}
                  to={`/discovery?grantId=${grant.id}`}
                  className="block"
                >
                  <div className="p-3 bg-white border border-green-200 rounded-lg hover:border-[#2C6E49] hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
                        {grant.title}
                      </h4>
                      <div className="flex items-center space-x-1 ml-2">
                        <div className="w-8 h-8 bg-[#2C6E49] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {grant.fitScore}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2">{grant.funder}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                        {grant.awardRange}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {Math.ceil((grant.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}d
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Split View Layout when grant is selected */}
      {selectedGrant ? (
        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left Pane - Grant List - Changed from w-1/2 to w-[55%] */}
          <div className="w-[55%] space-y-3 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Grants</h3>
            {stages.map((stage) => {
              const stageGrants = getGrantsForStage(stage.id);
              
              return (
                <div key={stage.id} className={`border rounded-lg ${stage.color}`}>
                  <div className={`p-3 border-b ${stage.headerColor}`}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{stage.title}</h4>
                      <span className="text-sm text-gray-600">{stageGrants.length}</span>
                    </div>
                  </div>
                  
                  <div className="p-3 space-y-2">
                    {stageGrants.map((grant) => (
                      <div
                        key={grant.id}
                        onClick={() => handleGrantClick(grant)}
                        className={`p-3 bg-white border rounded-lg cursor-pointer transition-all hover:shadow-md group ${
                          selectedGrant?.id === grant.id ? 'border-[#2C6E49] bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-br from-[#2C6E49] to-[#4C956C] rounded text-white text-xs flex items-center justify-center font-bold">
                              {grant.funder.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 text-sm">{grant.title}</h5>
                              <p className="text-xs text-gray-600">{grant.funder}</p>
                            </div>
                          </div>
                          <div className="w-8 h-8 bg-[#2C6E49] rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {getFitScore(grant)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {getHintChip(grant)}
                          </Badge>
                          <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Star className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Square className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Pane - Preview Drawer - Changed from w-1/2 to w-[45%] */}
          <div className="w-[45%] bg-white border border-gray-200 rounded-lg flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#2C6E49] to-[#4C956C] rounded text-white text-sm flex items-center justify-center font-bold">
                  {selectedGrant.funder.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedGrant.title}</h3>
                  <p className="text-sm text-gray-600">{selectedGrant.funder}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={closePreview}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Fit Score Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                    <span className="text-lg font-bold text-green-600">{getFitScore(selectedGrant)}%</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Fit Score</h4>
                  <p className="text-sm text-green-600 font-medium">Excellent match</p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-900">Why this is a match</h5>
                {getMatchReasons(selectedGrant).map((reason, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{reason.type}</span>
                      <span className="text-gray-600"> — "{reason.description}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex">
                {['overview', 'requirements', 'funder', 'notes'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'border-[#2C6E49] text-[#2C6E49]'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">AI Synopsis</h5>
                    <p className="text-sm text-gray-600">{selectedGrant.description}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Key Facts</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Award Amount</span>
                        <span className="text-sm font-medium">${selectedGrant.amount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Deadline</span>
                        <span className="text-sm font-medium">{selectedGrant.deadline}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'requirements' && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Application Requirements</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Project proposal (max 5 pages)</li>
                    <li>• Budget and timeline</li>
                    <li>• Organization overview</li>
                    <li>• Letters of support</li>
                  </ul>
                </div>
              )}
              {activeTab === 'funder' && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Funder Profile</h5>
                  <p className="text-sm text-gray-600">
                    {selectedGrant.funder} is a leading foundation focused on community development and social impact.
                  </p>
                </div>
              )}
              {activeTab === 'notes' && (
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                  <textarea 
                    className="w-full h-32 p-2 border border-gray-200 rounded text-sm"
                    placeholder="Add your notes here..."
                  />
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Star className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Square className="w-4 h-4 mr-2" />
                Compare
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Original Vertical Stage Layout when no grant is selected
        <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
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
                            onClick={() => handleGrantClick(grant)}
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
      )}
    </Card>
  );
};
