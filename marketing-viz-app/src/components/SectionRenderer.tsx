'use client';

import { Section } from '@/components/layout/PageContainer';
import {
  ProcessFlow,
  BarChart,
  BarList,
  QuadrantChart,
  FunnelDiagram,
  HorizontalTimeline,
  VerticalTimeline,
  RACIMatrix,
  ComparisonTable,
  DefinitionCards,
  MetricCards,
  TriggerActionCards,
} from '@/components/visualizations';
import type {
  Section as SectionType,
  ProcessFlowData,
  BarChartData,
  QuadrantChartData,
  FunnelData,
  TimelineData,
  RACIMatrixData,
  ComparisonTableData,
  DefinitionCardsData,
  MetricCardsData,
  TriggerActionData,
} from '@/types/visualizations';

interface SectionRendererProps {
  section: SectionType;
}

export function SectionRenderer({ section }: SectionRendererProps) {
  const renderVisualization = () => {
    switch (section.type) {
      case 'process-flow':
      case 'decision-tree':
      case 'waterfall-flow':
        return <ProcessFlow data={section.content as ProcessFlowData} />;

      case 'bar-chart':
        return <BarChart data={section.content as BarChartData} layout="vertical" />;

      case 'quadrant-chart':
        return <QuadrantChart data={section.content as QuadrantChartData} />;

      case 'funnel':
        return <FunnelDiagram data={section.content as FunnelData} />;

      case 'timeline':
        return <HorizontalTimeline data={section.content as TimelineData} />;

      case 'raci-matrix':
        return <RACIMatrix data={section.content as RACIMatrixData} />;

      case 'comparison-table':
        return <ComparisonTable data={section.content as ComparisonTableData} />;

      case 'definition-cards':
        return <DefinitionCards data={section.content as DefinitionCardsData} />;

      case 'metric-cards':
        return <MetricCards data={section.content as MetricCardsData} />;

      case 'trigger-action':
        return <TriggerActionCards data={section.content as TriggerActionData} />;

      case 'text':
      default:
        return (
          <div className="prose prose-sm max-w-none">
            {typeof section.content === 'string' ? (
              <p>{section.content}</p>
            ) : (
              <pre className="text-sm text-[var(--foreground-secondary)]">
                {JSON.stringify(section.content, null, 2)}
              </pre>
            )}
          </div>
        );
    }
  };

  return (
    <Section id={section.id} title={section.title}>
      {renderVisualization()}
    </Section>
  );
}

// Render multiple sections
interface SectionsRendererProps {
  sections: SectionType[];
}

export function SectionsRenderer({ sections }: SectionsRendererProps) {
  return (
    <div className="space-y-12">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  );
}
