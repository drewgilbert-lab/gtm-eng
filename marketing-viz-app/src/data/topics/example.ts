// Example topic data file showing the structure
// This file demonstrates how to structure topic data for the SectionRenderer

import type { TopicData, Section } from '@/types/visualizations';

// Example: GTM Strategy topic data structure
export const exampleTopicData: TopicData = {
  slug: 'example-topic',
  title: 'Example Topic',
  subtitle: 'Category',
  description: 'A description of this topic and what it covers.',
  icon: 'target',
  sections: [
    // Timeline example
    {
      id: 'example-timeline',
      title: 'Example Timeline',
      type: 'timeline',
      content: {
        title: '',
        stages: [
          {
            number: 1,
            title: 'Stage One',
            subtitle: 'First phase',
            items: ['Item 1', 'Item 2', 'Item 3'],
            status: 'completed' as const,
          },
          {
            number: 2,
            title: 'Stage Two',
            subtitle: 'Second phase',
            items: ['Item 1', 'Item 2'],
            status: 'current' as const,
          },
          {
            number: 3,
            title: 'Stage Three',
            subtitle: 'Third phase',
            items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
            status: 'upcoming' as const,
          },
        ],
      },
    },

    // Bar chart example
    {
      id: 'example-bar-chart',
      title: 'Example Bar Chart',
      type: 'bar-chart',
      content: {
        title: '',
        items: [
          { name: 'Option A', value: 45, description: 'Description for option A' },
          { name: 'Option B', value: 35, description: 'Description for option B' },
          { name: 'Option C', value: 20, description: 'Description for option C' },
        ],
        valueSuffix: '%',
      },
    },

    // Quadrant chart example
    {
      id: 'example-quadrant',
      title: 'Example Quadrant Chart',
      type: 'quadrant-chart',
      content: {
        title: '',
        xAxisLabel: 'Popularity',
        yAxisLabel: 'Impact',
        quadrantLabels: ['High Impact / Low Popularity', 'High Impact / High Popularity', 'Low Impact / Low Popularity', 'Low Impact / High Popularity'] as [string, string, string, string],
        items: [
          { name: 'Item A', x: 75, y: 80, description: 'High performer' },
          { name: 'Item B', x: 30, y: 70, description: 'Hidden gem' },
          { name: 'Item C', x: 60, y: 40, description: 'Average performer' },
          { name: 'Item D', x: 80, y: 30, description: 'Overhyped' },
        ],
      },
    },

    // Definition cards example
    {
      id: 'example-definitions',
      title: 'Key Definitions',
      type: 'definition-cards',
      content: {
        title: '',
        items: [
          {
            term: 'Term One',
            definition: 'Definition of the first term.',
            icon: 'target',
            details: ['Detail point 1', 'Detail point 2'],
          },
          {
            term: 'Term Two',
            definition: 'Definition of the second term.',
            icon: 'users',
            details: ['Detail point 1', 'Detail point 2'],
          },
          {
            term: 'Term Three',
            definition: 'Definition of the third term.',
            icon: 'zap',
          },
          {
            term: 'Term Four',
            definition: 'Definition of the fourth term.',
            icon: 'lightbulb',
          },
        ],
        columns: 2,
      },
    },

    // Trigger-action cards example
    {
      id: 'example-triggers',
      title: 'Automation Plays',
      type: 'trigger-action',
      content: {
        title: '',
        items: [
          {
            trigger: 'User signs up',
            action: 'Send welcome email',
            category: 'Onboarding',
            outcome: 'Increase activation rate',
          },
          {
            trigger: 'User inactive 7 days',
            action: 'Send re-engagement email',
            category: 'Retention',
            outcome: 'Reduce churn',
          },
          {
            trigger: 'User views pricing page',
            action: 'Notify sales team',
            category: 'Sales',
            outcome: 'Capture high-intent leads',
          },
        ],
      },
    },

    // Process flow example
    {
      id: 'example-flow',
      title: 'Example Process Flow',
      type: 'process-flow',
      content: {
        title: '',
        nodes: [
          { id: '1', label: 'Start', type: 'start' as const, description: 'Process begins here' },
          { id: '2', label: 'Step 1', type: 'process' as const, owner: 'Team A', description: 'First processing step' },
          { id: '3', label: 'Decision', type: 'decision' as const, description: 'Check condition' },
          { id: '4', label: 'Step 2A', type: 'process' as const, owner: 'Team B', description: 'Path A processing' },
          { id: '5', label: 'Step 2B', type: 'process' as const, owner: 'Team C', description: 'Path B processing' },
          { id: '6', label: 'End', type: 'end' as const, description: 'Process complete' },
        ],
        edges: [
          { source: '1', target: '2' },
          { source: '2', target: '3' },
          { source: '3', target: '4', label: 'Yes', type: 'yes' as const },
          { source: '3', target: '5', label: 'No', type: 'no' as const },
          { source: '4', target: '6' },
          { source: '5', target: '6' },
        ],
      },
    },

    // RACI matrix example
    {
      id: 'example-raci',
      title: 'Ownership Matrix',
      type: 'raci-matrix',
      content: {
        title: '',
        entries: [
          {
            task: 'Task 1',
            description: 'Description of task 1',
            responsible: 'Team A',
            accountable: 'Manager A',
            consulted: 'Team B',
            informed: 'Stakeholders',
          },
          {
            task: 'Task 2',
            description: 'Description of task 2',
            responsible: 'Team B',
            accountable: 'Manager B',
            consulted: 'Team A',
            informed: 'Stakeholders',
          },
          {
            task: 'Task 3',
            responsible: 'Team C',
            accountable: 'Manager C',
            consulted: 'Team A, Team B',
            informed: 'All',
          },
        ],
      },
    },

    // Metric cards example
    {
      id: 'example-metrics',
      title: 'Key Metrics',
      type: 'metric-cards',
      content: {
        title: '',
        items: [
          { label: 'Conversion Rate', value: '24%', change: '+5%', changeType: 'positive' as const },
          { label: 'Response Time', value: '2.4h', change: '-30m', changeType: 'positive' as const },
          { label: 'Lead Volume', value: '1,234', change: '+12%', changeType: 'positive' as const },
          { label: 'Cost per Lead', value: '$45', change: '+$5', changeType: 'negative' as const },
        ],
      },
    },
  ],
  relatedTopics: ['gtm-strategy', 'content-strategy'],
};
