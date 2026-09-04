import React from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { GitCommit, CornerDownRight, RotateCcw } from 'lucide-react';

export default function RecursionTree() {
  const { activeStep, traceSteps } = useTrace();

  // Extract call stack depth and recursive function invocations
  const stack = activeStep?.stack || [{ name: '<global>', line: 1 }];

  // Build recursive invocation frames history up to current step
  const recursiveFrames = stack.filter(f => f.name !== '<global>');

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <GitCommit size={16} color="var(--accent-amber)" />
          <span>Recursion Stack Tree & Return Values</span>
        </div>
        <span className="depth-badge">Depth: {recursiveFrames.length}</span>
      </div>

      <div className="recursion-tree-stage">
        {recursiveFrames.length > 0 ? (
          <div className="recursion-nodes-list">
            {recursiveFrames.map((frame, idx) => (
              <div key={idx} className="recursion-node-card" style={{ marginLeft: `${idx * 24}px` }}>
                <div className="rec-node-header">
                  <CornerDownRight size={14} color="var(--accent-cyan)" />
                  <span className="rec-func-name">{frame.name}(...)</span>
                  <span className="rec-depth-tag">Depth #{idx + 1}</span>
                </div>
                <div className="rec-scope-params">
                  <span className="label">Stack Frame: Line L{frame.line || 1}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="stage-empty">
            <RotateCcw size={24} color="var(--text-muted)" />
            <span>No active recursive function call frames at this step.</span>
          </div>
        )}
      </div>
    </div>
  );
}
