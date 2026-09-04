import React, { useState, useEffect } from 'react';
import { runTrace } from './engine/traceEngine';

export default function App() {
  const [code, setCode] = useState(`// Sample JS Code for Trace Generator
function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

let numbers = [5, 3, 8, 1];
bubbleSort(numbers);
console.log("Sorted:", numbers);`);

  const [traceSteps, setTraceSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleGenerateTrace = async () => {
    setIsEvaluating(true);
    try {
      const steps = await runTrace(code);
      setTraceSteps(steps);
      setCurrentStepIdx(0);
    } catch (err) {
      console.error('Trace Error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const activeStep = traceSteps[currentStepIdx] || null;

  return (
    <div style={{ padding: '20px', fontFamily: 'var(--font-sans)', height: '100vh', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1.5rem', color: 'var(--accent-primary)' }}>
          ⚡ CS Execution & Visualization Platform
        </h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phase 1 — AST Trace Engine Active</span>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: 'calc(100% - 80px)' }}>
        {/* Editor & Scrubber Panel */}
        <div class="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>Source Code (Input)</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--font-code)',
              padding: '12px',
              fontSize: '0.9rem',
              resize: 'none'
            }}
          />
          <button
            onClick={handleGenerateTrace}
            disabled={isEvaluating}
            style={{
              marginTop: '12px',
              padding: '10px 16px',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isEvaluating ? 'Generating Trace Frames...' : '▶ Run AST Execution Trace'}
          </button>
        </div>

        {/* Trace Inspector Panel */}
        <div class="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>
            Trace Frame Inspector ({traceSteps.length > 0 ? `${currentStepIdx + 1} / ${traceSteps.length}` : '0 Steps'})
          </h3>

          {traceSteps.length > 0 ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Step Controls */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentStepIdx(Math.max(0, currentStepIdx - 1))}
                  disabled={currentStepIdx === 0}
                >
                  ⏮ Prev
                </button>
                <button
                  onClick={() => setCurrentStepIdx(Math.min(traceSteps.length - 1, currentStepIdx + 1))}
                  disabled={currentStepIdx === traceSteps.length - 1}
                >
                  Next ⏭
                </button>
                <input
                  type="range"
                  min="0"
                  max={traceSteps.length - 1}
                  value={currentStepIdx}
                  onChange={(e) => setCurrentStepIdx(Number(e.target.value))}
                  style={{ flex: 1 }}
                />
              </div>

              {/* Active Step Details */}
              <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}>
                <div><strong>Line Number:</strong> L{activeStep?.line} (Col {activeStep?.column})</div>
                <div><strong>Action:</strong> {activeStep?.action || 'Evaluate Statement'}</div>
                <div><strong>Operation Count:</strong> {activeStep?.opCount}</div>
              </div>

              <div style={{ flex: 1, overflow: 'auto', backgroundColor: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-code)', fontSize: '0.8rem' }}>
                <pre>{JSON.stringify(activeStep, null, 2)}</pre>
              </div>
            </div>
          ) : (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              Click "Run AST Execution Trace" to evaluate code and inspect step frames.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
