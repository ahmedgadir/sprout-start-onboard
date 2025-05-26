
import React from 'react';

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

interface OverviewTabProps {
  grant: Grant;
}

export const OverviewTab = ({ grant }: OverviewTabProps) => {
  return (
    <div className="space-y-6">
      {/* AI Synopsis */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">AI Synopsis</h4>
        <p className="text-sm text-gray-700 leading-relaxed">
          The Buffalo Foundation's Community Food Security Initiative represents an excellent funding 
          opportunity for organizations addressing nutritional needs in Western New York. This grant 
          specifically targets programs that enhance food access for vulnerable populations, including 
          seniors, families, and individuals experiencing food insecurity. The foundation prioritizes 
          collaborative approaches that strengthen local food systems and build community resilience. 
          Given your organization's established presence in Erie County and proven track record with 
          senior nutrition programs, this opportunity aligns exceptionally well with your mission and 
          operational capacity. The foundation values data-driven approaches and sustainable program models.
        </p>
      </div>

      {/* Key Facts Table */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Key Facts</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <dl className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Award Amount</dt>
              <dd className="font-medium text-gray-900">{grant.amount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Grant Term</dt>
              <dd className="font-medium text-gray-900">12 months</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Application Deadline</dt>
              <dd className="font-medium text-gray-900">{grant.deadline}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Program Officer</dt>
              <dd className="font-medium text-gray-900">{grant.contact}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Contact Email</dt>
              <dd className="font-medium text-gray-900">smitchell@buffalofoundation.org</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Indirect Rate</dt>
              <dd className="font-medium text-gray-900">15% max</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
