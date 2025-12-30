'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Target, ChevronDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { TriggerActionData } from '@/types/visualizations';

interface TriggerActionCardsProps {
  data: TriggerActionData;
  className?: string;
}

export function TriggerActionCards({ data, className }: TriggerActionCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = [...new Set(data.items.map(item => item.category).filter(Boolean))];

  // Filter items by category
  const filteredItems = selectedCategory
    ? data.items.filter(item => item.category === selectedCategory)
    : data.items;

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

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              selectedCategory === null
                ? 'bg-[var(--primary)] text-white'
                : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:bg-[var(--background-tertiary)]'
            )}
          >
            All ({data.items.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category!)}
              className={cn(
                'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                selectedCategory === category
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--background-secondary)] text-[var(--foreground-secondary)] hover:bg-[var(--background-tertiary)]'
              )}
            >
              {category} ({data.items.filter(i => i.category === category).length})
            </button>
          ))}
        </div>
      )}

      {/* Cards grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredItems.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card
                padding="none"
                className={cn(
                  'overflow-hidden transition-all',
                  (item.triggerDescription || item.actionDescription || item.outcome) && 'cursor-pointer hover:border-[var(--primary)]'
                )}
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex">
                  {/* Trigger side */}
                  <div className="flex-1 p-4 bg-[var(--background-secondary)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[var(--warning)]" />
                      <span className="text-xs font-medium text-[var(--foreground-tertiary)] uppercase tracking-wider">
                        Trigger
                      </span>
                    </div>
                    <p className="font-medium text-sm">{item.trigger}</p>
                    {item.category && (
                      <Badge variant="default" size="sm" className="mt-2">
                        {item.category}
                      </Badge>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center px-2 bg-[var(--background-secondary)]">
                    <ArrowRight className="w-5 h-5 text-[var(--foreground-tertiary)]" />
                  </div>

                  {/* Action side */}
                  <div className="flex-1 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-[var(--primary)]" />
                      <span className="text-xs font-medium text-[var(--foreground-tertiary)] uppercase tracking-wider">
                        Action
                      </span>
                    </div>
                    <p className="font-medium text-sm">{item.action}</p>
                  </div>

                  {/* Expand indicator */}
                  {(item.triggerDescription || item.actionDescription || item.outcome) && (
                    <div className="flex items-center pr-3">
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-[var(--foreground-tertiary)] transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </div>
                  )}
                </div>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-[var(--border)]"
                    >
                      <div className="p-4 space-y-3 bg-[var(--background)]">
                        {item.triggerDescription && (
                          <div>
                            <p className="text-xs font-medium text-[var(--foreground-tertiary)] uppercase mb-1">
                              Trigger Details
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                              {item.triggerDescription}
                            </p>
                          </div>
                        )}
                        {item.actionDescription && (
                          <div>
                            <p className="text-xs font-medium text-[var(--foreground-tertiary)] uppercase mb-1">
                              Action Details
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                              {item.actionDescription}
                            </p>
                          </div>
                        )}
                        {item.outcome && (
                          <div className="pt-2 border-t border-[var(--border)]">
                            <p className="text-xs font-medium text-[var(--success)] uppercase mb-1">
                              Expected Outcome
                            </p>
                            <p className="text-sm text-[var(--foreground-secondary)]">
                              {item.outcome}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Simple list variant
export function TriggerActionList({ data, className }: TriggerActionCardsProps) {
  return (
    <div className={cn('', className)}>
      {data.title && (
        <div className="mb-4">
          <h3 className="font-semibold">{data.title}</h3>
          {data.description && (
            <p className="text-sm text-[var(--foreground-secondary)] mt-1">{data.description}</p>
          )}
        </div>
      )}

      <div className="space-y-3">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 bg-[var(--background-secondary)] rounded-lg"
          >
            <div className="flex items-center gap-2 flex-1">
              <Zap className="w-4 h-4 text-[var(--warning)] flex-shrink-0" />
              <span className="text-sm">{item.trigger}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[var(--foreground-tertiary)] flex-shrink-0" />
            <div className="flex items-center gap-2 flex-1">
              <Target className="w-4 h-4 text-[var(--primary)] flex-shrink-0" />
              <span className="text-sm">{item.action}</span>
            </div>
            {item.category && (
              <Badge variant="default" size="sm">
                {item.category}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
