'use client';

import { useState } from 'react';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ComparisonTableData } from '@/types/visualizations';

interface ComparisonTableProps {
  data: ComparisonTableData;
  className?: string;
}

export function ComparisonTable({ data, className }: ComparisonTableProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const renderValue = (value: string | number | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-[var(--success)] mx-auto" />
      ) : (
        <X className="w-5 h-5 text-[var(--error)] mx-auto" />
      );
    }
    if (value === '-' || value === 'N/A' || value === '') {
      return <Minus className="w-4 h-4 text-[var(--foreground-tertiary)] mx-auto" />;
    }
    return <span>{value}</span>;
  };

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

      <div className="border border-[var(--border)] rounded-lg overflow-hidden overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-[var(--background-secondary)]">
              {data.headers.map((header, index) => (
                <th
                  key={index}
                  className={cn(
                    'px-4 py-3 font-semibold text-sm border-b border-[var(--border)]',
                    index === 0 ? 'text-left' : 'text-center'
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'transition-colors',
                  hoveredRow === rowIndex && 'bg-[var(--background-secondary)]',
                  row.highlight && 'bg-[var(--primary-light)]'
                )}
                onMouseEnter={() => setHoveredRow(rowIndex)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="px-4 py-3 border-b border-[var(--border)] font-medium text-sm">
                  {row.label}
                </td>
                {row.values.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-3 border-b border-[var(--border)] text-center text-sm"
                  >
                    {renderValue(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Scorecard variant with visual indicators
interface ScorecardTableProps {
  data: {
    title: string;
    description?: string;
    items: Array<{
      name: string;
      score: number;
      maxScore?: number;
      description?: string;
    }>;
  };
  className?: string;
}

export function ScorecardTable({ data, className }: ScorecardTableProps) {
  const maxScore = data.items[0]?.maxScore || Math.max(...data.items.map(i => i.score));

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
        {data.items.map((item, index) => {
          const percentage = (item.score / maxScore) * 100;
          const color = percentage >= 75 ? 'var(--success)' : percentage >= 50 ? 'var(--warning)' : 'var(--error)';

          return (
            <div key={index} className="group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-sm font-bold" style={{ color }}>
                  {item.score}{item.maxScore ? `/${item.maxScore}` : ''}
                </span>
              </div>
              <div className="h-2 bg-[var(--background-tertiary)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }}
                />
              </div>
              {item.description && (
                <p className="text-xs text-[var(--foreground-tertiary)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
