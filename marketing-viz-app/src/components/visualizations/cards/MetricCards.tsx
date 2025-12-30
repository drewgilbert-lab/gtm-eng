'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Clock, Target, Users, Zap, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Tooltip } from '@/components/ui/Tooltip';
import type { MetricCardsData } from '@/types/visualizations';

// Icon mapping based on metric type
const iconMap: Record<string, React.ElementType> = {
  time: Clock,
  target: Target,
  users: Users,
  speed: Zap,
  money: DollarSign,
};

interface MetricCardsProps {
  data: MetricCardsData;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function MetricCards({ data, className, columns = 4 }: MetricCardsProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('', className)}>
      {data.title && (
        <div className="mb-6">
          <h3 className="font-semibold">{data.title}</h3>
          {data.description && (
            <p className="text-sm text-[var(--foreground-secondary)] mt-1">{data.description}</p>
          )}
        </div>
      )}

      <div className={cn('grid gap-4', gridCols[columns])}>
        {data.items.map((item, index) => {
          const ChangeIcon = item.changeType === 'positive'
            ? TrendingUp
            : item.changeType === 'negative'
              ? TrendingDown
              : Minus;

          const changeColor = item.changeType === 'positive'
            ? 'text-[var(--success)]'
            : item.changeType === 'negative'
              ? 'text-[var(--error)]'
              : 'text-[var(--foreground-tertiary)]';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card padding="md" className="h-full">
                <div className="flex flex-col h-full">
                  <p className="text-sm text-[var(--foreground-secondary)]">{item.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">{item.value}</p>
                    {item.change && (
                      <Tooltip content={item.description || `Change: ${item.change}`}>
                        <div className={cn('flex items-center gap-1 text-sm', changeColor)}>
                          <ChangeIcon className="w-4 h-4" />
                          <span>{item.change}</span>
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  {item.description && !item.change && (
                    <p className="text-xs text-[var(--foreground-tertiary)] mt-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Single large metric card
interface LargeMetricProps {
  label: string;
  value: string | number;
  description?: string;
  icon?: keyof typeof iconMap;
  className?: string;
}

export function LargeMetric({ label, value, description, icon = 'target', className }: LargeMetricProps) {
  const IconComponent = iconMap[icon] || Target;

  return (
    <Card padding="lg" className={cn('text-center', className)}>
      <div className="inline-flex p-3 rounded-full bg-[var(--primary-light)] mb-4">
        <IconComponent className="w-6 h-6 text-[var(--primary)]" />
      </div>
      <p className="text-4xl font-bold mb-2">{value}</p>
      <p className="text-sm font-medium text-[var(--foreground-secondary)]">{label}</p>
      {description && (
        <p className="text-xs text-[var(--foreground-tertiary)] mt-2">{description}</p>
      )}
    </Card>
  );
}

// SLA Metric Card
interface SLACardProps {
  title: string;
  target: string;
  current?: string;
  status?: 'on-track' | 'at-risk' | 'behind';
  description?: string;
  className?: string;
}

export function SLACard({ title, target, current, status = 'on-track', description, className }: SLACardProps) {
  const statusColors = {
    'on-track': 'bg-[var(--success-light)] text-[var(--success)] border-[var(--success)]',
    'at-risk': 'bg-[var(--warning-light)] text-[var(--warning)] border-[var(--warning)]',
    'behind': 'bg-[var(--error-light)] text-[var(--error)] border-[var(--error)]',
  };

  return (
    <Card padding="md" className={cn('', className)}>
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-sm">{title}</h4>
          <p className="text-2xl font-bold mt-1">{target}</p>
          {current && (
            <p className="text-sm text-[var(--foreground-secondary)] mt-1">
              Current: {current}
            </p>
          )}
        </div>
        <div className={cn(
          'px-2 py-1 rounded-full text-xs font-medium border',
          statusColors[status]
        )}>
          {status.replace('-', ' ')}
        </div>
      </div>
      {description && (
        <p className="text-xs text-[var(--foreground-tertiary)] mt-3 pt-3 border-t border-[var(--border)]">
          {description}
        </p>
      )}
    </Card>
  );
}
