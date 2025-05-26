
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface Grant {
  id: string;
  title: string;
  funder: string;
  amount: string;
  deadline: string;
  location: string;
  tags: string[];
  description: string;
  contact: string;
  website: string;
  eligibility: string;
  requirements: string[];
  funderProfile: string;
  notes: string;
}

interface RequirementsTabProps {
  grant: Grant;
}

export const RequirementsTab = ({ grant }: RequirementsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Application Requirements */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Application Requirements</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          {grant.requirements.map((requirement, index) => (
            <li key={index} className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              {requirement}
            </li>
          ))}
        </ul>
      </div>

      {/* Attachments */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Required Attachments</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Organization chart showing program staff
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Logic model or theory of change diagram
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Evaluation plan and metrics framework
          </li>
        </ul>
      </div>

      {/* Application Portal */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Application Portal</h4>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-gray-700 mb-3">
            Applications must be submitted through the {grant.funder}'s online portal.
          </p>
          <a 
            href={grant.website} 
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Access Application Portal
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
