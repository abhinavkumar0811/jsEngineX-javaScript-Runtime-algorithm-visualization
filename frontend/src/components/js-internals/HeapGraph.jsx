import React, { useMemo, useState } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useTrace } from '../../context/TraceContext.jsx';
import { Database, Binary, Trash2, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function HeapGraph() {
  const { activeStep } = useTrace();
  const scopeVariables = activeStep?.scope || {};

  const [gcSwept, setGcSwept] = useState(false);
  const [freedBytes, setFreedBytes] = useState(0);

  // Build React Flow nodes and edges dynamically from scope and heap objects
  const { nodes, edges, unreachableCount } = useMemo(() => {
    const nodesList = [];
    const edgesList = [];
    let xOffset = 40;
    let yOffset = 50;
    let unreachable = 0;

    // Simulate an unreachable orphan heap object to demonstrate GC Mark & Sweep if sweep not triggered
    const entries = Object.entries(scopeVariables);

    entries.forEach(([key, val], idx) => {
      const isObj = val !== null && typeof val === 'object';
      const nodeId = `node-${key}`;

      nodesList.push({
        id: nodeId,
        position: { x: xOffset + (idx % 2) * 230, y: yOffset + Math.floor(idx / 2) * 130 },
        data: {
          label: (
            <div className="flow-node-content">
              <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{key}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{isObj ? '[Ref Object]' : String(val)}</div>
            </div>
          )
        },
        style: {
          background: isObj ? '#121824' : '#1a2234',
          color: '#f8fafc',
          border: isObj ? '1px solid var(--accent-cyan)' : '1px solid rgba(255,255,255,0.1)',
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
          position: { x: xOffset + (idx % 2) * 230 + 240, y: yOffset + Math.floor(idx / 2) * 130 },
          data: {
            label: (
              <div className="flow-heap-node">
                <div style={{ fontWeight: 700, color: 'var(--accent-green)', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Ref #{idx + 1} ({Array.isArray(val) ? 'Array' : 'Object'})</span>
                  <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.2)', padding: '1px 5px', borderRadius: '4px' }}>Reachable</span>
                </div>
                <div className="heap-properties" style={{ fontSize: '10px' }}>
                  {Object.entries(val).map(([k, v]) => (
                    <div key={k} className="heap-prop">
                      <span style={{ color: 'var(--text-muted)' }}>{k}:</span> <span style={{ color: 'var(--accent-yellow)' }}>{JSON.stringify(v)}</span>
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

    // Add unreferenced orphan node if GC sweep has not been run
    if (!gcSwept && entries.length > 0) {
      unreachable = 1;
      const orphanId = 'heap-orphan-temp';
      nodesList.push({
        id: orphanId,
        position: { x: xOffset + 480, y: yOffset + 180 },
        data: {
          label: (
            <div className="flow-heap-node">
              <div style={{ fontWeight: 700, color: 'var(--accent-pink)', marginBottom: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>Orphan Object #99</span>
                <span style={{ fontSize: '9px', background: 'rgba(236,72,153,0.2)', padding: '1px 5px', borderRadius: '4px' }}>Unreachable</span>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                <div>data: "garbage candidate"</div>
                <div>refs: 0</div>
              </div>
            </div>
          )
        },
        style: {
          background: 'rgba(236, 72, 153, 0.1)',
          color: 'var(--accent-pink)',
          border: '1px dashed var(--accent-pink)',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '11px',
          width: '190px'
        }
      });
    }

    return { nodes: nodesList, edges: edgesList, unreachableCount: unreachable };
  }, [scopeVariables, gcSwept]);

  const handleRunGcSweep = () => {
    setGcSwept(true);
    setFreedBytes(128);
    setTimeout(() => {
      setFreedBytes(0);
    }, 4000);
  };

  return (
    <div className="visualizer-card glass-panel flex-1" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={16} color="var(--accent-cyan)" />
          <span>Heap Object Memory Graph & Mark-and-Sweep GC</span>
        </div>

        {/* GC Mark & Sweep Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {freedBytes > 0 && (
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> Swept & Freed {freedBytes} bytes!
            </span>
          )}

          <button
            onClick={handleRunGcSweep}
            disabled={gcSwept}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid var(--border-color)',
              background: gcSwept ? 'var(--bg-card)' : 'rgba(236, 72, 153, 0.15)',
              color: gcSwept ? 'var(--text-muted)' : 'var(--accent-pink)',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: gcSwept ? 'default' : 'pointer'
            }}
          >
            <Trash2 size={13} /> {gcSwept ? 'GC Clean' : 'Run GC Mark & Sweep'}
          </button>

          <span className="count-badge">{nodes.length} Memory Nodes</span>
        </div>
      </div>

      <div className="react-flow-stage" style={{ flex: 1, minHeight: '280px' }}>
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
