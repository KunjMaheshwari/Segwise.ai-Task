import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import Papa from 'papaparse';
import FilterDropdown from './components/FilterDropdown';
import DataTable from './components/DataTable';
import Preview from './components/Preview';
import { FilterValue, CreativeData } from './types';

const csvData = `creative_id,creative_name,tags,country,ad_network,os,campaign,ad_group,ipm,ctr,spend,impressions,clicks,cpm,cost_per_click,cost_per_install,installs
120214081337200422,New Creative 4,Concept:UGC;Audio - Type:voiceover;Audio - Language:English;End card elements - CTA:download it and start crushing those levels!;End card elements - Objects:colored bubbles;End card elements - Objects:wand;End card elements - Objects:rocks;End card elements - Objects:boots;End card elements - Language:English;End card elements - CTA Placement:Middle-Right;End card elements - Background Colour:Orange;End card elements - Background setting:fantasy;End card elements - CTA background colour:Dark Purple;,IN,meta,unknown,App promotion campaign - New Creatives,New Creatives,2.70011323055483,0.844874,7.01,11481,97,0.610574,0.072268,0.22612903225806452,31`;

function App() {
  const [data, setData] = useState<CreativeData[]>([]);
  const [filters, setFilters] = useState<FilterValue[]>([]);
  const [selectedRow, setSelectedRow] = useState<CreativeData | undefined>();

  useEffect(() => {
    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data as CreativeData[]);
      },
    });
  }, []);

  const handleAddFilter = (filter: FilterValue) => {
    setFilters([...filters, filter]);
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const filteredData = React.useMemo(() => {
    return data.filter(row => {
      return filters.every(filter => {
        const value = row[filter.category.toLowerCase() as keyof CreativeData];
        
        switch (filter.operator) {
          case 'is':
            return value === filter.value;
          case 'is not':
            return value !== filter.value;
          case 'contains':
            return String(value).toLowerCase().includes(filter.value.toLowerCase());
          case 'does not contain':
            return !String(value).toLowerCase().includes(filter.value.toLowerCase());
          case 'Lesser than':
            return typeof value === 'number' && value < Number(filter.value);
          case 'Greater than':
            return typeof value === 'number' && value > Number(filter.value);
          case 'Equals':
            return value === Number(filter.value);
          default:
            return true;
        }
      });
    });
  }, [data, filters]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#E8FFA3] rounded"></div>
            <div>
              <h1 className="text-xl font-medium text-gray-900">Segwise</h1>
              <p className="text-sm text-gray-500">Front End Test</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <FilterDropdown onAddFilter={handleAddFilter} />
            
            {filters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <span className="text-gray-700">{filter.category}</span>
                <span className="text-gray-500">{filter.operator}</span>
                <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                  {filter.value}
                </span>
                <button
                  onClick={() => handleRemoveFilter(index)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <DataTable
            data={filteredData}
            onRowClick={setSelectedRow}
            selectedRow={selectedRow}
          />
        </div>
      </div>

      {selectedRow && (
        <Preview
          data={selectedRow}
          onClose={() => setSelectedRow(undefined)}
        />
      )}
    </div>
  );
}

export default App;