import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTrace } from '../../context/TraceContext.jsx';
import { Database, Binary } from 'lucide-react';

export default function HeapGraph() {
  const { activeStep } = useTrace();

  const scopeVariables = activeStep?.scope || {};

  // Build React Flow nodes and edges dynamically from scope and heap objects
  const { nodes, edges } = useMemo(() => {
    const nodesList = [];
    const edgesList = [];
    let xOffset = 40;
    let yOffset = 50;

    Object.entries(scopeVariables).forEach(([key, val], idx) => {
      const isObj = val !== null && typeof val === 'object';
      const nodeId = `node-${key}`;

      nodesList.push({
        id: nodeId,
        position: { x: xOffset + (idx % 2) * 220, y: yOffset + Math.floor(idx / 2) * 120 },
        data: {
          label: (
            <div className="flow-node-content">
              <div className="node-key">{key}</div>
              <div className="node-val">{isObj ? JSON.stringify(val) : String(val)}</div>
            </div>
          )
        },
        style: {
          background: isObj ? '#121824' : '#1a2234',
          color: '#f8fafc',
          border: isObj ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '12px',
          fontFamily: 'Fira Code, monospace',
          width: '180px'
        }
      });

      if (isObj) {
        const heapObjId = `heap-${key}`;
        nodesList.push({
          id: heapObjId,
          position: { x: xOffset + (idx % 2) * 220 + 240, y: yOffset + Math.floor(idx / 2) * 120 },
          data: {
            label: (
              <div className="flow-heap-node">
                <div className="heap-title">Ref #{idx + 1} ({Array.isArray(val) ? 'Array' : 'Object'})</div>
                <div className="heap-properties">
                  {Object.entries(val).map(([k, v]) => (
                    <div key={k} className="heap-prop">
                      <span className="prop-k">{k}:</span> <span className="prop-v">{JSON.stringify(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          },
          style: {
            background: '#0a0d14',
            color: '#10b981',
            border: '1px solid #10b981',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '11px',
            width: '200px'
          }
        });

        edgesList.push({
          id: `edge-${key}`,
          source: nodeId,
          target: heapObjId,
          animated: true,
          style: { stroke: '#06b6d4', strokeWidth: 2 }
        });
      }
    });

    return { nodes: nodesList, edges: edgesList };
  }, [scopeVariables]);

  return (
    <div className="visualizer-card glass-panel flex-1">
      <div className="card-header">
        <div className="card-title">
          <Database size={16} color="var(--accent-cyan)" />
          <span>Heap Object Memory Graph (React Flow)</span>
        </div>
        <span className="count-badge">{nodes.length} Memory Node(s)</span>
      </div>

      <div className="react-flow-stage">
        {nodes.length > 0 ? (
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background color="#1e293b" gap={16} />
            <Controls />
          </ReactFlow>
        ) : (
          <div className="stage-empty">
            <Binary size={24} color="var(--text-muted)" />
            <span>No objects allocated on the heap at this step.</span>
          </div>
        )}
      </div>
    </div>
  );
}
