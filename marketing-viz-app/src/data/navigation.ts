import type { NavItem } from '@/types/visualizations';

export const mainNavigation: NavItem[] = [
  { label: 'Scope', href: '/scope.html' },
  { label: 'Job Description', href: '/job-description.html' },
  { label: 'Workflows', href: '/workflows.html' },
  { label: 'Collaboration', href: '/collaboration.html' },
  { label: 'Prioritization', href: '/prioritization.html' },
  { label: 'Escalations', href: '/escalations.html' },
];

export const topicsList: { slug: string; title: string }[] = [];

export const processesList: { slug: string; title: string }[] = [];
