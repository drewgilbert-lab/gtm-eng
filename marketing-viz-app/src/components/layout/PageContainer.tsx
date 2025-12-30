'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

export function PageContainer({
  children,
  className,
  maxWidth = '7xl'
}: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'mx-auto px-4 sm:px-6 lg:px-8 py-8',
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, subtitle, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8 pb-8 border-b border-[var(--border)]">
      {subtitle && (
        <p className="text-sm font-medium text-[var(--primary)] mb-2">
          {subtitle}
        </p>
      )}
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-[var(--foreground-secondary)] max-w-3xl">
          {description}
        </p>
      )}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, description, children, className }: SectionProps) {
  return (
    <section id={id} className={cn('mb-12', className)}>
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
          )}
          {description && (
            <p className="text-[var(--foreground-secondary)]">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
