// Type definitions for all visualization components

// ============================================
// FLOW DIAGRAM TYPES (React Flow based)
// ============================================

export type FlowNodeType = 'process' | 'decision' | 'input' | 'output' | 'system' | 'start' | 'end';

export interface FlowNode {
  id: string;
  label: string;
  description?: string;
  owner?: string;
  type: FlowNodeType;
  metadata?: Record<string, string>;
}

export interface FlowEdge {
  source: string;
  target: string;
  label?: string;
  type?: 'default' | 'yes' | 'no' | 'conditional';
}

export interface ProcessFlowData {
  title: string;
  description?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
}

// ============================================
// CHART TYPES (Recharts based)
// ============================================

export interface BarChartItem {
  name: string;
  value: number;
  description?: string;
  color?: string;
}

export interface BarChartData {
  title: string;
  description?: string;
  items: BarChartItem[];
  valueLabel?: string;
  valueSuffix?: string;
}

export interface QuadrantItem {
  name: string;
  x: number;
  y: number;
  description?: string;
  category?: string;
}

export interface QuadrantChartData {
  title: string;
  description?: string;
  items: QuadrantItem[];
  xAxisLabel: string;
  yAxisLabel: string;
  quadrantLabels: [string, string, string, string]; // [topLeft, topRight, bottomLeft, bottomRight]
}

export interface FunnelStage {
  name: string;
  value?: number;
  percentage?: number;
  description?: string;
  color?: string;
}

export interface FunnelData {
  title: string;
  description?: string;
  stages: FunnelStage[];
}

// ============================================
// TIMELINE TYPES
// ============================================

export interface TimelineStage {
  number: number;
  title: string;
  subtitle?: string;
  items: string[];
  status?: 'completed' | 'current' | 'upcoming';
}

export interface TimelineData {
  title: string;
  description?: string;
  stages: TimelineStage[];
}

// ============================================
// TABLE/MATRIX TYPES
// ============================================

export interface RACIEntry {
  task: string;
  description?: string;
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
}

export interface RACIMatrixData {
  title: string;
  description?: string;
  entries: RACIEntry[];
}

export interface ComparisonRow {
  label: string;
  values: (string | number | boolean)[];
  highlight?: boolean;
}

export interface ComparisonTableData {
  title: string;
  description?: string;
  headers: string[];
  rows: ComparisonRow[];
}

// ============================================
// CARD TYPES
// ============================================

export interface DefinitionItem {
  term: string;
  definition: string;
  icon?: string;
  details?: string[];
  category?: string;
}

export interface DefinitionCardsData {
  title: string;
  description?: string;
  items: DefinitionItem[];
  columns?: 2 | 3 | 4;
}

export interface MetricItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
}

export interface MetricCardsData {
  title: string;
  description?: string;
  items: MetricItem[];
}

export interface TriggerAction {
  trigger: string;
  triggerDescription?: string;
  action: string;
  actionDescription?: string;
  outcome?: string;
  category?: string;
}

export interface TriggerActionData {
  title: string;
  description?: string;
  items: TriggerAction[];
}

// ============================================
// SECTION TYPES (for SectionRenderer)
// ============================================

export type SectionType =
  | 'process-flow'
  | 'decision-tree'
  | 'waterfall-flow'
  | 'bar-chart'
  | 'quadrant-chart'
  | 'funnel'
  | 'timeline'
  | 'raci-matrix'
  | 'comparison-table'
  | 'definition-cards'
  | 'metric-cards'
  | 'trigger-action'
  | 'text';

export interface Section<T = unknown> {
  id: string;
  title: string;
  type: SectionType;
  content: T;
}

// ============================================
// PAGE DATA TYPES
// ============================================

export interface TopicData {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  sections: Section[];
  relatedTopics?: string[];
}

export interface ProcessData {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: string;
  sections: Section[];
  relatedProcesses?: string[];
}

// ============================================
// NAVIGATION TYPES
// ============================================

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}
