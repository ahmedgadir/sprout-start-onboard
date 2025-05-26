
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Upload, ArrowRight, AtSign, Heart, Smile, Send } from 'lucide-react';

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
  const [showReplyFor, setShowReplyFor] = useState<number | null>(null);

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

  const handleReply = (activityId: number) => {
    if (replyText.trim()) {
      console.log(`Reply to activity ${activityId}:`, replyText);
      setReplyText('');
      setShowReplyFor(null);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Team Activity</h3>
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
            className={`p-4 rounded-lg border transition-all duration-200 ${
              activity.isMention 
                ? 'border-orange-200 bg-orange-50' 
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 bg-gradient-to-br from-[#2C6E49] to-[#4C956C] rounded-full flex items-center justify-center text-white text-xs font-medium">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
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
                  <p className="text-sm text-gray-600 mb-3 bg-white p-2 rounded border-l-2 border-gray-200">
                    {activity.details}
                  </p>
                )}
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Heart className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
                      <Smile className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <button 
                      className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                      onClick={() => setShowReplyFor(showReplyFor === activity.id ? null : activity.id)}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                {showReplyFor === activity.id && (
                  <div className="mt-3 flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="text-sm h-9 flex-1"
                      onKeyPress={(e) => e.key === 'Enter' && handleReply(activity.id)}
                    />
                    <Button 
                      size="sm" 
                      onClick={() => handleReply(activity.id)}
                      className="bg-[#2C6E49] hover:bg-[#1B4332] h-9"
                    >
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Button variant="outline" className="w-full mt-4">
        View All Activity
      </Button>
    </Card>
  );
};
