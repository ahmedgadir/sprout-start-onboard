
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const RequirementsTab = () => {
  return (
    <div className="space-y-6">
      {/* Application Requirements */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Application Requirements</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Project narrative (5 pages maximum, 12pt font, double-spaced)
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Detailed budget and budget narrative
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Organization's most recent audited financial statements
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            IRS determination letter (501c3 status)
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Board of directors list with affiliations
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Letters of support from community partners (2-3 maximum)
          </li>
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
            Applications must be submitted through the Buffalo Foundation's online portal.
          </p>
          <a 
            href="#" 
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
