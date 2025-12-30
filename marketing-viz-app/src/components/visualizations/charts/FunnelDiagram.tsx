'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, getVizColor } from '@/lib/utils';
import type { FunnelData } from '@/types/visualizations';

interface FunnelDiagramProps {
  data: FunnelData;
  className?: string;
}

export function FunnelDiagram({ data, className }: FunnelDiagramProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const totalStages = data.stages.length;

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

      <div className="relative max-w-xl mx-auto">
        {data.stages.map((stage, index) => {
          // Calculate width based on position (first is widest, last is narrowest)
          const widthPercent = 100 - (index * (60 / totalStages));
          const isActive = activeIndex === index;

          return (
            <motion.div
              key={stage.name}
              className="relative mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className={cn(
                  'mx-auto py-4 px-6 rounded-lg transition-all cursor-pointer',
                  isActive ? 'shadow-md' : ''
                )}
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: stage.color || getVizColor(index),
                }}
              >
                <div className="flex items-center justify-between text-white">
                  <span className="font-medium">{stage.name}</span>
                  <div className="text-right">
                    {stage.value !== undefined && (
                      <span className="font-bold">{stage.value.toLocaleString()}</span>
                    )}
                    {stage.percentage !== undefined && (
                      <span className="text-sm ml-2 opacity-80">
                        ({stage.percentage}%)
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Tooltip */}
              {isActive && stage.description && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-[var(--foreground)] text-[var(--background)] p-3 rounded-lg shadow-lg text-sm max-w-xs z-10"
                >
                  {stage.description}
                </motion.div>
              )}

              {/* Connector arrow */}
              {index < totalStages - 1 && (
                <div className="flex justify-center py-1">
                  <svg className="w-4 h-4 text-[var(--border-hover)]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 16l-6-6h12z" />
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// Alternative: Horizontal Funnel
export function HorizontalFunnel({ data, className }: FunnelDiagramProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

      <div className="flex items-center gap-2">
        {data.stages.map((stage, index) => {
          const isActive = activeIndex === index;
          const isLast = index === data.stages.length - 1;

          return (
            <div key={stage.name} className="flex items-center flex-1">
              <motion.div
                className={cn(
                  'flex-1 p-4 rounded-lg transition-all cursor-pointer',
                  isActive ? 'shadow-md scale-105 z-10' : ''
                )}
                style={{
                  backgroundColor: stage.color || getVizColor(index),
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-white text-center">
                  <div className="font-medium text-sm">{stage.name}</div>
                  {stage.value !== undefined && (
                    <div className="font-bold text-lg mt-1">{stage.value.toLocaleString()}</div>
                  )}
                  {stage.percentage !== undefined && (
                    <div className="text-xs opacity-80">{stage.percentage}%</div>
                  )}
                </div>
              </motion.div>

              {!isLast && (
                <svg className="w-6 h-6 text-[var(--border-hover)] flex-shrink-0 mx-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 4l8 8-8 8z" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
