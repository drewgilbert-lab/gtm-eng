'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RACIBadge } from '@/components/ui/Badge';
import { Tooltip } from '@/components/ui/Tooltip';
import type { RACIMatrixData } from '@/types/visualizations';

interface RACIMatrixProps {
  data: RACIMatrixData;
  className?: string;
}

const roleDescriptions = {
  R: 'Responsible - Does the work to complete the task',
  A: 'Accountable - Ultimately answerable for the task completion',
  C: 'Consulted - Provides input and expertise',
  I: 'Informed - Kept up-to-date on progress',
};

export function RACIMatrix({ data, className }: RACIMatrixProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Get unique roles from all entries
  const roles = ['Responsible', 'Accountable', 'Consulted', 'Informed'];

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

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        {Object.entries(roleDescriptions).map(([key, desc]) => (
          <Tooltip key={key} content={desc}>
            <div className="flex items-center gap-2 cursor-help">
              <RACIBadge type={key as 'R' | 'A' | 'C' | 'I'} />
              <span className="text-[var(--foreground-secondary)]">{desc.split(' - ')[0]}</span>
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Table */}
      <div className="border border-[var(--border)] rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[var(--background-secondary)]">
              <th className="text-left px-4 py-3 font-semibold text-sm border-b border-[var(--border)]">
                Task
              </th>
              {roles.map((role) => (
                <th
                  key={role}
                  className="px-4 py-3 font-semibold text-sm text-center border-b border-[var(--border)] w-32"
                >
                  <Tooltip content={roleDescriptions[role[0] as keyof typeof roleDescriptions]}>
                    <span className="cursor-help">{role}</span>
                  </Tooltip>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.entries.map((entry, index) => (
              <motion.tr
                key={index}
                className={cn(
                  'transition-colors',
                  hoveredRow === index ? 'bg-[var(--background-secondary)]' : ''
                )}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td className="px-4 py-3 border-b border-[var(--border)]">
                  <div className="font-medium text-sm">{entry.task}</div>
                  {entry.description && (
                    <div className="text-xs text-[var(--foreground-tertiary)] mt-0.5">
                      {entry.description}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-center">
                  {entry.responsible && (
                    <Tooltip content={entry.responsible}>
                      <div className="inline-flex items-center gap-1">
                        <RACIBadge type="R" />
                        <span className="text-xs text-[var(--foreground-secondary)] truncate max-w-[80px]">
                          {entry.responsible}
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-center">
                  {entry.accountable && (
                    <Tooltip content={entry.accountable}>
                      <div className="inline-flex items-center gap-1">
                        <RACIBadge type="A" />
                        <span className="text-xs text-[var(--foreground-secondary)] truncate max-w-[80px]">
                          {entry.accountable}
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-center">
                  {entry.consulted && (
                    <Tooltip content={entry.consulted}>
                      <div className="inline-flex items-center gap-1">
                        <RACIBadge type="C" />
                        <span className="text-xs text-[var(--foreground-secondary)] truncate max-w-[80px]">
                          {entry.consulted}
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </td>
                <td className="px-4 py-3 border-b border-[var(--border)] text-center">
                  {entry.informed && (
                    <Tooltip content={entry.informed}>
                      <div className="inline-flex items-center gap-1">
                        <RACIBadge type="I" />
                        <span className="text-xs text-[var(--foreground-secondary)] truncate max-w-[80px]">
                          {entry.informed}
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Simple RACI row for inline use
interface SimpleRACIProps {
  task: string;
  responsible?: string;
  accountable?: string;
  consulted?: string;
  informed?: string;
}

export function SimpleRACI({ task, responsible, accountable, consulted, informed }: SimpleRACIProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-[var(--background-secondary)] rounded-lg">
      <div className="flex-1 font-medium text-sm">{task}</div>
      <div className="flex items-center gap-2">
        {responsible && (
          <Tooltip content={`Responsible: ${responsible}`}>
            <div className="flex items-center gap-1">
              <RACIBadge type="R" />
            </div>
          </Tooltip>
        )}
        {accountable && (
          <Tooltip content={`Accountable: ${accountable}`}>
            <div className="flex items-center gap-1">
              <RACIBadge type="A" />
            </div>
          </Tooltip>
        )}
        {consulted && (
          <Tooltip content={`Consulted: ${consulted}`}>
            <div className="flex items-center gap-1">
              <RACIBadge type="C" />
            </div>
          </Tooltip>
        )}
        {informed && (
          <Tooltip content={`Informed: ${informed}`}>
            <div className="flex items-center gap-1">
              <RACIBadge type="I" />
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
