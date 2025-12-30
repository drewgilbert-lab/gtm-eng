'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TimelineData } from '@/types/visualizations';

interface HorizontalTimelineProps {
  data: TimelineData;
  className?: string;
}

export function HorizontalTimeline({ data, className }: HorizontalTimelineProps) {
  const [activeStage, setActiveStage] = useState<number | null>(null);

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

      {/* Timeline track */}
      <div className="relative">
        {/* Connector line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-[var(--border)]" />

        {/* Stages */}
        <div className="relative flex justify-between">
          {data.stages.map((stage, index) => {
            const isActive = activeStage === index;
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div
                key={stage.number}
                className="flex flex-col items-center flex-1"
                onMouseEnter={() => setActiveStage(index)}
                onMouseLeave={() => setActiveStage(null)}
              >
                {/* Stage indicator */}
                <motion.div
                  className={cn(
                    'relative z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all',
                    isCompleted && 'bg-[var(--success)] text-white',
                    isCurrent && 'bg-[var(--primary)] text-white ring-4 ring-[var(--primary-light)]',
                    !isCompleted && !isCurrent && 'bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground-secondary)]'
                  )}
                  whileHover={{ scale: 1.1 }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="font-bold">{stage.number}</span>
                  )}
                </motion.div>

                {/* Stage title */}
                <div className="mt-3 text-center">
                  <h4 className={cn(
                    'font-medium text-sm',
                    isCurrent && 'text-[var(--primary)]'
                  )}>
                    {stage.title}
                  </h4>
                  {stage.subtitle && (
                    <p className="text-xs text-[var(--foreground-tertiary)] mt-0.5">
                      {stage.subtitle}
                    </p>
                  )}
                </div>

                {/* Expanded content on hover */}
                <AnimatePresence>
                  {isActive && stage.items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-4 bg-[var(--background)] border border-[var(--border)] rounded-lg p-4 shadow-lg z-20 min-w-[200px]"
                    >
                      <ul className="space-y-2">
                        {stage.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <Circle className="w-1.5 h-1.5 mt-2 fill-[var(--primary)] text-[var(--primary)]" />
                            <span className="text-[var(--foreground-secondary)]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Vertical Timeline variant
export function VerticalTimeline({ data, className }: HorizontalTimelineProps) {
  const [activeStage, setActiveStage] = useState<number | null>(null);

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

      <div className="relative pl-8">
        {/* Connector line */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-[var(--border)]" />

        {data.stages.map((stage, index) => {
          const isActive = activeStage === index;
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';
          const isLast = index === data.stages.length - 1;

          return (
            <div
              key={stage.number}
              className={cn('relative pb-8', isLast && 'pb-0')}
              onMouseEnter={() => setActiveStage(index)}
              onMouseLeave={() => setActiveStage(null)}
            >
              {/* Stage indicator */}
              <motion.div
                className={cn(
                  'absolute left-0 w-6 h-6 rounded-full flex items-center justify-center -translate-x-1/2 cursor-pointer z-10',
                  isCompleted && 'bg-[var(--success)] text-white',
                  isCurrent && 'bg-[var(--primary)] text-white',
                  !isCompleted && !isCurrent && 'bg-[var(--background)] border-2 border-[var(--border)]'
                )}
                whileHover={{ scale: 1.2 }}
              >
                {isCompleted ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <span className="text-xs font-bold">{stage.number}</span>
                )}
              </motion.div>

              {/* Content */}
              <div className="ml-4">
                <h4 className={cn(
                  'font-medium',
                  isCurrent && 'text-[var(--primary)]'
                )}>
                  {stage.title}
                </h4>
                {stage.subtitle && (
                  <p className="text-sm text-[var(--foreground-tertiary)]">
                    {stage.subtitle}
                  </p>
                )}

                {/* Items always visible or on hover */}
                <AnimatePresence>
                  {(isActive || stage.items.length <= 3) && stage.items.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 space-y-1"
                    >
                      {stage.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]">
                          <ArrowRight className="w-3 h-3 mt-1 text-[var(--foreground-tertiary)]" />
                          {item}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
