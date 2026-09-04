import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTrace } from '../../context/TraceContext.jsx';
import { GitBranch } from 'lucide-react';

export default function GraphViz() {
  const { activeStep } = useTrace();

  const scope = activeStep?.scope || {};

  // Build binary tree / graph nodes from scope or default BST
  const { nodes, edges } = useMemo(() => {
    // Default BST structure for visualization demo
    const defaultTree = [
      { id: '1', val: 50, x: 250, y: 30 },
      { id: '2', val: 30, x: 150, y: 110, parent: '1' },
      { id: '3', val: 70, x: 350, y: 110, parent: '1' },
      { id: '4', val: 20, x: 90,  y: 190, parent: '2' },
      { id: '5', val: 40, x: 210, y: 190, parent: '2' },
      { id: '6', val: 60, x: 290, y: 190, parent: '3' },
      { id: '7', val: 80, x: 410, y: 190, parent: '3' }
    ];

    const currentVal = scope.target || scope.val || scope.midVal;

    const nodesList = defaultTree.map((item) => {
      const isActive = item.val === currentVal;

      return {
        id: item.id,
        position: { x: item.x, y: item.y },
        data: {
          label: (
            <div className={`tree-node-content ${isActive ? 'active-tree-node' : ''}`}>
              <div className="node-val-text">{item.val}</div>
            </div>
          )
        },
        style: {
          background: isActive ? '#06b6d4' : '#121824',
          color: isActive ? '#000' : '#f8fafc',
          border: isActive ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '700',
          fontSize: '14px',
          boxShadow: isActive ? '0 0 16px rgba(6, 182, 212, 0.6)' : 'none'
        }
      };
    });

    const edgesList = defaultTree
      .filter((item) => item.parent)
      .map((item) => ({
        id: `e-${item.parent}-${item.id}`,
        source: item.parent,
        target: item.id,
        style: { stroke: 'rgba(255, 255, 255, 0.2)', strokeWidth: 2 }
      }));

    return { nodes: nodesList, edges: edgesList };
  }, [scope]);

  return (
    <div className="visualizer-card glass-panel flex-1">
      <div className="card-header">
        <div className="card-title">
          <GitBranch size={16} color="var(--accent-secondary)" />
          <span>Tree & Graph Traversal Visualizer (React Flow)</span>
        </div>
        <span className="count-badge">{nodes.length} Nodes</span>
      </div>

      <div className="react-flow-stage">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background color="#1e293b" gap={16} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
