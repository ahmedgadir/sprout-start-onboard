
import React from 'react';

export const FunderProfileTab = () => {
  const givingData = [
    { year: '2019', amount: 2.8 },
    { year: '2020', amount: 3.2 },
    { year: '2021', amount: 2.9 },
    { year: '2022', amount: 3.5 },
    { year: '2023', amount: 4.1 },
  ];

  const maxAmount = Math.max(...givingData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* 5-Year Giving Trend */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">5-Year Giving Trend</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-end justify-between h-24 mb-2">
            {givingData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="bg-[#2C6E49] rounded-t-sm w-6 transition-all duration-500"
                  style={{ 
                    height: `${(data.amount / maxAmount) * 80}px`,
                    minHeight: '4px'
                  }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{data.year}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-600 text-center">
            Total giving (millions USD)
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <dl className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-600">Average Award Size</dt>
              <dd className="font-medium text-gray-900">$37,500</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Total Grants (2023)</dt>
              <dd className="font-medium text-gray-900">109</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Focus Areas</dt>
              <dd className="font-medium text-gray-900">Food Security, Youth, Seniors</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Geographic Focus</dt>
              <dd className="font-medium text-gray-900">Erie County, NY</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Program Contact</h4>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-sm">
            <p className="font-medium text-gray-900">Sarah Mitchell</p>
            <p className="text-gray-600">Senior Program Officer</p>
            <p className="text-gray-600 mt-2">smitchell@buffalofoundation.org</p>
            <p className="text-gray-600">(716) 555-0123</p>
          </div>
        </div>
      </div>
    </div>
  );
};
