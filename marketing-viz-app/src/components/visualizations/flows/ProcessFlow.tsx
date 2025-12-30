'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProcessFlowData, FlowNode, FlowNodeType } from '@/types/visualizations';

// Node styling by type
const nodeStyles: Record<FlowNodeType, { bg: string; border: string; icon: string }> = {
  start: { bg: 'bg-green-50', border: 'border-green-300', icon: '▶' },
  end: { bg: 'bg-red-50', border: 'border-red-300', icon: '◼' },
  process: { bg: 'bg-blue-50', border: 'border-blue-300', icon: '⚙' },
  decision: { bg: 'bg-yellow-50', border: 'border-yellow-300', icon: '◇' },
  input: { bg: 'bg-purple-50', border: 'border-purple-300', icon: '📥' },
  output: { bg: 'bg-indigo-50', border: 'border-indigo-300', icon: '📤' },
  system: { bg: 'bg-gray-50', border: 'border-gray-300', icon: '💻' },
};

// Custom Node Component
interface CustomNodeProps {
  data: {
    label: string;
    description?: string;
    owner?: string;
    type: FlowNodeType;
    metadata?: Record<string, string>;
  };
  selected: boolean;
}

function CustomNode({ data, selected }: CustomNodeProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const style = nodeStyles[data.type];
  const isDecision = data.type === 'decision';

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <Handle type="target" position={Position.Top} className="!bg-[var(--border-hover)]" />

      <div
        className={cn(
          'px-4 py-3 rounded-lg border-2 shadow-sm transition-all min-w-[140px] max-w-[200px]',
          style.bg,
          style.border,
          selected && 'ring-2 ring-[var(--primary)] ring-offset-2',
          isDecision && 'rotate-0' // Could add diamond shape styling
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm">{style.icon}</span>
          <span className="font-medium text-sm text-center flex-1">{data.label}</span>
        </div>
        {data.owner && (
          <div className="text-xs text-[var(--foreground-secondary)] mt-1 text-center">
            {data.owner}
          </div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-[var(--border-hover)]" />

      {/* Left and right handles for decision nodes */}
      {isDecision && (
        <>
          <Handle type="source" position={Position.Left} id="left" className="!bg-[var(--border-hover)]" />
          <Handle type="source" position={Position.Right} id="right" className="!bg-[var(--border-hover)]" />
        </>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && data.description && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 p-3 bg-[var(--foreground)] text-[var(--background)] rounded-lg shadow-lg text-sm max-w-xs"
          >
            <p>{data.description}</p>
            {data.metadata && Object.keys(data.metadata).length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/20">
                {Object.entries(data.metadata).map(([key, value]) => (
                  <div key={key} className="text-xs">
                    <span className="font-medium">{key}:</span> {value}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

interface ProcessFlowProps {
  data: ProcessFlowData;
  className?: string;
  height?: number;
}

export function ProcessFlow({ data, className, height = 400 }: ProcessFlowProps) {
  // Convert our data format to React Flow format
  const initialNodes: Node[] = useMemo(() => {
    return data.nodes.map((node, index) => ({
      id: node.id,
      type: 'custom',
      position: { x: 100 + (index % 4) * 250, y: 50 + Math.floor(index / 4) * 150 },
      data: {
        label: node.label,
        description: node.description,
        owner: node.owner,
        type: node.type,
        metadata: node.metadata,
      },
    }));
  }, [data.nodes]);

  const initialEdges: Edge[] = useMemo(() => {
    return data.edges.map((edge, index) => ({
      id: `e${index}`,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      type: 'smoothstep',
      animated: edge.type === 'conditional',
      style: {
        stroke: edge.type === 'yes' ? 'var(--success)' : edge.type === 'no' ? 'var(--error)' : 'var(--border-hover)',
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: edge.type === 'yes' ? 'var(--success)' : edge.type === 'no' ? 'var(--error)' : 'var(--border-hover)',
      },
      labelStyle: {
        fontSize: 12,
        fontWeight: 500,
        fill: 'var(--foreground-secondary)',
      },
      labelBgStyle: {
        fill: 'var(--background)',
        fillOpacity: 0.9,
      },
    }));
  }, [data.edges]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className={cn('border border-[var(--border)] rounded-lg overflow-hidden', className)}>
      {data.title && (
        <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--background-secondary)]">
          <h3 className="font-semibold">{data.title}</h3>
          {data.description && (
            <p className="text-sm text-[var(--foreground-secondary)] mt-1">{data.description}</p>
          )}
        </div>
      )}
      <div style={{ height }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
          proOptions={{ hideAttribution: true }}
        >
          <Controls className="!bg-[var(--background)] !border-[var(--border)] !shadow-sm" />
          <Background color="var(--border)" gap={20} />
        </ReactFlow>
      </div>
    </div>
  );
}
