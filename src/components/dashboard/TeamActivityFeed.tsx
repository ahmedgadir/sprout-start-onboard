
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Upload, ArrowRight, AtSign, Heart, Smile } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Jane Doe',
    action: 'moved',
    target: 'Youth Education Initiative',
    details: 'from Drafting to Ready to Submit',
    time: '2 min ago',
    type: 'move',
  },
  {
    id: 2,
    user: 'Mike Kim',
    action: 'commented on',
    target: 'Community Health Program',
    details: 'Great progress on the budget section!',
    time: '15 min ago',
    type: 'comment',
    mentions: ['@jane'],
  },
  {
    id: 3,
    user: 'Sarah Wilson',
    action: 'uploaded',
    target: 'Environmental Sustainability',
    details: 'Updated project timeline.pdf',
    time: '1 hour ago',
    type: 'upload',
  },
  {
    id: 4,
    user: 'Jane Doe',
    action: 'mentioned you in',
    target: 'Youth Education Initiative',
    details: '@mike can you review the evaluation metrics?',
    time: '2 hours ago',
    type: 'mention',
    isMention: true,
  },
];

const filterOptions = ['All', 'Mentions', 'My items'];

export const TeamActivityFeed = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [replyText, setReplyText] = useState('');

  const getIcon = (type: string) => {
    switch (type) {
      case 'move':
        return <ArrowRight className="w-4 h-4 text-blue-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'upload':
        return <Upload className="w-4 h-4 text-purple-500" />;
      case 'mention':
        return <AtSign className="w-4 h-4 text-orange-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredActivities = activities.filter(activity => {
    if (activeFilter === 'Mentions') return activity.isMention;
    if (activeFilter === 'My items') return activity.user === 'Jane Doe'; // Current user
    return true;
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Team Activity</h3>
        <div className="flex space-x-1">
          {filterOptions.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setActiveFilter(filter)}
              className="text-xs"
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className={`p-3 rounded-lg border transition-colors ${
              activity.isMention ? 'border-orange-200 bg-orange-50' : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-[#4C956C] rounded-full flex items-center justify-center text-white text-xs font-medium">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  {getIcon(activity.type)}
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}
                    <span className="text-gray-600">{activity.action}</span>
                    {' '}
                    <span className="font-medium text-[#2C6E49]">{activity.target}</span>
                  </p>
                </div>
                
                {activity.details && (
                  <p className="text-sm text-gray-600 mb-2">{activity.details}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Heart className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Smile className="w-3 h-3 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <MessageCircle className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                {activity.type === 'comment' && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-200">
                    <Input
                      type="text"
                      placeholder="Reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="text-sm h-8"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
