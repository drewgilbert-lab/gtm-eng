'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Info, BookOpen, Lightbulb, Target, Zap, Users, Settings, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import type { DefinitionCardsData } from '@/types/visualizations';

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  info: Info,
  book: BookOpen,
  lightbulb: Lightbulb,
  target: Target,
  zap: Zap,
  users: Users,
  settings: Settings,
  trending: TrendingUp,
};

interface DefinitionCardsProps {
  data: DefinitionCardsData;
  className?: string;
}

export function DefinitionCards({ data, className }: DefinitionCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const columns = data.columns || 2;
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
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
          const isExpanded = expandedIndex === index;
          const IconComponent = item.icon ? iconMap[item.icon] || Info : Info;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  'h-full transition-all',
                  item.details && item.details.length > 0 && 'cursor-pointer hover:border-[var(--primary)]'
                )}
                padding="md"
                onClick={() => item.details && setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[var(--primary-light)]">
                    <IconComponent className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-semibold text-sm">{item.term}</h4>
                      {item.details && item.details.length > 0 && (
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 text-[var(--foreground-tertiary)] transition-transform flex-shrink-0',
                            isExpanded && 'rotate-180'
                          )}
                        />
                      )}
                    </div>
                    {item.category && (
                      <span className="text-xs text-[var(--primary)] mt-0.5 block">
                        {item.category}
                      </span>
                    )}
                    <p className="text-sm text-[var(--foreground-secondary)] mt-2">
                      {item.definition}
                    </p>

                    {/* Expandable details */}
                    <AnimatePresence>
                      {isExpanded && item.details && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-3 pt-3 border-t border-[var(--border)] space-y-2 overflow-hidden"
                        >
                          {item.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground-secondary)]">
                              <span className="text-[var(--primary)] mt-1">•</span>
                              {detail}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Numbered definition list variant
interface NumberedDefinitionsProps {
  data: DefinitionCardsData;
  className?: string;
}

export function NumberedDefinitions({ data, className }: NumberedDefinitionsProps) {
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

      <div className="space-y-4">
        {data.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <h4 className="font-semibold">{item.term}</h4>
              <p className="text-sm text-[var(--foreground-secondary)] mt-1">
                {item.definition}
              </p>
              {item.details && item.details.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {item.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[var(--foreground-tertiary)]">
                      <span className="text-[var(--border-hover)]">→</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
