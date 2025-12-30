'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { TableOfContentsItem } from '@/types/visualizations';

interface SidebarProps {
  items: TableOfContentsItem[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className={cn('sticky top-24', className)}>
      <h4 className="text-xs font-semibold text-[var(--foreground-tertiary)] uppercase tracking-wider mb-4">
        On this page
      </h4>
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className={cn(
                'block py-1 text-sm transition-colors border-l-2',
                item.level === 1 && 'pl-3',
                item.level === 2 && 'pl-5',
                item.level >= 3 && 'pl-7',
                activeId === item.id
                  ? 'border-[var(--primary)] text-[var(--foreground)] font-medium'
                  : 'border-transparent text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:border-[var(--border)]'
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export function TwoColumnLayout({ children, sidebar }: TwoColumnLayoutProps) {
  return (
    <div className="flex gap-8">
      <div className="flex-1 min-w-0">
        {children}
      </div>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        {sidebar}
      </aside>
    </div>
  );
}
