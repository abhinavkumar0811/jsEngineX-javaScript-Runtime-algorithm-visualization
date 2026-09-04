import React, { useRef, useEffect } from 'react';
import { useTrace } from '../../context/TraceContext.jsx';
import { Network, Variable, Box, Zap } from 'lucide-react';

export default function ScopeChain() {
  const { activeStep, traceSteps, currentStepIdx } = useTrace();

  const scopeVariables = activeStep?.scope || {};
  const prevStep = traceSteps?.[currentStepIdx - 1] || null;
  const prevScopeVariables = prevStep?.scope || {};

  const varEntries = Object.entries(scopeVariables);

  const getVarType = (val) => {
    if (val === null) return 'null';
    if (Array.isArray(val)) return 'Array';
    return typeof val;
  };

  return (
    <div className="visualizer-card glass-panel">
      <div className="card-header">
        <div className="card-title">
          <Network size={16} color="var(--accent-primary)" />
          <span>Execution Context & Scope Chain</span>
        </div>
        <span className="count-badge">{varEntries.length} Variable(s)</span>
      </div>

      <div className="scope-chain-container" style={{ padding: '16px' }}>
        {varEntries.length > 0 ? (
          <div className="scope-variables-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {varEntries.map(([name, val]) => {
              const varType = getVarType(val);
              const isObjectOrArray = varType === 'object' || varType === 'Array';

              // Detect variable mutation compared to previous step snapshot
              const prevVal = prevScopeVariables[name];
              const isMutated = currentStepIdx > 0 && (
                JSON.stringify(prevVal) !== JSON.stringify(val)
              );

              return (
                <div
                  key={name}
                  className="variable-card"
                  style={{
                    background: isMutated ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-card)',
                    border: isMutated ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    borderRadius: '10px',
                    padding: '12px',
                    boxShadow: isMutated ? '0 0 12px rgba(6, 182, 212, 0.3)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div className="var-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div className="var-title" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Variable size={14} color="var(--accent-amber)" />
                      <span className="var-name" style={{ fontWeight: 700 }}>{name}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {isMutated && (
                        <span style={{ fontSize: '9px', background: 'var(--accent-cyan)', color: '#000', fontWeight: 800, padding: '1px 5px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <Zap size={10} /> Mutated
                        </span>
                      )}
                      <span className={`type-tag type-${varType.toLowerCase()}`} style={{ fontSize: '10px', background: 'var(--bg-panel)', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        {varType}
                      </span>
                    </div>
                  </div>

                  <div className="var-value" style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem' }}>
                    {isObjectOrArray ? (
                      <pre className="value-json" style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: 'var(--accent-green)' }}>
                        {JSON.stringify(val)}
                      </pre>
                    ) : (
                      <span className="primitive-val" style={{ color: isMutated ? 'var(--accent-cyan)' : 'var(--text-primary)', fontWeight: isMutated ? 700 : 400 }}>
                        {String(val)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="scope-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', color: 'var(--text-muted)' }}>
            <Box size={24} color="var(--text-muted)" style={{ marginBottom: '8px' }} />
            <span>No scope variables declared at this step.</span>
          </div>
        )}
      </div>
    </div>
  );
}
