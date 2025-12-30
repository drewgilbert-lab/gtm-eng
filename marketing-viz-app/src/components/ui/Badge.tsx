import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--background-tertiary)] text-[var(--foreground-secondary)]',
  primary: 'bg-[var(--primary-light)] text-[var(--primary)]',
  success: 'bg-[var(--success-light)] text-[var(--success)]',
  warning: 'bg-[var(--warning-light)] text-[var(--warning)]',
  error: 'bg-[var(--error-light)] text-[var(--error)]',
  info: 'bg-[var(--info-light)] text-[var(--info)]',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-2.5 py-0.5',
  lg: 'text-sm px-3 py-1',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// RACI-specific badges
type RACIType = 'R' | 'A' | 'C' | 'I';

interface RACIBadgeProps {
  type: RACIType;
  className?: string;
}

const raciClasses: Record<RACIType, string> = {
  R: 'bg-[var(--info-light)] text-[var(--info)]',
  A: 'bg-[var(--success-light)] text-[var(--success)]',
  C: 'bg-[var(--warning-light)] text-[var(--warning)]',
  I: 'bg-[var(--background-tertiary)] text-[var(--foreground-secondary)]',
};

const raciLabels: Record<RACIType, string> = {
  R: 'Responsible',
  A: 'Accountable',
  C: 'Consulted',
  I: 'Informed',
};

export function RACIBadge({ type, className }: RACIBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded',
        raciClasses[type],
        className
      )}
      title={raciLabels[type]}
    >
      {type}
    </span>
  );
}
