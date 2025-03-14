import React from 'react';
import { CreativeData } from '../types';
import { X } from 'lucide-react';

interface PreviewProps {
  data: CreativeData;
  onClose: () => void;
}

export default function Preview({ data, onClose }: PreviewProps) {
  const metrics = [
    { label: 'Impressions', value: data.impressions.toLocaleString() },
    { label: 'Clicks', value: data.clicks.toLocaleString() },
    { label: 'CTR', value: `${(data.ctr * 100).toFixed(2)}%` },
    { label: 'Spend', value: `$${data.spend.toFixed(2)}` },
    { label: 'CPM', value: `$${data.cpm.toFixed(2)}` },
    { label: 'CPC', value: `$${data.cost_per_click.toFixed(2)}` },
    { label: 'CPI', value: `$${data.cost_per_install.toFixed(2)}` },
    { label: 'Installs', value: data.installs.toLocaleString() },
    { label: 'IPM', value: data.ipm.toFixed(2) },
  ];

  const tags = data.tags.split(';').filter(Boolean);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Creative Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Creative Name</h3>
            <p className="text-base text-gray-900">{data.creative_name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Campaign</h3>
            <p className="text-base text-gray-900">{data.campaign}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Ad Group</h3>
            <p className="text-base text-gray-900">{data.ad_group}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Network & Location</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                {data.ad_network}
              </span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                {data.country}
              </span>
              {data.os !== 'unknown' && (
                <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-700">
                  {data.os}
                </span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map(({ label, value }) => (
                <div key={label} className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">{label}</p>
                  <p className="text-base font-medium text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}