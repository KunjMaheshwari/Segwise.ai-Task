import React, { useState } from 'react';
import { Filter, Search, ChevronRight, Check, Copy } from 'lucide-react';
import { FilterType, FilterValue, Category, Operator } from '../types';

interface FilterDropdownProps {
  onAddFilter: (filter: FilterValue) => void;
}

const categories: Category[] = [
  { name: 'Dimensions', items: ['Character', 'Background', 'Elements', 'CTA Position', 'CTA Text'] },
  { name: 'Tags', items: [] },
  { name: 'Metrics', items: ['Spends'] }
];

const operators: Operator[] = [
  { name: 'is', group: 'basic' },
  { name: 'is not', group: 'basic' },
  { name: 'contains', group: 'basic' },
  { name: 'does not contain', group: 'basic' },
  { name: 'Lesser than', group: 'numeric' },
  { name: 'Greater than', group: 'numeric' },
  { name: 'Equals', group: 'numeric' }
];

const characterOptions = ['Pumpkin', 'Cat', 'Ghost', 'Egg'];

export default function FilterDropdown({ onAddFilter }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'category' | 'operator' | 'value'>('category');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedOperator, setSelectedOperator] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep('operator');
  };

  const handleOperatorSelect = (operator: string) => {
    setSelectedOperator(operator);
    setStep('value');
  };

  const handleValueSelect = (value: string) => {
    onAddFilter({
      category: selectedCategory,
      operator: selectedOperator,
      value
    });
    setIsOpen(false);
    setStep('category');
    setSelectedCategory('');
    setSelectedOperator('');
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <Filter className="w-4 h-4 text-gray-600" />
        Filters
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-[280px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200">
            <span className="text-sm font-medium text-gray-700">
              {step === 'category' && 'Select category'}
              {step === 'operator' && 'Select operator'}
              {step === 'value' && 'Select value'}
            </span>
            <Copy className="w-4 h-4 text-gray-400" />
          </div>

          {/* Search */}
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Content */}
          <div className="max-h-[280px] overflow-y-auto">
            {step === 'category' && (
              <div className="p-1">
                <div className="flex gap-2 px-2 py-1.5 text-sm text-gray-500">
                  {['Dimensions', 'Tags', 'Metrics'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-2 py-1 rounded ${
                        tab === 'Dimensions' ? 'bg-gray-100 text-gray-900' : ''
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="mt-1 space-y-0.5">
                  {['Character', 'Background', 'Elements', 'CTA Position', 'CTA Text'].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleCategorySelect(item)}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-md flex items-center justify-between group"
                    >
                      {item}
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'operator' && (
              <div className="p-1 space-y-0.5">
                {operators.map((operator) => (
                  <button
                    key={operator.name}
                    onClick={() => handleOperatorSelect(operator.name)}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-md flex items-center justify-between group"
                  >
                    {operator.name}
                    <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                  </button>
                ))}
              </div>
            )}

            {step === 'value' && (
              <div className="p-1">
                <div className="border-b border-gray-200 pb-2 mb-2">
                  <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Select all</span>
                  </label>
                </div>
                <div className="space-y-0.5">
                  {characterOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleValueSelect(option)}
                      className="w-full px-3 py-2 text-sm text-left hover:bg-gray-100 rounded-md flex items-center"
                    >
                      <input type="checkbox" className="mr-2" />
                      {option}
                    </button>
                  ))}
                </div>
                <div className="p-2 border-t border-gray-200 mt-2">
                  <button
                    onClick={() => handleValueSelect('Selected Values')}
                    className="w-full px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}