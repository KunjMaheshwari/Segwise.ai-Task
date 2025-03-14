import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';
import { CreativeData, SortConfig } from '../types';
import clsx from 'clsx';

interface DataTableProps {
  data: CreativeData[];
  onRowClick: (row: CreativeData) => void;
  selectedRow?: CreativeData;
}

export default function DataTable({ data, onRowClick, selectedRow }: DataTableProps) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: null,
    direction: 'asc'
  });

  const handleSort = (column: keyof CreativeData) => {
    setSortConfig(prev => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.column) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.column!];
      const bValue = b[sortConfig.column!];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }, [data, sortConfig]);

  const columns: Array<{ key: keyof CreativeData; label: string }> = [
    { key: 'creative_name', label: 'Creative Name' },
    { key: 'campaign', label: 'Campaign' },
    { key: 'country', label: 'Country' },
    { key: 'impressions', label: 'Impressions' },
    { key: 'clicks', label: 'Clicks' },
    { key: 'ctr', label: 'CTR' },
    { key: 'spend', label: 'Spend' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className="px-4 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center gap-1">
                  {label}
                  <div className="flex flex-col">
                    {sortConfig.column === key ? (
                      sortConfig.direction === 'asc' ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )
                    ) : (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.creative_id}
              onClick={() => onRowClick(row)}
              className={clsx(
                'border-t border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors',
                selectedRow?.creative_id === row.creative_id && 'bg-blue-50'
              )}
            >
              {columns.map(({ key }) => (
                <td key={key} className="px-4 py-3 text-sm text-gray-900">
                  {typeof row[key] === 'number'
                    ? key === 'ctr'
                      ? `${(row[key] * 100).toFixed(2)}%`
                      : row[key].toLocaleString()
                    : row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}