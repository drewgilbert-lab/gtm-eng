import type { NavItem } from '@/types/visualizations';

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Scope', href: '/scope' },
  { label: 'Job Description', href: '/job-description' },
  { label: 'Workflows', href: '/workflows' },
  { label: 'Collaboration', href: '/collaboration' },
  { label: 'Prioritization', href: '/prioritization' },
  { label: 'Escalations', href: '/escalations' },
];

export const topicsList: { slug: string; title: string }[] = [];

export const processesList: { slug: string; title: string }[] = [];
