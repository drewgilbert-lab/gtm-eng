'use client';

import { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  Cell,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, getVizColor } from '@/lib/utils';
import type { QuadrantChartData } from '@/types/visualizations';

interface QuadrantChartProps {
  data: QuadrantChartData;
  className?: string;
  height?: number;
}

export function QuadrantChart({ data, className, height = 400 }: QuadrantChartProps) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const chartData = data.items.map((item, index) => ({
    ...item,
    fill: getVizColor(index),
    z: 100, // Size of dots
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-[var(--foreground)] text-[var(--background)] p-3 rounded-lg shadow-lg text-sm">
          <p className="font-semibold">{item.name}</p>
          <div className="mt-1 space-y-1">
            <p>{data.xAxisLabel}: {item.x}</p>
            <p>{data.yAxisLabel}: {item.y}</p>
          </div>
          {item.description && (
            <p className="text-xs mt-2 opacity-80 max-w-xs">{item.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Quadrant labels positioned in corners
  const [topLeft, topRight, bottomLeft, bottomRight] = data.quadrantLabels;

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
      <div className="relative">
        <ResponsiveContainer width="100%" height={height}>
          <ScatterChart margin={{ top: 30, right: 30, bottom: 30, left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />

            {/* Quadrant background areas */}
            <ReferenceArea x1={0} x2={50} y1={50} y2={100} fill="var(--success-light)" fillOpacity={0.3} />
            <ReferenceArea x1={50} x2={100} y1={50} y2={100} fill="var(--info-light)" fillOpacity={0.3} />
            <ReferenceArea x1={0} x2={50} y1={0} y2={50} fill="var(--background-tertiary)" fillOpacity={0.5} />
            <ReferenceArea x1={50} x2={100} y1={0} y2={50} fill="var(--warning-light)" fillOpacity={0.3} />

            {/* Center lines */}
            <ReferenceLine x={50} stroke="var(--border-hover)" strokeDasharray="5 5" />
            <ReferenceLine y={50} stroke="var(--border-hover)" strokeDasharray="5 5" />

            <XAxis
              type="number"
              dataKey="x"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: 'var(--foreground-secondary)' }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
              label={{
                value: data.xAxisLabel,
                position: 'bottom',
                style: { fontSize: 12, fill: 'var(--foreground-secondary)' }
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: 'var(--foreground-secondary)' }}
              axisLine={{ stroke: 'var(--border)' }}
              tickLine={{ stroke: 'var(--border)' }}
              label={{
                value: data.yAxisLabel,
                angle: -90,
                position: 'left',
                style: { fontSize: 12, fill: 'var(--foreground-secondary)' }
              }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={chartData} fill="var(--primary)">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={activeItem === entry.name ? 'var(--primary)' : entry.fill}
                  stroke={activeItem === entry.name ? 'var(--primary)' : 'none'}
                  strokeWidth={activeItem === entry.name ? 3 : 0}
                  r={activeItem === entry.name ? 10 : 8}
                  onMouseEnter={() => setActiveItem(entry.name)}
                  onMouseLeave={() => setActiveItem(null)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* Quadrant Labels */}
        <div className="absolute top-8 left-12 text-xs font-medium text-[var(--success)] bg-white/80 px-2 py-1 rounded">
          {topLeft}
        </div>
        <div className="absolute top-8 right-12 text-xs font-medium text-[var(--info)] bg-white/80 px-2 py-1 rounded">
          {topRight}
        </div>
        <div className="absolute bottom-12 left-12 text-xs font-medium text-[var(--foreground-tertiary)] bg-white/80 px-2 py-1 rounded">
          {bottomLeft}
        </div>
        <div className="absolute bottom-12 right-12 text-xs font-medium text-[var(--warning)] bg-white/80 px-2 py-1 rounded">
          {bottomRight}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {data.items.map((item, index) => (
          <div
            key={item.name}
            className={cn(
              'flex items-center gap-2 px-2 py-1 rounded text-sm transition-colors cursor-pointer',
              activeItem === item.name ? 'bg-[var(--background-secondary)]' : ''
            )}
            onMouseEnter={() => setActiveItem(item.name)}
            onMouseLeave={() => setActiveItem(null)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getVizColor(index) }}
            />
            <span className="text-[var(--foreground-secondary)]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
