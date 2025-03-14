export interface Category {
  name: string;
  items: string[];
}

export interface Operator {
  name: string;
  group: 'basic' | 'numeric';
}

export interface FilterValue {
  category: string;
  operator: string;
  value: string;
}

export type FilterType = 'dimension' | 'tag' | 'metric';

export interface CreativeData {
  creative_id: string;
  creative_name: string;
  tags: string;
  country: string;
  ad_network: string;
  os: string;
  campaign: string;
  ad_group: string;
  ipm: number;
  ctr: number;
  spend: number;
  impressions: number;
  clicks: number;
  cpm: number;
  cost_per_click: number;
  cost_per_install: number;
  installs: number;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  column: keyof CreativeData | null;
  direction: SortDirection;
}