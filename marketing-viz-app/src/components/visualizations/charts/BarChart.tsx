'use client';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { cn, getVizColor } from '@/lib/utils';
import type { BarChartData } from '@/types/visualizations';

interface BarChartProps {
  data: BarChartData;
  className?: string;
  height?: number;
  layout?: 'vertical' | 'horizontal';
  showGrid?: boolean;
}

export function BarChart({
  data,
  className,
  height = 300,
  layout = 'horizontal',
  showGrid = true,
}: BarChartProps) {
  const chartData = data.items.map((item, index) => ({
    ...item,
    fill: item.color || getVizColor(index),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[var(--foreground)] text-[var(--background)] p-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{item.name}</p>
          <p className="text-lg mt-1">
            {item.value}{data.valueSuffix || ''}
          </p>
          {item.description && (
            <p className="text-xs mt-2 opacity-80 max-w-xs">{item.description}</p>
          )}
        </div>
      );
    }
    return null;
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
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart
          data={chartData}
          layout={layout}
          margin={{ top: 10, right: 30, left: layout === 'vertical' ? 100 : 10, bottom: 10 }}
        >
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          )}
          {layout === 'horizontal' ? (
            <>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: 'var(--foreground-secondary)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={{ stroke: 'var(--border)' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: 'var(--foreground-secondary)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={{ stroke: 'var(--border)' }}
                label={data.valueLabel ? {
                  value: data.valueLabel,
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 12, fill: 'var(--foreground-secondary)' }
                } : undefined}
              />
            </>
          ) : (
            <>
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: 'var(--foreground-secondary)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={{ stroke: 'var(--border)' }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 12, fill: 'var(--foreground-secondary)' }}
                axisLine={{ stroke: 'var(--border)' }}
                tickLine={{ stroke: 'var(--border)' }}
                width={90}
              />
            </>
          )}
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--background-secondary)' }} />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Simple horizontal bar list (alternative display)
interface BarListProps {
  data: BarChartData;
  className?: string;
}

export function BarList({ data, className }: BarListProps) {
  const maxValue = Math.max(...data.items.map(item => item.value));

  return (
    <div className={cn('space-y-3', className)}>
      {data.title && (
        <div className="mb-4">
          <h3 className="font-semibold">{data.title}</h3>
          {data.description && (
            <p className="text-sm text-[var(--foreground-secondary)] mt-1">{data.description}</p>
          )}
        </div>
      )}
      {data.items.map((item, index) => (
        <div key={item.name} className="group">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-[var(--foreground-secondary)]">
              {item.value}{data.valueSuffix || ''}
            </span>
          </div>
          <div className="h-2 bg-[var(--background-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: item.color || getVizColor(index),
              }}
            />
          </div>
          {item.description && (
            <p className="text-xs text-[var(--foreground-tertiary)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
