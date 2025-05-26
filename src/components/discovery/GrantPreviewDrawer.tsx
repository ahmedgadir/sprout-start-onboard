
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Star, Square, ChevronDown, ExternalLink, MapPin, Calendar, DollarSign, Users, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FitSnapshot } from './FitSnapshot';
import { OverviewTab } from './OverviewTab';
import { RequirementsTab } from './RequirementsTab';
import { FunderProfileTab } from './FunderProfileTab';
import { NotesTab } from './NotesTab';

interface GrantPreviewDrawerProps {
  grantId: string;
  onClose: () => void;
}

export const GrantPreviewDrawer = ({ grantId, onClose }: GrantPreviewDrawerProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const grant = {
    id: grantId,
    title: 'Community Health Initiative',
    funder: 'The Health Foundation',
    amount: '$50,000 - $100,000',
    deadline: '2024-07-15',
    location: 'Anytown, USA',
    tags: ['Health', 'Community', 'Wellness'],
    description: 'A program to improve community health through education and access to resources.',
    contact: 'Jane Doe, Program Officer',
    website: 'www.healthfoundation.org',
    eligibility: 'Non-profit organizations with 501(c)(3) status',
    requirements: ['Project proposal', 'Budget', 'Organizational information'],
    funderProfile: 'The Health Foundation is dedicated to improving health outcomes for underserved communities.',
    notes: 'This grant aligns well with our mission and strategic goals.'
  };

  // Mock fit data
  const fitData = {
    score: 87,
    reasons: [
      { category: 'Mission Alignment', description: 'Perfect match for community health focus' },
      { category: 'Geographic Fit', description: 'Located in target service area' },
      { category: 'Award Size', description: 'Within your typical funding range' }
    ]
  };

  const handleApplyForGrant = () => {
    navigate(`/context/${grantId}`);
  };

  return (
    <Card className="h-full rounded-none shadow-none border-l border-gray-200 flex flex-col">
      <CardContent className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{grant.title}</h2>
            <p className="text-gray-600">{grant.funder}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Grant Snapshot */}
        <div className="mb-6">
          <FitSnapshot score={fitData.score} reasons={fitData.reasons} />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="funder">Funder Profile</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="outline-none">
            <OverviewTab grant={grant} />
          </TabsContent>
          <TabsContent value="requirements" className="outline-none">
            <RequirementsTab grant={grant} />
          </TabsContent>
          <TabsContent value="funder" className="outline-none">
            <FunderProfileTab grant={grant} />
          </TabsContent>
          <TabsContent value="notes" className="outline-none">
            <NotesTab grant={grant} />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <Button 
          className="w-full bg-[#2C6E49] hover:bg-[#1B4332]"
          onClick={handleApplyForGrant}
        >
          Apply for This Grant
        </Button>
        <div className="flex items-center justify-between">
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
    </Card>
  );
};
